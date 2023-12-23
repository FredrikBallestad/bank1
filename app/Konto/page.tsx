"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';




interface BrukerData {
  success: boolean;
  message: string;
  data: {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    money: number;
  };
}

const Konto = () => {
  //const [brukerData, setBrukerData] = useState(null);
  const [brukerData, setBrukerData] = useState<BrukerData | null>(null);
  const [lasteFeil, setLasteFeil] = useState('');

  useEffect(() => {
    const hentBrukerData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Hvis det ikke er noe token, kan det bety at brukeren ikke er logget inn
          setLasteFeil('Brukeren er ikke logget inn.');
          return;
        }

        const response = await fetch('http://localhost:3001/api/konto', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Nettverksrespons var ikke ok.');
        }

        const data = await response.json();
        setBrukerData(data);
      } catch (error) {
        setLasteFeil('Det oppstod en feil ved henting av brukerdata.');
        console.error(error);
      }
    };

    hentBrukerData();
  }, []);

  if (lasteFeil) {
    return <div>Feil: {lasteFeil}</div>;
  }

  if (!brukerData) {
    return <div>Laster brukerdata...</div>;
  }

  // Vis brukerdata her
  

return (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">Kontooversikt for {brukerData.data.username}</h1>

    {/* Antar at denne div wrapper hele knappegruppen og setter en fast bredde */}
    <div className="w-full max-w-sm">
      <Link href={`/Konto/Kontoer/Sparekonto/${brukerData.data.id}`}>
        <span className="flex items-center bg-white hover:bg-gray-200 text-blue-500 text-lg font-bold py-3 px-4 w-full text-left cursor-pointer shadow-md">
          <Image src="/images/sparegris.webp" alt="Sparegris" width={40} height={40} className="flex-shrink-0" />
          <span className="ml-4 flex-grow">Sparekonto: {brukerData.data.money} kr</span>
        </span>
      </Link>
      {/* Gjenta de samme klassene for de andre knappene for å sikre at de har lik bredde og styling */}
      <Link href={`/Konto/Kontoer/Aksjer/${brukerData.data.id}`}>
        <span className="flex items-center bg-white hover:bg-gray-200 text-blue-500 text-lg font-bold py-3 px-4 w-full text-left cursor-pointer shadow-md">
          <Image src="/images/aksjegraf.webp" alt="Aksjer" width={40} height={40} className="flex-shrink-0" />
          <span className="ml-4 flex-grow">Aksjer: 0 kr</span>
        </span>
      </Link>
      <Link href={`/Konto/Kontoer/Aksjesparekonto/${brukerData.data.id}`}>
        <span className="flex items-center bg-white hover:bg-gray-200 text-blue-500 text-lg font-bold py-3 px-4 w-full text-left cursor-pointer shadow-md">
          <Image src="/images/aksjegraf.webp" alt="Aksjer" width={40} height={40} className="flex-shrink-0" />
          <span className="ml-4 flex-grow">Aksjesparekonto: 0 kr</span>
        </span>
      </Link>
    </div>



      {/*<div className="w-full max-w-xs">
        <Link href={`/Konto/Kontoer/Sparekonto/${brukerData.data.id}`}>
          <span className="inline-block bg-white hover:bg-gray-100 text-blue-500 text-lg font-bold py-3 w-full text-center cursor-pointer shadow-md">
            Sparekonto: {brukerData.data.money} kr
          </span>
        </Link>
  
        <Link href={`/Konto/Kontoer/Aksjer/${brukerData.data.id}`}>
          <span className="inline-block bg-white hover:bg-gray-100 text-blue-500 text-lg font-bold py-3 w-full text-center cursor-pointer shadow-md">
            Aksjer: 0 kr
          </span>
        </Link>
  
        <Link href={`/Konto/Kontoer/Aksjesparekonto/${brukerData.data.id}`}>
          <span className="inline-block bg-white hover:bg-gray-100 text-blue-500 text-lg font-bold py-3 w-full text-center cursor-pointer shadow-md">
            Aksjesparekonto: 0 kr
          </span>
        </Link>
      </div>*/}
    </div>
  );
  
  
  
  

};

export default Konto;
