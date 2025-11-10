import sunny from "../assets/images/icon-sunny.webp";
import overcast from "../assets/images/icon-overcast.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import fog from "../assets/images/icon-fog.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import storm from "../assets/images/icon-storm.webp";

const sizeClasses = {
  small: "size-10",
  medium: "size-16",
  large: "size-24",
};

// Map WMO weather codes: icon + alt text
const weatherIconMap = {
  0: { src: sunny, alt: "clear sky" },
  1: { src: partlyCloudy, alt: "mainly clear" },
  2: { src: partlyCloudy, alt: "partly cloudy" },
  3: { src: overcast, alt: "overcast" },
  45: { src: fog, alt: "fog" },
  48: { src: fog, alt: "rime fog" },
  51: { src: drizzle, alt: "light drizzle" },
  53: { src: drizzle, alt: "moderate drizzle" },
  55: { src: drizzle, alt: "dense drizzle" },
  56: { src: drizzle, alt: "light freezing drizzle" },
  57: { src: drizzle, alt: "dense freezing drizzle" },
  61: { src: rain, alt: "slight rain" },
  63: { src: rain, alt: "moderate rain" },
  65: { src: rain, alt: "heavy rain" },
  66: { src: rain, alt: "light freezing rain" },
  67: { src: rain, alt: "heavy freezing rain" },
  71: { src: snow, alt: "slight snowfall" },
  73: { src: snow, alt: "moderate snowfall" },
  75: { src: snow, alt: "heavy snowfall" },
  77: { src: snow, alt: "snow grains" },
  80: { src: rain, alt: "slight rain showers" },
  81: { src: rain, alt: "moderate rain showers" },
  82: { src: rain, alt: "violent rain showers" },
  85: { src: snow, alt: "slight snow showers" },
  86: { src: snow, alt: "heavy snow showers" },
  95: { src: storm, alt: "thunderstorm" },
  96: { src: storm, alt: "thunderstorm with slight hail" },
  99: { src: storm, alt: "thunderstorm with heavy hail" },
};

// Default fallback icon (if unknown code)
const defaultIcon = { src: overcast, alt: "unknown weather" };

export default function WeatherIcon({ code, size = "medium" }) {
  const { src, alt } = weatherIconMap[code] || defaultIcon;

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} block mx-auto`}
      loading="lazy"
    />
  );
}
