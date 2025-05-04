import { Suspense } from 'react';

import { getAllPokemon } from '../lib/pokemon';
import PokemonGrid from '@/components/pokemon-grid';

async function Pokemon() {
    const pokemon = await getAllPokemon();
    console.log(pokemon);
    return (
        <PokemonGrid pokemon={pokemon} />
    )
}

export default function PokemonPage() {
    return(
        <div>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
                <Pokemon />
            {/* </Suspense> */}
        </div>
    )
    
}