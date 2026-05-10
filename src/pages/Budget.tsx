import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, PieChart, TrendingUp, Plus, X, Tag } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  color: string;
}

const CATEGORIES = [
  { name: 'Flights', color: 'bg-white' },
  { name: 'Hotel', color: 'bg-white/60' },
  { name: 'Dining', color: 'bg-white/30' },
  { name: 'Transport', color: 'bg-white/10' },
];

export default function Budget() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: 'Dining', amount: '' });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('traveloop_expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    } else {
      // Default data
      const defaults = [
        { id: '1', category: 'Flights', amount: 1200, date: 'Oct 12', color: 'bg-white' },
        { id: '2', category: 'Hotel', amount: 850, date: 'Oct 15', color: 'bg-white/60' },
      ];
      setExpenses(defaults);
      localStorage.setItem('traveloop_expenses', JSON.stringify(defaults));
    }
  }, []);

  const addExpense = () => {
    if (!newExpense.amount) return;
    
    const cat = CATEGORIES.find(c => c.name === newExpense.category) || CATEGORIES[0];
    const item: Expense = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      color: cat.color
    };

    const updated = [item, ...expenses];
    setExpenses(updated);
    localStorage.setItem('traveloop_expenses', JSON.stringify(updated));
    setIsAdding(false);
    setNewExpense({ category: 'Dining', amount: '' });
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetLimit = 5000;
  const remaining = budgetLimit - totalSpent;
  const spentPercentage = Math.min(100, (totalSpent / budgetLimit) * 100);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="mb-16">
          <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">Budgeting</h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Track your expenses & manage spending</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-8 bg-white/5 border border-white/10 rounded-[32px]">
            <div className="flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">
              <Tag size={14} /> Total Budget
            </div>
            <div className="text-5xl font-black text-white tracking-tighter">${budgetLimit.toLocaleString()}</div>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-[32px]">
            <div className="flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">
              <PieChart size={14} /> Spent So Far
            </div>
            <div className="text-5xl font-black text-white tracking-tighter">${totalSpent.toLocaleString()}</div>
          </div>
          <div className="p-8 bg-white text-black rounded-[32px]">
            <div className="flex items-center gap-3 text-black/40 text-[10px] font-black uppercase tracking-widest mb-4">
              <TrendingUp size={14} /> Remaining
            </div>
            <div className="text-5xl font-black tracking-tighter">${remaining.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-xl text-white uppercase tracking-tight">Recent Expenses</h3>
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
              >
                <Plus size={14} /> Add New
              </button>
            </div>

            <AnimatePresence>
              {isAdding && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 p-8 bg-white/5 border border-white/20 rounded-[32px] overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-4">
                      <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Category</label>
                      <select 
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-bold outline-none focus:border-white/40"
                      >
                        {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="flex-1 space-y-4">
                      <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Amount ($)</label>
                      <input 
                        type="number"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                        placeholder="0.00"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-bold outline-none focus:border-white/40"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={addExpense}
                        className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] hover:scale-105 transition-transform"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setIsAdding(false)}
                        className="p-3 text-white/40 hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {expenses.map((expense) => (
                <motion.div 
                  key={expense.id} 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-white/5 border border-white/5 rounded-[24px] flex items-center justify-between group hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl ${expense.color} flex items-center justify-center`}>
                      <DollarSign size={20} className={expense.color === 'bg-white' ? 'text-black' : 'text-white'} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-tight">{expense.category}</h4>
                      <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">{expense.date}</p>
                    </div>
                  </div>
                  <span className="text-xl font-black text-white tracking-tighter">${expense.amount.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col items-center justify-center text-center h-fit sticky top-10">
            <div className="relative w-48 h-48 mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-white/5" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" 
                  strokeDasharray="283" 
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * spentPercentage / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-white" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{Math.round(spentPercentage)}%</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Used</span>
              </div>
            </div>
            <h4 className="text-white font-bold uppercase tracking-tight mb-2">Budget Health</h4>
            <p className="text-white/40 text-xs leading-relaxed">
              {spentPercentage > 90 ? 'Danger! You are almost out of budget.' : spentPercentage > 50 ? 'Careful, you have used over half your budget.' : 'You are currently under budget. Great job!'}
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
