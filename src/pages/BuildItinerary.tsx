import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, IndianRupee, Trash2, Save, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api';
import toast from 'react-hot-toast';

interface Section {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  budget: string;
}

export default function BuildItinerary() {
  const [sections, setSections] = useState<Section[]>([]);
  const [trip, setTrip] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get('tripId');

  useEffect(() => {
    if (!tripId) { navigate('/dashboard'); return; }
    api.get(`/trips/${tripId}`).then(data => {
      setTrip(data);
      if (data.sections?.length) {
        setSections(data.sections.map((s: any) => ({ id: s.id, title: s.title, description: s.description || '', dateRange: s.date_range || '', budget: s.budget || '' })));
      } else {
        setSections([{ id: '1', title: 'Day 1 — Arrival', description: 'Check-in and explore the local area.', dateRange: '', budget: '' }]);
      }
    }).catch(() => {
      toast.error('Trip not found');
      navigate('/dashboard');
    });
  }, [tripId]);

  const update = (id: string, field: keyof Section, val: string) =>
    setSections(s => s.map(sec => sec.id === id ? { ...sec, [field]: val } : sec));

  const addSection = () => {
    const n = sections.length + 1;
    setSections(s => [...s, { id: Date.now().toString(), title: `Day ${n}`, description: '', dateRange: '', budget: '' }]);
  };

  const remove = (id: string) => { if (sections.length > 1) setSections(s => s.filter(sec => sec.id !== id)); };

  const save = async () => {
    setSaving(true);
    try {
      await api.post(`/trips/${tripId}/sections`, { sections });
      toast.success('Itinerary saved! ✅');
    } catch {
      toast.error('Failed to save itinerary');
    } finally {
      setSaving(false);
    }
  };

  const totalBudget = sections.reduce((sum, s) => sum + (parseFloat(s.budget) || 0), 0);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-white/40 hover:text-white mb-6 transition-colors text-sm font-bold">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h1 className="font-voyage text-5xl md:text-6xl text-white uppercase tracking-wider mb-1">Build Itinerary</h1>
          {trip && <p className="text-white/40 font-bold uppercase tracking-widest text-xs">{trip.plan_name || trip.place}</p>}
          {totalBudget > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
              <IndianRupee size={14} className="text-white/50" />
              <span className="text-white font-bold text-sm">Total Budget: ₹{totalBudget.toLocaleString('en-IN')}</span>
            </div>
          )}
        </motion.div>

        {/* Sections */}
        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {sections.map((sec, i) => (
              <motion.div
                key={sec.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -20 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="group bg-black/40 border border-white/10 rounded-[28px] p-8 hover:border-white/20 transition-all backdrop-blur-sm shadow-2xl"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="w-full mr-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 shrink-0 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-mono text-white">{String(i + 1).padStart(2, '0')}</span>
                      <input
                        value={sec.title}
                        onChange={e => update(sec.id, 'title', e.target.value)}
                        className="bg-transparent text-white font-bold text-xl focus:outline-none focus:border-b border-white/20 w-full"
                        placeholder="Section title"
                      />
                    </div>
                    <textarea
                      value={sec.description}
                      onChange={e => update(sec.id, 'description', e.target.value)}
                      className="bg-transparent text-white/50 text-sm leading-relaxed w-full resize-none focus:outline-none focus:bg-white/5 p-2 rounded transition-colors"
                      placeholder="Describe this day/section..."
                      rows={2}
                    />
                  </div>
                  {sections.length > 1 && (
                    <button onClick={() => remove(sec.id)} className="opacity-0 group-hover:opacity-100 p-2 text-white/30 hover:text-red-400 transition-all">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={14} />
                    <input
                      type="date"
                      value={sec.dateRange}
                      onChange={e => update(sec.id, 'dateRange', e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all appearance-none"
                    />
                  </div>
                  <div className="relative group">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={14} />
                    <input
                      type="number"
                      value={sec.budget}
                      onChange={e => update(sec.id, 'budget', e.target.value)}
                      placeholder="Budget (₹)"
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={addSection}
            className="border-2 border-dashed border-white/15 rounded-[28px] py-8 flex flex-col items-center justify-center gap-3 text-white/30 hover:text-white/70 hover:border-white/30 hover:bg-white/5 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Plus size={22} />
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">Add Section</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={save}
            disabled={saving}
            className="bg-white text-black rounded-[28px] py-8 flex flex-col items-center justify-center gap-3 transition-all hover:bg-white/90 shadow-2xl disabled:opacity-70"
          >
            <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center">
              {saving ? <Save size={22} className="animate-spin" /> : <CheckCircle size={22} />}
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">{saving ? 'Saving...' : 'Save Itinerary'}</span>
          </motion.button>
        </div>
      </div>
    </MainLayout>
  );
}
