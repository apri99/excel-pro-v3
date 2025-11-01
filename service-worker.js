self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("excel-pro-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "convert-csv.js"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
