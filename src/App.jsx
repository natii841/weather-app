import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [cityInput, setCityInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dynamically pull the API base URL from the frontend .env file
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/weather?city=${cityName}`);
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError('Could not find weather for that city. Try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('New York');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    fetchWeather(cityInput);
    setCityInput('');
  };

  const iconUrl = weather ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png` : null;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight text-white">
          Weather app
        </div>
      </header>

      {/* Hero Section Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        
        {/* Large Rounded Hero Box */}
        <div className="w-full max-w-5xl bg-[#111827]/80 border border-white/5 rounded-3xl p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
          
          {/* Hero Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-2xl leading-tight text-white mb-8">
            Discover the weather in every city you go
          </h1>

          {/* Floating Pill Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-md relative flex items-center mb-16">
            <input
              type="text"
              placeholder="Search for a city..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-full bg-white text-slate-900 px-6 py-4 rounded-full text-base font-medium placeholder-slate-400 focus:outline-none shadow-lg pr-24 transition-all"
            />
            <button 
              type="submit" 
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition"
            >
              Search
            </button>
          </form>

          {loading && <p className="text-slate-400 animate-pulse">Loading atmospheric data...</p>}
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          {/* Overlapping 3-Card Layout */}
          {weather && !loading && (
            <div className="flex items-end justify-center gap-4 w-full pt-4">
              
              {/* Left Tilted Side Card */}
              <div className="hidden md:flex flex-col justify-between w-44 h-56 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md -rotate-6 transform translate-y-4 opacity-60 hover:opacity-100 transition duration-300">
                <span className="text-xs text-slate-400 font-medium">London</span>
                <div className="text-3xl font-bold tracking-tight">18°C</div>
              </div>

              {/* Center Main Active Card */}
              <div className="weather-card w-full max-w-xs bg-white/10 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col items-center z-10 scale-105 transition-all">
                {iconUrl && <img src={iconUrl} alt={weather.condition} className="w-14 h-14 mb-2 drop-shadow-md" />}
                <div className="text-5xl font-extrabold tracking-tighter my-2 text-white">
                  {weather.temperature}
                </div>
                <p className="text-sm font-medium text-slate-300">
                  {weather.city}, {weather.country}
                </p>
                <div className="w-full h-px bg-white/10 my-4"></div>
                <div className="grid grid-cols-2 w-full gap-2 text-xs text-slate-300">
                  <div className="bg-white/5 p-2 rounded-lg">Humidity: <span className="font-bold text-white">{weather.humidity}</span></div>
                  <div className="bg-white/5 p-2 rounded-lg">Wind: <span className="font-bold text-white">{weather.wind}</span></div>
                </div>
              </div>

              {/* Right Tilted Side Card */}
              <div className="hidden md:flex flex-col justify-between w-44 h-56 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md rotate-6 transform translate-y-4 opacity-60 hover:opacity-100 transition duration-300">
                <span className="text-xs text-slate-400 font-medium">Tokyo</span>
                <div className="text-3xl font-bold tracking-tight">32°C</div>
              </div>

            </div>
          )}

        </div>
      </main>

    </div>
  );
}

export default App;