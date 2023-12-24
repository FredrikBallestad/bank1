"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoggedInHeader from '../Components/LoggedInHeader';

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
    <>
    <LoggedInHeader />

      <div className="flex flex-col items-center justify-center min-h-screen">

      <Link href={`/Konto/Betal/${brukerData.data.id}`}>
        <span className="mt-10 flex items-center bg-white text-white px-4 py-2 rounded-full whitespace-nowrap ring-2 ring-blue-500">
          <Image src="/images/betalknapp.webp" alt="Sparegris" width={40} height={40} />
          <span className="ml-4 text-blue-500 font-bold">Betal</span>
        </span>
      </Link>

        <h1 className="text-2xl font-bold mb-6 mt-10 text-gray-800">Kontooversikt for {brukerData.data.username}</h1>

        <div className="w-full max-w-sm">
          <Link href={`/Konto/Kontoer/Sparekonto/${brukerData.data.id}`}>
            <span className="flex items-center justify-between bg-white hover:bg-gray-200 text-blue-500 text-lg font-bold py-3 px-4 w-full cursor-pointer shadow-md transition-colors duration-150">
              <div className="flex items-center"> {/* Container for bilde og tekst */}
                <Image src="/images/sparegris.webp" alt="Sparegris" width={40} height={40} />
                <span className="ml-4">Sparekonto</span> {/* Margin venstre for å gi litt plass mellom bildet og teksten */}
              </div>
              <span>{brukerData.data.money} kr</span> {/* Pengebeløpet justert til høyre */}
            </span>
          </Link>
          <Link href={`/Konto/Kontoer/Aksjer/${brukerData.data.id}`}>
            <span className="flex items-center justify-between bg-white hover:bg-gray-200 text-blue-500 text-lg font-bold py-3 px-4 w-full cursor-pointer shadow-md transition-colors duration-150">
              <div className="flex items-center"> {/* Container for bilde og tekst */}
                <Image src="/images/aksjegraf.webp" alt="Sparegris" width={40} height={40} />
                <span className="ml-4">Aksjer</span> {/* Margin venstre for å gi litt plass mellom bildet og teksten */}
              </div>
              <span>0 kr</span> {/* Pengebeløpet justert til høyre */}
            </span>
          </Link>
          <Link href={`/Konto/Kontoer/Aksjesparekonto/${brukerData.data.id}`}>
            <span className="flex items-center justify-between bg-white hover:bg-gray-200 text-blue-500 text-lg font-bold py-3 px-4 w-full cursor-pointer shadow-md transition-colors duration-150">
              <div className="flex items-center"> {/* Container for bilde og tekst */}
                <Image src="/images/aksjegraf.webp" alt="Sparegris" width={40} height={40} />
                <span className="ml-4">Aksjesparekonto</span> {/* Margin venstre for å gi litt plass mellom bildet og teksten */}
              </div>
              <span>0 kr</span> {/* Pengebeløpet justert til høyre */}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
  
  
/*
return (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">Kontooversikt for {brukerData.data.username}</h1>
    <div className="w-full max-w-sm">
      <Link href={`/Konto/Kontoer/Sparekonto/${brukerData.data.id}`}>
        <span className="flex items-center bg-white hover:bg-gray-200 text-blue-500 text-lg font-bold py-3 px-4 w-full text-left cursor-pointer shadow-md">
          <Image src="/images/sparegris.webp" alt="Sparegris" width={40} height={40} className="flex-shrink-0" />
          <span className="ml-4 flex-grow">Sparekonto: {brukerData.data.money} kr</span>
        </span>
      </Link>
      
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
    </div>
  );*/
  
};

export default Konto;
