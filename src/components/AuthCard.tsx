import { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
  width?: string;
}

export default function AuthCard({ children, width = 'max-w-[1000px]' }: AuthCardProps) {
  return (
    <div className={`w-full ${width}`}>
      <div className="bg-card-bg text-[#050505] border border-glow rounded-[24px] shadow-premium flex flex-col md:flex-row overflow-hidden min-h-[640px] max-h-[85vh]">
        
        {/* Left Side: Cinematic Branding (Hidden on mobile) */}
        <div className="hidden md:flex w-5/12 bg-[#F4F4F5] relative overflow-hidden flex-col justify-end p-10 border-r border-glow/50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-60 mix-blend-multiply transition-transform duration-[20s] hover:scale-110 ease-linear"></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent"></div>
          
          <div className="relative z-10">
            <h3 className="font-sans font-bold text-3xl leading-tight mb-4 text-[#050505] tracking-tight">
              Discover The World
            </h3>
            <p className="text-[#52525B] font-medium max-w-[280px]">
              Seamless planning, cinematic experiences. Your personal travel concierge on your desktop.
            </p>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full md:w-7/12 p-10 md:p-14 flex flex-col justify-start md:justify-center overflow-y-auto custom-scrollbar">
          <div className="my-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
