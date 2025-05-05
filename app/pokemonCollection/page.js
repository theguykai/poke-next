'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getAllPokemon } from "../lib/pokemon";
import { getCollection } from "../lib/pokemonCollection";

export default function PokemonCollectionPage() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const data = await getAllPokemon();
                
                if (!data || !Array.isArray(data) || data.length === 0) {
                    throw new Error("No Pokemon data returned from API");
                }

                // Processing data in batches to avoid overwhelming the API and browser
                const BATCH_SIZE = 20;
                const batches = [];
                
                for (let i = 0; i < data.length; i += BATCH_SIZE) {
                    batches.push(data.slice(i, i + BATCH_SIZE));
                }
                
                let allDetailedPokemon = [];
                
                for (const batch of batches) {
                    const pokemonPromises = batch.map(async (pokemon) => {
                        try {
                            if (!pokemon?.url) {
                                console.warn("Pokemon missing URL:", pokemon);
                                return null;
                            }
                            const response = await fetch(pokemon.url);
                            if (!response.ok) {
                                throw new Error(`Failed to fetch ${pokemon.url}: ${response.status}`);
                            }
                            return await response.json();
                        } catch (error) {
                            console.error(`Error fetching details for ${pokemon?.name || 'unknown'}:`, error);
                            return null;
                        }
                    });
                    
                    const batchResults = await Promise.all(pokemonPromises);
                    allDetailedPokemon = [...allDetailedPokemon, ...batchResults.filter(p => p !== null)];
                    
                    // Update state with each batch to show progress
                    const sortedPokemon = [...allDetailedPokemon].sort((a, b) => a.id - b.id);
                    setAllPokemon(sortedPokemon);
                }

                // Fetch pokemon caught in collection for user
                let userCollection = [];
                try {
                    userCollection = await getCollection() || [];
                } catch (collectionError) {
                    console.error("Error fetching collection:", collectionError);
                    userCollection = [];
                }

                setCollection(userCollection);
            } catch (error) {
                console.error("Error fetching all Pokemon:", error);
                setError("Failed to load Pokemon data: " + error.message);
            } finally {
                setLoading(false);
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
        <div className="bg-gradient-to-b from-indigo-300 to-purple-300 min-h-screen">
            <div className="relative flex flex-col items-center w-full p-4">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Link href="/" className="flex items-center gap-1 sm:gap-2 shadow-gray-500 shadow-md p-1 sm:p-2 rounded-full hover:shadow-yellow-600 duration-150">
                    <Image src="/images/pokeball.webp" height="40" width="40" alt="" className="rounded-full w-8 h-8 sm:w-10 sm:h-10" />
                    <p className="text-base sm:text-xl md:text-2xl">Throw!</p>
                    <Image src="/images/pokeball.webp" height="40" width="40" alt="" className="rounded-full w-8 h-8 sm:w-10 sm:h-10" />
                    </Link>
                </div>
                
                <h1 className="text-2xl text-center font-bold my-4">Pokemon Collection</h1>
            </div>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 my-2">
                    {error}
                </div>
            )}
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <h2 className="text-xl mb-2">Loading Collection...</h2>
                        {allPokemon.length > 0 && (
                            <p>Loaded {allPokemon.length} Pokemon so far</p>
                        )}
                    </div>
                </div>
            ) : (
                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                    {allPokemon.length > 0 ? (
                        allPokemon.map((pokemon) => (
                            <li key={pokemon.id} className={`p-4 rounded-lg shadow-md shadow-blue-500 flex items-center flex-col ${isPokemonCollected(pokemon.id) ? "bg-white" : "bg-gray-300 grayscale"}`}>
                                <Image 
                                    src={getPokemonImageSrc(pokemon)} 
                                    alt={pokemon.name} 
                                    height="100" 
                                    width="100"
                                    priority={pokemon.id <= 12}
                                />
                                <p className="text-xl font-semibold">
                                    #{pokemon.id} {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                                </p>
                            </li>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-xl">No Pokemon found. Check your API connection.</p>
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
}