import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import nodePolyfills from "rollup-plugin-node-polyfills";
import purgeCss from "rollup-plugin-purgecss";
// import visualizer from "rollup-plugin-visualizer";

export const config: Config = {
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
      copy: [{ src: "sitemap.xml" }, { src: "robots.txt" }],
      baseUrl: "https://zendare.app",
      empty: false,
    },
  ],
  sourceMap: true,
  plugins: [
    sass({
      /* TODO: Remove when all components are moved to the library */
      injectGlobalPaths: [
        "src/global/layout.scss",
        "src/global/theme.scss",
        "src/global/animation.scss",
      ],
    }),
  ],
  devServer: {
    reloadStrategy: "pageReload",
    openBrowser: false,
  },
  rollupPlugins: {
    after: [
      nodePolyfills(),
      purgeCss({
        content: ["index.html", "**/*.js"],
      }),
      // visualizer({
      //   template: "sunburst",
      // }),
    ],
  },
  globalScript: "src/global/app.ts",
  globalStyle: "src/global/app.css",
  testing: {
    collectCoverage: true,
    setupFiles: ["./jest.setup.js"],
  },
};
