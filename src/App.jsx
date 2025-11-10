import { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Metrics from "./components/Metrics";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import LoadingState from "./components/LoadingState";
import { fetchWeatherData, fetchLocationData } from "./lib/utils";
import error from "./assets/images/icon-error.svg";
import retry from "./assets/images/icon-retry.svg";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({
    name: "Berlin, Germany",
    lat: 52.52,
    lon: 13.405,
  });
  const [units, setUnits] = useState("metric");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setShowSearchResults(false);

    try {
      const locationData = await fetchLocationData(searchTerm);
      setSearchResults(locationData);

      if (locationData.length > 0) {
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error("Error searching location", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (locationData) => {
    const newLocation = {
      name: `${locationData.name}, ${locationData.country}`,
      lat: locationData.latitude,
      lon: locationData.longitude,
    };
    setLocation(newLocation);
    setShowSearchResults(false);
    setSearchResults([]);
  };

  const loadWeatherData = async () => {
    if (!weatherData) {
      setInitialLoading(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await fetchWeatherData(location.lat, location.lon, units);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, [location, units]);

  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  if (initialLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header units={units} onToggleUnits={toggleUnits} />

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-16 text-shadow">
            How's the sky looking today?
          </h1>
          <Search
            onSearch={handleSearch}
            loading={loading}
            searchResults={searchResults}
            showSearchResults={showSearchResults}
            onLocationSelect={handleLocationSelect}
            onCloseResults={() => setShowSearchResults(false)}
          />
        </div>

        {weatherData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CurrentWeather data={weatherData} location={location} />

              <Metrics data={weatherData} units={units} loading={loading} />

              <DailyForecast
                data={weatherData}
                onDaySelect={setSelectedDay}
                selectedDay={selectedDay}
                loading={loading}
              />
            </div>

            <div className="lg:col-span-1">
              <HourlyForecast
                data={weatherData}
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
                loading={loading}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center max-w-lg mx-auto space-y-4">
            <img src={error} alt="" className="block mx-auto size-10" />
            <h2 className="text-4xl">Something went wrong</h2>
            <p className="text-gray-400">
              We couldn't connect to the server (API error). Please try again in
              a few moments.
            </p>

            <button
              onClick={fetchWeatherData}
              className="flex items-center justify-center space-x-2 glass-card px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              <img src={retry} alt="" className="mr-2 size-4" />
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
