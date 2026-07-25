import { motion } from "framer-motion";
import { Droplets, Wind, Gauge, Eye, Thermometer, Sunrise, Sunset } from "lucide-react";

function WeatherDetails({ data }) {
  if (!data) return null;

  const details = [
    { label: "Humidity", value: `${data.humidity}%`, icon: <Droplets className="opacity-80" size={32} />, color: "bg-blue-500/20 text-blue-500" },
    { label: "Wind Speed", value: `${data.windSpeed} km/h`, icon: <Wind className="opacity-80" size={32} />, color: "bg-teal-500/20 text-teal-500" },
    { label: "Pressure", value: `${data.pressure} hPa`, icon: <Gauge className="opacity-80" size={32} />, color: "bg-purple-500/20 text-purple-500" },
    { label: "Visibility", value: `${data.visibility} km`, icon: <Eye className="opacity-80" size={32} />, color: "bg-green-500/20 text-green-500" },
    { label: "Feels Like", value: `${data.feelsLike}°C`, icon: <Thermometer className="opacity-80" size={32} />, color: "bg-red-500/20 text-red-500" },
    { label: "Sunrise", value: data.sunrise, icon: <Sunrise className="opacity-80" size={32} />, color: "bg-yellow-500/20 text-yellow-600" },
    { label: "Sunset", value: data.sunset, icon: <Sunset className="opacity-80" size={32} />, color: "bg-orange-500/20 text-orange-600" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mt-12"
    >
      <h2 className="text-3xl font-black mb-8 px-2 drop-shadow-md">
        Weather Details
      </h2>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {details.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemAnim}
            className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center group cursor-pointer"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }} 
              transition={{ type: "spring", stiffness: 400 }}
              className={`mb-5 p-4 rounded-full shadow-inner ${item.color} backdrop-blur-md transition-all`}
            >
              {item.icon}
            </motion.div>
            <p className="text-xs md:text-sm opacity-70 uppercase tracking-[0.2em] font-bold mb-2">
              {item.label}
            </p>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight transition-colors drop-shadow-sm">
              {item.value}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default WeatherDetails;
