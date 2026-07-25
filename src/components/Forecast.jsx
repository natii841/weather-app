import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 250, damping: 25 } }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="mt-12"
    >
      <div className="flex items-center gap-4 mb-8 px-2">
        <div className="bg-current opacity-20 p-2.5 rounded-xl backdrop-blur-md mix-blend-overlay">
          <Calendar size={28} />
        </div>
        <h2 className="text-3xl font-black drop-shadow-md">
          5-Day Forecast
        </h2>
      </div>
      
      <div className="relative w-full">
        {/* Subtle fade edges for horizontal scrolling */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none rounded-l-3xl mix-blend-overlay" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent z-10 pointer-events-none rounded-r-3xl mix-blend-overlay" />
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-row gap-6 overflow-x-auto pb-6 pt-2 px-2 no-scrollbar scroll-smooth"
        >
          {forecast.map((day, index) => (
            <motion.div 
              key={index} 
              variants={itemAnim}
              className="glass-card flex-none w-44 flex flex-col items-center justify-between p-8 group cursor-pointer"
            >
              <h3 className="text-xl font-bold opacity-90 mb-6 tracking-wider uppercase">
                {day.day}
              </h3>
              
              <motion.div 
                whileHover={{ scale: 1.3, rotate: [0, 5, -5, 0] }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-[4.5rem] mb-6 animate-float drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
              >
                {day.icon}
              </motion.div>
              
              <p className="text-5xl font-black tracking-tighter drop-shadow-md flex items-start">
                {day.temp}<span className="text-2xl font-bold opacity-70 mt-1">°C</span>
              </p>
              
              <p className="text-sm mt-4 opacity-80 font-bold tracking-wide capitalize text-center leading-tight">
                {day.condition}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Forecast;
