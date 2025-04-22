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