import React, { useState } from "react";
import { Search, User, Edit, Trash2, Ban, Eye } from "lucide-react";

export default function ManageUsers() {
  const [search, setSearch] = useState("");

  // Fake data (replace with API later)
  const [users] = useState([
    {
      id: 1,
      name: "Nur Mohammad Imon",
      email: "imon@gmail.com",
      role: "Customer",
      status: "Active",
      joinDate: "2025-01-10",
    },
    {
      id: 2,
      name: "Admin User",
      email: "admin@shop.com",
      role: "Admin",
      status: "Blocked",
      joinDate: "2024-12-01",
    },
    {
      id: 3,
      name: "Sakib Hasan",
      email: "sakib@example.com",
      role: "Customer",
      status: "Active",
      joinDate: "2025-02-15",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Users</h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3 text-left">No.</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Joined</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  {user.name}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3">{user.joinDate}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    className={`p-2 rounded-lg ${
                      user.status === "Active"
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
