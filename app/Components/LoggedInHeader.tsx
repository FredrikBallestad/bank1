import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoggedInHeader() {
  const imageStyle = {
    marginRight: '110px', // Juster venstre margin etter dine preferanser
  };

  const router = useRouter();
  
  const handleLogout = () => {
    // Logikk for å håndtere utlogging
    console.log('Brukeren har logget ut');
    // Her bør du implementere utlogging, f.eks. ved å slette session/token og omdirigere til login-siden
    localStorage.removeItem('token');
    router.push('/Login');
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

      
      {/*<div className="flex space-x-4">
        <Link href="/">
          <span className="text-black">Hjem</span>
        </Link>
      </div>
      <div className="text-center flex items-center justify-center w-full">
        <Link href="/">
          <span>
            <Image src="/images/bank1-logo.webp" alt="Logo" width={100} height={64} />
          </span>
        </Link>
  </div>*/}



      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full whitespace-nowrap" onClick={handleLogout}>
          Logg ut
        </button>
      </div>
    </header>
  );
}
