import Image from 'next/image'
import Test from './Test'
import Header from './Components/Header'
import Link from 'next/link';


export default function Home() {

  return (
    <main className="pt-64 flex flex-col items-center justify-center h-screen overflow-y-auto">
      <Header />

      <div className="bg-white p-4 rounded-md shadow-md text-black flex flex-row justify-between items-center">
        <div className="flex flex-col space-y-4"> {/* Venstre side for tekst og knapp */}
          <h2 className="text-4xl font-semibold">Prøv vårt boliglån</h2>
          <p>For å finne ut hvor mye du kan låne, starter du med en lånesøknad. Det er helt uforpliktende.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full self-start">Les mer</button>
        </div>
        <div className="w-1/2"> {/* Høyre side for bilde */}
          <img src="/images/boliglånbilde.png" alt="Bilde" className="object-cover" style={{ width: '100%', height: 'auto' }} />
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-4 mb-8">
        <button className="bg-white text-blue-500 px-40 py-10 rounded border border-black hover:bg-blue-500 hover:text-white transition-colors duration-300">
          Boliglån
        </button>
        <button className="bg-white text-blue-500 px-40 py-10 rounded border border-black hover:bg-blue-500 hover:text-white transition-colors duration-300">
          Sparing
        </button>
        <button className="bg-white text-blue-500 px-40 py-10 rounded border border-black hover:bg-blue-500 hover:text-white transition-colors duration-300">
          Forsikring
        </button>
      </div>



      {/*<div className="w-4/5 mx-auto mt-8 bg-blue-500 p-4 rounded-md shadow-md text-white flex h-96">
        <div className="w-1/2"> 
          <h2 className="text-4xl font-semibold text-left mt-4">Prøv vårt boliglån</h2>
          <p className="text-white text-left mt-2 mb-12">For å finne ut hvor mye du kan låne, starter du med en lånesøknad. Det er helt uforpliktende.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-auto block text-left">Les mer</button>
        </div>
        <div className="w-1/2" style={{ height: '300px' }}> 
          <img src="/images/boliglånbilde.png" alt="Bilde" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex justify-center mt-8">
          <button className="bg-white text-blue-500 px-32 py-8 rounded mr-4">Boliglån</button>
          <button className="bg-blue-500 text-white px-32 py-8 rounded mr-4">Sparing</button>
          <button className="bg-blue-500 text-white px-32 py-8 rounded">Forsikring</button>
        </div>*/}
    </main>
  )
}

