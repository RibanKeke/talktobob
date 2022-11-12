/**
 * Author: Robert Banziziki Muhire
 * Date: 01/05/2020
 * Update: 02/11/2020
 */
import APP_CONFIG from "./app.json";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { WebNotiofications } from "./WebNotifications";

declare const self: WorkerGlobalScope & typeof globalThis;

/**
  * The current version of the service worker.
  --------------------------------------------*/
const API_CACHE = "zendare-api";
const JS_CACHE = "zendare-javascript";
const CSS_CACHE = "zendare-css";
const IMG_CACHE = "zendare-images";

const webNotifications = WebNotiofications.getInstance();

self.addEventListener("active", async () => {
  setInterval(() => {
    console.log("Sending notification from worker");
    self.postMessage("Notification from worker");
  }, 300);
});

/*TODO: Trigger pre-caching when the app is installed on user device */
const cachedUrls = self.__WB_MANIFEST;
precacheAndRoute(cachedUrls);

self.addEventListener("install", async (event: ExtendableEvent) => {
  event.waitUntil(() => console.log("Service worker installed:", event));
});

self.onmessage = (msg: any) => {
  console.log(msg);
  const { data } = msg;
  console.log("Received message", data);
  webNotifications.addNotifications([data]);
};

self.self.addEventListener("install", async (event: ExtendableEvent) => {
  event.waitUntil(() => console.log("Service worker installed:", event));
});

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-web-fonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

/**
  * Advanced files caching
  ------------------------ */

/* FONTS */
registerRoute(
  ({ url }) => url.origin === APP_CONFIG.apiHost,
  new StaleWhileRevalidate({
    cacheName: API_CACHE,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1000,
      }),
    ],
  })
);

/* JS */
registerRoute(
  ({ request }) => request.destination === "script",
  new StaleWhileRevalidate({
    cacheName: JS_CACHE,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
      }),
    ],
  })
);

/* IMAGES */
registerRoute(
  ({ request }) => request.destination === "image",
  new StaleWhileRevalidate({
    cacheName: IMG_CACHE,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 150,
      }),
    ],
  })
);

/* CSS */
registerRoute(
  /\.css$/,
  new CacheFirst({
    cacheName: CSS_CACHE,
  })
);
