import { useForm } from 'react-hook-form';
import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';
import AuthDivider from '../components/AuthDivider';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <AuthCard>
        <Logo />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-center font-sans font-bold text-2xl tracking-tight mb-8 text-[#050505]">
            Sign In
          </h2>
          
          <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <InputField
              icon={<User size={20} />}
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
              error={errors.username?.message as string}
            />
            
            <InputField
              icon={<Lock size={20} />}
              placeholder="Password"
              isPassword
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              error={errors.password?.message as string}
            />
            
            <AuthButton type="button" onClick={() => navigate('/dashboard')}>
              Login
            </AuthButton>
          </form>
          
          <AuthDivider 
            text="Don't have an account?" 
            linkText="Register here" 
            linkTo="/register" 
          />
        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}
