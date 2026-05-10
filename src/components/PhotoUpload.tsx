import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PhotoUpload() {
  return (
    <div className="flex flex-col items-center mb-8">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="w-[100px] h-[100px] rounded-full border-2 border-black/10 bg-input-bg flex items-center justify-center cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.08)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      >
        <Camera className="text-[#52525B]" size={32} />
      </motion.div>
      <span className="text-[#52525B] text-sm font-medium mt-3">Upload Photo</span>
    </div>
  );
}
