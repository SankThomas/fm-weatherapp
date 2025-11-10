import {
  getTemperatureUnit,
  getWindSpeedUnit,
  getPrecipitationUnit,
} from "../lib/utils";

export default function Metrics({ data, units, loading }) {
  const metrics = [
    {
      label: "Feels Like",
      value: `${Math.round(data.current.apparent_temperature)}`,
      unit: getTemperatureUnit(units),
    },
    {
      label: "Humidity",
      value: `${data.current.relative_humidity_2m}%`,
      unit: "",
    },
    {
      label: "Wind",
      value: `${Math.round(data.current.wind_speed_10m)}`,
      unit: getWindSpeedUnit(units),
    },
    {
      label: "Precipitation",
      value: `${data.current.precipitation}`,
      unit: getPrecipitationUnit(units),
    },
  ];

  if (!data)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="glass-card rounded-xl rounde-xl p-4 hover:bg-white/20 transition-all duration-200"
          >
            <div className="text-gray-300 text-sm mb-1">{metric.label}</div>
            <div className="text-white">__</div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="glass-card rounded-xl rounde-xl p-4 hover:bg-white/20 transition-all duration-200"
        >
          <div className="text-gray-300 text-sm mb-1">{metric.label}</div>
          <div className="text-2xl font-bold text-white">
            {metric.value}
            {metric.unit && (
              <span className="text-lg text-gray-300 ml-1">{metric.unit}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
