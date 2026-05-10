import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ icon, error, isPassword, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : props.type || 'text';

    return (
      <motion.div 
        className="w-full mb-4 relative"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-secondary-text">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={`w-full h-[56px] bg-input-bg border border-glow rounded-[14px] text-[#050505] placeholder-input-placeholder font-medium text-[15px] focus-ring-premium ${icon ? 'pl-12' : 'pl-4'} ${isPassword ? 'pr-12' : 'pr-4'} ${error ? 'border-error/50 focus:border-error focus:ring-error/20' : ''} ${className}`}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-secondary-text hover:text-[#050505] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        
        {error && (
          <span className="text-error text-xs mt-1.5 ml-1 block font-medium">
            {error}
          </span>
        )}
      </motion.div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
