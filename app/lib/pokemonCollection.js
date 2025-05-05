'use client';

export const getCollection = () => {
    if (typeof window !== 'undefined') {
        const collection = localStorage.getItem('pokemonCollection');
        return collection ? JSON.parse(collection) : [];
    }
    return [];
};

export const savePokemonToCollection = (pokemon) => {
    const existingCollection = getCollection();
    const isPokemonInCollection = existingCollection.some(p => p.id === pokemon.id);
    if (!isPokemonInCollection) {
        const simplifiedPokemon = {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
            sprites: {
                front_default: pokemon.sprites.other["official-artwork"].front_default
            }
        };
        
        existingCollection.push(simplifiedPokemon);
        localStorage.setItem('pokemonCollection', JSON.stringify(existingCollection));
    }

    return existingCollection;
}

export const clearCollection = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('pokemonCollection');
    return true;
  } catch (error) {
    console.error("Error clearing Pokemon collection:", error);
    return false;
  }
}