"use client"
import React, { useState } from 'react';
import LoggedInHeader from '../../../Components/LoggedInHeader';

const Page = () => {
  // Tilstandsvariabler for skjemaet
  const [fraKonto, setFraKonto] = useState('');
  const [tilKonto, setTilKonto] = useState('');
  const [belop, setBelop] = useState('');
  const [forfallsdato, setForfallsdato] = useState('');
  const [melding, setMelding] = useState('');

  
  // Håndterer innsending av skjemaet
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Her skulle du legge til valideringslogikk og logikk for å sende data til serveren/API-et

    const paymentData = {
      fromAccountId: fraKonto,
      toAccountId: tilKonto,
      amount: belop,
      date : forfallsdato,
      message : melding
    };

    try {
      const token = localStorage.getItem('token');
        
        if (!token) {
          // Hvis det ikke er noe token, kan det bety at brukeren ikke er logget inn
          alert('Ingen token tilgjengelig. Vennligst logg inn på nytt.');
          return;
        }

      const response = await fetch('http://localhost:3001/api/payment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        alert('Betaling utført! Transaksjons-ID: ' + responseData.transactionId);
        // Oppdater brukergrensesnittet eller tilstand hvis nødvendig
      } else {
        // Håndter feil, vis melding til bruker
        alert('Feil ved utføring av betaling: ' + responseData.message);
      }
    } catch (error) {
      // Håndter nettverksfeil eller annen uventet feil
      alert('En uventet feil oppstod: ' + error);
    }
  };

  // JSX for skjemaet
  return (
    <div className="pt-16 flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <LoggedInHeader />
        <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center mt-8">Betalingskjema</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fraKonto">
            Fra konto:
          </label>
          <input 
          value={fraKonto}
          onChange={(e) => setFraKonto(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fraKonto" type="text" placeholder="1234.56.78903"
          required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tilKonto">
            Til konto:
          </label>
          <input
          value = {tilKonto}
          onChange={(e) => setTilKonto(e.target.value)} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tilKonto" type="text" placeholder="9876.54.32109" 
          required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="belop">
            Beløp:
          </label>
          <input
          value = {belop}
          onChange={(e) => setBelop(e.target.value)} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="belop" type="number" placeholder="0.00" 
          required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="forfallsdato">
            Forfallsdato:
          </label>
          <input 
          value = {forfallsdato}
          onChange={(e) => setForfallsdato(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="forfallsdato" type="date" 
          required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="melding">
            Melding:
          </label>
          <textarea
          value={melding}
          onChange={(e) => setMelding(e.target.value)} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="melding" placeholder="Din melding her"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="submit">
            Betal
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Page;
