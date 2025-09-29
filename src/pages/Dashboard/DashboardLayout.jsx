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
  FerrisWheel,
  LogOut,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router";
import Logo from "../../components/shared/Logo";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "../../redux/app/services/auth/authApi";
import Loader from "../../utils/Loader";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/app/features/cart/cartSlice";

const SidebarNavItem = ({ item, isCollapsed, isActive, onClick }) => {
  const Icon = item.icon;

  const baseClasses = "flex items-center py-3 cursor-pointer transition-colors";
  const collapsedClasses = "justify-center";
  const expandedClasses = "px-4";
  const activeClasses = "bg-blue-50 border-r-4 border-blue-500 text-blue-600";
  const inactiveClasses = "text-gray-600 hover:bg-gray-50";

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${isCollapsed ? collapsedClasses : expandedClasses}
        ${isActive ? activeClasses : inactiveClasses}
      `}
    >
      <Icon className="w-5 h-5" />
      {!isCollapsed && <span className="ml-3">{item.name}</span>}
    </Link>
  );
};

const DashboardHeader = ({ onMenuClick, isOpen }) => (
  <header className="fixed md:hidden top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-white shadow z-50">
    <Logo w="32" />
    <button aria-label="Toggle menu" onClick={onMenuClick} className="p-1">
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  </header>
);

const DashboardSidebar = ({
  isCollapsed,
  setCollapsed,
  isOpen,
  setIsOpen,
  menuItems,
  basePath,
  handleLogout,
}) => {
  const location = useLocation();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <aside
      className={`fixed left-0 z-50 transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      ${isCollapsed ? "w-20" : "w-64"} bg-white shadow
      top-14 md:top-0 h-[calc(100vh-56px)] md:h-screen flex flex-col`}
    >
      {/* Logo & collapse button */}
      <div
        className={`hidden md:flex items-center border-b p-4 ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && <Logo w="32" />}
        <button
          onClick={() => setCollapsed((s) => !s)}
          className="p-1 rounded hover:bg-gray-100"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col justify-between">
        <div className="mt-4 space-y-1">
          {menuItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              item={item}
              isCollapsed={isCollapsed}
              isActive={location.pathname.startsWith(
                `${basePath}/${item.path}`
              )}
              onClick={handleLinkClick}
            />
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 p-3 cursor-pointer bg-red-600 hover:bg-red-700 transition-colors text-red-50 font-semibold w-full text-left ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && "Logout"}
        </button>
      </nav>
    </aside>
  );
};

export default function DashboardLayout() {
  const { data, isLoading } = useUserInfoQuery();
  const { pathname } = useLocation();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [collapsed, setCollapsed] = useState(false); // For desktop sidebar

  const userRole = data?.data?.role;

  const menuItems = useMemo(() => {
    const baseItems = [{ name: "Profile", icon: UserCircle, path: "profile" }];
    const adminItems = [
      { name: "Manage Orders", icon: ClipboardList, path: "manage-orders" },
      { name: "Manage Products", icon: Package, path: "manage-products" },
      { name: "Add Product", icon: SquarePlus, path: "add-product" },
      { name: "Add Offer", icon: FerrisWheel, path: "add-offer" },
      {
        name: "Manage Category",
        icon: LayoutDashboard,
        path: "manage-category",
      },
      { name: "Manage Users", icon: Users, path: "manage-users" },
      { name: "Manage Reviews", icon: Star, path: "manage-reviews" },
    ];
    const customerItems = [
      { name: "My Orders", icon: ShoppingCart, path: "orders" },
    ];

    if (userRole === "CUSTOMER") {
      return [...baseItems, ...customerItems];
    }
    return [...baseItems, ...adminItems];
  }, [userRole]);

  const handleLogout = async () => {
    await logout();
    dispatch(authApi.util.resetApiState());
    dispatch(clearCart());
    toast.success(
      <h1 className="font-serif text-center">Logged out successfully</h1>,
      { position: "bottom-right" }
    );
  };

  // Redirect from base dashboard paths to profile
  if (pathname === "/dashboard/user" || pathname === "/dashboard/admin") {
    return <Navigate to={`${pathname}/profile`} replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const basePath =
    userRole === "CUSTOMER" ? "/dashboard/user" : "/dashboard/admin";

  return (
    <div className="flex min-h-screen font-montserrat bg-gray-50/50">
      <DashboardHeader isOpen={isOpen} onMenuClick={() => setIsOpen(!isOpen)} />

      <DashboardSidebar
        isCollapsed={collapsed}
        setCollapsed={setCollapsed}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuItems={menuItems}
        basePath={basePath}
        handleLogout={handleLogout}
      />

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <main
        className={`flex-1 p-6 pt-20 md:pt-6 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
