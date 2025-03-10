import Image from "next/image"

import Pokeball from "@/components/pokeball"


export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Pokemon</h1>
        <Pokeball />
      </main>
    </div>
  );
}
