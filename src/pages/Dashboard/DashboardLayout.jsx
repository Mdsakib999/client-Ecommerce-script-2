import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Package,
  ShoppingCart,
  SquarePlus,
  UserCircle,
  Users,
  Star,
  X,
} from "lucide-react";

import { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router";

import Logo from "../../components/shared/Logo";
import { useUserInfoQuery } from "../../redux/app/services/auth/authApi";
import Loader from "../../utils/Loader";

export default function DashboardLayout() {
  const { data, isLoading } = useUserInfoQuery();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  let menuItems = [];
  if (data?.data?.role === "CUSTOMER") {
    menuItems = [
      { name: "Profile", icon: UserCircle, path: "profile" },
      { name: "My Orders", icon: ShoppingCart, path: "orders" },
    ];
  } else {
    menuItems = [
      { name: "Profile", icon: UserCircle, path: "profile" },
      { name: "Manage Orders", icon: ClipboardList, path: "manage-orders" },
      { name: "Manage Products", icon: Package, path: "manage-products" },
      { name: "Add Product", icon: SquarePlus, path: "add-product" },
      {
        name: "Manage Category",
        icon: LayoutDashboard,
        path: "manage-category",
      },
      { name: "Manage Users", icon: Users, path: "manage-users" },
      { name: "Manage Reviews", icon: Star, path: "manage-reviews" },
    ];
  }

  if (location.pathname === "/dashboard/user") {
    return <Navigate to="/dashboard/user/profile" replace />;
  }
  if (location.pathname === "/dashboard/admin") {
    return <Navigate to="/dashboard/admin/profile" replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full">
      {/* Mobile Header (fixed so sidebar doesn't cover it) */}
      <header className="fixed md:hidden top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-white shadow z-50">
        <Logo w="32" />
        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen((s) => !s)}
          className="p-1"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        // On mobile: fixed and starts BELOW the header (top-14) and height excludes header
        // On md+: static and full height
        className={`fixed left-0 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          ${collapsed ? "w-20" : "w-64"} bg-white shadow
          top-14 md:top-0 h-[calc(100vh-56px)] md:min-h-screen`}
      >
        {/* Logo & collapse button */}
        <div
          className={`${
            isOpen ? "hidden" : "flex"
          } items-center  border-b p-4 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && <Logo w="32" />}
          <button
            onClick={() => setCollapsed((s) => !s)}
            className="hidden md:inline-flex p-1 rounded hover:bg-gray-100"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="mt-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(
              data?.data?.role === "CUSTOMER"
                ? `/dashboard/user/${item.path}`
                : `/dashboard/admin/${item.path}`
            );

            return (
              <Link
                onClick={() => {
                  if (window.innerWidth <= 640) {
                    setIsOpen((s) => !s); // only toggle in sm and below
                  }
                }}
                to={item.path}
                className={`flex items-center py-3 cursor-pointer transition-colors
                  ${collapsed ? "justify-center" : "px-4"}
                  ${
                    isActive
                      ? "bg-blue-50 border-r-4 border-blue-500 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay (doesn't cover the top header) */}
      {isOpen && (
        <div
          className="fixed top-14 inset-x-0 bottom-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <main
        className={`flex-1 p-6 pt-14 mt-4 md:pt-0 transition-all duration-300 ${
          isOpen ? "opacity-20" : "opacity-100"
        } ${collapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        <h1 className="text-xl font-semibold">Welcome to Dashboard</h1>
        {/* ...rest of content */}
        <Outlet />
      </main>
    </div>
  );
}
