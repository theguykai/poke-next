import Image from "next/image"
import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Pokeball from "@/components/pokeball"


export default function Home() {
  return (
    <div>
      <main className="bg-gradient-to-br from-blue-500 to-yellow-100 flex flex-col items-center justify-center min-h-screen py-2">
        <Pokeball />
        <footer className="flex flex-col items-center justify-center gap-2">
          <div>
            <p className="text-gray-500 text-sm text-center">Powered by</p>
            <Link href="https://pokeapi.co/" className="hover:text-yellow-500">PokeAPI v2</Link>
          </div>
          <Link href="https://github.com/theguykai/poke-next/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="3x" className="h-6 w-6 hover:text-blue-500" />
          </Link>
        </footer>
      </main>
    </div>
  );
}
