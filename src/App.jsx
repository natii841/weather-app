import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherDashboard from "./components/WeatherDashboard";
import WeatherBackground from "./components/WeatherBackground";
import { fetchWeather } from "./services/weatherApi";
import { getTheme, getThemeType } from "./utils/theme";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    loadWeather(city);
  };

  // Determine the background condition based on weather data
  const backgroundData = weatherData ? weatherData.current : null;
  const currentTheme = getTheme(backgroundData);
  const themeClass = getThemeType(currentTheme);

  return (
    <>
      <WeatherBackground weatherData={backgroundData} />
      
      <div className={`flex flex-col min-h-screen relative z-10 selection:bg-white/30 selection:text-white ${themeClass}`}>
        <Header onSearch={handleSearch} />
        
        <div className="flex-grow flex flex-col justify-center">
          <WeatherDashboard 
            weatherData={weatherData} 
            loading={loading} 
            error={error} 
          />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;