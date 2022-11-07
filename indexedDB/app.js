import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

//criando o banco
const db = new Dexie('pokemonDB');

//table = store
//criando a store
db.version(1).stores({

    //botar os indexes que eu mais pesquiso
    pokemon: "++id, name",


});

//db.on('populate',async () =>) serve para criar o banco apenas uma vez
db.on('populate', async () => {

    await db.pokemon.bulkPut([
    
        {name: "Venusaur",
        profile: await downloadImage(buildURL(3))
        },
    
        {name: "Gengar",
        profile: await downloadImage( buildURL(94))
        },
    
        {name: "Magmar",
        profile: await downloadImage(buildURL(126))
        },
    
    ]);
    
})
db.open();

function buildURL(pokeNumber) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNumber}.png`;
}

function byName(name){
           
    return function searchByName(poke){  //poke é do tipo objeto, retornado no db.pokemon
        
        console.log("verificando funcionamento do closure");
        console.log(poke);           
        return poke.name.includes(name);
    }
}
//byname = char => searchByName = poke => poke.name.includes(name);


const queryPokemon = await db.pokemon
//.filter(byName('Gengar'))
.toArray();

/* FUNÇÃO PARA SEARCH PODE SER FEITO DESSA FORMA
function SearchByName(name){
           
    return function searchByName(poke){  //poke é do tipo objeto, retornado no db.pokemon
        
        console.log("verificando funcionamento do closure");
        console.log(poke);           
        return poke.name.includes(name);
    }

const queryPokemon = await db.pokemon
.where("name")
.filter(SearchByName()) //ou input.value
.toArray();
*/

//console.log(queryPokemon[0].name);    
//map roda a função para cada elemento do array

const pokeHTML = queryPokemon.map(toHTML).join('');
document.body.innerHTML = pokeHTML;

function toHTML(poke){

    return `
    
    <div>
        <div class="card" style="border-color: green;">
            <div class="card-id" style="color: green;">
                ${poke.id}
            </div>
            <div class="card-image">
                <img src="${URL.createObjectURL(poke.profile)}">
            </div>
            <div class="card-name" style="background-color: green;">
            ${poke.name}
            </div>
    </div>            
    
    `
}


async function downloadImage(imageURL){

    const response = await fetch(imageURL);
    const blob = await response.blob();
    //Store the binary data in indexedDB:
    return blob
}



