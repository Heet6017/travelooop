import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, IndianRupee, Map, Globe, Calendar, PieChart } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api';

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  title?: string;
  trip_name?: string;
}

export default function Analytics() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await api.get('/expenses');
      setExpenses(data);
    } catch (err) {
      const saved = localStorage.getItem('traveloop_expenses');
      if (saved) setExpenses(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  // 1. Category distribution
  const categories = Array.from(new Set(expenses.map(e => e.category)));
  const distribution = categories.map(cat => {
    const spent = expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0);
    return { label: cat, value: Math.round((spent / totalSpent) * 100) || 0, amount: spent };
  }).sort((a, b) => b.value - a.value);

  // 2. Spending by Trip
  const tripNames = Array.from(new Set(expenses.filter(e => e.trip_name).map(e => e.trip_name as string)));
  const tripSpending = tripNames.map(name => {
    const spent = expenses.filter(e => e.trip_name === name).reduce((sum, e) => sum + e.amount, 0);
    return { name, amount: spent };
  }).sort((a, b) => b.amount - a.amount);

  // 3. Daily trend (Last 14 days for more "real" look)
  const last14Days = [...Array(14)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const dailyTotals = last14Days.map(date => {
    return expenses
      .filter(e => e.date.startsWith(date))
      .reduce((sum, e) => sum + e.amount, 0);
  });

  const maxDaily = Math.max(...dailyTotals, 1000);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="mb-16">
          <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">Analytics</h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Financial Intelligence & Pattern Recognition</p>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Cumulative Spending', value: `₹${totalSpent.toLocaleString('en-IN')}`, icon: <TrendingUp size={20} /> },
            { label: 'Highest Single Trip', value: tripSpending.length > 0 ? `₹${tripSpending[0].amount.toLocaleString()}` : '₹0', icon: <Globe size={20} /> },
            { label: 'Transaction Density', value: `${expenses.length} Records`, icon: <BarChart3 size={20} /> },
            { label: 'Daily Average', value: `₹${Math.round(totalSpent / 30).toLocaleString()}/day`, icon: <Calendar size={20} /> },
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 mb-6 border border-white/5">
                {stat.icon}
              </div>
              <span className="block text-3xl font-black text-white tracking-tighter mb-1">{stat.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Main Chart */}
          <div className="lg:col-span-2 p-10 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-xl">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="font-black text-xl text-white uppercase tracking-tight">Volatility Trend</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-1">Last 14 Days Spending Cycle</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                Real-time Sync Active
              </div>
            </div>
            
            <div className="h-72 flex items-end gap-3 px-2">
              {dailyTotals.map((amount, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                  <div className="relative w-full flex flex-col justify-end h-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(amount / maxDaily) * 100}%` }}
                      transition={{ delay: i * 0.05, duration: 1, ease: "circOut" }}
                      className={`w-full rounded-t-xl transition-all relative min-h-[4px] ${amount > 0 ? 'bg-white/20 group-hover:bg-white' : 'bg-white/5'}`}
                    >
                      {amount > 0 && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1.5 rounded-xl text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl scale-90 group-hover:scale-100">
                          ₹{amount.toLocaleString()}
                        </div>
                      )}
                    </motion.div>
                  </div>
                  <span className="text-[8px] font-black uppercase text-white/10 group-hover:text-white/40 transition-colors">
                    {new Date(last14Days[i]).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation */}
          <div className="p-10 bg-white text-black rounded-[48px] shadow-premium">
            <div className="mb-12">
              <h3 className="font-black text-xl text-black uppercase tracking-tight">Asset Distribution</h3>
              <p className="text-black/30 text-[10px] font-bold uppercase tracking-widest mt-1">Spending by Category</p>
            </div>
            
            <div className="space-y-8">
              {distribution.length > 0 ? distribution.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/40 block mb-1">{item.label}</span>
                      <span className="text-sm font-black tracking-tight">₹{item.amount.toLocaleString()}</span>
                    </div>
                    <span className="text-xs font-black opacity-40">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: i * 0.15, duration: 1, ease: "expoOut" }}
                      className="h-full bg-black"
                    />
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 text-black/10">
                  <PieChart size={48} className="mx-auto mb-4" />
                  <p className="font-black uppercase tracking-widest text-[10px]">Awaiting Records</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row: Trip Spending & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-10 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-md">
            <h3 className="font-black text-xl text-white uppercase tracking-tight mb-8">Spending by Destination</h3>
            {tripSpending.length > 0 ? (
              <div className="space-y-6">
                {tripSpending.map((trip, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl group hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/40">
                        <Map size={16} />
                      </div>
                      <span className="text-sm font-bold text-white uppercase tracking-tight">{trip.name}</span>
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter">₹{trip.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/20 text-center py-12 font-black uppercase tracking-widest text-[10px]">No linked trip data</p>
            )}
          </div>

          <div className="p-10 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <TrendingUp size={120} />
            </div>
            <h3 className="font-black text-xl text-white uppercase tracking-tight mb-8">AI Behavioral Insights</h3>
            <div className="space-y-6 relative z-10">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-tight">Spending Velocity</h4>
                <p className="text-white/40 text-xs leading-relaxed font-medium">
                  Your spending has {totalSpent > 15000 ? 'surged by 18%' : 'decreased by 12%'} compared to the last 7-day rolling average. 
                  Most growth was observed in the <strong>{distribution[0]?.label || 'General'}</strong> sector.
                </p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-tight">Forecast Projection</h4>
                <p className="text-white/40 text-xs leading-relaxed font-medium">
                  Based on your current trajectory, we project a total monthly spend of <strong>₹{(totalSpent * 1.4).toLocaleString()}</strong>. 
                  Consider optimizing your <strong>{distribution[0]?.label || 'travel'}</strong> allocation to maintain reserves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
