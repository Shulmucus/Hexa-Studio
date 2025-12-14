import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Gamepad2 } from 'lucide-react';
import Footer from '../components/Footer';

const Home = () => {
  const canvasRef = useRef(null);

  // --- EMBER PARTICLE EFFECT ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.speed = Math.random() * 1.5 + 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fade = Math.random() * 0.003 + 0.001;
      }
      update() {
        this.y -= this.speed;
        this.opacity -= this.fade;
        if (this.opacity <= 0) {
          this.y = canvas.height + Math.random() * 100;
          this.opacity = Math.random() * 0.5 + 0.1;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(217, 119, 6, ${this.opacity})`; // Amber-600 color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden bg-[#050505] text-white">
      
      {/* 1. ATMOSPHERE BACKGROUND (Base Layer) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Aurora Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[70%] bg-gradient-to-br from-transparent via-amber-600/10 to-transparent blur-[120px] -skew-y-12 opacity-60" />
        <div className="absolute top-[-20%] right-[-10%] w-[120%] h-[80%] bg-gradient-to-bl from-transparent via-amber-900/10 to-transparent blur-[100px] skew-y-6 opacity-50" />
      </div>

      {/* 2. CONCEPT ART LAYER (Cinematic Feel) */}
      {/* We blend the concept art into the background so it looks like a scene emerging from darkness */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-screen">
         <img 
            src="/Conceptart.png" 
            alt="Atmospheric Background" 
            className="w-full h-full object-cover object-center opacity-50"
         />
         {/* Gradient to fade the image edges into the black background */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
      </div>

      {/* 3. EMBER CANVAS (Motion Layer) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* 4. LOGO LAYER (Subtle Branding) */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.05, scale: 1 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/HexaStudioLogo.png" 
            alt="Hexal Studio Crest" 
            className="w-[90vw] md:w-[700px] h-auto object-contain drop-shadow-[0_0_60px_rgba(255,160,0,0.2)] mix-blend-screen"
        />
      </div>

      {/* HERO SECTION (Content Layer) */}
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10 pt-20">
        
        {/* EXPLICIT STUDIO LABEL */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm"
        >
          <Gamepad2 size={14} className="text-amber-500" />
          <span className="text-[11px] tracking-[0.3em] text-zinc-300 font-bold uppercase">Independent Game Studio</span>
        </motion.div>

        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group cursor-default"
        >
            <h1 className="text-7xl md:text-9xl font-black font-serif tracking-tighter mb-4 transition-all duration-500 text-white drop-shadow-2xl">
              HEXAL
              <span className="text-amber-600 group-hover:text-white transition-colors duration-500">.</span>
            </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
        >
          Forging <span className="text-zinc-200 font-medium">Soulslike</span> punishment with <span className="text-zinc-200 font-medium">Roguelike</span> infinity.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <Link 
            to="/games"
            className="group relative px-10 py-4 bg-white text-black font-bold tracking-widest overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">OUR GAMES</span>
            <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 animate-bounce text-zinc-600"
        >
            <ChevronDown size={24} />
        </motion.div>
      </main>

      {/* ABOUT STUDIO SECTION */}
      <section className="relative z-10 py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 tracking-wide">
                THE <span className="text-amber-600">STUDIO</span>
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg leading-loose font-light">
                <p>
                    I am a developer obsessed with the <strong className="text-white">high difficulty, punishing, but fair combat gameplay</strong>. 
                    Hexal Studio was founded on a simple principle: <strong className="text-white">games should not hold your hand.</strong>
                </p>
                <p>
                    Inspired by the cryptic storytelling of classic RPGs and the adrenaline of modern action combat, 
                    we build worlds that require patience, skill, and a willingness to face the abyss.
                </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 border border-white/5 bg-zinc-900/20 rounded-lg hover:border-amber-600/30 transition-colors">
                    <h3 className="text-white font-bold mb-2 tracking-widest text-sm">DESIGN</h3>
                    <p className="text-zinc-500 text-sm">Procedural generation meets hand-crafted intent.</p>
                </div>
                <div className="p-6 border border-white/5 bg-zinc-900/20 rounded-lg hover:border-amber-600/30 transition-colors">
                    <h3 className="text-white font-bold mb-2 tracking-widest text-sm">ART</h3>
                    <p className="text-zinc-500 text-sm">Grimdark aesthetics with high-fidelity atmosphere.</p>
                </div>
                <div className="p-6 border border-white/5 bg-zinc-900/20 rounded-lg hover:border-amber-600/30 transition-colors">
                    <h3 className="text-white font-bold mb-2 tracking-widest text-sm">CODE</h3>
                    <p className="text-zinc-500 text-sm">Tight, responsive controls built for frame-perfect dodges.</p>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;