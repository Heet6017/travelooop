import { Search, Filter, Layers, ListFilter, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const regionalSelections = [
  { id: 1, name: 'Amalfi Coast', image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Kyoto', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Santorini', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac542?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1531366936336-62fc674cb3ce?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop' },
];

const previousTrips = [
  { id: 1, name: 'Paris Getaway', date: 'Oct 2025', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Tokyo Explorer', date: 'May 2025', image: 'https://images.unsplash.com/photo-1503899036067-e13e8dff7e1d?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'New York Winter', date: 'Dec 2024', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop' },
];

export default function Dashboard() {
  return (
    <MainLayout>
        <h1 className="text-4xl font-bold text-center text-white mb-8">Dashboard Test</h1>
        <div className="max-w-6xl mx-auto pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="w-full h-[300px] rounded-[20px] overflow-hidden relative mb-10 shadow-md group border border-black/5"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[20s] group-hover:scale-110 grayscale-[30%]"></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="font-voyage text-6xl text-white tracking-wide uppercase drop-shadow-xl text-center">Where to next?</h2>
          </div>
        </motion.div>

        {/* Search bar and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] group-focus-within:text-[#050505] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search destinations..." 
              className="w-full h-12 bg-white/5 border border-white/10 rounded-full pl-12 pr-6 text-white placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-white/10 transition-all font-medium text-sm"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button className="flex items-center gap-2 h-12 px-6 bg-white/5 border border-white/10 rounded-full font-semibold text-sm text-white hover:bg-white/10 transition-colors whitespace-nowrap">
              <Layers size={16} /> Group by
            </button>
            <button className="flex items-center gap-2 h-12 px-6 bg-white/5 border border-white/10 rounded-full font-semibold text-sm text-white hover:bg-white/10 transition-colors whitespace-nowrap">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 h-12 px-6 bg-white/5 border border-white/10 rounded-full font-semibold text-sm text-white hover:bg-white/10 transition-colors whitespace-nowrap">
              <ListFilter size={16} /> Sort by...
            </button>
          </div>
        </motion.div>

        {/* Top Regional Selections */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-sans font-bold text-xl text-white whitespace-nowrap">Top Regional Selections</h3>
            <div className="h-px bg-black/10 w-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {regionalSelections.map((item) => (
              <div key={item.id} className="aspect-square rounded-[16px] overflow-hidden relative group cursor-pointer shadow-sm border border-black/5">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale-[20%]" style={{ backgroundImage: `url(${item.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white font-semibold tracking-tight text-sm md:text-base">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Previous Trips */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-sans font-bold text-xl text-white whitespace-nowrap">Previous Trips</h3>
            <div className="h-px bg-black/10 w-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {previousTrips.map((trip) => (
              <div key={trip.id} className="aspect-[3/4] md:aspect-[4/5] rounded-[16px] overflow-hidden relative group cursor-pointer shadow-sm border border-black/5">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale-[10%]" style={{ backgroundImage: `url(${trip.image})` }}></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <h4 className="text-white font-bold text-2xl tracking-tight mb-1">{trip.name}</h4>
                  <p className="text-white/80 font-medium text-sm">{trip.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Link to="/build-itinerary">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-12 right-12 bg-[#050505] text-white px-8 py-4 rounded-full font-bold shadow-premium flex items-center gap-3 hover:bg-[#111111] transition-colors z-50 border border-white/10"
        >
          <Plus size={20} />
          Plan a trip
        </motion.button>
      </Link>
    </MainLayout>
  );
}
