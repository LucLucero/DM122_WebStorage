async function fetchPokeData (){

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/282')
    const json = await response.json();
    return json;

}

async function showPokeData() {

    const img = document.querySelector('img');
    const details = document.querySelector('details');
    const pre = document.querySelector('pre');
    const pokeData = await fetchPokeData();    
    pre.textContent = JSON.stringify(pokeData,null,2);   
    img.src = pokeData.sprites.other['official-artwork'].front_default;
    img.alt = pokeData.name;    
    img.title = pokeData.name;
    details.hidden = false;
}