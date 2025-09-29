import { X } from "lucide-react";

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">
            Tracking Id: {order.transactionId}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Customer:</p>
              <p>
                {order.name} ({order.email})
              </p>
              <p className="font-semibold mt-2">Mobile:</p>
              <p>{order.mobileNumber}</p>
              <p className="font-semibold mt-2">Address:</p>
              <p>
                {order.streetAddress}, {order.district}
              </p>
            </div>
            <div>
              <p className="font-semibold">Order Date:</p>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="font-semibold mt-2">Payment Method:</p>
              <p>{order.paymentMethod}</p>
              <p className="font-semibold mt-2">Total:</p>
              <p>${order.total.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Items:</p>
            <ul className="space-y-3 mt-2">
              {order.orders.map((item, index) => (
                <li key={index} className="flex items-start gap-4 shadow p-2">
                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded shadow p-2"
                  />
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × Tk {item.price} = Tk {item.totalPrice}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
