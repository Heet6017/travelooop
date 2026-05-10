import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { api, setAuthToken, setUser } from '../api';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/auth/login', { email: data.email, password: data.password });
      setAuthToken(res.token);
      setUser(res.user);
      toast.success(`Welcome back, ${res.user.name}!`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="cinematic-bg min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[960px] flex rounded-[32px] overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm"
        style={{ minHeight: '600px' }}
      >
        {/* Left: Indian image panel */}
        <div className="hidden md:flex w-5/12 relative overflow-hidden flex-col justify-end p-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[20s] hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="relative z-10">
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Incredible India</p>
            <h3 className="font-bold text-3xl text-white tracking-tight leading-tight mb-3">
              Discover the Soul<br />of Bharath
            </h3>
            <p className="text-white/60 text-sm">Plan cinematic journeys across India's most extraordinary destinations.</p>
          </div>
        </div>

        {/* Right: Form panel */}
        <div className="flex-1 bg-black/60 backdrop-blur-xl p-10 md:p-14 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-white font-bold text-3xl tracking-tight mb-1">Sign in</h1>
            <p className="text-white/40 text-sm">Welcome back, explorer</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="Email address"
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder-white/30 font-medium focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message as string}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
                type="password"
                placeholder="Password"
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder-white/30 font-medium focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message as string}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-white text-black font-bold rounded-2xl uppercase tracking-widest text-sm hover:bg-white/90 transition-all disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <p className="text-white/40 text-sm text-center mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-white font-bold hover:underline">Register here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
