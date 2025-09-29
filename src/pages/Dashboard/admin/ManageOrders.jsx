import { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/app/services/order/orderApi";
import { Eye, Filter, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import confirmToast from "../../../utils/confirmToast";
import Loader from "../../../utils/Loader";

export default function ManageOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: ordersData, isLoading: isOrderLoading } =
    useGetAllOrdersQuery();
  const orders = ordersData?.data || [];

  const statusOptions = [
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
    "SHIPPED",
    "DELIVERED",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-200";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "CONFIRMED":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PENDING":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order?.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || order.status === statusFilter)
  );

  const orderStats = [
    { label: "Total Orders", value: orders.length },
    ...statusOptions.map((status) => ({
      label: status.charAt(0) + status.slice(1).toLowerCase(),
      value: orders.filter((o) => o.status === status).length,
    })),
  ];

  const [updateOrderStatus, { isLoading: statusUpdatingLoader }] =
    useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const result = await updateOrderStatus({
        orderId,
        status: newStatus,
      }).unwrap();
      if (result.success) {
        toast.success(
          <h1 className="text-center font-serif">
            order {newStatus.toLowerCase()} successfully
          </h1>,
          {
            position: "bottom-right",
          }
        );
      }
    } catch {
      toast.error(
        <h1 className="text-center font-serif">
          Failed to update order status
        </h1>,
        {
          position: "bottom-right",
        }
      );
    }
  };

  const [deleteOrder, { isLoading: orderDeletingLoader }] =
    useDeleteOrderMutation();

  const handleDelete = (orderId) => {
    confirmToast({
      message: "Are you sure you want to delete this order?",
      onConfirm: async () => {
        try {
          const result = await deleteOrder(orderId).unwrap();
          if (result.success) {
            toast.success(
              <h1 className="text-center font-serif">
                Order deleted successfully
              </h1>,
              { position: "bottom-right" }
            );
          }
        } catch {
          toast.error(
            <h1 className="text-center font-serif">Failed to delete order</h1>,
            { position: "bottom-right" }
          );
        }
      },
      onCancel: () => {
        toast(<h1 className="text-center font-serif">Deletion cancelled</h1>, {
          position: "bottom-right",
        });
      },
    });
  };

  if (isOrderLoading) {
    return <Loader />;
  }

  return (
    <div className="p-3 sm:p-6 min-h-screen max-w-7xl w-full mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8">
        Orders Management
      </h1>

      {/* Stats Section - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
        {orderStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4"
          >
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              {stat.label}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-black">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters - Stack on Mobile */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              disabled={statusUpdatingLoader}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            {/* Order ID and Date */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-blue-600 text-sm">
                  # {order.transactionId}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
              </span>
            </div>

            {/* Customer Info */}
            <div className="mb-3">
              <p className="font-medium text-gray-900 text-sm">{order.name}</p>
              <p className="text-xs text-gray-500">{order.email}</p>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div>
                <p className="text-gray-500">Items</p>
                <p className="font-medium">
                  {order.orders?.length} item
                  {order.orders?.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Total</p>
                <p className="font-semibold">${order.total?.toFixed(2)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Payment</p>
                <p className="font-medium">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-3 border-t border-gray-100">
              <select
                disabled={statusUpdatingLoader}
                className={`flex-1 px-3 py-2 text-xs font-medium border rounded-lg ${getStatusColor(
                  order.status
                )}`}
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              <button
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                onClick={() => setSelectedOrder(order)}
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                disabled={orderDeletingLoader}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                onClick={() => handleDelete(order._id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Order ID
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Customer
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Date
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Items
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Total
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Payment
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold text-blue-600">
                  # {order.transactionId}
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{order.name}</div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <select
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      order.status
                    )}`}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {order.orders?.length} item
                  {order.orders?.length !== 1 ? "s" : ""}
                </td>
                <td className="py-3 px-4 font-semibold text-gray-900">
                  ${order.total?.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {order.paymentMethod}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg mr-1"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    disabled={orderDeletingLoader}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    onClick={() => handleDelete(order._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <p className="text-3xl text-center mt-10">No Orders Found</p>
      )}

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
