import Image from "next/image"
import Link from "next/link"

import Pokeball from "@/components/pokeball"


export default function Home() {
  return (
    <div>
      <main className="bg-gradient-to-br from-blue-500 to-yellow-100 flex flex-col items-center justify-center min-h-screen py-2">
        <Pokeball />
        <footer>
          <p className="text-gray-500 text-sm">Powered by</p>
          <Link href="https://pokeapi.co/">PokeAPI v2</Link>
        </footer>
      </main>
    </div>
  );
}
