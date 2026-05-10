import { HTMLMotionProps, motion } from 'framer-motion';

interface AuthButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export default function AuthButton({ children, ...props }: AuthButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="w-full h-[56px] bg-button-bg text-button-text font-bold uppercase text-[16px] rounded-[14px] mt-4 hover:shadow-[0_0_15px_rgba(255,255,255,0.14)] hover:brightness-110 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus:ring-4 focus:ring-white/20"
      {...props}
    >
      {children}
    </motion.button>
  );
}
