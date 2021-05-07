self.addEventListener('waiting', _event => {
  console.log(`A new service worker has installed, reloading.`);
  location.reload(true);
});
