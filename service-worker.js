// Sales_Nicha service worker — enables "Add to Home Screen" / installable app.
// Strategy: network-first for the app shell (always get the latest version when online),
// falling back to cache only when offline. Firebase requests are never intercepted/cached.
var CACHE_NAME = "sales-nicha-shell-v1";
var SHELL_FILES = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(SHELL_FILES).catch(function () { /* ignore individual failures */ });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (n) { return n !== CACHE_NAME; }).map(function (n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  var url = event.request.url;
  // never intercept cross-origin requests (Firebase, fonts, etc.) — let them go straight to network
  if (url.indexOf(self.location.origin) !== 0) return;
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(function (res) {
        var resClone = res.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, resClone); });
        return res;
      })
      .catch(function () {
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match("./index.html");
        });
      })
  );
});
