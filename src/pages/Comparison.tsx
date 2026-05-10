import { motion } from 'framer-motion';
import { Columns, ArrowRight, Star } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function Comparison() {
  const options = [
    { name: 'Amalfi Dream', cost: '$4,200', days: 10, activities: 12, image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800&auto=format&fit=crop' },
    { name: 'Kyoto Zen', cost: '$3,800', days: 8, activities: 15, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="mb-16">
          <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">Comparison</h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Side-by-side trip analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {options.map((option, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-[48px] overflow-hidden"
            >
              <div className="h-64 relative">
                <img src={option.image} className="w-full h-full object-cover grayscale opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h2 className="font-voyage text-4xl text-white uppercase tracking-wider">{option.name}</h2>
                </div>
              </div>

              <div className="p-10 space-y-8">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Est. Cost</span>
                  <span className="text-xl font-black text-white">{option.cost}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Duration</span>
                  <span className="text-xl font-black text-white">{option.days} Days</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Activities</span>
                  <span className="text-xl font-black text-white">{option.activities} Planned</span>
                </div>
                
                <div className="pt-4">
                  <button className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                    Select this Plan <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
