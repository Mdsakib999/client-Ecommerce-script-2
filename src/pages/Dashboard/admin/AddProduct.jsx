import { Save, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import ManageCategory from "./ManageCategory";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    discountPrice: "",
    quantity: "",
    inStock: true,
    description: "",
    images: [],
  });

  const categories = [
    // import all categories from manageCategories
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // Limit 4 images
    setProduct((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", product);
    alert("Product added successfully!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="text-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">Add New Product</h2>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter brand"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* Discount Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Price
              </label>
              <input
                type="number"
                name="discountPrice"
                value={product.discountPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0"
              />
            </div>

            {/* In Stock */}
            <div className="flex items-center mt-5 gap-2">
              <input
                type="checkbox"
                name="inStock"
                checked={product.inStock}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-gray-700 text-sm">In Stock</label>
            </div>

            {/* Product Images */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images (Max 4)
              </label>
              <div className="relative">
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 outline-none cursor-pointer hover:bg-gray-50 bg-white"
                >
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-500">
                    {product.images.length > 0
                      ? `${product.images.length} image(s) selected`
                      : "Choose images (up to 4)"}
                  </span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="flex flex-wrap mt-2 gap-2">
                {product.images.map((file, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 border rounded overflow-hidden relative"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter product description"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
