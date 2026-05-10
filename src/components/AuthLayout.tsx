import { ReactNode, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const cursorX1 = useSpring(0, { damping: 20, stiffness: 300, mass: 0.2 });
  const cursorY1 = useSpring(0, { damping: 20, stiffness: 300, mass: 0.2 });

  const cursorX2 = useSpring(0, { damping: 25, stiffness: 200, mass: 0.5 });
  const cursorY2 = useSpring(0, { damping: 25, stiffness: 200, mass: 0.5 });

  const cursorX3 = useSpring(0, { damping: 30, stiffness: 100, mass: 0.8 });
  const cursorY3 = useSpring(0, { damping: 30, stiffness: 100, mass: 0.8 });

  useEffect(() => {
    cursorX1.set(mousePosition.x);
    cursorY1.set(mousePosition.y);
    cursorX2.set(mousePosition.x);
    cursorY2.set(mousePosition.y);
    cursorX3.set(mousePosition.x);
    cursorY3.set(mousePosition.y);
  }, [mousePosition, cursorX1, cursorY1, cursorX2, cursorY2, cursorX3, cursorY3]);

  // Global tilt based on cursor position relative to screen
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  const rotateX = useTransform(cursorY1, [0, windowHeight], [6, -6]);
  const rotateY = useTransform(cursorX1, [0, windowWidth], [-6, 6]);

  return (
    <div className="cinematic-bg min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Minimal Cursor Track */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          x: cursorX3,
          y: cursorY3,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      
      {/* Trail Dot 1 (Fastest) */}
      <motion.div
        className="absolute w-2 h-2 rounded-full pointer-events-none z-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{ x: cursorX1, y: cursorY1, translateX: '-50%', translateY: '-50%' }}
      />
      
      {/* Trail Dot 2 */}
      <motion.div
        className="absolute w-3 h-3 rounded-full pointer-events-none z-0 bg-white/60 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        style={{ x: cursorX2, y: cursorY2, translateX: '-50%', translateY: '-50%' }}
      />
      
      {/* Trail Dot 3 (Slowest) */}
      <motion.div
        className="absolute w-4 h-4 rounded-full pointer-events-none z-0 bg-white/30 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        style={{ x: cursorX3, y: cursorY3, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Slow moving soft light gradients */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-60"
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Particles (very subtle) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full flex justify-center"
        style={{ perspective: 1500, rotateX, rotateY }}
      >
        {children}
      </motion.div>
    </div>
  );
}
