import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Calendar, Users, IndianRupee, Type, ArrowRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api';
import toast from 'react-hot-toast';

const INDIAN_SUGGESTIONS = [
  { id: 1, name: 'Taj Mahal, Agra', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Kerala Backwaters', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Jaipur City Palace', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Goa Beaches', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop' },
];

const inputCls = "w-full bg-transparent border-b border-white/10 py-3 pl-8 text-white font-medium focus:outline-none focus:border-white/50 transition-all placeholder:text-white/20 text-sm appearance-none";
const iconCls = "absolute left-0 top-3 text-white/30 group-focus-within:text-white/60 transition-colors";

export default function CreateTrip() {
  const { register, handleSubmit, formState: { isSubmitting }, setValue } = useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const preDestination = searchParams.get('destination');
  if (preDestination) setTimeout(() => setValue('place', preDestination), 0);

  const blockInvalidChar = (e: any) => {
    if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/trips', {
        planName: data.planName || data.place,
        place: data.place,
        description: data.description || '',
        startDate: data.startDate,
        endDate: data.endDate,
        guests: parseInt(data.guests) || 1,
        budget: parseFloat(data.budget) || 0,
      });
      toast.success('Trip created successfully! 🎉');
      navigate(`/build-itinerary?tripId=${res.id}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to create trip');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-6 px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-md rounded-[40px] border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
            {/* Form */}
            <div className="lg:col-span-3 p-10 lg:p-14 border-r border-white/10">
              <div className="mb-10">
                <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">Plan Guide</h1>
                <p className="text-white/30 font-bold uppercase tracking-[0.3em] text-[10px]">Enter your journey details</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                <div className="relative group">
                  <Type size={16} className={iconCls} />
                  <input {...register('planName')} placeholder="Trip Name (optional)" className={inputCls} />
                </div>

                <div className="relative group">
                  <MapPin size={16} className={iconCls} />
                  <input {...register('place', { required: 'Place is required' })} placeholder="Destination (e.g. Goa, Ladakh, Kerala)" className={inputCls} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group">
                    <Calendar size={16} className={iconCls} />
                    <input {...register('startDate')} type="date" className={inputCls} />
                  </div>
                  <div className="relative group">
                    <Calendar size={16} className={iconCls} />
                    <input {...register('endDate')} type="date" className={inputCls} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group">
                    <Users size={16} className={iconCls} />
                    <input {...register('guests')} type="number" min="1" onKeyDown={blockInvalidChar} placeholder="Travellers (Numbers Only)" className={inputCls} />
                  </div>
                  <div className="relative group">
                    <IndianRupee size={16} className={iconCls} />
                    <input {...register('budget')} type="number" onKeyDown={blockInvalidChar} placeholder="Total Budget (Numbers Only)" className={inputCls} />
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-5 rounded-[20px] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white/90 transition-all shadow-xl disabled:opacity-60"
                  >
                    {isSubmitting ? 'Creating...' : <><span>Build Itinerary</span><ArrowRight size={18} /></>}
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Suggestions */}
            <div className="lg:col-span-2 p-10 lg:p-14 flex flex-col bg-white/[0.02]">
              <div className="mb-8">
                <h3 className="font-bold text-white text-xl uppercase tracking-tight mb-1">Suggestions</h3>
                <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px]">Trending in India</p>
              </div>

              <div className="flex flex-col gap-5 flex-1">
                {INDIAN_SUGGESTIONS.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    onClick={() => setValue('place', item.name)}
                    className="h-28 rounded-[20px] overflow-hidden relative group cursor-pointer border border-white/10 shadow-lg"
                  >
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center px-6">
                      <span className="text-white font-bold text-base uppercase tracking-tight">{item.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
