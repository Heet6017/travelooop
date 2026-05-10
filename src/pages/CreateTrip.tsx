import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';

const suggestions = [
  { id: 1, name: 'Explore the Colosseum', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Venice Canal Tour', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Florence Museums', image: 'https://images.unsplash.com/photo-1543627092-2287c7017637?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Amalfi Coast Drive', image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Tuscany Wine Tasting', image: 'https://images.unsplash.com/photo-1502758713083-d92ea407c813?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'Milan Fashion Tour', image: 'https://images.unsplash.com/photo-1506161176507-6bb2012bd604?q=80&w=800&auto=format&fit=crop' },
];

export default function CreateTrip() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto pb-24">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-sans font-bold text-3xl text-[#050505] whitespace-nowrap tracking-tight">Plan a new trip</h2>
            <div className="h-px bg-black/10 w-full"></div>
          </div>

          {/* Form */}
          <div className="bg-[#F4F4F5] p-10 rounded-[20px] shadow-sm mb-12 border border-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl relative z-10">
              <InputField
                icon={<MapPin size={20} />}
                placeholder="Select a Place"
                {...register('place')}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  type="date"
                  icon={<Calendar size={20} />}
                  placeholder="Start Date"
                  {...register('startDate')}
                />
                <InputField
                  type="date"
                  icon={<Calendar size={20} />}
                  placeholder="End Date"
                  {...register('endDate')}
                />
              </div>
              <InputField
                type="number"
                icon={<Users size={20} />}
                placeholder="Number of Guests"
                {...register('guests')}
              />
              
              <div className="pt-4 flex gap-4">
                <AuthButton type="submit" className="flex-1">
                  <span className="flex items-center justify-center gap-2">
                    Create Itinerary <ArrowRight size={18} />
                  </span>
                </AuthButton>
                <Link to="/dashboard" className="flex-1">
                  <button type="button" className="w-full h-[56px] border border-black/10 text-[#050505] font-bold rounded-lg hover:bg-black/5 transition-colors">
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-sans font-bold text-xl text-[#050505] whitespace-nowrap">Suggestions for Places to Visit</h3>
            <div className="h-px bg-black/10 w-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {suggestions.map((item) => (
              <div key={item.id} className="aspect-square rounded-[16px] overflow-hidden relative group cursor-pointer shadow-sm border border-black/5">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale-[20%]" style={{ backgroundImage: `url(${item.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-white font-bold text-lg leading-tight drop-shadow-md">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </MainLayout>
  );
}
