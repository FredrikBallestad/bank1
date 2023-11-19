"use client";
import React, { useState } from 'react';
import Header from '../backend/Components/Header'; // Sørg for at stien er riktig

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Opprett JSON-objekt med brukerdata
    const loginData = {
      username: username,
      password: password,
    };
  
    try {
      // Utfør POST-forespørsel til backend med fetch API
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      // Behandle responsen fra serveren
      const responseData = await response.json();
  
      if (response.ok) {
        // Logg inn vellykket, håndter videre logikk her
        console.log('Innlogging vellykket:', responseData);
      } else {
        // Innlogging feilet, vis feilmelding
        console.error('Innlogging feilet:', responseData);
      }
    } catch (error) {
      // Håndter eventuelle nettverksfeil
      console.error('Nettverksfeil:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Header />
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center p-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Brukernavn:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Passord:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logg inn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;







