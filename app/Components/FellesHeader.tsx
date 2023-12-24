"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function FellesHeader() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Her vil du sjekke om brukeren er logget inn, for eksempel ved å sjekke en token i localStorage
        const token = localStorage.getItem('userToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        // Logikk for å håndtere utlogging
        console.log('Brukeren har logget ut');
        setIsLoggedIn(false);
        // Her bør du implementere utlogging, f.eks. ved å slette session/token og omdirigere til login-siden
        localStorage.removeItem('token');
        router.push('/Login');
      };

  const imageStyle = {
    marginLeft: '40px', // Juster venstre margin etter dine preferanser
  };

  const router = useRouter();
  
  return (
    <header className="bg-white p-4 flex items-center justify-between w-full fixed top-0">
      <div className="flex space-x-4">
        <Link href="/">
          <span className="text-black" style={{ whiteSpace: 'nowrap' }}>Hjem</span>
        </Link>
        <Link href="/om">
          <span className="text-black" style={{ whiteSpace: 'nowrap' }}>Om oss</span>
        </Link>
        <Link href="/kontakt">
          <span className="text-black" style={{ whiteSpace: 'nowrap' }}>Kontakt</span>
        </Link>
      </div>
      <div className="text-center">
        <Image src="/images/bank1-logo.webp" alt="Logo" width={100} height={64} style={imageStyle} />
      </div>
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full whitespace-nowrap"
            onClick={handleLogout}
          >
            Logg ut
          </button>
        ) : (
          <>
            <Link href="/Bli_Kunde">
              <span className="bg-blue-500 text-white px-4 py-2 rounded-full whitespace-nowrap">Bli Kunde</span>
            </Link>
            <Link href="/Login">
              <span className="bg-blue-500 text-white px-4 py-2 rounded-full whitespace-nowrap">Logg Inn</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}