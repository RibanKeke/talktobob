module.exports = {
  globDirectory: "www/",
  globPatterns: [
    '**/*.{js,css,json,html}',
  ],
  swDest: "www/sw.js",
  swSrc: "sw/dist/service-worker.js",
};
