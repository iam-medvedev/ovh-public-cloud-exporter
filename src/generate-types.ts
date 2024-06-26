import openapiTS, { astToString } from "openapi-typescript";

/**
 * Parses openapi declaration and creates .d.ts file
 */
const cloudTypes = (await fetch(
  "https://eu.api.ovh.com/v1/cloud.json?format=openapi3"
).then((res) => res.json())) as Record<string, any>;
const meTypes = (await fetch(
  "https://eu.api.ovh.com/v1/me.json?format=openapi3"
).then((res) => res.json())) as Record<string, any>;

const mergedTypes: Object = {
  ...cloudTypes,
  components: {
    schemas: {
      ...cloudTypes.components.schemas,
      ...meTypes.components.schemas,
    },
    securitySchemes: {
      ...cloudTypes.components.securitySchemes,
      ...meTypes.components.securitySchemes,
    },
  },
  paths: {
    ...cloudTypes.paths,
    ...meTypes.paths,
  },
};

const ast = await openapiTS(JSON.stringify(mergedTypes));
const contents = astToString(ast);
await Bun.write(new URL("./openapi.d.ts", import.meta.url) as URL, contents);
