import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie('pokemonDB');

//table = store

db.version(1).stores({

    pokemon: "++id, name",


});


db.on('populate', async () => {

    await db.pokemon.bulkPut([
    
        {name: "Venusaur",
        profile: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
        },
    
        {name: "Gengar",
        profile: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
        },
    
        {name: "Magmar",
        profile: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png"
        },
    
    ]);
    
})
db.open();

function byName(name){
           
    return function searchByName(poke){  //poke é do tipo objeto, retornado no db.pokemon
        
        console.log("verificando funcionamento do closure");
        console.log(poke);           
        return poke.name.includes(name);
    }
}
//byname = char => searchByName = poke => poke.name.includes(name);


const queryPokemon = await db.pokemon.filter(byName('Gengar')).toArray();

console.log(queryPokemon[0].name);    


