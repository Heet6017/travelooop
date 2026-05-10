import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Map, Search, Layers, Filter } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useState, useEffect } from 'react';
import { api } from '../api';
import toast from 'react-hot-toast';

const INDIAN_DESTINATIONS = [
  { id: 1, name: 'Taj Mahal', city: 'Agra', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Kerala', city: 'God\'s Own Country', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Jaipur', city: 'Pink City', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Goa', city: 'Sunshine State', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Ladakh', city: 'Land of Passes', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop' },
];

const TRIP_IMAGES = [
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
];

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'home';
  const [trips, setTrips] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'home') fetchTrips();
  }, [activeTab]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const data = await api.get('/trips');
      setTrips(data);
    } catch (err: any) {
      if (err.message?.includes('Unauthorized')) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const filteredTrips = trips.filter(t =>
    t.place?.toLowerCase().includes(search.toLowerCase()) ||
    t.plan_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-center justify-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-7xl"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Hero Banner */}
                <motion.div className="w-full h-[380px] rounded-[32px] overflow-hidden relative mb-10 shadow-2xl group border border-white/10">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[20s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <p className="text-white/50 uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Incredible India</p>
                    <h2 className="font-voyage text-7xl md:text-8xl text-white tracking-wide uppercase drop-shadow-2xl mb-4">Discovery</h2>
                    <p className="text-white/60 font-bold tracking-[0.3em] uppercase text-[10px]">Explore India's finest destinations</p>
                  </div>
                </motion.div>

                {/* Search */}
                <div className="flex gap-4 mb-12">
                  <div className="flex-1 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input
                      type="text" value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Search your trips..."
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 text-white placeholder-white/30 font-medium focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>
                  <button className="flex items-center gap-2 h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:text-white hover:bg-white/10 transition-all font-bold text-sm">
                    <Layers size={16} /> Group
                  </button>
                  <button className="flex items-center gap-2 h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:text-white hover:bg-white/10 transition-all font-bold text-sm">
                    <Filter size={16} /> Filter
                  </button>
                </div>

                {/* Indian Destinations */}
                <section className="mb-14">
                  <div className="flex items-center gap-6 mb-8">
                    <h3 className="text-white font-bold text-xl uppercase tracking-tight whitespace-nowrap">Top Indian Destinations</h3>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    {INDIAN_DESTINATIONS.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => navigate(`/create-trip?destination=${item.name}`)}
                        className="aspect-[3/4] rounded-[28px] overflow-hidden relative group cursor-pointer border border-white/10 shadow-xl"
                      >
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                          <span className="text-white font-bold text-lg uppercase leading-none block">{item.name}</span>
                          <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1 block">{item.city}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* My Trips */}
                <section>
                  <div className="flex items-center gap-6 mb-8">
                    <h3 className="text-white font-bold text-xl uppercase tracking-tight whitespace-nowrap">My Trips</h3>
                    <div className="h-px bg-white/10 flex-1" />
                    <button onClick={() => navigate('/create-trip')} className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-bold transition-colors whitespace-nowrap">
                      <Plus size={16} /> New Trip
                    </button>
                  </div>

                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {[1,2,3].map(i => <div key={i} className="aspect-[3/4] rounded-[28px] bg-white/5 animate-pulse border border-white/5" />)}
                    </div>
                  ) : filteredTrips.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {filteredTrips.map((trip, i) => (
                        <motion.div
                          key={trip.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.07 }}
                          whileHover={{ y: -6 }}
                          onClick={() => navigate(`/build-itinerary?tripId=${trip.id}`)}
                          className="aspect-[3/4] rounded-[28px] overflow-hidden relative group cursor-pointer border border-white/10 shadow-2xl"
                        >
                          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${TRIP_IMAGES[i % TRIP_IMAGES.length]})` }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h4 className="text-white font-bold text-xl tracking-tight mb-1">{trip.plan_name || trip.place}</h4>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-widest">{trip.place}</p>
                            {trip.start_date && <p className="text-white/40 text-xs mt-1">{new Date(trip.start_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</p>}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                        <Map className="text-white/30" size={36} />
                      </div>
                      <h3 className="text-white/60 font-bold text-xl mb-2">No trips yet</h3>
                      <p className="text-white/30 text-sm mb-8">Start planning your first Indian adventure!</p>
                      <button onClick={() => navigate('/create-trip')} className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                        Plan First Trip
                      </button>
                    </div>
                  )}
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/create-trip')}
        className="fixed bottom-10 right-10 bg-white text-black px-7 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 z-50 text-sm uppercase tracking-wider"
      >
        <Plus size={18} /> Plan a Trip
      </motion.button>
    </MainLayout>
  );
}
