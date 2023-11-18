import Image from 'next/image'
import Test from './Test'
import Header from './backend/Components/Header'
import Link from 'next/link';


export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center h-screen overflow-y-auto">
      <Header />
      <div className="w-4/5 mx-auto mt-8 bg-gray-800 p-4 rounded-md shadow-md text-white flex">
        <div className="w-1/2"> {/* Venstre side */}
          <h2 className="text-4xl font-semibold text-left mt-4">Prøv vårt boliglån</h2>
          <p className="text-white text-left mt-2 mb-12">For å finne ut hvor mye du kan låne, starter du med en lånesøknad. Det er helt uforpliktende.</p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded mt-auto block text-left">Les mer</button>
        </div>
        <div className="w-1/2" style={{ height: '200px' }}> {/* Høyre side med fast høyde */}
          <img src="/images/OIG.qVLyA2MiX9q.jpg" alt="Bilde" className="w-full h-full object-cover" />
        </div>
        
      </div>

      <div className="flex justify-center mt-8">
          <button className="bg-gray-800 text-white px-32 py-8 rounded mr-4">Boliglån</button>
          <button className="bg-gray-800 text-white px-32 py-8 rounded mr-4">Sparing</button>
          <button className="bg-gray-800 text-white px-32 py-8 rounded">Forsikring</button>
        </div>
    </main>
  )
}

