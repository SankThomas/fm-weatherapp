import { useState } from "react";
import WeatherIcon from "./WeatherIcon";
import { getDayName } from "../lib/utils";
import dropdown from "../assets/images/icon-dropdown.svg";

export default function HourlyForecast({
  data,
  selectedDay,
  onDayChange,
  loading,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hourlyData = data.hourly;
  const dailyData = data.daily;

  // Get hourly data for selected day (24 hours starting from selected day)
  const startHour = selectedDay * 24;
  const endHour = startHour + 24;

  const selectedDayHours = hourlyData.time
    .slice(startHour, endHour)
    .map((time, index) => {
      const hour = new Date(time).getHours();
      const temp = Math.round(hourlyData.temperature_2m[startHour + index]);
      const weatherCode = hourlyData.weather_code[startHour + index];

      return {
        time: `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour} ${
          hour < 12 ? "AM" : "PM"
        }`,
        temp,
        weatherCode,
      };
    });

  const selectedDayName = getDayName(dailyData.time[selectedDay], selectedDay);

  return (
    <div className="glass-card rounded-xl p-6 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Hourly forecast</h3>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 glass-card px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            <span className="text-white">{selectedDayName}</span>

            <img src={dropdown} alt="" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 glass-card rounded-lg shadow-lg z-50">
              <div className="py-2">
                {dailyData.time.slice(0, 7).map((date, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onDayChange(index);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${
                      selectedDay === index ? "bg-white/20" : ""
                    }`}
                  >
                    <div className="text-white text-sm">
                      {getDayName(date, index)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-2 animate-pulse"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 glass-card rounded"></div>
                  <div className="h-4 w-12 glass-card rounded"></div>
                </div>
                <div className="h-4 w-8 glass-card rounded"></div>
              </div>
            ))
          : selectedDayHours.map((hour, index) => (
              <div
                key={index}
                className="glass-card flex items-center justify-between py-2 hover:bg-white/10 rounded-lg px-2 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <WeatherIcon code={hour.weatherCode} size="small" />
                  <span className="text-white font-medium">{hour.time}</span>
                </div>
                <span className="text-white font-semibold">{hour.temp}°</span>
              </div>
            ))}
      </div>
    </div>
  );
}
