import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Calendar, Users, DollarSign, Type, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const suggestions = [
  { id: 1, name: 'Colosseum, Rome', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Grand Canal, Venice', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Duomo, Florence', image: 'https://images.unsplash.com/photo-1543627092-2287c7017637?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Positano, Amalfi', image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800&auto=format&fit=crop' },
];

export default function CreateTrip() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/dashboard?tab=plan');
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[48px] shadow-premium overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
            {/* Form Section */}
            <div className="lg:col-span-3 p-12 lg:p-16 border-r border-black/5">
              <div className="mb-12">
                <h1 className="font-voyage text-6xl text-[#050505] uppercase tracking-wider mb-2">Plan Guide</h1>
                <p className="text-[#A1A1AA] font-black uppercase tracking-[0.3em] text-[10px]">Enter your journey details</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <div className="relative group">
                    <Type size={18} className="absolute left-0 top-3 text-[#A1A1AA] group-focus-within:text-black transition-colors" />
                    <input 
                      {...register('planName')}
                      placeholder="Plan Name"
                      className="w-full bg-transparent border-b border-black/5 py-3 pl-8 text-lg font-bold text-black focus:outline-none focus:border-black transition-all placeholder:text-[#D4D4D8]"
                    />
                  </div>

                  <div className="relative group">
                    <FileText size={18} className="absolute left-0 top-3 text-[#A1A1AA] group-focus-within:text-black transition-colors" />
                    <textarea 
                      {...register('description')}
                      placeholder="Short description of your plan..."
                      className="w-full bg-transparent border-b border-black/5 py-3 pl-8 text-sm font-medium text-black focus:outline-none focus:border-black transition-all placeholder:text-[#D4D4D8] resize-none h-20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="relative group">
                      <Calendar size={18} className="absolute left-0 top-3 text-[#A1A1AA] group-focus-within:text-black transition-colors" />
                      <input 
                        {...register('startDate')}
                        type="text"
                        placeholder="Start Date"
                        className="w-full bg-transparent border-b border-black/5 py-3 pl-8 text-sm font-bold text-black focus:outline-none focus:border-black transition-all placeholder:text-[#D4D4D8]"
                      />
                    </div>
                    <div className="relative group">
                      <Calendar size={18} className="absolute left-0 top-3 text-[#A1A1AA] group-focus-within:text-black transition-colors" />
                      <input 
                        {...register('endDate')}
                        type="text"
                        placeholder="End Date"
                        className="w-full bg-transparent border-b border-black/5 py-3 pl-8 text-sm font-bold text-black focus:outline-none focus:border-black transition-all placeholder:text-[#D4D4D8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="relative group">
                      <Users size={18} className="absolute left-0 top-3 text-[#A1A1AA] group-focus-within:text-black transition-colors" />
                      <input 
                        {...register('guests')}
                        placeholder="Person"
                        className="w-full bg-transparent border-b border-black/5 py-3 pl-8 text-sm font-bold text-black focus:outline-none focus:border-black transition-all placeholder:text-[#D4D4D8]"
                      />
                    </div>
                    <div className="relative group">
                      <DollarSign size={18} className="absolute left-0 top-3 text-[#A1A1AA] group-focus-within:text-black transition-colors" />
                      <input 
                        {...register('budget')}
                        placeholder="Budget"
                        className="w-full bg-transparent border-b border-black/5 py-3 pl-8 text-sm font-bold text-black focus:outline-none focus:border-black transition-all placeholder:text-[#D4D4D8]"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <MapPin size={18} className="absolute left-0 top-3 text-[#A1A1AA] group-focus-within:text-black transition-colors" />
                    <input 
                      {...register('place')}
                      placeholder="Place"
                      className="w-full bg-transparent border-b border-black/5 py-3 pl-8 text-sm font-bold text-black focus:outline-none focus:border-black transition-all placeholder:text-[#D4D4D8]"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-6 rounded-[24px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:scale-[1.02] transition-transform shadow-2xl"
                  >
                    Build Itinerary <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>

            {/* Suggestions Section */}
            <div className="lg:col-span-2 p-12 lg:p-16 bg-[#FBFBFB] flex flex-col">
              <div className="mb-10">
                <h3 className="font-black text-xl text-[#050505] uppercase tracking-tight mb-2">Suggestions</h3>
                <p className="text-[#A1A1AA] font-bold uppercase tracking-[0.2em] text-[10px]">Trending destinations</p>
              </div>

              <div className="grid grid-cols-1 gap-6 flex-1">
                {suggestions.map((item) => (
                  <div key={item.id} className="h-32 rounded-[24px] overflow-hidden relative group cursor-pointer border border-black/5 shadow-sm">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale-[20%]" style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center px-8">
                      <span className="text-white font-black text-lg uppercase tracking-tight">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
