declare module "ovh" {
  type Client = {
    request: (
      method: M,
      path: P,
      callback: (err: Error | null, value: any) => void
    ) => void;
  };

  type ClientInit = {
    endpoint?: string;
    appKey?: string;
    appSecret?: string;
    consumerKey?: string;
  };

  function createClient(init: ClientInit): Client;
  export default createClient;
}

declare module "ovh/lib/endpoints" {
  type OVHEndpoints = Record<string, { host: string }>;
  const endpoints: OVHEndpoints;
  export default endpoints;
}
