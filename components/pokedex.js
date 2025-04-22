import Image from "next/image"

export default function Pokedex({ pokemon, pokedexNum, onThrowAgain }) { return (
    <div className='bg-blue-400 rounded-md shadow-blue-400 shadow-md grid place-items-center gap-10 my-10'>
            <table>
                <thead className='bg-blue-500 text-white'>
                    <tr>
                        <th>
                            <Image src={pokemon.sprites.other["official-artwork"].front_default} alt="y" width="200" height="200"/>
                        </th>
                        <th>Pokedex #{pokedexNum.pokedex_numbers[0].entry_number}<br></br>
                        Pokedex: {pokedexNum.pokedex_numbers[0].pokedex.name}</th>
                        
                        <th className='py-2 px-4'>Type</th>
                        <th className='py-2 px-4'>Abilities</th>
                    </tr>
                </thead>
                <tbody className='bg-blue-200'>
                    <tr className='border-b-2 border-blue-500'>
                        <td className='py-2 px-4'>{pokemon.types.map((type, index) => {
                            return <p key={index}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</p>
                        })}</td>
                        <td className='py-2 px-4'>{pokemon.abilities.map((ability, index) => {
                            return <p key={index}>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</p>
                        })}</td>
                    </tr>
                </tbody>
            </table>
            <h1 className='text-8xl'>Pokemon: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            
            <div className='flex gap-5'>
                <p className='text-2xl'>Height: {pokemon.height}</p>
                <p className='text-2xl'>Weight: {pokemon.weight}</p>
                <p className='text-2xl'>Base Experience: {pokemon.base_experience}</p>
            </div>

            <button onClick={onThrowAgain}>Throw Again</button>
        </div>
)}