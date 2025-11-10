import WeatherIcon from "./WeatherIcon";
import { formatDate } from "../lib/utils";

export default function CurrentWeather({ data, location }) {
  if (!data) return null;

  const currentTemp = Math.round(data.current.temperature_2m);
  const weatherCode = data.current.weather_code;

  return (
    <div className="weather-bg rounded-2xl px-6 py-24 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between relative z-10">
        <div className="mb-4">
          <p className="text-2xl font-bold text-white mb-2">{location.name}</p>
          <p className="text-blue-100 text-base">{formatDate(new Date())}</p>
        </div>

        <div className="flex items-center space-x-4">
          <WeatherIcon code={weatherCode} size="large" />
          <div className="ml-8 text-8xl font-bold text-white text-shadow italic">
            {currentTemp}&deg;
          </div>
        </div>
      </div>
    </div>
  );
}
