export async function getRandomPokemon(num) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`);

        if (!response.ok) {
            throw new Error('Data could not be found');
        }

        const pokemon = await response.json();
        return pokemon;
    }
    catch (error) {
        console.error(error);
    }

}