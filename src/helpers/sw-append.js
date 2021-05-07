self.addEventListener('install', _event => {
  console.log(`A new service worker is ready, skip waiting.`);
  self.skipWaiting();
});
