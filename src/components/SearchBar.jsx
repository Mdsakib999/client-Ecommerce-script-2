import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetAllProductQuery } from "../redux/app/services/product/productApi";
import Loader from "../utils/Loader";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();

  const params = {
    searchTerm: query,
    limit: 10000,
  };

  const { data: productsData, isLoading: isProductLoading } =
    useGetAllProductQuery(params);

  const products = productsData?.data || [];

  if (isProductLoading) return <Loader />;

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search for products..."
          className="w-full px-8 py-3 pr-12 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
        />
        <button className="absolute right-2 top-1/2 pr-4 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {focused && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-80 overflow-auto">
          {products.length === 0 ? (
            <li className="px-4 py-6 text-center text-gray-500 font-serif text-base">
              No products found. Please try a different search.
            </li>
          ) : (
            products.map((product) => (
              <li
                key={product._id}
                className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all"
                onMouseDown={() => {
                  navigate(`/product/${product._id}`);
                  setFocused(false);
                  setQuery("");
                }}
                tabIndex={0}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                  />
                  <div>
                    <div className="font-semibold text-gray-800 text-sm font-serif">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500 font-serif">
                      {product.brand} • {product.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-blue-600 font-serif">
                    ৳{product.discountPrice || product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="text-xs text-gray-400 line-through ml-2">
                      ৳{product.price}
                    </span>
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
