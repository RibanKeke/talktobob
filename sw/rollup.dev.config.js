import typescript from "rollup-plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";

export default {
  input: "./service-worker.ts",
  output: {
    file: "dist/service-worker.js",
    format: "cjs",
  },
  plugins: [
    typescript({ tsconfig: "./tsconfig.json" }),
    json(),
    nodePolyfills(),
    nodeResolve({ preferBuiltins: false }),
  ],
};
