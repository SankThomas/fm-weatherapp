import WeatherIcon from "./WeatherIcon";
import { getDayName } from "../lib/utils";

export default function DailyForecast({ data, onDaySelect, selectedDay }) {
  const dailyData = data.daily;

  if (!data)
    return (
      <div className="rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Daily forecast
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {dailyData.time.slice(0, 7).map((_, index) => (
            <button
              key={index}
              className="glass-card rounded-lg px-4 py-20 text-center hover:bg-white/20 transition-all duration-200"
            ></button>
          ))}
        </div>
      </div>
    );

  return (
    <div className="rounded-xl">
      <h3 className="text-xl font-semibold mb-4 text-white">Daily forecast</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {dailyData.time.slice(0, 7).map((date, index) => {
          const isSelected = selectedDay === index;
          const dayName = getDayName(date, index);
          const maxTemp = Math.round(dailyData.temperature_2m_max[index]);
          const minTemp = Math.round(dailyData.temperature_2m_min[index]);
          const weatherCode = dailyData.weather_code[index];

          return (
            <button
              key={index}
              onClick={() => onDaySelect(index)}
              className={`glass-card rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-200 ${
                isSelected ? "bg-white/20 ring-2 ring-blue-400" : ""
              }`}
            >
              <div className="text-sm text-gray-300 mb-2">{dayName}</div>
              <div className="mb-3">
                <WeatherIcon code={weatherCode} size="medium" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold text-sm">
                  {maxTemp}&deg;
                </div>
                <div className="text-sm">{minTemp}&deg;</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
