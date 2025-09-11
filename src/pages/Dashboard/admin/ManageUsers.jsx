import React, { useState } from "react";
import { Search, User, Edit, Trash2, Ban, Eye } from "lucide-react";

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
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

  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Delete user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Toggle block/unblock
  const handleToggleBlock = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
          : u
      )
    );
  };

  // Update role
  const handleRoleChange = (id, newRole) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
    setEditUser(null);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
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
              <th className="p-3 text-left">#</th>
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
                  {/* View */}
                  <button
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                    onClick={() => setViewUser(user)}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Edit */}
                  <button
                    className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                    onClick={() => setEditUser(user)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Block/Unblock */}
                  <button
                    className={`p-2 rounded-lg ${
                      user.status === "Active"
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                    onClick={() => handleToggleBlock(user.id)}
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center  z-10 ">
          <div className="bg-white border border-gray-300 p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">User Info</h2>
            <p><strong>Name:</strong> {viewUser.name}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Role:</strong> {viewUser.role}</p>
            <p><strong>Status:</strong> {viewUser.status}</p>
            <p><strong>Joined:</strong> {viewUser.joinDate}</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setViewUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Edit Role</h2>
            <p className="mb-4">
              Current Role: <strong>{editUser.role}</strong>
            </p>
            <div className="flex gap-4">
              {editUser.role === "Customer" ? (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => handleRoleChange(editUser.id, "Admin")}
                >
                  Make Admin
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  onClick={() => handleRoleChange(editUser.id, "Customer")}
                >
                  Make Customer
                </button>
              )}
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
