import Image from "next/image";
import Link from "next/link";

export default function Pokedex({ pokemon, pokedexNum, onThrowAgain }) { return (
    <div className="flex items-center justify-evenly flex-col gap-5 rounded-xl p-8 shadow-2xl animate-fade-in duration-100">
        <h1 className="text-4xl text-gray-900 font-bold">#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        <Image src={pokemon.sprites.other["official-artwork"].front_default} alt="y" width="250" height="250" className="" />
        
        <div className="flex gap-5">
            {pokemon.types.map((typeInfo, index) => (
                <div key={index} className="flex items-center flex-col mr-2">
                    <Image 
                    src={`/images/types/${typeInfo.type.name}.png`} 
                    alt={`${typeInfo.type.name} type`}
                    height="50"
                    width="50"
                    
                    />
                    <span>{typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}</span>
                </div>
            ))}
        </div>
        <button onClick={onThrowAgain}>
            <Image src="/images/pokeball.webp" className="rounded-full duration-200 hover:-rotate-12" width="95" height="95" alt="" />
        </button>
        <Link href="/pokemonCollection" className="p-2 bg-blue-400 text-2xl rounded-md text-white text-outline duration-200 hover:rounded-lg hover:bg-blue-300">COLLECTION</Link>
    </div>
)}