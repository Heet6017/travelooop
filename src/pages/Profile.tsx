import { motion } from 'framer-motion';
import { Camera, Map, History, Settings } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function Profile() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
          <div className="relative group">
            <div className="w-48 h-48 rounded-[48px] bg-white/5 border border-white/10 overflow-hidden relative shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop" 
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
                <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">John Doe</h1>
                <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Explorer & Visionary</p>
              </div>
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:text-white transition-colors">
                <Settings size={20} />
              </button>
            </div>
            
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8 font-medium">
              Passionate about discovering hidden gems across Europe and Asia. I love documenting journeys and finding the most authentic local experiences.
            </p>

            <div className="flex gap-12 border-t border-white/5 pt-8">
              <div>
                <span className="block text-3xl font-black text-white tracking-tighter">12</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Total Trips</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-white tracking-tighter">48</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Destinations</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-white tracking-tighter">150+</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Photos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-black text-xl text-white uppercase tracking-tight flex items-center gap-3">
                <Map size={20} className="text-white/40" /> Upcoming Trips
              </h3>
              <div className="h-px bg-white/5 flex-1"></div>
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[24px] flex items-center gap-6 group cursor-pointer hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=200&auto=format&fit=crop`} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-tight">Swiss Alps Expedition</h4>
                    <p className="text-white/30 text-xs font-bold tracking-widest uppercase mt-1">Dec 2025 • 8 Days</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-black text-xl text-white uppercase tracking-tight flex items-center gap-3">
                <History size={20} className="text-white/40" /> Previous Trips
              </h3>
              <div className="h-px bg-white/5 flex-1"></div>
            </div>
            <div className="space-y-4">
              {[3, 4].map((i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[24px] flex items-center gap-6 group cursor-pointer hover:bg-white/10 transition-all opacity-60 hover:opacity-100">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=200&auto=format&fit=crop`} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-tight">Tokyo Midnight</h4>
                    <p className="text-white/30 text-xs font-bold tracking-widest uppercase mt-1">May 2024 • 12 Days</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
