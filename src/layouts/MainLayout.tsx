import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  // Full‑screen layout without any cursor‑tracking or extra background.
  return (
    <div className="w-full min-h-screen bg-primary-bg cinematic-bg relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full h-screen flex flex-col text-white overflow-hidden"
      >
        <Navbar />
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 relative">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
