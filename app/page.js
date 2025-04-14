import Image from "next/image"

import Pokeball from "@/components/pokeball"


export default function Home() {
  return (
    <div>
      <main className="bg-blue-800 flex flex-col items-center justify-center min-h-screen py-2">
        <Pokeball />
      </main>
    </div>
  );
}
