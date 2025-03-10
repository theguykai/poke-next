import Image from "next/image";

export default function PokeballImage({ src, alt, height, width, position}) {
    return <Image src={src} alt={alt} height={height} width={width} className={`${position} duration-300`} />
}