import { Eye, Edit, Trash2 } from "lucide-react";

export default function ProductTable({ products, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto text-center">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
          <tr>
            <th className="py-4 px-6 font-semibold text-gray-900">Image</th>
            <th className="py-4 px-6 font-semibold text-gray-900">Name</th>
            <th className="py-4 px-6 font-semibold text-gray-900">Brand</th>
            <th className="py-4 px-6 font-semibold text-gray-900">Category</th>
            <th className="py-4 px-6 font-semibold text-gray-900">
              Added Time
            </th>
            <th className="py-4 px-6 font-semibold text-gray-900">Price</th>
            <th className="py-4 px-6 font-semibold text-gray-900">Stock</th>
            <th className="py-4 px-6 font-semibold text-gray-900">Status</th>
            <th className="py-4 px-6 font-semibold text-gray-900 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-6">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg border"
                />
              </td>
              <td className="py-4 px-6 font-medium text-gray-900">
                {product.name}
              </td>
              <td className="py-4 px-6 text-gray-600">{product.brand}</td>
              <td className="py-4 px-6 text-gray-600">{product.category}</td>
              <td className="py-4 px-6 text-gray-600">
                {new Date(product.createdAt).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>

              <td className="py-4 px-6 font-semibold text-gray-900">
                ${product.price}
              </td>
              <td className="py-4 px-6">
                <span
                  className={`font-medium ${
                    product.quantity === 0
                      ? "text-red-600"
                      : product.quantity < 10
                      ? "text-yellow-600"
                      : "text-gray-900"
                  }`}
                >
                  {product.quantity}
                </span>
              </td>
              <td>
                <span
                  className={`inline-flex px-2 py-2 rounded text-xs font-medium ${
                    product.inStock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => onView(product)}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => onDelete(product)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
