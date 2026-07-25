const getIconEmoji = (weatherCode, isDay = true) => {
  if (weatherCode === 0) return isDay ? '☀️' : '🌙';
  if (weatherCode === 1 || weatherCode === 2) return isDay ? '⛅' : '☁️';
  if (weatherCode === 3) return '☁️';
  if (weatherCode === 45 || weatherCode === 48) return '🌫️';
  if (weatherCode >= 51 && weatherCode <= 67) return '🌧️';
  if (weatherCode >= 71 && weatherCode <= 77) return '❄️';
  if (weatherCode >= 80 && weatherCode <= 82) return '🌧️';
  if (weatherCode === 85 || weatherCode === 86) return '❄️';
  if (weatherCode >= 95 && weatherCode <= 99) return '⛈️';
  return '🌤️';
};

const getConditionText = (weatherCode) => {
  if (weatherCode === 0) return 'Clear sky';
  if (weatherCode === 1) return 'Mainly clear';
  if (weatherCode === 2) return 'Partly cloudy';
  if (weatherCode === 3) return 'Overcast';
  if (weatherCode === 45 || weatherCode === 48) return 'Fog';
  if (weatherCode >= 51 && weatherCode <= 57) return 'Drizzle';
  if (weatherCode >= 61 && weatherCode <= 67) return 'Rain';
  if (weatherCode >= 71 && weatherCode <= 77) return 'Snow';
  if (weatherCode >= 80 && weatherCode <= 82) return 'Rain showers';
  if (weatherCode === 85 || weatherCode === 86) return 'Snow showers';
  if (weatherCode >= 95 && weatherCode <= 99) return 'Thunderstorm';
  return 'Unknown';
};

const formatTimeFromIso = (isoString) => {
  if (!isoString) return "--:--";
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const fetchWeather = async (city) => {
  try {
    // 1. Geocoding API to get lat/lon for the city
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    
    if (!geoRes.ok) throw new Error("Failed to fetch location data.");
    
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found.");
    }

    const location = geoData.results[0];
    const { latitude, longitude, name, country } = location;

    // 2. Weather API to get current and forecast data
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
    );

    if (!weatherRes.ok) throw new Error("Failed to fetch weather data.");

    const weatherData = await weatherRes.json();
    const currentData = weatherData.current;
    const dailyData = weatherData.daily;

    // 3. Transform to our UI's expected format
    const current = {
      city: name,
      country: country,
      temp: Math.round(currentData.temperature_2m),
      condition: getConditionText(currentData.weather_code),
      icon: getIconEmoji(currentData.weather_code, currentData.is_day === 1),
      humidity: currentData.relative_humidity_2m,
      windSpeed: Math.round(currentData.wind_speed_10m),
      pressure: Math.round(currentData.surface_pressure),
      visibility: 10, // Open-Meteo doesn't easily expose visibility in standard tier, hardcoding a reasonable default or omitting
      feelsLike: Math.round(currentData.apparent_temperature),
      sunrise: formatTimeFromIso(dailyData.sunrise[0]),
      sunset: formatTimeFromIso(dailyData.sunset[0]),
      isDay: currentData.is_day === 1,
      rawSunrise: dailyData.sunrise[0],
      rawSunset: dailyData.sunset[0],
      currentTime: currentData.time,
    };

    const forecast = [];
    // Open-Meteo returns 7 days of forecast by default. We'll take the first 5 days.
    for (let i = 0; i < 5; i++) {
      const dateStr = dailyData.time[i];
      const date = new Date(dateStr);
      // Ensure the timezone is respected for the day name
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      forecast.push({
        day: dayName,
        temp: Math.round(dailyData.temperature_2m_max[i]), // using max temp for the day
        icon: getIconEmoji(dailyData.weather_code[i], true),
        condition: getConditionText(dailyData.weather_code[i]),
      });
    }

    return { current, forecast };
  } catch (error) {
    throw error;
  }
};
