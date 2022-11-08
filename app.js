if('serviceWorker' in navigator){ //nesse if o serviceworker tem q ser minusculo

    const onsuccess = () => console.log('[Service Worker] Registered Success!!');
    const onerror = () => console.log('[Service Worker] Registered Error!!');
    


    navigator.serviceWorker
        .register("sw.js")
        .then(onsuccess)
        .catch(onerror)


}