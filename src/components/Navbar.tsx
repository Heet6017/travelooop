import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-6 border-b border-black/5 shrink-0">
      <Link to="/dashboard" className="text-decoration-none">
        <h1 className="font-voyage text-4xl leading-none text-white m-0 p-0 uppercase">
          TRAVELOOP
        </h1>
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center overflow-hidden hover:shadow-md transition-all cursor-pointer bg-input-bg">
          <User className="text-[#52525B]" size={20} />
        </div>
      </div>
    </nav>
  );
}
