import { Search } from "lucide-react";

export default function SearchBar({
  className = "",
  placeholder = "Search for products...",
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
      />
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
