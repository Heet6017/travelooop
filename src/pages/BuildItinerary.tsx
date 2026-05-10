import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, DollarSign, Trash2 } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

interface ItinerarySection {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  budget: string;
}

export default function BuildItinerary() {
  const [sections, setSections] = useState<ItinerarySection[]>([
    {
      id: '1',
      title: 'Section 1',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity.',
      dateRange: 'xxx to yyy',
      budget: 'Budget of this section'
    },
    {
      id: '2',
      title: 'Section 2',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity.',
      dateRange: 'xxx to yyy',
      budget: 'Budget of this section'
    },
    {
      id: '3',
      title: 'Section 3',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity.',
      dateRange: 'xxx to yyy',
      budget: 'Budget of this section'
    }
  ]);

  const addSection = () => {
    const newId = (sections.length + 1).toString();
    setSections([...sections, {
      id: newId,
      title: `Section ${newId}`,
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity.',
      dateRange: 'xxx to yyy',
      budget: 'Budget of this section'
    }]);
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-voyage text-5xl text-white uppercase tracking-wider mb-2">Build Itinerary</h1>
          <p className="text-white/40 font-medium uppercase tracking-widest text-xs">Customize your travel sequence</p>
        </motion.div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="group relative bg-black/40 border border-white/10 rounded-[24px] p-8 hover:border-white/20 transition-all duration-500 shadow-2xl backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono">
                        0{index + 1}
                      </span>
                      {section.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                      {section.description}
                    </p>
                  </div>
                  {sections.length > 1 && (
                    <button 
                      onClick={() => removeSection(section.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-white/30 hover:text-red-400 transition-all duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-white/60 transition-colors">
                      <Calendar size={16} />
                    </div>
                    <input 
                      type="text" 
                      placeholder={section.dateRange}
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm font-medium focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all placeholder:text-white/20"
                    />
                    <div className="absolute top-0 left-0 w-full h-full rounded-xl border border-white/0 group-hover/input:border-white/5 pointer-events-none transition-all"></div>
                  </div>

                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-white/60 transition-colors">
                      <DollarSign size={16} />
                    </div>
                    <input 
                      type="text" 
                      placeholder={section.budget}
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm font-medium focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all placeholder:text-white/20"
                    />
                    <div className="absolute top-0 left-0 w-full h-full rounded-xl border border-white/0 group-hover/input:border-white/5 pointer-events-none transition-all"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          whileTap={{ scale: 0.98 }}
          onClick={addSection}
          className="w-full mt-10 border-2 border-dashed border-white/10 rounded-[24px] py-8 flex flex-col items-center justify-center gap-3 text-white/30 hover:text-white/60 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <Plus size={24} />
          </div>
          <span className="font-bold uppercase tracking-widest text-xs">Add another Section</span>
        </motion.button>
      </div>
    </MainLayout>
  );
}
