import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, ChevronRight, IndianRupee, ArrowLeft } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api';
import toast from 'react-hot-toast';

interface Section {
  id: string;
  title: string;
  description: string;
  date_range: string;
  budget: string;
}

export default function Timeline() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tripId = searchParams.get('tripId');
  const [trip, setTrip] = useState<any>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) {
      // If no tripId, we might want to show a list of trips or redirect
      // For now, let's just try to fetch the first trip if it exists or redirect to dashboard
      fetchFirstTrip();
      return;
    }
    fetchTripDetails(tripId);
  }, [tripId]);

  const fetchFirstTrip = async () => {
    try {
      const trips = await api.get('/trips');
      if (trips && trips.length > 0) {
        navigate(`/timeline?tripId=${trips[0].id}`, { replace: true });
      } else {
        toast.error('No trips found. Create one first!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Failed to load trips');
      navigate('/dashboard');
    }
  };

  const fetchTripDetails = async (id: string) => {
    setLoading(true);
    try {
      const data = await api.get(`/trips/${id}`);
      setTrip(data);
      setSections(data.sections || []);
    } catch (err) {
      toast.error('Failed to load trip details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const totalBudget = sections.reduce((sum, s) => {
    const val = parseFloat(s.budget.replace(/[^0-9.]/g, '')) || 0;
    return sum + val;
  }, 0);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-white/40 hover:text-white mb-6 transition-colors text-sm font-bold"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <h1 className="font-voyage text-5xl md:text-6xl text-white uppercase tracking-wider mb-2">Trip Timeline</h1>
            <p className="text-white/40 font-medium uppercase tracking-widest text-[10px]">
              {trip?.plan_name || trip?.place || 'Your daily journey breakdown'}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
              <IndianRupee size={14} /> Total Timeline Budget
            </div>
            <div className="text-3xl font-black text-white tracking-tighter">
              ₹{totalBudget.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {sections.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-[40px]">
            <Clock size={48} className="text-white/20 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">No Itinerary Found</h3>
            <p className="text-white/40 text-sm mb-8">You haven't built an itinerary for this trip yet.</p>
            <button 
              onClick={() => navigate(`/build-itinerary?tripId=${tripId}`)}
              className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Build Now
            </button>
          </div>
        ) : (
          <div className="relative border-l-2 border-white/5 ml-4 pl-12 space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[58px] top-0 w-4 h-4 rounded-full border-2 bg-black border-white/20 group-hover:border-white transition-colors"></div>
                
                <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <span className="text-8xl font-black text-white">{index + 1}</span>
                  </div>

                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors block mb-1">
                        Section {index + 1}
                      </span>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                        {section.title}
                      </h3>
                    </div>
                    {section.budget && (
                      <div className="bg-white/10 px-4 py-2 rounded-2xl text-white font-bold text-sm flex items-center gap-1">
                        <IndianRupee size={14} />
                        {parseFloat(section.budget.replace(/[^0-9.]/g, '')).toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-2xl">
                    {section.description || 'No description provided for this section.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    {section.date_range && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-white/60">
                        <Clock size={12} /> {section.date_range}
                      </div>
                    )}
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-white/60">
                      <MapPin size={12} /> {trip?.place}
                    </div>
                    <div className="flex-1"></div>
                    <button 
                      onClick={() => navigate(`/build-itinerary?tripId=${tripId}`)}
                      className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
                    >
                      Edit <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
