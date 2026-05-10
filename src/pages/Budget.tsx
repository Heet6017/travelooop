import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, PieChart, TrendingUp, Plus, X, Tag, Trash2, Calendar, FileText, MapPin } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api';
import toast from 'react-hot-toast';

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  title?: string;
  trip_id?: string;
  trip_place?: string;
  trip_name?: string;
}

const CATEGORIES = [
  { name: 'Flights', color: 'bg-orange-400' },
  { name: 'Hotel', color: 'bg-blue-400' },
  { name: 'Dining', color: 'bg-green-400' },
  { name: 'Transport', color: 'bg-purple-400' },
  { name: 'Activities', color: 'bg-yellow-400' },
  { name: 'Shopping', color: 'bg-pink-400' },
];

const BUDGET_LIMIT = 50000;

export default function Budget() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newExpense, setNewExpense] = useState({ 
    category: 'Dining', 
    amount: '', 
    title: '', 
    tripId: '', 
    date: new Date().toISOString().split('T')[0] 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    fetchData(); 
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expenseData, tripData] = await Promise.all([
        api.get('/expenses'),
        api.get('/trips')
      ]);
      setExpenses(expenseData);
      setTrips(tripData);
    } catch (err: any) {
      const saved = localStorage.getItem('traveloop_expenses');
      if (saved) setExpenses(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  };

  const blockInvalidChar = (e: any) => {
    if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
  };

  const addExpense = async () => {
    if (!newExpense.amount) { toast.error('Enter an amount'); return; }
    try {
      const res = await api.post('/expenses', { 
        category: newExpense.category, 
        amount: parseFloat(newExpense.amount),
        title: newExpense.title,
        tripId: newExpense.tripId,
        date: new Date(newExpense.date).toISOString()
      });
      
      const trip = trips.find(t => t.id === newExpense.tripId);
      const expenseWithTrip = {
        ...res,
        trip_place: trip?.place,
        trip_name: trip?.plan_name
      };
      
      setExpenses(prev => [expenseWithTrip, ...prev]);
      toast.success(`₹${parseFloat(newExpense.amount).toLocaleString('en-IN')} added!`);
      setIsAdding(false);
      setNewExpense({ 
        category: 'Dining', 
        amount: '', 
        title: '', 
        tripId: '', 
        date: new Date().toISOString().split('T')[0] 
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to save expense');
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(prev => prev.filter(e => e.id !== id));
      toast.success('Expense removed');
    } catch {
      toast.error('Failed to remove expense');
    }
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = BUDGET_LIMIT - totalSpent;
  const spentPct = Math.min(100, (totalSpent / BUDGET_LIMIT) * 100);

  const byCategory = CATEGORIES.map(cat => ({
    ...cat,
    total: expenses.filter(e => e.category === cat.name).reduce((s, e) => s + e.amount, 0),
  })).filter(c => c.total > 0);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div>
            <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">Budgeting</h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Real-time spending intelligence</p>
          </div>
          
          <button 
            onClick={() => setIsAdding(!isAdding)} 
            className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl"
          >
            {isAdding ? <X size={16} /> : <Plus size={16} />} 
            {isAdding ? 'Cancel' : 'Add New Expense'}
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Budget', value: `₹${BUDGET_LIMIT.toLocaleString('en-IN')}`, icon: <Tag size={14} />, cls: 'bg-white/5 border-white/10' },
            { label: 'Spent So Far', value: `₹${totalSpent.toLocaleString('en-IN')}`, icon: <PieChart size={14} />, cls: 'bg-white/5 border-white/10' },
            { label: 'Remaining', value: `₹${remaining.toLocaleString('en-IN')}`, icon: <TrendingUp size={14} />, cls: remaining < 0 ? 'bg-red-500/20 border-red-500/30 text-red-100' : 'bg-white text-black' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`p-8 border rounded-[32px] ${stat.cls}`}>
              <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-4 ${stat.cls.includes('text-black') ? 'text-black/40' : 'text-white/40'}`}>
                {stat.icon}{stat.label}
              </div>
              <div className={`text-4xl font-black tracking-tighter ${stat.cls.includes('text-black') ? 'text-black' : 'text-white'}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="mb-10 p-10 bg-white/5 border border-white/20 rounded-[40px] backdrop-blur-xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-2"><FileText size={12}/> Description</label>
                  <input type="text" value={newExpense.title} onChange={e => setNewExpense({ ...newExpense, title: e.target.value })}
                    placeholder="E.g. Dinner at Taj" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-white/40" />
                </div>
                
                <div className="space-y-3 group">
                  <label className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-2"><IndianRupee size={12}/> Amount (Numbers Only)</label>
                  <input type="number" value={newExpense.amount} onKeyDown={blockInvalidChar} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-white/40" />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-2"><Tag size={12}/> Category</label>
                  <select value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-white/40 appearance-none">
                    {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-2"><MapPin size={12}/> Link to Trip</label>
                  <select value={newExpense.tripId} onChange={e => setNewExpense({ ...newExpense, tripId: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-white/40 appearance-none">
                    <option value="">Personal / No Trip</option>
                    {trips.map(t => <option key={t.id} value={t.id}>{t.plan_name || t.place}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-white/30 tracking-widest flex items-center gap-2"><Calendar size={12}/> Date</label>
                  <input type="date" value={newExpense.date} onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-white/40 appearance-none" />
                </div>

                <button onClick={addExpense} className="h-[60px] bg-white text-black rounded-2xl font-black uppercase text-[12px] tracking-widest hover:scale-105 transition-transform shadow-2xl">
                  Add Record
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-black text-2xl text-white uppercase tracking-tight">Financial Timeline</h3>
            
            {loading ? (
              <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 rounded-[32px] bg-white/5 animate-pulse" />)}</div>
            ) : expenses.length === 0 ? (
              <div className="text-center py-20 bg-white/5 border border-white/10 rounded-[40px]">
                <p className="text-white/20 font-black uppercase tracking-widest text-[10px]">Zero expenses recorded</p>
              </div>
            ) : (
              <div className="space-y-4">
                {expenses.map(expense => {
                  const cat = CATEGORIES.find(c => c.name === expense.category) || CATEGORIES[0];
                  return (
                    <motion.div key={expense.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      className="p-6 bg-white/5 border border-white/5 rounded-[32px] flex items-center justify-between group hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center shrink-0 shadow-lg`}>
                          <IndianRupee size={20} className="text-black/70" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-white font-bold uppercase tracking-tight">{expense.title || expense.category}</h4>
                            {expense.trip_name && (
                              <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-white/10 rounded text-white/40 border border-white/10">
                                {expense.trip_name}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-white/30 text-[9px] font-black uppercase tracking-widest">
                            <span>{new Date(expense.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                            <span className="text-white/60">{expense.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-2xl font-black text-white tracking-tighter">₹{expense.amount.toLocaleString('en-IN')}</span>
                        <button onClick={() => deleteExpense(expense.id)} className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-400 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col items-center text-center backdrop-blur-md">
              <div className="relative w-48 h-48 mb-8">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="12" className="text-white/5" />
                  <motion.circle
                    cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="12"
                    strokeDasharray="276"
                    initial={{ strokeDashoffset: 276 }}
                    animate={{ strokeDashoffset: 276 - (276 * spentPct / 100) }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className={spentPct > 90 ? 'text-red-400' : spentPct > 60 ? 'text-yellow-400' : 'text-green-400'}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">{Math.round(spentPct)}%</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Utilization</span>
                </div>
              </div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Budget Utilization</h4>
              <p className="text-white/40 text-[11px] leading-relaxed max-w-[200px]">
                {spentPct > 90 ? 'Critical alert: You have almost exhausted your primary budget for the season.' : spentPct > 50 ? 'Warning: Spending velocity is higher than average.' : 'Stability: Your current spending is well within parameters.'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-md">
              <h4 className="text-white/30 font-black uppercase tracking-widest text-[10px] mb-8">Asset Allocation</h4>
              <div className="space-y-6">
                {byCategory.map(cat => (
                  <div key={cat.name}>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                        <span className="text-white font-black uppercase tracking-tight text-[11px]">{cat.name}</span>
                      </div>
                      <span className="text-white/60 font-black text-[11px]">₹{cat.total.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.total / totalSpent) * 100}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full ${cat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
