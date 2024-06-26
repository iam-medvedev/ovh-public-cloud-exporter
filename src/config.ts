/**
 * Returns config after validation
 */
export function getConfig() {
  const config = {
    endpoint: process.env.OVH_ENDPOINT || "",
    appKey: process.env.OVH_APP_KEY || "",
    appSecret: process.env.OVH_APP_SECRET || "",
    consumerKey: process.env.OVH_CONSUMER_KEY || "",
    projectId: process.env.OVH_PROJECT_ID || "",

    port: process.env.PORT ? parseInt(process.env.PORT) : 9140,
    hostname: process.env.HOSTNAME || "0.0.0.0",
    pathname: process.env.PATHNAME || "/metrics",
    collectorInterval: process.env.COLLECTOR_INTERVAL
      ? parseInt(process.env.COLLECTOR_INTERVAL)
      : 600000,
  };

  if (!config.endpoint) {
    throw new Error("Please provide `OVH_ENDPOINT`");
  }
  if (!config.appKey) {
    throw new Error("Please provide `OVH_APP_KEY`");
  }
  if (!config.appSecret) {
    throw new Error("Please provide `OVH_APP_SECRET`");
  }
  if (!config.consumerKey) {
    throw new Error("Please provide `OVH_CONSUMER_KEY`");
  }
  if (!config.projectId) {
    throw new Error("Please provide `OVH_PROJECT_ID`");
  }

  return config;
}
