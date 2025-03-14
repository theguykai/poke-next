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
    const [pokemon, setPokemon] = useState(null);

    // handle functions for throw button
    const handleMouseOver = useCallback(() => {
        setPosition("-rotate-20");
    }, []);
    const handleMouseLeave = useCallback(()  => {
        setPosition("");
    })
    const handleClick = useCallback(() => {
        setPokeballImg(pokeballs[1].src);
        setPokeballAlt(pokeballs[1].alt);
        const randomNum = getRandomNumber();
        setPokeNum(randomNum);
    })

    useEffect(() => {
        if (pokeNum) {
            const fetchPokemon = async () => {
                const newPokemon = await getRandomPokemon(pokeNum);
                setPokemon(newPokemon);
            } 
        
        fetchPokemon();
        }
    }, [pokeNum])

    return (
        <div className='flex flex-col items-center justify-center gap-10 my-10'>
            <PokeballImage src={pokeballImg} alt={pokeballAlt} position={position} width="300" height="300"/>
            <ThrowButton onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}
            />
            {pokemon && <div className='flex flex-col items-center gap-5'>
                <p>GO {pokemon.name}!</p>
                <Image src={pokemon.sprites.front_default} alt="y" width="200" height="200"/>
            </div>
            }
        </div>
    )
}