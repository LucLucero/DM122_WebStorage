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
    retrieveData();
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


async function retrieveData() {
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
    const section = document.getElementById('section');
    section.innerHTML = pokeHTML;
    document.body.appendChild(section);
    
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
}




retrieveData();
async function downloadImage(imageURL){

    const response = await fetch(imageURL);
    const blob = await response.blob();
    //Store the binary data in indexedDB:
    return blob;
}

async function saveFormData(event){

    event.preventDefault();
    const form = event.target;
    await saveOnDataBase({

        name: form.pokeName.value,
        pokeNumber: form.pokeNumber.value,

    })
    retrieveData();                                            
    form.reset();    
    return false;
    
}


// === -> só é verdade se os operandos são do mesmo tipo e possuem o mesmo valor.
async function saveOnDataBase({name, pokeNumber}){
    
    const pokemon = await db.pokemon.where('name').equals(name).toArray();
    if (pokemon.length === 0) {
        
        await db.pokemon.add({
            name,
            profile:await downloadImage(buildURL(pokeNumber)),
        });
        
    }
}


const form = document.querySelector('form');
form.addEventListener("submit", saveFormData);


