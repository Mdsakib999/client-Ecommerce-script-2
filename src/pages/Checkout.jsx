import { ChevronDown } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

export default function Checkout() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      subscription: false,
      name: "",
      email: "",
      district: "Dhaka",
      zone: "",
      streetAddress: "",
      mobileNumber: "",
      paymentMethod: "stripe",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      cardholderName: ""
    }
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


  // const selectedDistrict = watch("district");

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

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      // Handle form submission here
      // You can integrate with Stripe API or your payment processor
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Billing Details */}
            <div className="space-y-6">

              {/* Billing Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                  BILLING DETAILS
                </h2>

                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Name */}
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters"
                          }
                        })}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* District */}
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        District <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Controller
                          name="district"
                          control={control}
                          rules={{ required: "District is required" }}
                          render={({ field }) => (
                            <select
                              {...field}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900 bg-white ${
                                errors.district ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              {districts.map((district) => (
                                <option key={district} value={district}>
                                  {district}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.district && (
                        <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
                      )}
                    </div>

                    {/* Street Address */}
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("streetAddress", {
                          required: "Address is required",
                          minLength: {
                            value: 5,
                            message: "Address must be at least 5 characters"
                          }
                        })}
                        placeholder="House number and street name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.streetAddress ? 'border-red-500 text-gray-900' : 'border-gray-300 text-gray-500'
                        }`}
                      />
                      {errors.streetAddress && (
                        <p className="mt-1 text-sm text-red-600">{errors.streetAddress.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register("mobileNumber", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^(\+880|880|01)[1-9]\d{8}$/,
                          message: "Invalid Bangladesh mobile number"
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
{/* Add this radio button option alongside your existing payment methods */}
<label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
  <input checked
    type="radio"
    value="cod"
    {...register("paymentMethod")}
    className="mr-3"
  />
  <div className="flex items-center space-x-2">
    <span className="font-medium text-gray-900">Cash on Delivery</span>
    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
      Pay when you receive
    </span>
  </div>
</label>        </div>

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
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg mt-6 uppercase tracking-wide transition-colors"
                >
                  {isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}