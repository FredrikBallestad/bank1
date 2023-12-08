import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const imageStyle = {
    marginRight: '10px', // Juster venstre margin etter dine preferanser
  };
  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between w-full fixed top-0">
      <div className="flex space-x-4">
        <a href="/" className="text-white">Hjem</a>
        <a href="/om" className="text-white" style={{ whiteSpace: 'nowrap' }}>Om oss</a>
        <Link href="/Kontakt">
          <span className="text-white">Kontakt</span>
        </Link>  
      </div>
      <div className="text-center flex items-center justify-center w-full">
        <Link href="/">
          <img src="/images/OIG.qVLyA2MiX9q.jpg" alt="Logo" className="w-20 h-12" style={imageStyle} />
        </Link> 
      </div>
      <Link href="/bli-kunde">
          <span className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap mr-2">Bli kunde</span>
        </Link>
      <Link href="/Login">
          <span className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap">Logg inn</span>
        </Link> 
    </header>
  );
}
