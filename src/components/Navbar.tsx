import { User, Map, PlusCircle, LayoutGrid, Calendar, Search, DollarSign, BarChart3, Settings, Columns } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Explore', path: '/dashboard', icon: <LayoutGrid size={16} /> },
    { name: 'Plan', path: '/create-trip', icon: <PlusCircle size={16} /> },
    { name: 'Timeline', path: '/timeline', icon: <Calendar size={16} /> },
    { name: 'Guide', path: '/activities', icon: <Search size={16} /> },
    { name: 'Budget', path: '/budget', icon: <DollarSign size={16} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={16} /> },
    { name: 'Compare', path: '/comparison', icon: <Columns size={16} /> },
  ];

  const isActive = (path: string) => {
    if (path.includes('?')) {
      const [base, query] = path.split('?');
      return location.pathname === base && location.search.includes(query);
    }
    return location.pathname === path && !location.search;
  };

  return (
    <nav className="w-full flex justify-between items-center px-10 py-6 bg-transparent shrink-0 relative z-50">
      <Link to="/dashboard" className="text-decoration-none group">
        <h1 className="font-voyage text-3xl leading-none text-white m-0 p-0 uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">
          TRAVELOOP
        </h1>
      </Link>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 py-2.5 px-4 rounded-full border ${isActive(link.path) ? 'text-white border-white/20 bg-white/5' : 'text-white/20 border-transparent hover:text-white/80 hover:border-white/10'}`}
            >
              {link.icon}
              <span className="hidden 2xl:inline">{link.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 border-l border-white/10 pl-8 ml-4">
          <Link to="/settings" className="text-white/30 hover:text-white transition-colors">
            <Settings size={18} />
          </Link>
          <Link to="/profile">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all duration-500 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all"
                alt="Profile"
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
