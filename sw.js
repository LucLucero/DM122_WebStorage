const CACHE_KEY = 'appShell-v1';

const assetsToCache = [
    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
    'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'assets/images/pwa-logo.png',
    'assets/js/material.min.js',
    'assets/style.css',
    'app.js',
    'favicon.ico',
    'index.html',
    '/'
  ];

async function cacheStaticAssets(){

    const cache = await caches.open(CACHE_KEY);
    return cache.addAll(assetsToCache);

}


async function networkFirst(request){

    try {

        return await fetch(request);

    } catch (error) {

        
        console.log('Erro',{error});
        const cache = await caches.open(CACHE_KEY);
        return cache.match(request);

    }

}





self.addEventListener('install', event => {

    console.log('[Service Worker] Installing service worker...');
    event.waitUntil(cacheStaticAssets());
    self.skipWaiting();
});

self.addEventListener('activate', event => {

    console.log('[Service Worker] Activating service worker...');
    return self.clients.claim();

})


self.addEventListener("fetch", (event) => {


    console.log('[Service Worker] Fetch event worker', event.request.url);
    event.respondWith(networkFirst(event.request));

})

