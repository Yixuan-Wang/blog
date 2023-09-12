import type { Plugin } from "vite";

interface ConfigPluginSiteMeta {
  version: string
  buildTimestamp: string
}

export default function PluginSiteMeta({
  version,
  buildTimestamp,
}: ConfigPluginSiteMeta): Plugin {
  const MODULE_ID = "virtual:site-meta";
  return {
    name: "site-meta",
    resolveId(id) {
      if (id === MODULE_ID)
        return id;
    },
    load(id) {
      if (id === MODULE_ID) {
        const code = `const siteMeta={version:${JSON.stringify(
          version,
        )},buildTimestamp:${JSON.stringify(
          buildTimestamp,
        )},};export default siteMeta;`;
        return code;
      }
    },
  };
}
