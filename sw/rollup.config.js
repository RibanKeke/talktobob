import devConfig from "./rollup.dev.config";
import strip from "@rollup/plugin-strip";
import { terser } from "rollup-plugin-terser";

export default (commandLineArgs) => {
  if (commandLineArgs.configDev) {
    return devConfig;
  } else {
    let prodConfig = {
      ...devConfig,
      plugins: [...devConfig.plugins, strip(), terser()],
    };
    return prodConfig;
  }
};
