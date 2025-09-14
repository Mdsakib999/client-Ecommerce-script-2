import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
  const [formData, setFormData] = useState({
    subscription: false,
    name: "",
    district: "Dhaka",
    zone: "",
    streetAddress: "",
    mobileNumber: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const districts = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Rangpur",
  ];
  const zones = [
    "Dhanmondi",
    "Gulshan",
    "Banani",
    "Uttara",
    "Mirpur",
    "Wari",
    "Old Dhaka",
  ];

  const orderItems = [
    {
      name: "Beef (গরুর মাংস) (+_50 gm/KG)",
      shipDate: "Sep 11, 2025",
      quantity: 2,
      price: 1600,
    },
    {
      name: "Buffalo Meat (Bone in) - 1 Kg",
      shipDate: "Sep 18, 2025",
      quantity: 2,
      price: 1700,
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Billing Details */}
          <div className="space-y-6">
            {/* Subscription Checkbox */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="subscription"
                  name="subscription"
                  checked={formData.subscription}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="subscription"
                  className="text-lg font-semibold text-gray-900 uppercase tracking-wide"
                >
                  SUBSCRIPTION
                </label>
              </div>
            </div>

            {/* Billing Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                BILLING DETAILS
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900 bg-white"
                    >
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Your Zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Your Zone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="zone"
                      value={formData.zone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-500 bg-white"
                    >
                      <option value="">Select..</option>
                      {zones.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Street address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="House number and street name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Account Creation Notice */}
              <div className="mt-6 bg-blue-500 text-white p-4 rounded-lg">
                <p className="text-sm font-medium">
                  For a better experience and order history, create an account
                  with us.
                </p>
              </div>
            </div>

            {/* Stripe Payment Integration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Method
              </h3>

              {/* Payment Options */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    defaultChecked
                    className="mr-3"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      Credit/Debit Card
                    </span>
                    <div className="flex space-x-1">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        MC
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Stripe Card Form Simulation */}
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MM / YY
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name on card"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Your Order */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                YOUR ORDER
              </h2>

              {/* Order Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
                <h3 className="font-semibold text-gray-900 uppercase tracking-wide">
                  PRODUCT
                </h3>
                <h3 className="font-semibold text-gray-900 uppercase tracking-wide">
                  SUBTOTAL
                </h3>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-red-600">
                          Ships on {item.shipDate} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ৳{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ৳{subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Shipping for Preorder product(s)
                  </span>
                  <span className="font-semibold text-gray-900">
                    ৳{shippingCost}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ৳{total}
                  </span>
                </div>
              </div>

              {/* Payment Security */}
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
                <span>Pay Online</span>
                <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  Verified by SSL COMMERZ
                </div>
              </div>

              {/* Terms Notice */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Please check the{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    Delivery Policy
                  </span>{" "}
                  before completing your order
                </p>
              </div>

              {/* Privacy Notice */}
              <div className="mt-4 text-xs text-gray-500 leading-relaxed">
                <p>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    privacy policy
                  </span>
                  .
                </p>
              </div>

              {/* Place Order Button */}
              <button className="w-full bg-blue-600 cursor-pointer hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg mt-6 uppercase tracking-wide transition-colors">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
