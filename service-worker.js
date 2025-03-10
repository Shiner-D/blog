const CACHE_NAME = "blog_v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/src/assets/fonts/xxPK1feWPyxj.woff",
  "/src/assets/fonts/xxPK1feWPyxj.woff2",
];

// 安装 Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // 跳过等待
});

// 拦截网络请求并返回缓存资源
self.addEventListener("fetch", (event) => {
  // 拦截fetch事件并提供自定义的响应
  event.respondWith(
    (async () => {
      // 判断设备是否在线； true：在线； false：离线
      // navigator.onLine 并不总是100%准确，它只能检测设备是否链接到网络，而不能保证网络请求一定成功。
      if (navigator.onLine) {
        try {
          // 优先尝试从网络中获取数据
          const networkResponse = await fetch(event.request);
          if (event.request.url.includes('/assets/images/')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        } catch (error) {
          // 如果网络请求失败，则从缓存中获取数据
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // 如果缓存中不存在数据，则返回一个错误响应
          return new Response("Network error", {
            status: 500,
            statusText: "Network error",
            error,
          });
        }
      } else {
        // 如果设备离线，则从缓存中获取数据
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // 如果缓存中不存在数据，则返回一个错误响应
        return new Response("Offline", {
          status: 503,
          statusText: "Offline",
        });
      }
    })()
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // 立即激活 Service Worker
});