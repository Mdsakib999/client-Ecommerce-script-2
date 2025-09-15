import { MapPin } from "lucide-react";
import { Link } from "react-router";

export default function SubHeader() {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center md:justify-between items-center py-2 text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Deliver to</span>
            <span className="text-gray-800 font-semibold">Chattogram 4000</span>
          </div>
          <div className="hidden lg:flex items-center space-x-6 text-gray-600">
            <Link
              to="/about"
              className="hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link
              to="/track-order"
              className="hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Track Order
            </Link>
            <Link
              to="/faq"
              className="hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Faq
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
