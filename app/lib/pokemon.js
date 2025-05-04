export async function getRandomPokemon(num) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`);

        if (!response.ok) {
            throw new Error('Data could not be found');
        }

        const pokemon = await response.json();
        const pokedex = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${num}/`);
        const pokedexData = await pokedex.json();

        return { pokemon, pokedexData };
    }
    catch (error) {
        console.error(error);
    }
}

export async function getAllPokemon() {
    try {
        // This currently logs pokemon id count to 1025 and then jumps to 10000
        // const limitFetch = await fetch(`https://pokeapi.co/api/v2/pokemon`)
        // if (!limitFetch.ok) {
        //     throw new Error('Failed to fetch Pokémon count');
        // }
        // const limitData = await limitFetch.json()
        // const limit = limitData.count;
        // console.log(limit)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);

        if (!response.ok) {
            throw new Error('Data could not be found');
        }

        const data = await response.json();
        return data.results;
    }
    catch (error) {
        console.error(error);
    }
}