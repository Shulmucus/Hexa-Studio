import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu state
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Background Strip - Separate div to prevent 'fixed' child trap caused by backdrop-blur */}
      <div className="absolute inset-x-0 top-0 h-20 bg-[#050505]/80 backdrop-blur-md border-b border-white/5" />

      {/* Main Content Container */}
      <div className="relative z-50 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO & BRAND */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none" onClick={closeMenu}>
          {/* Logo Container - Added shrink-0 to prevent squashing */}
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
             <img 
               src="/HexaStudioLogo.png" 
               alt="Hexal Logo" 
               className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" 
             />
          </div>

          <span className="text-2xl font-serif font-bold tracking-wider text-white transition-colors duration-300 group-hover:text-amber-500 group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]">
            HEXAL
          </span>
        </Link>
        
        {/* DESKTOP NAV LINKS (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] text-zinc-500">
          <Link to="/" className="hover:text-white transition-colors uppercase">Studio</Link>
          <Link to="/games" className="hover:text-amber-500 transition-colors uppercase">Our Games</Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON (Visible on Mobile) */}
        <div className="md:hidden">
            <button 
                onClick={toggleMenu} 
                className="text-white hover:text-amber-500 transition-colors focus:outline-none"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY - Placed outside the backdrop-blur container to ensure full screen */}
      <AnimatePresence>
          {isOpen && (
              <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-zinc-950 z-40 flex flex-col items-center justify-center space-y-12 md:hidden"
                  style={{ height: '100dvh' }} // Dynamic viewport height for mobile browsers
              >
                  <Link 
                      to="/" 
                      onClick={closeMenu}
                      className="text-3xl font-serif font-bold tracking-[0.2em] text-white hover:text-amber-500 transition-colors uppercase"
                  >
                      Studio
                  </Link>
                  <Link 
                      to="/games" 
                      onClick={closeMenu}
                      className="text-3xl font-serif font-bold tracking-[0.2em] text-white hover:text-amber-500 transition-colors uppercase"
                  >
                      Our Games
                  </Link>
              </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;