import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function WeatherBackground({ weatherData }) {
  const getTheme = (data) => {
    if (!data) return "sunny";
    
    const c = data.condition?.toLowerCase() || "";
    
    // Prioritize precipitation states over sunrise/sunset visually, except if clear/cloudy.
    const isPrecipitation = c.includes("rain") || c.includes("thunder") || c.includes("snow") || c.includes("drizzle") || c.includes("shower");

    if (!isPrecipitation) {
      if (data.currentTime && data.rawSunrise && data.rawSunset) {
        const current = new Date(data.currentTime).getTime();
        const sunrise = new Date(data.rawSunrise).getTime();
        const sunset = new Date(data.rawSunset).getTime();
        
        const hourMs = 60 * 60 * 1000;
        
        if (Math.abs(current - sunrise) < hourMs) return "sunrise";
        if (Math.abs(current - sunset) < hourMs) return "sunset";
        if (!data.isDay) return "night";
      } else if (data.isDay === false) {
        return "night";
      }
    }

    if (c.includes("rain") || c.includes("drizzle") || c.includes("shower")) return "rain";
    if (c.includes("thunder")) return "thunderstorm";
    if (c.includes("snow") || c.includes("ice")) return "snow";
    if (c.includes("cloud") || c.includes("overcast") || c.includes("fog")) return "cloudy";
    
    return !data.isDay ? "night" : "sunny"; // fallback
  };

  const theme = getTheme(weatherData);

  // Realistic sky gradients
  const gradients = {
    sunny: "linear-gradient(180deg, #2193b0 0%, #6dd5ed 100%)", 
    cloudy: "linear-gradient(180deg, #4ca1af 0%, #c4e0e5 100%)", 
    rain: "linear-gradient(180deg, #141E30 0%, #243B55 100%)",
    thunderstorm: "linear-gradient(180deg, #000000 0%, #434343 100%)", 
    snow: "linear-gradient(180deg, #83a4d4 0%, #b6fbff 100%)", 
    night: "linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    sunrise: "linear-gradient(180deg, #FF512F 0%, #DD2476 50%, #F09819 100%)",
    sunset: "linear-gradient(180deg, #fc4a1a 0%, #f7b733 50%, #4A00E0 100%)",
  };

  const rainDrops = useMemo(() => Array.from({ length: 100 }).map(() => ({
    left: `${Math.random() * 100}%`,
    duration: `${0.2 + Math.random() * 0.3}s`,
    delay: `${Math.random() * 2}s`,
    opacity: 0.4 + Math.random() * 0.6
  })), []);

  const snowFlakes = useMemo(() => Array.from({ length: 150 }).map(() => ({
    left: `${Math.random() * 100}%`,
    duration: `${3 + Math.random() * 6}s`,
    delay: `${Math.random() * 10}s`,
    size: `${2 + Math.random() * 6}px`,
    opacity: 0.3 + Math.random() * 0.7
  })), []);

  const stars = useMemo(() => Array.from({ length: 100 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${1 + Math.random() * 4}s`,
    size: `${1 + Math.random() * 3}px`,
    opacity: Math.random()
  })), []);

  const clouds = useMemo(() => Array.from({ length: 12 }).map(() => ({
    top: `${Math.random() * 40}%`,
    left: `${-30 + Math.random() * 60}%`,
    width: `${200 + Math.random() * 400}px`,
    height: `${100 + Math.random() * 200}px`,
    duration: `${30 + Math.random() * 60}s`,
    delay: `${Math.random() * 20}s`,
    opacity: 0.2 + Math.random() * 0.4
  })), []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 transition-colors duration-1000 ease-in-out" style={{ background: gradients[theme] }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* Sun / Moon Orbs */}
          {theme === "sunny" && (
            <div className="absolute top-16 right-20 w-40 h-40 bg-yellow-100 rounded-full mix-blend-screen filter blur-[2px] shadow-[0_0_80px_rgba(255,255,150,1)] animate-pulse" />
          )}
          
          {theme === "night" && (
            <div className="absolute top-20 right-24 w-28 h-28 bg-white rounded-full mix-blend-screen filter blur-[1px] shadow-[0_0_60px_rgba(255,255,255,0.8)]" />
          )}

          {(theme === "sunrise" || theme === "sunset") && (
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-300 rounded-full mix-blend-screen filter blur-3xl opacity-80" />
          )}

          {/* Stars */}
          {theme === "night" && (
            <div className="stars-container opacity-90">
              {stars.map((star, i) => (
                <div 
                  key={i} 
                  className="star bg-white" 
                  style={{ 
                    left: star.left, 
                    top: star.top,
                    animationDuration: star.duration,
                    width: star.size, 
                    height: star.size,
                    opacity: star.opacity
                  }} 
                />
              ))}
            </div>
          )}

          {/* Rain */}
          {(theme === "rain" || theme === "thunderstorm") && (
            <div className="rain-container opacity-80">
              {rainDrops.map((drop, i) => (
                <div 
                  key={i} 
                  className="drop bg-white" 
                  style={{ 
                    left: drop.left, 
                    animationDuration: drop.duration,
                    animationDelay: drop.delay,
                    opacity: drop.opacity
                  }} 
                />
              ))}
            </div>
          )}

          {/* Snow */}
          {theme === "snow" && (
            <div className="snow-container">
              {snowFlakes.map((flake, i) => (
                <div 
                  key={i} 
                  className="snowflake bg-white" 
                  style={{ 
                    left: flake.left, 
                    animationDuration: flake.duration,
                    animationDelay: flake.delay,
                    width: flake.size,
                    height: flake.size,
                    opacity: flake.opacity
                  }} 
                />
              ))}
            </div>
          )}

          {/* Thunderstorm Lightning */}
          {theme === "thunderstorm" && (
            <div className="lightning-flash" />
          )}

          {/* Volumetric Clouds */}
          {(theme === "cloudy" || theme === "rain" || theme === "thunderstorm" || theme === "sunny" || theme === "sunrise" || theme === "sunset") && (
             <div className="clouds-container mix-blend-overlay">
               {clouds.map((cloud, i) => (
                 <div 
                   key={i} 
                   className="cloud bg-white" 
                   style={{ 
                     top: cloud.top,
                     left: cloud.left,
                     width: cloud.width,
                     height: cloud.height,
                     animationDuration: cloud.duration,
                     animationDelay: cloud.delay,
                     opacity: theme === 'sunny' ? cloud.opacity * 0.5 : cloud.opacity
                   }} 
                 />
               ))}
             </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default WeatherBackground;
