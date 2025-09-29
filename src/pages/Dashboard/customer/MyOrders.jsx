import React, { useState } from "react";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useGetMyOrdersQuery } from "../../../redux/app/services/order/orderApi";
import { useUserInfoQuery } from "../../../redux/app/services/auth/authApi";

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: userInfo } = useUserInfoQuery();
  const { data: orders = [], isLoading } = useGetMyOrdersQuery(
    userInfo?.data?._id
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle size={20} />;
      case "SHIPPED":
        return <Truck size={20} />;
      case "CONFIRMED":
        return <Package size={20} />;
      case "PENDING":
        return <Clock size={20} />;
      case "CANCELLED":
        return <AlertCircle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-blue-100 text-blue-700";
      case "SHIPPED":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-emerald-100 text-emerald-700";
      case "PENDING":
        return "bg-gray-100 text-gray-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orders?.some((item) =>
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusList = [
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
    "SHIPPED",
    "DELIVERED",
  ];

  return (
    <div className="w-full p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-2">My Orders</h1>
        <p className="text-gray-600 mb-6">Track and manage your orders</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {statusList.map((status) => (
            <div
              key={status}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center"
            >
              <div className="text-2xl font-bold text-black">
                {orders.filter((o) => o.status === status).length}
              </div>
              <div className="text-sm text-gray-600">{status}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search product or order ID..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            {statusList.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Clock className="w-10 h-10 text-gray-400 mx-auto animate-spin" />
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-black">
                    # {order.transactionId}
                  </h3>
                  <p className="text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Payment:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Address:</span>{" "}
                    {order.streetAddress}, {order.district}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium rounded-md px-5 py-2.5 ${getStatusColor(
                    order.status
                  )}`}
                  style={{
                    lineHeight: "1",
                    height: "fit-content",
                  }}
                >
                  <span className="flex items-center gap-1 leading-none">
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="p-6 space-y-4">
                {order.orders.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap sm:flex-nowrap items-center gap-4"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-gray-400 m-auto" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-sm text-gray-600 mt-1">
                        Qty: {item.quantity} • ৳{item.price}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.product.brand} • {item.product.category}
                      </div>
                    </div>
                    <div className="text-right font-semibold text-gray-900">
                      ৳{item.totalPrice}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="px-6 pb-6 text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-black">৳{order.total}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No matching orders
            </h3>
            <p className="text-gray-600">
              Try different search or status filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
