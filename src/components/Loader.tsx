import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playKey, unlockAudio } from "@/lib/sounds";

const TEXT = "Ovez and PayDigital";

export function Loader({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [exiting, setExiting] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(TEXT.slice(0, i));
      if (TEXT[i - 1] && TEXT[i - 1] !== " ") playKey();
      if (i >= TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 110);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    unlockAudio();
    setExiting(true);
    setTimeout(onDone, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0a0807] flex flex-col items-center justify-center px-6 transition-all duration-700 ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="font-mono text-foreground text-center relative z-10 w-full max-w-lg">
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[10px] tracking-[0.6em] uppercase text-[#a855f7] mb-8"
        >
          // system_init
        </motion.div>
        
        <div className="text-xl md:text-4xl mb-16 min-h-[4rem] flex items-center justify-center leading-tight">
          <span className="text-muted-foreground">const&nbsp;</span>
          <span className="text-[#a855f7]">studio</span>
          <span className="text-muted-foreground">&nbsp;=&nbsp;</span>
          <span className="text-[#f5f5f3]">"{typed}"</span>
          <span className="w-[2px] h-[1.2em] bg-[#a855f7] ml-1 animate-pulse" />
        </div>

        <div className="h-14 flex items-center justify-center">
          <AnimatePresence>
            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={handleStart}
                className="group relative px-10 py-4 bg-transparent border border-[#a855f7]/30 text-[#a855f7] text-[10px] font-bold tracking-[0.5em] uppercase hover:border-[#a855f7] transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-[#0a0807] transition-colors duration-500">Initialize Studio</span>
                <div className="absolute inset-0 bg-[#a855f7] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a855f7] to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#a855f7] to-transparent" />
      </div>
    </div>
  );
}
