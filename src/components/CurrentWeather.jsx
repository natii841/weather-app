import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MapPin } from "lucide-react";

function CurrentWeather({ data }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Animation for counting temperature
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (data) {
      const animation = animate(count, data.temp, { duration: 1.5, ease: "easeOut" });
      return animation.stop;
    }
  }, [data, count]);

  if (!data) return null;

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
      className="w-full flex flex-col md:flex-row items-center justify-between relative group"
    >
      {/* Location Info */}
      <div className="flex-1 text-center md:text-left mb-10 md:mb-0 z-10 p-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 glass-pill px-4 py-2 mb-6"
        >
          <MapPin size={18} className="drop-shadow-md opacity-80" />
          <p className="text-sm font-semibold tracking-widest uppercase opacity-90">{data.country}</p>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-xl mb-4 leading-none"
        >
          {data.city}
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 opacity-80 font-medium text-lg md:text-xl"
        >
          <p>{formattedDate}</p>
          <span className="hidden md:inline">•</span>
          <p>{formattedTime}</p>
        </motion.div>
      </div>

      {/* Main Weather Display */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 p-4">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="text-[120px] md:text-[180px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] leading-none select-none"
        >
          {data.icon}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="flex items-start mt-[-20px] md:mt-[-40px]"
        >
          <motion.h1 
            className="text-[120px] md:text-[180px] font-black tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] leading-none"
          >
            {rounded}
          </motion.h1>
          <span className="text-5xl md:text-8xl font-bold opacity-70 mt-4 md:mt-8">°C</span>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-3xl md:text-5xl mt-4 font-black capitalize tracking-wide drop-shadow-xl"
        >
          {data.condition}
        </motion.p>
      </div>
    </motion.section>
  );
}

export default CurrentWeather;
