const CACHE_KEY = 'poke-cache-v1'; // nome do cache

async function addToCache(requestURL, response){

    const cache = await caches.open(CACHE_KEY); //abrindo o cache e passando o cache key
    cache.put(requestURL, response);

}

async function fetchFromNetwork (requestURL){

    const response = await fetch(requestURL);
    addToCache(requestURL, response.clone());
    return response;

}

async function fetchFromCache(requestURL){

    const cache = await caches.open(CACHE_KEY);
    const cachedResponse = await cache.match(requestURL);
    return cachedResponse || null;
}

async function showPokeData() {
    
    const img = document.querySelector('img');
    const details = document.querySelector('details');
    const pre = document.querySelector('pre');

    const pokeNumber = Math.floor(Math.random() * 20) + 1;


    const requestURL = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;
    const pokeDataResponse = 
        (await fetchFromCache(requestURL)) || (await fetchFromNetwork(requestURL));
    const pokeData = await pokeDataResponse.json();
    pre.textContent = JSON.stringify(pokeData,null,2);   
    img.alt = pokeData.name;
    img.title = pokeData.name;
    details.hidden = false;
    
    const imgURL = pokeData.sprites.other['official-artwork'].front_default;
    const pokeImageRequest = 
    (await fetchFromCache(imgURL)) || (await fetchFromNetwork(imgURL));
    const blob  = await pokeImageRequest.blob();
    img.src = URL.createObjectURL(blob);
}
