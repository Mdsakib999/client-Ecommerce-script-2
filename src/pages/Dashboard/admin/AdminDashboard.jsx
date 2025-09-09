import { useState } from "react";
import {
  BarChart3,
  MessageCircle,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "../../../assets/logo.png";
import Logo from "../../../components/shared/Logo";

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle
  const [collapsed, setCollapsed] = useState(false); // desktop collapse

  const menuItems = [
    { name: "Overview", icon: BarChart3, active: true },
    { name: "Performance", icon: TrendingUp },
    { name: "Campaigns", icon: Users },
    { name: "Orders", icon: ShoppingCart },
    { name: "Products", icon: Package },
    { name: "Messages", icon: MessageCircle },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="fixed md:hidden top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-white shadow z-50">
       <Logo w='28' />
        <button onClick={() => setIsOpen(!isOpen)} className="p-1">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          ${collapsed ? "w-20" : "w-64"} bg-white shadow-sm
          top-14 md:top-0 h-[calc(100vh-56px)] md:h-full flex flex-col`}
      >
        {/* Logo + Collapse */}
        <div
          className={`flex items-center border-b p-4 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <img className="w-32 cursor-pointer" src={logo} alt="uniMart logo" />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:inline-flex p-1 rounded hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu */}
        <div className="px-4 flex-1 mt-4">
          {!collapsed && (
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">
              Main Menu
            </p>
          )}

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className={`flex items-center py-3 cursor-pointer rounded-lg transition-colors
                    ${collapsed ? "justify-center" : "px-4 space-x-3"}
                    ${
                      item.active
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{item.name}</span>}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed top-14 inset-x-0 bottom-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-6 pt-14 mt-4 md:pt-0 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here you can manage everything.
        </p>
      </main>
    </div>
  );
}
