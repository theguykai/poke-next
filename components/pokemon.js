import Image from 'next/image';

export default function EachPokemonPage({ slug, name, image }) {
    console.log(name);
    return (
        <div>
            <p>{name}</p>
            <Image src={image}/>
        </div>
    )
}