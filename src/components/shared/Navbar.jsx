import {
  ChevronDown,
  HelpCircle,
  Home,
  Info,
  LogOut,
  Menu,
  Package,
  Phone,
  User,
  X,
} from "lucide-react";
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
import { clearCart } from "../../redux/app/features/cart/cartSlice";

export default function Navbar() {
  const { data: userInfo } = useUserInfoQuery();
  const user = userInfo?.data;
  const cartCount = useSelector((state) => state.cart.totalQuantity);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isPictureLoaded, setIsPictureLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.picture) return;
    const img = new Image();
    img.src = user.picture;
    img.onload = () => setIsPictureLoaded(true);
    img.onerror = () => setIsPictureLoaded(false);
  }, [user?.picture]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setIsUserDropdownOpen(false);
      }
      if (
        !e.target.closest(".mobile-menu-container") &&
        !e.target.closest(".mobile-menu-trigger")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    dispatch(authApi.util.resetApiState());
    dispatch(clearCart());
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    setIsPictureLoaded(false);
    toast.success("Logged out successfully", { position: "bottom-right" });
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <SubHeader />

        {/* Main navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6">
          <div className="flex justify-between items-center py-4">
            {/* Mobile menu button - Left side */}
            <button
              className="lg:hidden mobile-menu-trigger p-2 hover:bg-gray-50 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Logo - Center on mobile, Left on desktop */}
            <div className="lg:flex-shrink-0 w-32">
              <Logo />
            </div>

            {/* Search Bar - Desktop Only */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-6 xl:mx-8">
              <SearchBar />
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              {/* Shopping Cart */}

              <div
                className="relative p-2 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                {/* Cart Slider */}
                <CartSlider
                  isOpen={isCartOpen}
                  toggleCart={() => setIsCartOpen(!isCartOpen)}
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </div>

              <div className="relative dropdown-container hidden lg:block">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  {isPictureLoaded ? (
                    <img
                      src={user?.picture}
                      alt={user?.name || "User"}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                  <span className="hidden sm:inline text-gray-700 font-medium text-sm max-w-24 truncate">
                    {user ? user?.name?.split(" ")[0] : "Account"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            {isPictureLoaded ? (
                              <img
                                src={user.picture}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover border"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
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
                        <Link
                          to={
                            user?.role === "ADMIN"
                              ? "/dashboard/admin"
                              : "/dashboard/user"
                          }
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to={
                            user?.role === "ADMIN"
                              ? "/dashboard/admin/profile"
                              : "/dashboard/user/profile"
                          }
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                        <hr className="border-gray-100" />
                        <button
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
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
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden px-1 pb-4">
            <SearchBar placeholder="Search UniMart..." />
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[9999] transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity"
          onClick={closeMobileMenu}
        />

        {/* Slide Menu */}
        <div
          className={`mobile-menu-container relative bg-white h-full w-80 max-w-[85vw] shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Logo w={40} />
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-gray-200 hover:bg-opacity-10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto h-[calc(100%-76px)]">
            {/* User Section */}
            {user ? (
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {isPictureLoaded ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-500" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-blue-50 border-b border-gray-200">
                <p className="font-medium text-blue-900 mb-2">
                  Welcome to UniMart
                </p>
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 border border-blue-500 text-blue-500 text-center py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="p-2">
              {user && (
                <>
                  <Link
                    to={
                      user.role === "ADMIN"
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                    onClick={closeMobileMenu}
                  >
                    <Home className="w-5 h-5 text-blue-500" />
                    {user.role === "ADMIN" ? "Admin Dashboard" : "Dashboard"}
                  </Link>

                  <Link
                    to={
                      user.role === "ADMIN"
                        ? "/dashboard/admin/profile"
                        : "/dashboard/user/profile"
                    }
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                    onClick={closeMobileMenu}
                  >
                    <User className="w-5 h-5 text-blue-500" />
                    My Profile
                  </Link>
                  <hr className="my-2 border-gray-200" />
                </>
              )}

              {/* Quick Links */}
              <div className="pt-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-3">
                  Quick Links
                </h3>
                <Link
                  to="/about"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                  onClick={closeMobileMenu}
                >
                  <Info className="w-5 h-5 text-gray-400" />
                  About Us
                </Link>
                <Link
                  to="/track-order"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                  onClick={closeMobileMenu}
                >
                  <Package className="w-5 h-5 text-gray-400" />
                  Track Order
                </Link>
                <Link
                  to="/faq"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                  onClick={closeMobileMenu}
                >
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  FAQ
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                  onClick={closeMobileMenu}
                >
                  <Phone className="w-5 h-5 text-gray-400" />
                  Contact
                </Link>
              </div>

              {user && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 font-semibold w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
