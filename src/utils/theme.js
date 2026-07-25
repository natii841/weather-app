export const getTheme = (data) => {
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

export const getThemeType = (theme) => {
  // Return 'light' or 'dark' to set the CSS variables correctly.
  // 'light' backgrounds mean we need dark text for contrast.
  // 'dark' backgrounds mean we need white text for contrast.
  const lightBackgrounds = ["sunny", "snow", "cloudy"];
  return lightBackgrounds.includes(theme) ? "theme-light" : "theme-dark";
};
