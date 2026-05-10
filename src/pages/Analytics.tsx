import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Globe, Map } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
}

export default function Analytics() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('traveloop_expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  // Calculate category distribution
  const categories = Array.from(new Set(expenses.map(e => e.category)));
  const distribution = categories.map(cat => {
    const spent = expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0);
    return { label: cat, value: Math.round((spent / totalSpent) * 100) || 0 };
  }).sort((a, b) => b.value - a.value);

  // Group by date for the chart (simulation)
  const chartData = [40, 70, 45, 90, 65, 80, 55]; // Defaults
  const dynamicChartData = expenses.length > 0 ? expenses.slice(0, 7).map(e => (e.amount / 200) * 10).reverse() : chartData;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="mb-16">
          <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">Analytics</h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Dynamic insights from your spending</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, icon: <TrendingUp size={20} /> },
            { label: 'Countries Visited', value: '18', icon: <Globe size={20} /> },
            { label: 'Expense Count', value: expenses.length.toString(), icon: <BarChart3 size={20} /> },
            { label: 'Avg / Item', value: `$${Math.round(totalSpent / (expenses.length || 1))}`, icon: <Map size={20} /> },
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[32px]">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 mb-6">
                {stat.icon}
              </div>
              <span className="block text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-10 bg-white/5 border border-white/10 rounded-[40px]">
            <h3 className="font-black text-xl text-white uppercase tracking-tight mb-12">Spending Trend (Last 7)</h3>
            <div className="h-64 flex items-end gap-4 px-4">
              {dynamicChartData.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, Math.max(10, height))}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="w-full bg-white/10 rounded-t-xl group-hover:bg-white transition-colors relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {Math.round(height * 20)}
                    </div>
                  </motion.div>
                  <span className="text-[10px] font-black uppercase text-white/20">E0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 bg-white text-black rounded-[40px]">
            <h3 className="font-black text-xl text-black uppercase tracking-tight mb-12">Spending by Category</h3>
            <div className="flex flex-col gap-8">
              {distribution.length > 0 ? distribution.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                    <span className="text-xs font-black">{item.value}%</span>
                  </div>
                  <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: i * 0.2, duration: 1 }}
                      className="h-full bg-black"
                    />
                  </div>
                </div>
              )) : (
                <p className="text-center text-black/30 font-bold uppercase tracking-widest text-[10px] py-12">No data yet</p>
              )}
            </div>
            
            <div className="mt-12 p-8 bg-black/5 rounded-[32px] border border-black/5">
              <p className="text-sm font-medium leading-relaxed italic">
                {totalSpent > 3000 ? "You've exceeded your usual spending pattern for this period." : "Your travel spending is within the healthy range. Adventure on!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
