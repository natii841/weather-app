import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { CloudLightning } from "lucide-react";

function Header({ onSearch }) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-8 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-50"
    >
      <motion.div 
        className="flex items-center gap-4 cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="glass-pill p-3 rounded-2xl group-hover:bg-white/30 transition-all duration-300">
          <CloudLightning className="drop-shadow-md" size={32} />
        </div>
        <h1 className="text-4xl font-black tracking-tighter">
          <span className="drop-shadow-sm">Weather</span>
          <span className="opacity-70">Cast</span>
        </h1>
      </motion.div>

      <div className="w-full md:w-[400px]">
        <SearchBar onSearch={onSearch} />
      </div>
    </motion.header>
  );
}

export default Header;