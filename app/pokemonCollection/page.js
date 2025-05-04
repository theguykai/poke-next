'use client';

import Image from "next/image";
import Link  from "next/link";

import { getAllPokemon } from "../lib/pokemon";
import { getCollection } from "../lib/pokemonCollection";

export default function PokemonCollectionPage() {
    // const pokemon = getAllPokemon();
    // console.log(pokemon);
    const collection = getCollection();
    console.log(collection);
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-between gap-10 p-4">
                <Link href="/">
                    <Image src="/images/pokeball.webp" height="80" width="80" alt=""></Image>
                </Link>
                <h1 className="text-2xl text-center font-bold my-4">My Pokemon Collection</h1>
                <Link href="/">
                    <Image src="/images/pokeball.webp" height="80" width="80" alt=""></Image>
                </Link>
            </div>
            
            {collection.length > 0 ? (
                <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                    {[...collection]
                    .sort((a, b) => a.id - b.id)
                    .map((pokemon) => (
                        <li key={pokemon.id} className="p-4 rounded-lg shadow-md shadow-blue-500 flex items-center flex-col">
                            <Image src={pokemon.sprites.front_default} alt={pokemon.name} height="100" width="100" />
                            <h2 className="text-xl font-semibold">#{pokemon.id} {pokemon.name}</h2>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Pokemon in your collection yet!</p>
            )}
        </div>
    );
}