import { Link } from 'react-router-dom';

interface AuthDividerProps {
  text: string;
  linkText: string;
  linkTo: string;
}

export default function AuthDivider({ text, linkText, linkTo }: AuthDividerProps) {
  return (
    <div className="mt-8 pt-6 border-t border-black/5 flex flex-col items-center">
      <div className="relative w-full flex items-center justify-center mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black/5"></div>
        </div>
        <div className="relative bg-card-bg px-4 text-[#A1A1AA] text-xs font-bold uppercase tracking-widest">
          OR
        </div>
      </div>
      
      <p className="text-secondary-text text-sm font-medium">
        {text}{' '}
        <Link 
          to={linkTo} 
          className="text-[#71717A] hover:text-[#050505] hover:underline transition-colors font-semibold"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}
