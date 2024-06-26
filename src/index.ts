import { OVHClient } from "./client";
import { OVHMetrics } from "./metrics";
import { getConfig } from "./config";
import { createCollector } from "./collector";
import { getDebugger } from "./debug";

const debug = getDebugger();
const config = getConfig();
const client = new OVHClient();
const metrics = new OVHMetrics();

createCollector(async () => {
  debug("Getting bucket usage...");
  const bucketsUsage = await client.getBucketsUsage();

  debug("Adding metrics...");
  for (const bucketUsage of bucketsUsage) {
    const region = bucketUsage.region;
    const bucket = bucketUsage.bucketName;
    if (!region || !bucket) {
      console.error("Cannot obtain bucket info");
      continue;
    }

    const meta = {
      region,
      bucket,
    };

    debug(`Getting info for bucket ${bucket} at ${region}`);
    const bucketInfo = await client.getBucketStorageInfo(region, bucket);

    debug(`Adding metrics for bucket ${bucket} at ${region}`);
    metrics.incomingBandwidth.set(
      meta,
      bucketUsage.incomingBandwidth?.quantity?.value!
    );
    metrics.incomingInternalBandwidth.set(
      meta,
      bucketUsage.incomingInternalBandwidth?.quantity?.value!
    );
    metrics.outgoingBandwidth.set(
      meta,
      bucketUsage.outgoingBandwidth?.quantity?.value!
    );
    metrics.outgoingInternalBandwidth.set(
      meta,
      bucketUsage.outgoingInternalBandwidth?.quantity?.value!
    );
    metrics.stored.set(meta, bucketUsage.stored?.quantity?.value!);
    metrics.totalPrice.set(meta, bucketUsage.totalPrice!);
    metrics.objectsCount.set(meta, bucketInfo.objectsCount!);
    metrics.objectsSize.set(meta, bucketInfo.objectsSize!);
    debug(`Metrics added for ${bucket} at ${region}`);
  }

  debug(`Collector finished, waiting for ${config.collectorInterval}ms`);
}, config.collectorInterval);

debug("Starting server...");
const server = Bun.serve({
  port: config.port,
  hostname: config.hostname,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === config.pathname) {
      const result = await metrics.getMetrics();
      debug(`Sending response, length: ${result.length}`);
      return new Response(result);
    }

    return new Response("", {
      status: 404,
    });
  },
});

debug("Server started");
console.info(
  `[ovh-public-cloud-exporter] Listening on ${
    server.url
  }${config.pathname.slice(1)}`
);
