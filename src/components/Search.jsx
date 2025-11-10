import { useState } from "react";
import search from "../assets/images/icon-search.svg";

export default function Search({
  onSearch,
  loading,
  searchResults,
  showSearchResults,
  onLocationSelect,
  onCloseResults,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      onCloseResults();
    }
  };

  return (
    <div className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <img
            src={search}
            alt=""
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a place..."
            className="w-full pl-10 pr-4 py-3 glass-card rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
            disabled={loading}
          />

          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Progress indicator */}
      {loading && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-lg p-6 z-50">
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="animate-spin rounded-full size-4 border-b-2 border-white"></div>
            <span className="text-sm">Search in progress</span>
          </div>
        </div>
      )}

      {/* Search results */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {searchResults.map((result, index) => (
            <button
              key={index}
              onClick={() => onLocationSelect(result)}
              className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
            >
              <div className="text-white font-medium">{result.name}</div>
              <div className="text-gray-300 text-sm">
                {result.admin1 && `${result.admin1}, `}
                {result.country}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
