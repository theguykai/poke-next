'use client';

import { useEffect, useState, useCallback } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import PokeballImage from './pokeball-image';
import ThrowButton from './throw-button';
import { getRandomPokemon } from "../app/lib/pokemon";
import { set } from 'mongoose';
import { savePokemonToCollection } from '../app/lib/pokemonCollection';
import Pokedex from './pokedex';

const getRandomNumber = () => {
        return Math.floor(Math.random() * 1025) + 1
}

export default function Pokeball() {
    const [pokeballImg, setPokeballImg] = useState("/images/pokeball.webp");

    const [pokeNum, setPokeNum] = useState(null);
    const [pokedexNum, setPokedexNum] = useState(null);
    const [position, setPosition] = useState("");
    const [throwAnimation, setThrowAnimation] = useState("");
    const [duration, setDuration] = useState("duration-300");
    const [pokemon, setPokemon] = useState(null);
    const [ballThrown, setBallThrown] = useState(false);
    const [spinningScreen, setSpinningScreen] = useState(false);
    const [showName, setShowName] = useState(false);
    const [nameAnimation, setNameAnimation] = useState("opacity-0 translate-y-10");
    const [showPokedex, setShowPokedex] = useState(false);
    const [showPokemon, setShowPokemon] = useState(false);

    // handle functions for throw button
    const handleMouseOver = useCallback(() => {
        setPosition("-rotate-20");
    }, []);
    const handleMouseLeave = useCallback(()  => {
        setPosition("");
    })
    const handleClick = useCallback(() => {
        setBallThrown(true);
        setThrowAnimation("-translate-y-[100vh] translate-x-[100vw] animate-spin")
        const randomNum = getRandomNumber();
        setPokeNum(randomNum);

        setTimeout(() => {
            setSpinningScreen(true);
            setThrowAnimation("-translate-x-[100vw] -translate-y-[100vh] animate-spin linear 1s infinite");

            setTimeout(() => {
                setThrowAnimation("animate-spin linear 1s infinite");
                setTimeout(() => {
                    setDuration("duration-1000");
                    setThrowAnimation("animate-spin linear 2s infinite opacity-0 duration-700");
                    setTimeout(() => {
                        setNameAnimation("opacity-100 translate-y-0 transition-all duration-300 ease-out")
                        setShowName(true);
                        setShowPokemon(true);
                        setTimeout(() => {
                            setTimeout(() => {
                                setShowPokedex(true);
                            }, 1500)
                            }, 250)
                        }, 500)
                }, 500)
            }, 300)
        }, 300)
    })

    const handleThrowAgain = useCallback(() => {
        setBallThrown(false);
        setSpinningScreen(false);
        setShowName(false);
        setShowPokedex(false);
        setShowPokemon(false);
        setDuration("duration-300");
        setThrowAnimation("");
        setPokeNum(null);
    }
    , [])

    useEffect(() => {
        if (pokeNum) {
            const fetchPokemon = async () => {
                const newPokemon = await getRandomPokemon(pokeNum);
                setPokemon(newPokemon.pokemon);
                setPokedexNum(newPokemon.pokedexData);
                savePokemonToCollection(newPokemon.pokemon);
                console.log(newPokemon.pokedexData.pokedex_numbers)
            } 
        
        fetchPokemon();
        }
    }, [pokeNum])

    return (
        <div>
        
        {showPokedex
        ?
        <Pokedex 
            pokemon={pokemon}
            pokedexNum={pokedexNum}
            onThrowAgain={handleThrowAgain} 
        />
        :
        <div className='flex flex-col items-center justify-center gap-10 my-10'>
            {/* first screen, conditional render */}
            {showName && pokemon && <h1 className={`text-3xl text-white transition-all duration-700 ease-out ${nameAnimation}`}>GO {pokemon.name.toUpperCase()}!</h1>}
            {showPokemon 
            ? 
            <Image src={pokemon.sprites.other["official-artwork"].front_default} alt="y" width="200" height="200"/> 
            : 
            <PokeballImage src={pokeballImg} alt={"pokeball"} position={position} duration={duration} throwAnimation={throwAnimation} width="300" height="300"/>
            }
            {!ballThrown && 
            <>
            <ThrowButton onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}
            />
            <Link href="/pokemonCollection" className="p-2 bg-blue-400 text-4xl rounded-md text-white text-outline duration-200 hover:rounded-lg hover:bg-blue-300">Collection</Link>
            </>
            }
        </div>
            }
            </div>
    )
}