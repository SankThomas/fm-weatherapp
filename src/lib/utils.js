// Fetch weather data from Open-Meteo API
export const fetchWeatherData = async (lat, lon, units = "metric") => {
  const tempUnit = units === "metric" ? "celsius" : "fahrenheit";
  const windSpeedUnit = units === "metric" ? "kmh" : "mph";
  const precipitationUnit = units === "metric" ? "mm" : "inch";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${tempUnit}&wind_speed_unit=${windSpeedUnit}&precipitation_unit=${precipitationUnit}&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

// Fetch location data from Open-Meteo Geocoding API
export const fetchLocationData = async (query) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query
  )}&count=5&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }

  const data = await response.json();
  return data.results || [];
};

// Format date for display
export const formatDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

// Get day name for forecast
export const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

// Get temperature unit symbol
export const getTemperatureUnit = (units) => {
  return units === "metric" ? "°C" : "°F";
};

// Get wind speed unit
export const getWindSpeedUnit = (units) => {
  return units === "metric" ? "km/h" : "mph";
};

// Get precipitation unit
export const getPrecipitationUnit = (units) => {
  return units === "metric" ? "mm" : "in";
};

// Weather code descriptions (WMO codes)
export const getWeatherDescription = (code) => {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return descriptions[code] || "Unknown";
};
