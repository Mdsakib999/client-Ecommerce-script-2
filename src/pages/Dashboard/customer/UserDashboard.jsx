import {
  Grid3X3,
  HelpCircle,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import logo from "../../../assets/logo.png";
export default function CustomerDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <img className="w-32 cursor-pointer" src={logo} alt="uniMart logo" />
        </div>

        <nav className="mt-8">
          <div className="px-6 py-3 bg-blue-50 border-r-4 border-blue-500">
            <div className="flex items-center text-blue-600">
              <Grid3X3 className="w-5 h-5 mr-3" />
              <span className="font-medium">Dashboard</span>
            </div>
          </div>

          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3" />
              <span>Profile</span>
            </div>
          </div>

          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </div>
          </div>

          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-3" />
              <span>Message</span>
            </div>
          </div>

          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-3" />
              <span>Support</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
