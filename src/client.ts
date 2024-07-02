import ovh from "ovh";
import endpoints from "ovh/lib/endpoints";
import createClient from "openapi-fetch";
import { getConfig } from "./config";
import { getDebugger } from "./debug";
import { type paths } from "./openapi";

const debug = getDebugger();
const config = getConfig();

/**
 * Typed client for OVH
 */
export class OVHClient {
  private ovhClient = ovh({
    endpoint: config.endpoint,
    appKey: config.appKey,
    appSecret: config.appSecret,
    consumerKey: config.consumerKey,
    apiTimeDiff: -1,
  });

  constructor() {
    debug("[OVHClient] authorization");
    this.authorize();
  }

  /**
   * Typed method for API querying through the `openapi-fetch` middleware
   */
  private request = createClient<paths>({
    baseUrl: `https://${endpoints[config.endpoint].host}`,
    fetch: (input) =>
      new Promise((resolve, reject) => {
        const url = new URL(input.url);
        debug(`[OVHClient] fetching ${input.url}`);

        this.ovhClient.request(input.method, url.pathname, (err, result) => {
          debug("[OVHClient]", { err, result });
          if (err) {
            console.error(err);
            return reject(err);
          }

          const body = JSON.stringify(result);
          resolve(
            new Response(body, {
              headers: {
                "content-type": "application/json",
              },
            })
          );
        });
      }),
  });

  /**
   * Authorization validator
   */
  public async authorize() {
    try {
      await this.request.GET("/me");
    } catch (err) {
      throw new Error("Cannot authorize");
    }
  }

  /**
   * Returns buckets usage information
   */
  public async getBucketsUsage() {
    const result = await this.request.GET(
      "/cloud/project/{serviceName}/usage/current",
      {
        params: {
          path: {
            serviceName: config.projectId,
          },
        },
      }
    );

    const buckets = result.data?.hourlyUsage?.storage?.filter(
      // Excluding internal bucket
      (storage) => !!storage.bucketName && storage.bucketName !== "favicon.ico"
    );

    return buckets || [];
  }

  /**
   * Returns buckets storage information
   */
  public async getBucketStorageInfo(region: string, bucket: string) {
    const result = await this.request.GET(
      "/cloud/project/{serviceName}/region/{regionName}/storage/{name}",
      {
        params: {
          path: {
            serviceName: config.projectId,
            regionName: region,
            name: bucket,
          },
        },
      }
    );

    return result.data || {};
  }
}
