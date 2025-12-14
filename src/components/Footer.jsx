import { Sword, Skull } from 'lucide-react';

const Footer = () => {
  return (
    <div className="w-full border-t border-white/5 bg-zinc-950/30 backdrop-blur-sm py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-16">
           {/* Independent Hover States: group class is solely on the wrapper div */}
           <div className="flex flex-col items-center gap-2 group cursor-default opacity-40 hover:opacity-100 transition-opacity duration-300">
             <Skull size={24} className="text-white group-hover:text-amber-500 transition-colors" />
             <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white">Unforgiving</span>
           </div>
           
           <div className="flex flex-col items-center gap-2 group cursor-default opacity-40 hover:opacity-100 transition-opacity duration-300">
             <Sword size={24} className="text-white group-hover:text-amber-500 transition-colors" />
             <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white">Combat</span>
           </div>
        </div>
        <div className="text-center mt-8 text-zinc-700 text-[10px] uppercase tracking-widest">
            © 2025 Hexal Studio. All Rights Reserved.
        </div>
    </div>
  );
};

export default Footer;