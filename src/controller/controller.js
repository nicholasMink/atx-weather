window.addEventListener('load', function() {
  if (!navigator.serviceWorker) return;
  if (navigator.serviceWorker.controller) {
    console.log('Service worker controller in Navigator');
  }
  else {
    navigator.serviceWorker.register('/service-worker.js', { scope: './' })
    .then((res) => console.log('Service worker registered with scope:', res.scope))
    .catch((err) => console.log('error' , err));
  }
});