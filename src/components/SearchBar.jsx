import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetAllProductQuery } from "../redux/app/services/product/productApi";

export default function SearchBar({ placeholder = "Search for products..." }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const params = { searchTerm: query, limit: 10000 };
  const { data: productsData, isLoading } = useGetAllProductQuery(params);
  const products = productsData?.data || [];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Search Results Dropdown - Fixed z-index for mobile */}
      {focused && query && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] max-h-80 overflow-auto">
          {isLoading ? (
            <li className="px-4 py-6 text-center text-gray-500">
              <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            </li>
          ) : products.length === 0 ? (
            <li className="px-4 py-6 text-center text-gray-500 font-serif">
              No products found. Try a different search.
            </li>
          ) : (
            products.map((product) => (
              <li
                key={product._id}
                className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-gray-50 last:border-0"
                onMouseDown={() => {
                  navigate(`/product/${product._id}`);
                  setFocused(false);
                  setQuery("");
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                  />
                  <div>
                    <div className="font-semibold text-gray-800 text-xs md:text-sm truncate max-w-48">
                      {product.name.slice(0, 15)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.brand} • {product.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-blue-600">
                    ৳{product.discountPrice || product.price}
                  </span>
                  {product.discountPrice && (
                    <div className="text-xs text-gray-400 line-through">
                      ৳{product.price}
                    </div>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
