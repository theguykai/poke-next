'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link  from "next/link";

import { getAllPokemon } from "../lib/pokemon";
import { getCollection } from "../lib/pokemonCollection";

export default function PokemonCollectionPage() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const data = await getAllPokemon();

                const pokemonMapped = data.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                return await response.json();
                });

                const detailedPokemon = await Promise.all(pokemonMapped);

                const sortedPokemon = detailedPokemon.sort((a, b) => a.id - b.id);

                const userCollection = await getCollection();

                setAllPokemon(sortedPokemon);
                setCollection(userCollection);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching all Pokemon:", error);
            }            
        };

        fetchAllPokemon();
    }, []);

    const isPokemonCollected = (pokemonId) => {
        return collection.some(p => p.id === pokemonId);
    };

    const getPokemonImageSrc = (pokemon) => {
    if (pokemon?.sprites?.other?.["official-artwork"]?.front_default) {
      return pokemon.sprites.other["official-artwork"].front_default;
    } 
    else if (pokemon?.sprites?.front_default) {
      return pokemon.sprites.front_default;
    }
    else {
      return "/images/pokeball.webp";
    }
  };

    return (
        <div className="bg-gray-100">
            <div className="relative flex flex-col items-center w-full p-4">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Link href="/" className="flex items-center gap-1 sm:gap-2 shadow-gray-500 shadow-md p-1 sm:p-2 rounded-full hover:shadow-yellow-600 duration-150">
                    <Image src="/images/pokeball.webp" height="40" width="40" alt="" className="rounded-full w-8 h-8 sm:w-10 sm:h-10" />
                    <p className="text-base sm:text-xl md:text-2xl">Throw!</p>
                    <Image src="/images/pokeball.webp" height="40" width="40" alt="" className="rounded-full w-8 h-8 sm:w-10 sm:h-10" />
                    </Link>
                </div>
                
                <h1 className="w-1/4 text-2xl text-center font-bold my-4">Pokemon Collection</h1>

                {/* <button>Clear Collection</button> */}
            </div>
            
            {loading ? <h2>Loading Collection...</h2> : (
                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                    {allPokemon.map((pokemon) => (
                        <li key={pokemon.id} className={`p-4 rounded-lg shadow-md shadow-blue-500 flex items-center flex-col ${isPokemonCollected(pokemon.id) ? "" : "bg-gray-300 grayscale"}`}>
                            <Image src={getPokemonImageSrc(pokemon)} alt={pokemon.name} height="100" width="100" />
                            <p className="text-xl font-semibold">#{pokemon.id} {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}