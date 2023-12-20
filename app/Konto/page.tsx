"use client"
import React, { useState, useEffect } from 'react';

const Konto = () => {
  const [brukerData, setBrukerData] = useState(null);
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
    <div>
      <h1>Kontooversikt for {JSON.stringify(brukerData)}</h1>
    </div>
  );
};

export default Konto;
