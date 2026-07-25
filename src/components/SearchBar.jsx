import { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
      setIsFocused(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="relative w-full md:w-96"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div 
        className={`glass-pill relative flex items-center overflow-hidden transition-all duration-500 ease-out ${
          isFocused ? 'ring-2 ring-current scale-105' : 'hover:opacity-90'
        }`}
      >
        <div className="absolute left-5 opacity-80">
          <Search size={22} />
        </div>
        <input
          type="text"
          placeholder="Search any city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent text-current placeholder-current opacity-80 focus:opacity-100 text-lg py-4 pl-14 pr-16 outline-none font-medium"
        />
        <AnimatePresence>
          {city.length > 0 && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              type="submit" 
              className="absolute right-2 bg-current text-white dark:text-black rounded-full p-2.5 shadow-lg flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'var(--text-primary)', color: 'var(--card-bg)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search size={18} strokeWidth={3} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}

export default SearchBar;
