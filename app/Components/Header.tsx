import Image from 'next/image';
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
}
