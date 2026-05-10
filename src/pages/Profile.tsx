import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Map, History, Settings, Globe, Award } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { getUser, api } from '../api';

export default function Profile() {
  const user = getUser();
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    api.get('/trips').then(setTrips).catch(() => {});
  }, []);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
          <div className="relative group">
            <div className="w-48 h-48 rounded-[48px] bg-white/5 border border-white/10 overflow-hidden relative shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                alt="Profile"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <button className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-premium hover:scale-110 transition-transform">
              <Camera size={20} className="text-black" />
            </button>
          </div>

          <div className="flex-1 pt-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">
                  {user?.name || 'Explorer'}
                </h1>
                <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Indian Domestic Voyager</p>
              </div>
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:text-white transition-colors">
                <Settings size={20} />
              </button>
            </div>
            
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8 font-medium">
              Passionate about discovering the rich heritage and diverse landscapes of India. From the snowy peaks of Ladakh to the tranquil backwaters of Kerala.
            </p>

            <div className="flex flex-wrap gap-8 md:gap-12 border-t border-white/5 pt-8">
              <div>
                <span className="block text-3xl font-black text-white tracking-tighter">{trips.length}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Planned Trips</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-white tracking-tighter">India</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Primary Region</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-white tracking-tighter">Gold</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Explorer Level</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-black text-xl text-white uppercase tracking-tight flex items-center gap-3">
                <Map size={20} className="text-white/40" /> My Current Itineraries
              </h3>
              <div className="h-px bg-white/5 flex-1"></div>
            </div>
            <div className="space-y-4">
              {trips.length > 0 ? trips.slice(0, 3).map((trip) => (
                <div key={trip.id} className="p-6 bg-white/5 border border-white/5 rounded-[24px] flex items-center gap-6 group cursor-pointer hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Globe size={24} className="text-white/20" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-tight">{trip.plan_name || trip.place}</h4>
                    <p className="text-white/30 text-xs font-bold tracking-widest uppercase mt-1">
                      {trip.place} {trip.start_date ? `• ${new Date(trip.start_date).toLocaleDateString()}` : ''}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-white/20 font-bold uppercase tracking-widest text-[10px] py-12 text-center border-2 border-dashed border-white/5 rounded-[32px]">
                  No trips planned yet
                </p>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-black text-xl text-white uppercase tracking-tight flex items-center gap-3">
                <Award size={20} className="text-white/40" /> Achievement Badges
              </h3>
              <div className="h-px bg-white/5 flex-1"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Mountain Goat', desc: 'Visited Leh-Ladakh' },
                { title: 'Beach Bum', desc: 'Explored Goa' },
                { title: 'History Buff', desc: 'Rajasthan Forts' },
                { title: 'Temple Run', desc: 'Varanasi Ghats' },
              ].map((badge, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[24px] flex flex-col items-center text-center group hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award size={20} className="text-white" />
                  </div>
                  <h4 className="text-white font-bold uppercase tracking-tight text-xs mb-1">{badge.title}</h4>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{badge.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
