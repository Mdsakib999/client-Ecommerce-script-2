import { useState } from "react";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";

export default function ManageOrders() {
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2025-09-08",
      total: 120.5,
      status: "Pending",
    },
    {
      id: "ORD-002",
      customer: "Alice Smith",
      date: "2025-09-09",
      total: 340.0,
      status: "Shipped",
    },
    {
      id: "ORD-003",
      customer: "Michael Lee",
      date: "2025-09-10",
      total: 89.99,
      status: "Delivered",
    },
  ]);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold">Manage Orders</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by ID or customer"
            className="input input-bordered w-full sm:w-64"
          />
          <button className="btn btn-primary flex items-center gap-1">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total ($)</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  <button className="btn btn-xs btn-outline">
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button className="btn btn-xs btn-success">
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button className="btn btn-xs btn-error">
                    <XCircle className="w-4 h-4" /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl shadow-md space-y-3"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{order.id}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Customer:</span> {order.customer}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Date:</span> {order.date}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total:</span> ${order.total.toFixed(2)}
            </p>
            <div className="flex gap-2 pt-2">
              <button className="btn btn-xs btn-outline flex items-center gap-1">
                <Eye className="w-4 h-4" /> View
              </button>
              <button className="btn btn-xs btn-success flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Approve
              </button>
              <button className="btn btn-xs btn-error flex items-center gap-1">
                <XCircle className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
