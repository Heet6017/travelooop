import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';
import AuthDivider from '../components/AuthDivider';
import PhotoUpload from '../components/PhotoUpload';

export default function Register() {
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
            Create Your Account
          </h2>
          
          <PhotoUpload />
          
          <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <InputField
                icon={<User size={20} />}
                placeholder="First Name"
                {...register('firstName', { required: 'First name is required' })}
                error={errors.firstName?.message as string}
              />
              
              <InputField
                icon={<User size={20} />}
                placeholder="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                error={errors.lastName?.message as string}
              />
              
              <InputField
                icon={<Mail size={20} />}
                placeholder="Email Address"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                })}
                error={errors.email?.message as string}
              />
              
              <InputField
                icon={<Phone size={20} />}
                placeholder="Phone Number"
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: { value: /^[0-9]+$/, message: 'Numeric only' }
                })}
                error={errors.phone?.message as string}
              />
              
              <InputField
                icon={<MapPin size={20} />}
                placeholder="City"
                {...register('city', { required: 'City is required' })}
                error={errors.city?.message as string}
              />
              
              <InputField
                icon={<Globe size={20} />}
                placeholder="Country"
                {...register('country', { required: 'Country is required' })}
                error={errors.country?.message as string}
              />
            </div>
            
            <motion.div 
              className="w-full mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <textarea
                className={`w-full bg-input-bg border border-glow rounded-[14px] text-[#050505] placeholder-input-placeholder font-medium text-[15px] focus-ring-premium p-4 min-h-[100px] resize-none ${errors.additionalInfo ? 'border-error/50 focus:border-error focus:ring-error/20' : ''}`}
                placeholder="Additional Information"
                {...register('additionalInfo')}
              />
            </motion.div>
            
            <AuthButton type="submit">
              Register Users
            </AuthButton>
          </form>
          
          <AuthDivider 
            text="Already have an account?" 
            linkText="Login here" 
            linkTo="/login" 
          />
        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}
