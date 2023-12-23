"use client";
import React, { useState } from 'react';
import Header from '../Components/Header'; // Sørg for at stien er riktig

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Bli_Kunde = () => {
  const router = useRouter();
  
  /*const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    // Dette vil kjøre etter at komponenten er mountet, og når routeren er klar
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

  if (!isRouterReady) {
    // Venter på at routeren skal bli klar
    return null;
  }*/

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if(password !== passwordConfirm) {
      console.error('Passordene matcher ikke.');
      return;
    }
  
    // Opprett JSON-objekt med nye brukerdata
    const registerData = {
      username: username,
      email: email,
      password: password,
    };
  
    try {
      // Utfør POST-forespørsel til backend for registrering
      const response = await fetch('http://localhost:3001/Bli_Kunde', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
  
      const responseData = await response.json();

      // Lagre token og omdiriger brukeren
      localStorage.setItem('token', responseData.token);
      //window.location.href = '/Konto/konto';
      if (response.ok) {
        // Registrering vellykket, håndter videre logikk her
        router.push('/Konto');
        console.log('Registrering vellykket:', responseData);


      } else {
        // Registrering feilet, vis feilmelding
        console.error('Registrering feilet:', responseData);
      }
    } catch (error) {
      // Håndter eventuelle nettverksfeil
      console.error('Nettverksfeil:', error);
    }
  };

  return (
    <div className="pt-16 flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Header />
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center p-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Brukernavn:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              E-postadresse:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Passord:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bekreft passord:
            </label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Bli kunde
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bli_Kunde;