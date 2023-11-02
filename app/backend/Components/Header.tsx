import Image from 'next/image';

export default function Header() {
  const imageStyle = {
    marginRight: '140px', // Juster venstre margin etter dine preferanser
  };

  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between w-full fixed top-0">
      <div className="flex space-x-4">
        <a href="/" className="text-white">Hjem</a>
        <a href="/om" className="text-white" style={{ whiteSpace: 'nowrap' }}>Om oss</a>
        <a href="/kontakt" className="text-white">Kontakt</a>
      </div>
      <div className="text-center flex items-center justify-center w-full">
        <img src="/images/OIG.qVLyA2MiX9q.jpg" alt="Logo" className="w-20 h-12" style={imageStyle} />
      </div>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </div>
    </header>
  );
}
