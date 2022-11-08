const CACHE_KEY = 'poke-cache-v1'; // nome do cache

async function addToCache(requestURL, response){

    const cache = await caches.open(CACHE_KEY); //abrindo o cache e passando o cache key
    cache.put(requestURL, response);

}

async function fetchFromNetwork (requestURL){

    const response = await fetch(requestURL)
    addToCache(requestURL, response.clone());
    const json = await response.json();
    return json;

}


async function fetchFromCache(requestURL){

    const cache = await caches.open(CACHE_KEY);
    const cachedResponse = await cache.match(requestURL);
    const pokeData = cachedResponse?.json();
    return pokeData;
    
}


async function showPokeData() {

    const img = document.querySelector('img');
    const details = document.querySelector('details');
    const pre = document.querySelector('pre');
    const requestURL = "https://pokeapi.co/api/v2/pokemon/282"
    const pokeData = 
        (await fetchFromCache(requestURL)) || (await fetchFromNetwork(requestURL));
    pre.textContent = JSON.stringify(pokeData,null,2);   
    img.src = pokeData.sprites.other['official-artwork'].front_default;
    img.alt = pokeData.name;    
    img.title = pokeData.name;
    details.hidden = false;
}
