import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdown from "../assets/images/icon-dropdown.svg";
import search from "../assets/images/icon-search.svg";

export default function LoadingState() {
  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <img src={logo} alt="Weather now" className="w-40 sm:w-auto" />
          </div>

          <button className="flex items-center space-x-2 glass-card px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200">
            <img src={unitsIcon} alt="" className="inline-block mr-2" />
            Units
            <img src={dropdown} alt="" className={"inline-block ml-2"} />
          </button>
        </header>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-16 text-shadow">
            How's the sky looking today?
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <img
                src={search}
                alt=""
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 z-10"
              />
              <input
                type="text"
                placeholder="Search for a place..."
                className="w-full pl-10 pr-4 py-3 glass-card rounded-lg text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                disabled
              />
            </div>

            <button
              type="button"
              disabled
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-600 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Current weather */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>

                <div className="text-neutral-300">Loading...</div>
              </div>
            </div>

            {/* Weather metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {["Feels Like", "Humidity", "Wind", "Precipitation"].map(
                (label, index) => (
                  <div key={index} className="glass-card rounded-xl p-4">
                    <div className="text-neutral-300 text-sm mb-1">{label}</div>
                    <div className="text-2xl font-bold text-neutral-500">—</div>
                  </div>
                )
              )}
            </div>

            {/* Daily forecast */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Daily forecast
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-lg p-4 text-center animate-pulse"
                  >
                    <div className="h-4 glass-card rounded mb-2"></div>
                    <div className="h-8 glass-card rounded mb-3"></div>
                    <div className="space-y-1">
                      <div className="h-4 glass-card rounded"></div>
                      <div className="h-3 glass-card rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hourly forecast */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Hourly forecast
                </h3>
                <div className="glass-card px-3 py-2 rounded-lg">
                  <span className="text-white">—</span>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {Array.from({ length: 8 }).map((_, index) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
