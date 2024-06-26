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
    collectorInterval: process.env.COLLECTOR_INTERVAL
      ? parseInt(process.env.COLLECTOR_INTERVAL)
      : 600000,
  };

  if (typeof config.endpoint !== "string") {
    throw new Error("Please provide `OVH_ENDPOINT`");
  }
  if (typeof config.appKey !== "string") {
    throw new Error("Please provide `OVH_APP_KEY`");
  }
  if (typeof config.appSecret !== "string") {
    throw new Error("Please provide `OVH_APP_SECRET`");
  }
  if (typeof config.consumerKey !== "string") {
    throw new Error("Please provide `OVH_CONSUMER_KEY`");
  }
  if (typeof config.projectId !== "string") {
    throw new Error("Please provide `OVH_PROJECT_ID`");
  }

  return config;
}
