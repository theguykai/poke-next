'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getAllPokemon } from "../lib/pokemon";
import { getCollection, clearCollection } from "../lib/pokemonCollection";

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

    const handleClearCollection = () => {
        const confirmed = confirm("Are you sure you want to clear your collection? This action cannot be undone.");
        if (confirmed) {
            const success = clearCollection();
            if (success) {
                setCollection([]);
                alert("Collection cleared successfully!");
            } else {
                alert("Failed to clear collection. Please try again.");
            }
        }
    }

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
        <div className="bg-gradient-to-br from-blue-500 via-cyan-400 to-red-400 min-h-screen relative overflow-hidden">
            {/* Tech pattern overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('/images/pokeball.webp')] bg-repeat bg-[length:50px_50px]"></div>
            
            {/* Grid lines for tech feel */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            
            <div className="relative flex flex-col items-center w-full p-4">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Link href="/" className="flex items-center gap-1 sm:gap-2 bg-yellow-400 shadow-gray-800 shadow-md p-1 sm:p-2 rounded-full hover:bg-yellow-300 hover:shadow-yellow-600 transition-all duration-300">
                    <Image src="/images/pokeball.webp" height="40" width="40" alt="" className="rounded-full w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
                    <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-800">Throw!</p>
                    <Image src="/images/pokeball.webp" height="40" width="40" alt="" className="rounded-full w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
                    </Link>
                </div>
                
                <h1 className="text-3xl sm:text-4xl text-center font-extrabold my-4 text-white drop-shadow-lg">
                    Pokemon Collection
                </h1>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <button onClick={handleClearCollection} className="flex items-center gap-1 sm:gap-2 bg-red-500 shadow-gray-800 shadow-md p-1 sm:p-2 rounded-full hover:bg-red-400 hover:shadow-red-700 transition-all duration-300">
                    <Image src="/images/pokeball.webp" height="40" width="40" alt="" className="rounded-full w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
                    <p className="text-base sm:text-xl md:text-2xl font-bold text-white">Clear Collection</p>
                    <Image src="/images/pokeball.webp" height="40" width="40" alt="" className="rounded-full w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
                    </button>
                </div>
            </div>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 my-2">
                    {error}
                </div>
            )}
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center bg-white bg-opacity-80 p-6 rounded-xl shadow-lg">
                        <div className="flex justify-center mb-4">
                            <Image 
                                src="/images/pokeball.webp" 
                                height="60" 
                                width="60" 
                                alt="Loading" 
                                className="animate-spin"
                            />
                        </div>
                        <h2 className="text-xl mb-2 font-bold text-gray-800">Loading Collection...</h2>
                        {allPokemon.length > 0 && (
                            <p className="text-blue-600 font-semibold">Loaded {allPokemon.length} Pokemon so far</p>
                        )}
                    </div>
                </div>
            ) : (
                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                    {allPokemon.length > 0 ? (
                        allPokemon.map((pokemon) => (
                            <li key={pokemon.id} 
                                className={`p-4 rounded-lg flex items-center flex-col transition-all duration-300 transform hover:scale-105 ${
                                    isPokemonCollected(pokemon.id) 
                                    ? "bg-gradient-to-br from-white to-yellow-100 shadow-lg shadow-yellow-500/50" 
                                    : "bg-gray-300 grayscale shadow-md shadow-gray-500/50"
                                }`}
                            >
                                <Image 
                                    src={getPokemonImageSrc(pokemon)} 
                                    alt={pokemon.name} 
                                    height="100" 
                                    width="100"
                                    priority={pokemon.id <= 12}
                                    className={isPokemonCollected(pokemon.id) ? "drop-shadow-md" : ""}
                                />
                                <p className="text-xl font-semibold mt-2">
                                    <span className="text-blue-600 font-mono">#{pokemon.id.toString().padStart(3, '0')}</span> {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                                </p>
                            </li>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 bg-white bg-opacity-80 rounded-xl shadow-lg">
                            <p className="text-xl text-red-500 font-bold">No Pokemon found. Check your API connection.</p>
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
}