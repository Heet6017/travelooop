import { motion } from 'framer-motion';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function Timeline() {
  const days = [
    { day: 1, title: 'Arrival in Paris', overview: 'Check-in at hotel and evening walk by the Seine.', status: 'completed' },
    { day: 2, title: 'Louvre & Art', overview: 'Morning museum tour followed by lunch at a local cafe.', status: 'current' },
    { day: 3, title: 'Eiffel Tower', overview: 'Climb the tower and picnic at Champ de Mars.', status: 'upcoming' },
    { day: 4, title: 'Versailles Trip', overview: 'Day trip to the Palace of Versailles.', status: 'upcoming' },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="mb-12">
          <h1 className="font-voyage text-5xl text-white uppercase tracking-wider mb-2">Trip Timeline</h1>
          <p className="text-white/40 font-medium uppercase tracking-widest text-[10px]">Your daily journey breakdown</p>
        </div>

        <div className="relative border-l-2 border-white/5 ml-4 pl-12 space-y-12">
          {days.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className={`absolute -left-[58px] top-0 w-4 h-4 rounded-full border-2 ${day.status === 'current' ? 'bg-white border-white shadow-[0_0_15px_white]' : 'bg-black border-white/20'}`}></div>
              
              <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 hover:bg-white/[0.08] transition-all group cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                    Day {day.day}
                  </span>
                  <div className="flex items-center gap-2 text-white/20 group-hover:text-white transition-colors">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold">09:00 AM</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {day.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {day.overview}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold text-white/60">
                    <MapPin size={12} /> Hotel Lutetia
                  </div>
                  <div className="flex-1"></div>
                  <ChevronRight size={20} className="text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
