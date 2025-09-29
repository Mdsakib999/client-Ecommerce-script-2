import { ShoppingCart } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-screen fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-70">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning cart icon */}
        <ShoppingCart className="w-12 h-12 text-blue-500 animate-spin-slow" />

        {/* Loading text */}
        <p className="text-gray-700 text-lg font-semibold font-sans">
          Loading your UniMart experience...
        </p>

        {/* Dots animation */}
        <div className="flex space-x-1">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-75"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
}
