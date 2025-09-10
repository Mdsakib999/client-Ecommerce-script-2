import { Outlet, Link } from "react-router-dom";
const user = "admin" ;
export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Role: {user.role}</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {user.role === "admin" ? (
            <>
              <Link
                to="manage-orders"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Manage Orders
              </Link>
              <Link
                to="products"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Manage Products
              </Link>
              <Link
                to="users"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Manage Users
              </Link>
            </>
          ) : (
            <>
              <Link
                to="orders"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                My Orders
              </Link>
              <Link
                to="profile"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                My Profile
              </Link>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <button className="w-full px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-screen">
          <Outlet /> {/* 🔹 Renders child route */}
        </div>
      </main>
    </div>
  );
}
