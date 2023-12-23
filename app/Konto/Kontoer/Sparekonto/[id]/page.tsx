"use client"
import React from 'react';

const test = () => {
  return (
    <div>
      <h1>Hei!</h1>
    </div>
  );
};

export default test;

// pages/konto/[id].tsx
/*import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const KontoDetaljer = () => {
  const router = useRouter();
  const { id } = router.query; // Dette henter ID fra URL

  const [kontoData, setKontoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hentKontoData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/konto/${id}`);
          if (!response.ok) {
            throw new Error('Kunne ikke hente konto data');
          }
          const data = await response.json();
          setKontoData(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    hentKontoData();
  }, [id]);

  if (isLoading) return <p>Laster inn...</p>;
  if (error) return <p>En feil oppstod: {error}</p>;

  return (
    <div>
      <h1>Konto Detaljer</h1>
      {kontoData ? (
        <div>
          <p>ID: {kontoData.id}</p>
          <p>Brukernavn: {kontoData.brukernavn}</p>
          <p>Saldo: {kontoData.money}</p>
        </div>
      ) : (
        <p>Kontoen finnes ikke.</p>
      )}
    </div>
  );
};

export default KontoDetaljer;*/
