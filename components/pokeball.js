'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import pokeballs from './images/pokeball-links/links';
import PokeballImage from './pokeball-image';
import { getRandomPokemon } from "../app/lib/pokemon";

export default function Pokeball() {
    const [pokeballImg, setPokeballImg] = useState(pokeballs[0].src);
    const [pokeballAlt, setPokeballAlt] = useState(pokeballs[0].alt);

    const [pokeNum, setPokeNum] = useState(null);

    const [position, setPosition] = useState("");

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 1025) + 1
    }

    const handleMouseOver = () => {
        setPosition("-rotate-20");
    }

    const handleMouseLeave = () => {
        setPosition("");
    }

    const handleClick = () => {
        setPokeballImg(pokeballs[1].src);
        setPokeballAlt(pokeballs[1].alt);
        setPokeNum(getRandomNumber());
        console.log(getRandomNumber())
    }

    useEffect(() => {
        if (pokeNum)
        getRandomPokemon(pokeNum);
    }, [pokeNum])

    return (
        <div className='flex flex-col items-center justify-center gap-10 my-10'>
            <PokeballImage src={pokeballImg} alt={pokeballAlt} position={position} width="300" height="300"/>
            <button className='py-4 px-2 bg-amber-400 text-amber-50 font-bold text-7xl rounded-md hover:rounded-xl hover:bg-amber-200 hover:font-8xl hover:cursor-pointer  duration-300' onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}
            onClick={handleClick}>Throw!</button>
        </div>
    )
}