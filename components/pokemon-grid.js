import EachPokemonPage from "./pokemon"

export default function PokemonGrid({ pokemon }) {
    return (
        <ul>
            {pokemon.map((poke) => 
                <li key={poke.id}>
                    <EachPokemonPage {...poke} />
                </li>
            )}
        </ul>
    )
}