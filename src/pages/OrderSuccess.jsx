import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) return null;

  const subtotal = order.orders.reduce((sum, item) => sum + item.totalPrice, 0);
  const Total = subtotal > 1500 ? subtotal : subtotal + 100;

  console.log(order);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 font-montserrat">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-blue-900 mb-3">
            ✅ Order Placed!
          </h1>
          <p className="text-gray-600 mt-5 mb-3 max-w-lg w-full mx-auto">
            Thank you for your order, {order.name}. We will contact you shortly
            to confirm your order.
          </p>
          <p className="text-gray-500 mt-1">
            Track your order :
            <span className="font-semibold"> {order?.transactionId}</span>
          </p>
        </div>
        {/* Shipping Info */}
        <div className="bg-gray-100 text-sm rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold mb-2 text-gray-700">
              Shipping Information
            </h3>
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Mobile:</strong> {order.mobileNumber}
            </p>
            <p>
              <strong>Address:</strong> {order.streetAddress}, {order.district}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">
              Payment Method ({order.paymentMethod})
            </h3>
            <p className="mt-4 font-semibold text-gray-700">
              Status: <span className="text-blue-400">{order.status}</span>
            </p>
          </div>
        </div>
        {/* Ordered Items */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-4">Ordered Items</h3>
          <div className="space-y-4">
            {order.orders.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={item.product.images?.[0] || "/placeholder.png"}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {item.product.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Quantity: {item.quantity} × Tk{""}
                    {item.product.discountPrice || item.price}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  Tk {item.totalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <p className="text-gray-600 text-sm">Total</p>
            <p className="font-semibold">Subtotal Tk {Total}</p>
            <p className="font-semibold">
              shipping{" "}
              <span className="text-blue-500">
                {subtotal >= 1500 ? "Free" : `Tk 100`}
              </span>
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/user/orders")}
            className="bg-blue-400 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition w-full md:w-auto"
          >
            See My Orders
          </button>
        </div>
        <p className="text-center text-gray-500 text-sm">
          You will receive an email confirmation soon. Thank you for shopping
          with us!
        </p>
      </div>
    </div>
  );
}
