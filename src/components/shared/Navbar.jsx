import { ChevronDown, Heart, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import SearchBar from "../SearchBar";
import CartSlider from "./CartSlider";
import SubHeader from "./SubHeader";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Beauty",
    "Health",
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Close dropdowns when clicking outside
  const closeDropdowns = () => {
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <SubHeader />

        {/* Main navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-12">
            {/* Logo */}
            <>
              <img
                className="w-32 cursor-pointer"
                src={logo}
                alt="uniMart logo"
              />
            </>

            {/* Search Bar - Desktop Only */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              <button className="relative p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 group">
                <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Cart */}
              <div className="relative p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 group">
                <CartSlider isOpen={isOpen} toggleCart={toggleCart} />
                {/* TODO: NEED TO CHANGE */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* User Account */}
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200"
                >
                  <User className="w-6 h-6 text-gray-600" />
                  <span className="hidden sm:inline text-gray-700 font-medium">
                    Account
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">
                        Welcome to UniMart
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        Sign in to your account
                      </p>
                    </div>
                    <Link
                      to="/login"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Create Account
                    </Link>
                    <Link
                      to="/dashboard/user"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      User Dashboard
                    </Link>
                    <Link
                      to="/dashboard/admin"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Admin Dashboard
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      My Orders
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      My Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Settings
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Categories bar - Desktop */}
        <div className="hidden md:block bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-8 py-4">
              {categories.map((category) => (
                <a
                  key={category}
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-semibold whitespace-nowrap py-1 border-b-2 border-transparent hover:border-blue-600"
                >
                  {category}
                </a>
              ))}
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-semibold py-1 border-b-2 border-transparent hover:border-blue-600"
              >
                More Categories
              </a>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            {/* Mobile search - Only show in mobile menu */}
            <div className="px-4 py-4 border-b border-gray-100">
              <SearchBar placeholder="Search UniMart..." />
            </div>

            {/* Mobile categories */}
            <div className="px-4 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                Browse Categories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <a
                    key={category}
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile quick links */}
            <div className="px-4 py-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Seller Center
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Help & Support
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Track Your Order
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  My Orders
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Overlay for dropdown - Removed black background */}
      {(isMenuOpen || isUserDropdownOpen) && (
        <div className="fixed inset-0 z-40" onClick={closeDropdowns} />
      )}
    </>
  );
}
