import prom, { type Gauge } from "prom-client";

/**
 * Prometheus metrics handler for OVH
 */
export class OVHMetrics {
  private registry = new prom.Registry();
  public incomingBandwidth: Gauge;
  public incomingInternalBandwidth: Gauge;
  public outgoingBandwidth: Gauge;
  public outgoingInternalBandwidth: Gauge;
  public stored: Gauge;
  public totalPrice: Gauge;
  public objectsCount: Gauge;
  public objectsSize: Gauge;

  constructor() {
    prom.collectDefaultMetrics({
      register: this.registry,
    });

    this.incomingBandwidth = new prom.Gauge({
      name: "ovh_s3_incoming_bandwidth",
      help: "Incoming bandwidth in GiB",
      labelNames: ["bucket", "region"],
      registers: [this.registry],
    });
    this.incomingInternalBandwidth = new prom.Gauge({
      name: "ovh_s3_incoming_internal_bandwidth",
      help: "Incoming internal bandwidth in GiB",
      labelNames: ["bucket", "region"],
      registers: [this.registry],
    });
    this.outgoingBandwidth = new prom.Gauge({
      name: "ovh_s3_outgoing_bandwidth",
      help: "Outgoing bandwidth in GiB",
      labelNames: ["bucket", "region"],
      registers: [this.registry],
    });
    this.outgoingInternalBandwidth = new prom.Gauge({
      name: "ovh_s3_outgoing_internal_bandwidth",
      help: "Outgoing internal bandwidth in GiB",
      labelNames: ["bucket", "region"],
      registers: [this.registry],
    });
    this.stored = new prom.Gauge({
      name: "ovh_s3_stored",
      help: "Stored data in GiBh",
      labelNames: ["bucket", "region"],
      registers: [this.registry],
    });
    this.totalPrice = new prom.Gauge({
      name: "ovh_s3_total_price",
      help: "Total billed price",
      labelNames: ["bucket", "region"],
      registers: [this.registry],
    });
    this.objectsCount = new prom.Gauge({
      name: "ovh_s3_objects_count",
      help: "Objects count",
      labelNames: ["bucket", "region"],
      registers: [this.registry],
    });
    this.objectsSize = new prom.Gauge({
      name: "ovh_s3_objects_size",
      help: "Objects size in bytes",
      labelNames: ["bucket", "region"],
      registers: [this.registry],
    });
  }

  public async getMetrics() {
    return this.registry.metrics();
  }
}
