import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Gamepad2, Mail, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Waitlist State
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);

  // Fetch Games on Load
  useEffect(() => {
    const fetchGames = async () => {
      if (!supabase) return;
      
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('id', { ascending: true });

      if (error) console.error('Error fetching games:', error);
      else setGames(data || []);
      
      setLoading(false);
    };

    fetchGames();
  }, []);

  const handleJoinWaitlist = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    setIsError(false);
    
    const normalizedEmail = email.toLowerCase().trim();
    
    try {
      if (!supabase) throw new Error("Supabase is not connected.");

      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: normalizedEmail }]);

      if (error) {
        if (error.code === '23505') {
            setStatus('You are already on the list.');
            setIsError(true); 
            return; 
        }
        throw error; 
      }

      setStatus('Welcome to the coven.');
      setEmail('');
    } catch (error) {
      console.error("Supabase Error:", error);
      setIsError(true);
      setStatus(error.message === 'Failed to fetch' ? 'Network blocked. Disable AdBlock.' : error.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-28 pb-20 bg-[#050505] text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-16 border-b border-white/10 pb-8"
        >
            <h1 className="text-4xl md:text-6xl font-serif font-black mb-4">CURRENT PROJECTS</h1>
            <p className="text-zinc-400">The forge is active. Here is what we are building.</p>
        </motion.div>

        {/* LOADING STATE */}
        {loading && (
            <div className="h-64 flex items-center justify-center text-zinc-600 animate-pulse">
                Fetching archives...
            </div>
        )}

        {/* GAME LIST */}
        <div className="space-y-24">
            
            {/* DYNAMIC GAME CARDS FROM DATABASE */}
            {games.map((game, index) => (
                <motion.div 
                  key={game.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Visual Side */}
                    <div className="order-2 lg:order-1 h-[500px] bg-zinc-900 rounded-xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                            <Gamepad2 size={64} className="text-zinc-700 group-hover:text-amber-600 transition-colors duration-500" />
                        </div>
                        
                        {/* Use image_url from DB */}
                        {game.image_url && (
                            <img 
                                src={game.image_url} 
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                                onError={(e) => e.target.style.display='none'} 
                                alt={game.title}
                            />
                        )}

                        <div className="absolute bottom-8 left-8 z-10">
                             <div className="flex gap-2 mb-2">
                                 {/* Map over Tags array */}
                                 {game.tags && game.tags.map(tag => (
                                     <span key={tag} className="px-2 py-1 bg-amber-600 text-black text-[10px] font-bold uppercase mr-1">{tag}</span>
                                 ))}
                             </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    {/* Info Side */}
                    <div className="order-1 lg:order-2">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-emerald-500 tracking-[0.2em] font-bold text-xs uppercase">{game.status}</span>
                        </div>
                        
                        <h2 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter uppercase">{game.title}</h2>
                        
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            {game.description}
                        </p>

                        {/* Conditionally Render Waitlist based on Database boolean */}
                        {game.has_waitlist && (
                            <div className="bg-zinc-900/50 p-8 border border-white/10 rounded-lg backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Mail size={16} className="text-amber-500" />
                                    <h3 className="text-white font-bold text-sm tracking-wide">JOIN THE BETA WAITLIST</h3>
                                </div>
                                
                                <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="email" 
                                    placeholder="enter_your_email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black/50 w-full px-4 py-3 text-white border border-white/10 focus:outline-none focus:border-amber-600 transition-colors placeholder:text-zinc-700"
                                    required
                                />
                                <button type="submit" className="bg-white text-black px-6 py-3 font-bold hover:bg-amber-500 hover:text-white transition-colors uppercase tracking-wider flex items-center justify-center gap-2">
                                    Join <ArrowRight size={14} />
                                </button>
                                </form>
                                
                                {status && (
                                    <div className={`mt-4 flex items-center gap-2 text-xs font-mono p-2 rounded ${isError ? 'bg-amber-900/20 text-amber-200' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                        {isError ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                                        <span>{status}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}

            {/* Placeholder for Next Game (Static Footer) */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="opacity-30 flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-xl"
            >
                 <h3 className="text-2xl font-black text-zinc-700 mb-2">PROJECT: UNNAMED</h3>
                 <p className="text-zinc-600 text-sm tracking-widest uppercase">Coming 2026</p>
            </motion.div>

        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Games;