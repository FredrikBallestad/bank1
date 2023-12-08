import React from 'react';
import Header from '../Components/Header';
import Link from 'next/link';


const Kontakt = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <a
          href="https://www.linkedin.com/in/fredrik-ballestad-57aa24224/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          Besøk min LinkedIn-profil
        </a>
      </div>
    </div>
  );
};

export default Kontakt;
