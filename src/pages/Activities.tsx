import { motion } from 'framer-motion';
import { Search, MapPin, Star, Filter, ArrowRight, IndianRupee } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function Activities() {
  const activities = [
    { title: 'Taj Mahal Sunrise Tour', location: 'Agra, UP', rating: 4.9, price: '₹1,500', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop' },
    { title: 'Alleppey Houseboat Stay', location: 'Kerala', rating: 5.0, price: '₹8,500', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop' },
    { title: 'Amer Fort Elephant Ride', location: 'Jaipur, Rajasthan', rating: 4.7, price: '₹2,200', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop' },
    { title: 'Ganga Aarti Experience', location: 'Varanasi, UP', rating: 4.8, price: 'Free', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop' },
    { title: 'Goa Scuba Diving', location: 'South Goa', rating: 4.6, price: '₹3,500', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop' },
    { title: 'Ladakh Monastery Tour', location: 'Leh, Ladakh', rating: 4.9, price: '₹1,200', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">City Guide</h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Find local activities & experiences in India</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Search activities..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm font-bold focus:outline-none focus:border-white/30 transition-all"
              />
            </div>
            <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:text-white transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 border border-white/5 rounded-[40px] p-8 flex flex-col sm:flex-row gap-8 hover:bg-white/[0.08] transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="w-full sm:w-40 h-40 rounded-[32px] overflow-hidden shrink-0">
                <img src={activity.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
              </div>
              
              <div className="flex flex-col justify-between py-2 flex-1">
                <div>
                  <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
                    <MapPin size={12} /> {activity.location}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-white transition-colors">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-1 text-white/60 text-xs font-bold">
                    <Star size={14} className="text-white" /> {activity.rating}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 sm:mt-0">
                  <span className="text-xl font-black text-white tracking-tighter">
                    {activity.price === 'Free' ? 'Free' : activity.price}
                  </span>
                  <div className="p-3 bg-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
