import Image from 'next/image';

export default function Header(){
    return (
        <header className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <a href="/" className="text-white">Hjem</a>
            <a href="/om" className="text-white">Om oss</a>
            <a href="/kontakt" className="text-white">Kontakt</a>
          </div>
          <div className="text-center">
            <img src="/images/OIG.qVLyA2MiX9q.jpg" alt="Logo" className="w-32 h-12" />
          </div>
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          </div>
        </header>
      );
}

