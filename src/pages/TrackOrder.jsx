import { useState } from "react";
import {
  Package,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Home,
} from "lucide-react";
import { useLazyTrackOrderQuery } from "../redux/app/services/order/orderApi";
import toast from "react-hot-toast";

export default function TrackOrder() {
  const [trackingId, setTrackingId] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [trigger, { data: order, isFetching }] = useLazyTrackOrderQuery();

  const handleTrack = async () => {
    setNotFound(false);
    if (!trackingId.trim()) {
      toast.error(
        <p className="font-serif text-center">Please enter a tracking ID</p>
      );
      return;
    }
    try {
      const res = await trigger(trackingId).unwrap();
      if (!res || !res._id) {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTrack();
    }
  };

  const getOrderSteps = (currentStatus) => {
    const status = currentStatus?.toUpperCase();

    if (status === "CANCELLED") {
      return [
        { name: "Pending", icon: Clock, completed: true, active: false },
        {
          name: "Cancelled",
          icon: XCircle,
          completed: true,
          active: true,
          cancelled: true,
        },
      ];
    }

    const steps = [
      { name: "Pending", icon: Clock, completed: false, active: false },
      { name: "Confirmed", icon: CheckCircle, completed: false, active: false },
      { name: "Shipped", icon: Truck, completed: false, active: false },
      { name: "Delivered", icon: Home, completed: false, active: false },
    ];

    const statusIndex = {
      PENDING: 0,
      CONFIRMED: 1,
      SHIPPED: 2,
      DELIVERED: 3,
    }[status];

    steps.forEach((step, index) => {
      if (index < statusIndex) {
        step.completed = true;
      } else if (index === statusIndex) {
        step.completed = true;
        step.active = true;
      }
    });

    return steps;
  };

  return (
    <div className="flex pt-16 items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full mb-3">
            <Package className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Track Your Order</h1>
          <p className="text-gray-500 text-sm mt-1">Enter your tracking ID</p>
        </div>

        {/* Search Input */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tracking ID"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <button
              onClick={handleTrack}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 rounded-lg transition disabled:bg-gray-400"
              disabled={isFetching}
            >
              {isFetching ? "Tracking...." : "Track"}
            </button>
          </div>
        </div>

        {/* Not Found */}
        {notFound && (
          <div className="mt-10 bg-white rounded-lg shadow-md p-6 text-center border-l-4 border-red-500">
            <p className="text-red-600 font-medium">Order not found</p>
            <p className="text-gray-500 text-sm mt-1">
              Please check your tracking ID
            </p>
          </div>
        )}

        {/* Order Status */}
        {order && order._id && !notFound && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                {getOrderSteps(order.status).map((step, index, arr) => {
                  const StepIcon = step.icon;
                  const isLast = index === arr.length - 1;

                  return (
                    <div key={step.name} className="flex-1 flex items-center">
                      <div className="w-full mx-auto flex flex-col items-center flex-shrink-0 relative z-10">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                            step.cancelled
                              ? "bg-red-500 border-red-500"
                              : step.completed
                              ? "bg-emerald-400 border-emerald-400"
                              : step.active
                              ? "bg-blue-500 border-blue-500"
                              : "bg-gray-200 border-gray-300"
                          }`}
                        >
                          <StepIcon
                            className={`w-6 h-6 ${
                              step.completed || step.active || step.cancelled
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <p
                          className={`text-xs font-medium mt-2 ${
                            step.cancelled
                              ? "text-red-600"
                              : step.completed
                              ? "text-emerald-500"
                              : step.active
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        >
                          {step.name}
                        </p>
                      </div>

                      {!isLast && (
                        <div
                          className={`flex-1 h-0.5 mx-2 ${
                            step.completed ? "bg-emerald-500" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Details */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Order Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-800">
                    {order.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mobile</span>
                  <span className="font-medium text-gray-800">
                    {order.mobileNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Address</span>
                  <span className="font-medium text-gray-800 text-right max-w-xs">
                    {order.streetAddress}, {order.district}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-medium text-gray-800">
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Total Amount</span>
                    <span className="text-xl font-bold text-blue-600">
                      TK {order.total}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-400 text-center pt-2">
                  Ordered on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
