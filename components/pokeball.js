'use client';

import { useEffect, useState, useCallback } from 'react';

import Image from 'next/image';

import pokeballs from './images/pokeball-links/links';
import PokeballImage from './pokeball-image';
import ThrowButton from './throw-button';
import { getRandomPokemon } from "../app/lib/pokemon";

const getRandomNumber = () => {
        return Math.floor(Math.random() * 1025) + 1
}

export default function Pokeball() {
    const [pokeballImg, setPokeballImg] = useState(pokeballs[0].src);
    const [pokeballAlt, setPokeballAlt] = useState(pokeballs[0].alt);

    const [pokeNum, setPokeNum] = useState(null);
    const [position, setPosition] = useState("");
    const [throwAnimation, setThrowAnimation] = useState("");
    const [duration, setDuration] = useState("duration-300");
    const [pokemon, setPokemon] = useState(null);
    const [ballThrown, setBallThrown] = useState(false);

    // handle functions for throw button
    const handleMouseOver = useCallback(() => {
        setPosition("-rotate-20");
    }, []);
    const handleMouseLeave = useCallback(()  => {
        setPosition("");
    })
    const handleClick = useCallback(() => {
        // setPokeballImg(pokeballs[1].src);
        // setPokeballAlt(pokeballs[1].alt);
        setBallThrown(true);
        setThrowAnimation("-rotate-20 -translate-y-[100vh] translate-x-[100vw]")
        const randomNum = getRandomNumber();
        setPokeNum(randomNum);
    })

    useEffect(() => {
        if (pokeNum) {
            const fetchPokemon = async () => {
                const newPokemon = await getRandomPokemon(pokeNum);
                setPokemon(newPokemon);
                console.log(newPokemon);
            } 
        
        fetchPokemon();
        }
    }, [pokeNum])

    return (
        <div className='flex flex-col items-center justify-center gap-10 my-10'>
            <PokeballImage src={pokeballImg} alt={pokeballAlt} position={position} duration={duration} throwAnimation={throwAnimation} width="300" height="300"/>
            {!ballThrown && <ThrowButton onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}
            />}
            {pokemon && <div className='flex flex-col items-center gap-5'>
                <p className='text-8xl'>GO {pokemon.name.toUpperCase()}!</p>
                <Image src={pokemon.sprites.front_default} alt="y" width="200" height="200"/>
            </div>
            }
        </div>
    )
}