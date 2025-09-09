import logo from "../../../assets/logo.png";
import {
  BarChart3,
  MessageCircle,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm flex flex-col">
        <div className="p-6">
          <img className="w-32 cursor-pointer" src={logo} alt="uniMart logo" />
        </div>

        <div className="px-4 flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">
            MAIN MENU
          </p>

          <nav className="space-y-1">
            <div className="bg-purple-100 text-purple-700 rounded-lg px-4 py-3 flex items-center space-x-3">
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </div>

            <div className="text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-3 flex items-center space-x-3 cursor-pointer">
              <TrendingUp className="w-5 h-5" />
              <span>Performance</span>
            </div>

            <div className="text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-3 flex items-center space-x-3 cursor-pointer">
              <Users className="w-5 h-5" />
              <span>Campaigns</span>
            </div>

            <div className="text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-3 flex items-center space-x-3 cursor-pointer">
              <ShoppingCart className="w-5 h-5" />
              <span>Orders</span>
            </div>

            <div className="text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-3 flex items-center space-x-3 cursor-pointer">
              <Package className="w-5 h-5" />
              <span>Products</span>
            </div>

            <div className="text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-3 flex items-center space-x-3 cursor-pointer">
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
