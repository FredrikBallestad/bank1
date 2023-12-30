"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function FellesHeader() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Her vil du sjekke om brukeren er logget inn, for eksempel ved å sjekke en token i localStorage
        const token = localStorage.getItem('token');
        console.log("true???: ")
        setIsLoggedIn(!!token);
        console.log(isLoggedIn);
    }, []);

    const handleLogout = () => {
        // Logikk for å håndtere utlogging
        console.log('Brukeren har logget ut');
        setIsLoggedIn(false);
        // Her bør du implementere utlogging, f.eks. ved å slette session/token og omdirigere til login-siden
        localStorage.removeItem('token');
        router.push('/Login');
      };

      const handleTilNettbank = () => {
        // Logikk for å håndtere Til nettbank knapp
        router.push('/Konto');
      };  

  
  const router = useRouter();
  
  return (
    <header className="bg-white p-4 flex items-center justify-between w-full fixed top-0">
      <div className="flex-1 flex justify-start space-x-4">
        <Link href="/">
          <span className="text-black" style={{ whiteSpace: 'nowrap' }}>Hjem</span>
        </Link>
        <Link href="/om">
          <span className="text-black" style={{ whiteSpace: 'nowrap' }}>Om oss</span>
        </Link>
        <Link href="/Kontakt">
          <span className="text-black" style={{ whiteSpace: 'nowrap' }}>Kontakt</span>
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <Image src="/images/bank1-logo.webp" alt="Logo" width={100} height={64}  />
      </div>

      <div className="flex-1 flex justify-end space-x-4">
        {isLoggedIn ? (
          <>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full whitespace-nowrap"
            onClick={handleTilNettbank}
          >
            Til Nettbank
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full whitespace-nowrap"
            onClick={handleLogout}
          >
            Logg ut
          </button>
          </>

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



/*import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const imageStyle = {
    marginLeft: '40px', // Juster venstre margin etter dine preferanser
  };
  return (
    <header className="bg-white p-4 flex items-center justify-between w-full fixed top-0">
      <div className="flex space-x-4">
        <a href="/" className="text-black">Hjem</a>
        <a href="/om" className="text-black" style={{ whiteSpace: 'nowrap' }}>Om oss</a>
        <Link href="/Kontakt">
          <span className="text-black">Kontakt</span>
        </Link>  
      </div>
      
      <div className="text-center flex items-center justify-center w-full">
        <Link href="/">
          <img src="/images/bank1-logo.webp" alt="Logo" className="w-24 h-14" style={imageStyle} />
        </Link> 
      </div>

      <Link href="/Bli_Kunde">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full whitespace-nowrap mr-2">Bli kunde</span>
        </Link>
      <Link href="/Login">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full whitespace-nowrap">Logg inn</span>
        </Link> 
    </header>
  );
}*/
