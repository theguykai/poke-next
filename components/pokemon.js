import Image from 'next/image';

export default function EachPokemonPage({ slug, name, image }) {
    console.log(name);
    return (
        <div>
            <p>{name}</p>
            <img src={image}/>
        </div>
    )
}