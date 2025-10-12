import { useForm, Controller } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CreditCard,
  ShoppingCart,
  Loader2,
  Check,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useUserInfoQuery } from "../redux/app/services/auth/authApi";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "../redux/app/services/order/orderApi";
import { clearCart } from "../redux/app/features/cart/cartSlice";
import { useNavigate } from "react-router";

export default function Checkout() {
  const { data: userInfo } = useUserInfoQuery();

  const orderItems = useSelector((state) => state.cart.items);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.cartQuantity,
    0
  );
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userInfo?.data?.name || "",
      email: userInfo?.data?.email || "",
      district: "Dhaka",
      streetAddress: userInfo?.data?.address || "",
      mobileNumber: userInfo?.data?.phone || "",
      paymentMethod: "COD",
    },
  });

  const districts = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Rangpur",
  ];

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const orders = orderItems.map((item) => ({
      product: item._id,
      quantity: item.cartQuantity,
      price: item.discountPrice,
      totalPrice: item.discountPrice * item.cartQuantity,
    }));

    const total = orders.reduce((sum, item) => sum + item.totalPrice, 0);

    const finalOrder = { ...data, orders, user: userInfo?.data?._id, total };

    try {
      const result = await createOrder(finalOrder).unwrap();
      if (result.success) {
        dispatch(clearCart());
        toast.success(
          <h1 className="font-serif text-center">
            Order placed successfully!
          </h1>,
          {
            position: "bottom-right",
            duration: 3000,
          }
        );
        navigate("/order-success", { state: { order: result.data } });
      }
    } catch {
      toast.error(
        <h1 className="font-serif text-center">
          Failed to place order! Please try again
        </h1>,
        {
          position: "bottom-right",
          duration: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="tracking-wide text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 tracking-wider">Complete your purchase</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Billing Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  Billing Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name & Email side by side */}
                  <div className="sm:col-span-1">
                    <label className="flex text-sm font-medium text-gray-700 mb-1 items-center gap-1">
                      <User className="w-4 h-4 text-gray-400" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      readOnly
                      className={`w-full px-3 py-2.5 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.name
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-1">
                    <label className="flex text-sm font-medium text-gray-700 mb-1 items-center gap-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      readOnly
                      {...register("email", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className={`w-full px-3 py-2.5 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* District & Phone Number side by side */}
                  <div className="sm:col-span-1">
                    <label className="flex text-sm font-medium text-gray-700 mb-1 items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      District <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="district"
                      control={control}
                      rules={{ required: "District is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`w-full px-3 py-2.5 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.district
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                        >
                          {districts.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.district && (
                      <p className="text-xs text-red-600 mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.district.message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-1">
                    <label className="flex text-sm font-medium text-gray-700 mb-1 items-center gap-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("mobileNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^(\+880|880|01)[1-9]\d{8}$/,
                          message:
                            "Please enter a valid Bangladesh mobile number",
                        },
                      })}
                      className={`w-full px-3 py-2.5 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.mobileNumber
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="01XXXXXXXXX"
                    />
                    {errors.mobileNumber && (
                      <p className="text-xs text-red-600 mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.mobileNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="flex text-sm font-medium text-gray-700 mb-1 items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("streetAddress", {
                        required: "Address is required",
                      })}
                      rows={3}
                      className={`w-full px-3 py-2.5 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                        errors.streetAddress
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="House/Flat number, Road name, Area"
                    />
                    {errors.streetAddress && (
                      <p className="text-xs text-red-600 mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.streetAddress.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="COD"
                        {...register("paymentMethod")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        defaultChecked
                      />
                      <div className="ml-3 flex items-center">
                        <CreditCard className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          Cash on Delivery
                        </span>
                      </div>
                    </label>
                    <p className="text-xs text-gray-600 ml-7 mt-1">
                      Pay when you receive your order
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:sticky lg:top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-gray-500" />
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  {orderItems.length === 0 ? (
                    <div className="py-8 text-center">
                      <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">
                        No items in your cart
                      </p>
                    </div>
                  ) : (
                    orderItems.map((item) => {
                      const itemTotal =
                        item.discountPrice ?? item.price * item.cartQuantity;
                      return (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="relative">
                            <img
                              src={item.images?.[0]}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md border border-gray-200"
                            />
                            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {item.cartQuantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500 truncate">
                              {item.brand} • {item.category}
                            </p>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            ৳{itemTotal.toLocaleString()}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {orderItems.length > 0 && (
                  <>
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>৳{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total</span>
                        <span>৳{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    orderItems.length === 0 ||
                    userInfo?.data?.role === "ADMIN"
                  }
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md text-sm transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Place Order
                    </>
                  )}
                </button>

                {orderItems.length > 0 && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    By placing this order, you agree to our terms and conditions
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
