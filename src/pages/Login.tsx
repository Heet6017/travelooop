import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { api, setAuthToken, setUser } from '../api';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Background Health Check (Silent)
  useEffect(() => {
    api.get('/health').catch(() => {
      // Don't show toast on every load, just log it
      console.warn('Backend currently unreachable');
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.post('/auth/login', { email, password });
      setAuthToken(data.token);
      setUser(data.user);
      toast.success('Welcome back! ✈️');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <h1 className="font-voyage text-8xl text-white uppercase tracking-wider mb-2 drop-shadow-2xl">Traveloop</h1>
          <p className="text-white/30 font-bold uppercase tracking-[0.4em] text-[10px]">Incredible India Journeys</p>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[48px] border border-white/10 shadow-premium">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-white/20 tracking-widest ml-1">Identity</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-white/50 transition-colors" size={18} />
                <input 
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full h-16 bg-white/5 border border-white/5 rounded-3xl pl-16 pr-6 text-white placeholder-white/10 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-white/20 tracking-widest ml-1">Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-white/50 transition-colors" size={18} />
                <input 
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-16 bg-white/5 border border-white/5 rounded-3xl pl-16 pr-6 text-white placeholder-white/10 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-18 bg-white text-black rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl hover:bg-white/90 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : <>Enter Dashboard <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/register')}
              className="text-white/30 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              First Journey? Create Account
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
