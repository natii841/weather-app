import { motion, AnimatePresence } from "framer-motion";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";
import { Loader2, AlertCircle, Compass } from "lucide-react";

function WeatherDashboard({ weatherData, loading, error }) {
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div 
          key="loading"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          className="flex flex-col items-center justify-center min-h-[60vh]"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full animate-pulse" />
            <Loader2 className="animate-spin mb-6 relative z-10 drop-shadow-lg" size={80} strokeWidth={1.5} />
          </div>
          <p className="text-3xl font-bold tracking-widest uppercase opacity-80 mt-4">Connecting to Atmosphere</p>
        </motion.div>
      )}

      {error && !loading && (
        <motion.div 
          key="error"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="glass-panel border-red-500/50 p-12 text-center max-w-2xl mx-auto mt-20 shadow-[0_0_60px_rgba(239,68,68,0.4)]"
        >
          <AlertCircle className="mx-auto mb-6 text-red-500 drop-shadow-md" size={80} />
          <h2 className="text-4xl font-black mb-4">Connection Failed</h2>
          <p className="opacity-80 text-xl font-medium">{error}</p>
        </motion.div>
      )}

      {!weatherData && !loading && !error && (
        <motion.div 
          key="empty"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="glass-panel p-16 text-center mt-16 max-w-3xl mx-auto shadow-2xl"
        >
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-10 relative"
          >
            <div className="absolute inset-0 bg-current opacity-20 blur-2xl rounded-full" />
            <Compass size={120} className="drop-shadow-xl relative z-10" strokeWidth={1} />
          </motion.div>
          <h2 className="text-5xl font-black mb-6 tracking-tighter">Your Window to the World</h2>
          <p className="opacity-70 text-2xl font-medium max-w-xl mx-auto leading-relaxed">
            Enter a city above to experience immersive meteorological data, beautifully presented in real-time.
          </p>
        </motion.div>
      )}

      {weatherData && !loading && !error && (
        <motion.main 
          key="dashboard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[1400px] mx-auto px-4 md:px-10 w-full pb-16 flex flex-col gap-8"
        >
          {/* Main Hero Component */}
          <div className="glass-panel p-8 md:p-14 mb-4">
            <CurrentWeather data={weatherData.current} />
          </div>
          
          <div className="w-full">
            <WeatherDetails data={weatherData.current} />
          </div>
          
          <div className="w-full mt-4">
            <Forecast forecast={weatherData.forecast} />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}

export default WeatherDashboard;
