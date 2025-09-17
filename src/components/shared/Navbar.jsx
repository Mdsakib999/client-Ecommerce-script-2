import { ChevronDown, Heart, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import SearchBar from "../SearchBar";
import CartSlider from "./CartSlider";
import Logo from "./Logo";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "../../redux/app/services/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "./SubHeader";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: userInfo } = useUserInfoQuery();
  const user = userInfo?.data;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isPictureLoaded, setIsPictureLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.items.length);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    if (isUserDropdownOpen) setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const closeDropdowns = () => {
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const toggleCart = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!user?.picture) return;

    const img = new Image();
    img.src = user?.picture;
    img.onload = () => setIsPictureLoaded(true);
    img.onerror = () => setIsPictureLoaded(false);
  }, [user?.picture]);

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(authApi.util.resetApiState());
    closeDropdowns();
    toast(<p className="font-serif">Logged out successfully!</p>, {
      position: "bottom-right",
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        closeDropdowns();
      }
    };

    if (isMenuOpen || isUserDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMenuOpen, isUserDropdownOpen]);

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <SubHeader />

        {/* Main navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-8">
            {/* Logo */}
            <Logo w="32" />

            {/* Search Bar - Desktop Only */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-6 xl:mx-8">
              <SearchBar />
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Shopping Cart */}
              <div
                className="mt-3 cursor-pointer relative p-1 sm:p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                onClick={toggleCart}
              >
                {/* Cart content */}
                <CartSlider isOpen={isOpen} toggleCart={toggleCart} />

                {/* Cart count badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* User Account - only show on desktop */}
              <div className="relative dropdown-container hidden lg:block">
                <button
                  onClick={toggleUserDropdown}
                  className="cursor-pointer flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 min-w-0"
                >
                  {isPictureLoaded ? (
                    <img
                      src={user?.picture}
                      alt={user?.name || "User"}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-200 shadow-sm flex-shrink-0"
                    />
                  ) : (
                    <User className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 flex-shrink-0" />
                  )}
                  <span className="hidden sm:inline text-gray-700 font-medium text-sm truncate max-w-20 lg:max-w-24">
                    {user ? user?.name?.split(" ")[0] : "Account"}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform duration-200 flex-shrink-0 ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transition-all duration-200 ease-out origin-top-right ${
                    isUserDropdownOpen
                      ? "opacity-100 scale-100 visible"
                      : "opacity-0 scale-95 invisible"
                  }`}
                >
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          {isPictureLoaded && user.picture ? (
                            <img
                              src={user.picture}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      {user?.role === "ADMIN" ? (
                        <Link
                          to="/dashboard/admin"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                          onClick={closeDropdowns}
                        >
                          Admin Dashboard
                        </Link>
                      ) : (
                        <Link
                          to="/dashboard/user"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                          onClick={closeDropdowns}
                        >
                          Dashboard
                        </Link>
                      )}
                      <hr className="my-1 border-gray-100" />
                      {user?.role === "ADMIN" ? (
                        <Link
                          to="dashboard/admin/profile"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                          onClick={closeDropdowns}
                        >
                          My Profile
                        </Link>
                      ) : (
                        <Link
                          to="dashboard/user/profile"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                          onClick={closeDropdowns}
                        >
                          My Profile
                        </Link>
                      )}
                      <hr className="my-1 border-gray-100" />
                      <button
                        className="cursor-pointer w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 font-semibold"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
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
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                        onClick={closeDropdowns}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                        onClick={closeDropdowns}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden dropdown-container">
                <button
                  onClick={toggleMenu}
                  className="p-2 sm:p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Always visible on small screens */}
          <div className="lg:hidden px-1 pb-3">
            <SearchBar placeholder="Search UniMart..." />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-[800px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="px-4 py-4 space-y-2">
            {/* User Info Section */}
            {user ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {isPictureLoaded && user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">
                  Welcome to UniMart
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Sign in to access your account
                </p>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1">
              {user ? (
                <>
                  <Link
                    to={
                      user.role === "ADMIN"
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium"
                    onClick={closeDropdowns}
                  >
                    {user.role === "ADMIN"
                      ? "Admin Dashboard"
                      : "User Dashboard"}
                  </Link>

                  <Link
                    to="/orders"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium"
                    onClick={closeDropdowns}
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium"
                    onClick={closeDropdowns}
                  >
                    My Profile
                  </Link>
                  <hr className="mt-2 border-gray-200" />

                  <button
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center p-3 rounded-lg hover:bg-red-50 transition-all duration-200 text-red-600 font-semibold w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full border-2 border-blue-600 text-blue-600 text-center py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Quick Links
              </h3>
              <div className="space-y-1">
                <Link
                  to="/about"
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  onClick={closeDropdowns}
                >
                  About
                </Link>
                <Link
                  to="/track-order"
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  onClick={closeDropdowns}
                >
                  Track Order
                </Link>{" "}
                <Link
                  to="/faq"
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  onClick={closeDropdowns}
                >
                  Faq
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  onClick={closeDropdowns}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      {(isMenuOpen || isUserDropdownOpen) && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 lg:hidden"
          onClick={closeDropdowns}
        />
      )}
    </>
  );
}
