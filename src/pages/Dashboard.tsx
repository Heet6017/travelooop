import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Map, Search, Layers, Filter, ListFilter } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useState } from 'react';

const regionalSelections = [
  { id: 1, name: 'Amalfi Coast', image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Kyoto', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Santorini', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac542?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1531366936336-62fc674cb3ce?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop' },
];

interface ItinerarySection {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  budget: string;
}

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'home';

  const [sections, setSections] = useState<ItinerarySection[]>([
    {
      id: '1',
      title: 'Section 1',
      description: 'Describe your first travel step...',
      dateRange: 'Start date - End date',
      budget: 'Budget for this section'
    }
  ]);

  const addSection = () => {
    const newId = (sections.length + 1).toString();
    setSections([...sections, {
      id: newId,
      title: `Section ${newId}`,
      description: 'Describe your next travel step...',
      dateRange: 'Start date - End date',
      budget: 'Budget for this section'
    }]);
  };

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <MainLayout>
      <div className="flex-1 w-full flex flex-col items-center justify-start p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-7xl min-h-full bg-white rounded-[40px] shadow-premium overflow-hidden flex flex-col relative"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'home' ? (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12"
              >
                {/* Banner Area (Screen 3) */}
                <motion.div 
                  className="w-full h-[400px] rounded-[32px] overflow-hidden relative mb-12 shadow-xl group border border-black/5"
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[20s] group-hover:scale-110 grayscale-[20%]"></div>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h2 className="font-voyage text-8xl text-white tracking-wide uppercase drop-shadow-2xl mb-4">Discovery</h2>
                    <p className="text-white/80 font-black tracking-[0.4em] uppercase text-[10px]">Explore the world's finest destinations</p>
                  </div>
                </motion.div>

                {/* Search Bar (Screen 3) */}
                <div className="max-w-4xl mx-auto mb-16">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#A1A1AA] group-focus-within:text-black transition-colors" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search destinations..." 
                        className="w-full h-16 bg-[#F4F4F5] border border-black/5 rounded-2xl pl-16 pr-8 text-black placeholder-[#A1A1AA] focus:outline-none focus:ring-4 focus:ring-black/5 transition-all font-bold text-sm shadow-sm"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setActiveFilter(activeFilter === 'group' ? null : 'group')}
                        className={`flex items-center gap-2 h-16 px-8 border rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${activeFilter === 'group' ? 'bg-black text-white border-black' : 'bg-white text-black border-black/5 hover:bg-[#F4F4F5]'}`}
                      >
                        <Layers size={16} /> Group
                      </button>
                      <button 
                        onClick={() => setActiveFilter(activeFilter === 'filter' ? null : 'filter')}
                        className={`flex items-center gap-2 h-16 px-8 border rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${activeFilter === 'filter' ? 'bg-black text-white border-black' : 'bg-white text-black border-black/5 hover:bg-[#F4F4F5]'}`}
                      >
                        <Filter size={16} /> Filter
                      </button>
                    </div>
                  </div>
                </div>

                {/* Destinations Grid (Screen 3) */}
                <section className="mb-20">
                  <div className="flex items-center gap-8 mb-10">
                    <h3 className="font-black text-2xl text-black uppercase tracking-tight">Top Regional Selections</h3>
                    <div className="h-px bg-black/5 flex-1"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {regionalSelections.map((item) => (
                      <motion.div 
                        key={item.id} 
                        whileHover={{ y: -10 }}
                        className="aspect-[3/4] rounded-[32px] overflow-hidden relative group cursor-pointer shadow-xl border border-black/5"
                      >
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale-[10%]" style={{ backgroundImage: `url(${item.image})` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className="absolute bottom-8 left-8 right-8">
                          <span className="text-white font-black tracking-tight text-xl uppercase leading-none">{item.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Action Buttons (Quick Links) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto border-t border-black/5 pt-16">
                  <div 
                    onClick={() => window.location.href = '/create-trip'}
                    className="p-10 bg-[#F4F4F5] rounded-[32px] cursor-pointer hover:bg-black hover:text-white transition-all group"
                  >
                    <Plus size={32} className="mb-6" />
                    <h4 className="font-black text-2xl uppercase tracking-tighter mb-2">Create New Trip</h4>
                    <p className="text-[#71717A] group-hover:text-white/60 text-sm font-medium">Start planning a fresh itinerary.</p>
                  </div>
                  <div 
                    onClick={() => window.location.href = '/dashboard?tab=itinerary'}
                    className="p-10 bg-[#F4F4F5] rounded-[32px] cursor-pointer hover:bg-black hover:text-white transition-all group"
                  >
                    <Map size={32} className="mb-6" />
                    <h4 className="font-black text-2xl uppercase tracking-tighter mb-2">View Itinerary</h4>
                    <p className="text-[#71717A] group-hover:text-white/60 text-sm font-medium">Check your saved travel plans.</p>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'plan' ? (
              <motion.div
                key="plan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 overflow-y-auto custom-scrollbar flex-1"
              >
                <div className="mb-12 text-center">
                  <h2 className="font-voyage text-7xl text-black uppercase tracking-wider mb-2">Itinerary Builder</h2>
                  <p className="text-[#A1A1AA] font-black uppercase tracking-widest text-[10px]">Your journey, step by step</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8 pb-12">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      layout
                      className="bg-[#FBFBFB] border border-black/5 rounded-[40px] p-12 shadow-sm relative overflow-hidden group hover:border-black/10 transition-all"
                    >
                      <div className="flex items-center gap-6 mb-10">
                        <span className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-xs font-black text-black shadow-sm">
                          {index + 1}
                        </span>
                        <h3 className="text-black font-black text-2xl uppercase tracking-tight">
                          {section.title}
                        </h3>
                      </div>
                      
                      <textarea 
                        className="w-full bg-transparent border-b border-black/5 pb-6 mb-10 text-black font-semibold text-lg placeholder:text-[#A1A1AA] focus:outline-none focus:border-black transition-colors resize-none h-24"
                        placeholder={section.description}
                      />

                      <div className="grid grid-cols-2 gap-12">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-[#A1A1AA] mb-4">Date Range</label>
                          <input className="w-full bg-transparent border-b border-black/5 pb-3 text-sm font-black text-black focus:outline-none focus:border-black transition-colors" placeholder={section.dateRange} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-[#A1A1AA] mb-4">Budget</label>
                          <input className="w-full bg-transparent border-b border-black/5 pb-3 text-sm font-black text-black focus:outline-none focus:border-black transition-colors" placeholder={section.budget} />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <button 
                    onClick={addSection}
                    className="w-full border-2 border-dashed border-black/5 rounded-[40px] py-16 flex flex-col items-center justify-center gap-4 text-[#71717A] hover:text-black hover:bg-[#F4F4F5] transition-all group"
                  >
                    <div className="w-16 h-16 rounded-full bg-white border border-black/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Plus size={32} />
                    </div>
                    <span className="font-black uppercase tracking-[0.3em] text-[10px]">Add Section to Journey</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-32 h-32 rounded-full bg-[#F4F4F5] flex items-center justify-center mb-8 border border-black/5 shadow-inner">
                  <Map className="text-[#A1A1AA]" size={48} />
                </div>
                <h3 className="font-black text-4xl uppercase tracking-tighter mb-4">No Plans Yet</h3>
                <p className="text-[#71717A] font-bold text-sm max-w-sm mx-auto mb-12 uppercase tracking-widest leading-loose">
                  Your itinerary is empty. Start mapping your dream trip today.
                </p>
                <button 
                  onClick={() => window.location.href = '/dashboard?tab=plan'}
                  className="bg-black text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 hover:shadow-2xl transition-all"
                >
                  Create First Itinerary
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </MainLayout>
  );
}
