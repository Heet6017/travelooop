import { useForm } from 'react-hook-form';
import { User, Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { api, setAuthToken, setUser } from '../api';

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const name = `${data.firstName} ${data.lastName}`.trim();
      const res = await api.post('/auth/register', { name, email: data.email, password: data.password });
      setAuthToken(res.token);
      setUser(res.user);
      toast.success('Account created! Welcome to Traveloop 🎉');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    }
  };

  const inputClass = "w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder-white/30 font-medium focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all";

  return (
    <div className="cinematic-bg min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[960px] flex rounded-[32px] overflow-hidden border border-white/10 shadow-2xl"
        style={{ minHeight: '600px' }}
      >
        {/* Left panel with Indian image */}
        <div className="hidden md:flex w-5/12 relative overflow-hidden flex-col justify-end p-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[20s] hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="relative z-10">
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Kerala, India</p>
            <h3 className="font-bold text-3xl text-white tracking-tight leading-tight mb-3">Start Your<br />Adventure Today</h3>
            <p className="text-white/60 text-sm">Join thousands of explorers discovering India's finest destinations.</p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 bg-black/60 backdrop-blur-xl p-10 md:p-14 flex flex-col justify-center overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-white font-bold text-3xl tracking-tight mb-1">Create Account</h1>
            <p className="text-white/40 text-sm">Your journey begins here</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input {...register('firstName', { required: true })} placeholder="First Name" className={inputClass} />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input {...register('lastName', { required: true })} placeholder="Last Name" className={inputClass} />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                type="email" placeholder="Email address" className={inputClass}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message as string}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })}
                type="password" placeholder="Password (min 6 chars)" className={inputClass}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message as string}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-white text-black font-bold rounded-2xl uppercase tracking-widest text-sm hover:bg-white/90 transition-all disabled:opacity-60 mt-2"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </motion.button>
          </form>

          <p className="text-white/40 text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
