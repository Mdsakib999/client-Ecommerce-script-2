import { Calendar, DollarSign, FileText, Package, Tag, X } from "lucide-react";

export default function ViewProductModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Product Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images Section */}
            <div>
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0YzRjRGNiIvPjxwYXRoIGQ9Ik0xNTAgMTUwSDI1MFYyNTBIMTUwVjE1MFoiIGZpbGw9IiNENUQ5REYiLz48L3N2Zz4=";
                    }}
                  />
                </div>
                {product.images?.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        className="w-16 h-16 object-cover rounded border border-gray-200 flex-shrink-0"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    <Tag className="w-4 h-4 mr-1" />
                    {product.brand}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <Package className="w-4 h-4 mr-1" />
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900">Pricing</h4>
                </div>
                <div className="flex items-center gap-4">
                  {product.discountPrice &&
                  product.discountPrice < product.price ? (
                    <>
                      <span className="text-2xl font-bold text-green-600">
                        Tk {product.discountPrice}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        Tk {product.price}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {Math.round(
                          ((product.price - product.discountPrice) /
                            product.price) *
                            100
                        )}
                        % OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      Tk {product.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">
                    Stock Information
                  </h4>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quantity Available:</span>
                  <span
                    className={`font-semibold ${
                      product.quantity === 0
                        ? "text-red-600"
                        : product.quantity < 10
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {product.quantity} units
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Description</h4>
                  </div>
                  <p className="text-gray-700 text-xs text-justify">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Timestamps */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">Timeline</h4>
                </div>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="text-gray-900">
                      {formatDate(product.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="text-gray-900">
                      {formatDate(product.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
