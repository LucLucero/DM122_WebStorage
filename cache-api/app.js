async function fetchPokeData (){

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/282')
    const json = await response.json();
    return json;

}

async function showPokeData() {

    const pre = document.querySelector('pre');
    const pokeData = await fetchPokeData();
    pre.textContent = JSON.stringify(pokeData,null,2);
    

}