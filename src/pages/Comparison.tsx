import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, IndianRupee, MapPin, Calendar, Users, TrendingDown, TrendingUp, BarChart3 } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api';

export default function Comparison() {
  const [trips, setTrips] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/trips'),
      api.get('/expenses')
    ]).then(([tripData, expenseData]) => {
      setTrips(tripData);
      setExpenses(expenseData);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  // Enrich trip data with actual spending
  const enrichedTrips = trips.map(trip => {
    const tripExpenses = expenses.filter(e => e.trip_id === trip.id);
    const actualSpend = tripExpenses.reduce((sum, e) => sum + e.amount, 0);
    const plannedBudget = parseFloat(trip.budget) || 0;
    const variance = plannedBudget - actualSpend;
    
    return {
      ...trip,
      actualSpend,
      plannedBudget,
      variance,
      expenseCount: tripExpenses.length
    };
  });

  const compareOptions = enrichedTrips.slice(0, 2);

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
          <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">Comparison</h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Side-by-side trip efficiency analysis</p>
        </div>

        {compareOptions.length < 2 ? (
          <div className="text-center py-24 bg-white/5 border border-white/10 rounded-[48px]">
            <BarChart3 size={64} className="text-white/10 mx-auto mb-8" />
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Insufficient Comparative Data</h3>
            <p className="text-white/40 font-medium mb-8 max-w-md mx-auto">Create and log expenses for at least two separate trips to unlock deep comparative analytics.</p>
            <button 
              onClick={() => window.location.href = '/create-trip'}
              className="bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-2xl"
            >
              Plan Second Trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {compareOptions.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 border border-white/10 rounded-[48px] overflow-hidden group backdrop-blur-md"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={i === 0 ? "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop" : "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop"} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1 block">Project {i + 1}</span>
                    <h2 className="font-voyage text-4xl text-white uppercase tracking-wider">{trip.plan_name || trip.place}</h2>
                  </div>
                </div>

                <div className="p-10 space-y-6">
                  {/* Real Calculations Summary */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                      <span className="text-[9px] font-black uppercase text-white/30 block mb-1">Planned</span>
                      <span className="text-lg font-black text-white">₹{trip.plannedBudget.toLocaleString()}</span>
                    </div>
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                      <span className="text-[9px] font-black uppercase text-white/30 block mb-1">Actual Spent</span>
                      <span className="text-lg font-black text-white">₹{trip.actualSpend.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Variance Metric */}
                  <div className={`p-6 rounded-[32px] border ${trip.variance >= 0 ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Budget Variance</span>
                      {trip.variance >= 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                    </div>
                    <div className="text-2xl font-black tracking-tighter">
                      {trip.variance >= 0 ? '+' : ''}₹{trip.variance.toLocaleString()}
                      <span className="text-xs font-bold ml-2 opacity-50">{trip.variance >= 0 ? 'Under Budget' : 'Over Budget'}</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                        <MapPin size={12} /> Location
                      </div>
                      <span className="text-sm font-bold text-white truncate max-w-[150px]">{trip.place}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                        <Calendar size={12} /> Date Range
                      </div>
                      <span className="text-sm font-bold text-white">
                        {trip.start_date ? new Date(trip.start_date).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                        <Users size={12} /> Passengers
                      </div>
                      <span className="text-sm font-bold text-white">{trip.guests} Guest(s)</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                        <BarChart3 size={12} /> Logged Transactions
                      </div>
                      <span className="text-sm font-bold text-white">{trip.expenseCount} Items</span>
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <button 
                      onClick={() => window.location.href = `/build-itinerary?tripId=${trip.id}`}
                      className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-2xl"
                    >
                      Optimize Itinerary <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
