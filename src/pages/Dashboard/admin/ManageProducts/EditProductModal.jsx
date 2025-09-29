import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateProductMutation } from "../../../../redux/app/services/product/productApi";
import toast from "react-hot-toast";
import { useGetAllCategoriesQuery } from "../../../../redux/app/services/category/categoryApi";

export default function EditProductModal({ product, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    discountPrice: "",
    quantity: "",
    description: "",
    inStock: true,
    images: [],
  });

  useEffect(() => {
    if (isOpen && product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "",
        price: product.price || "",
        discountPrice: product.discountPrice || "",
        quantity: product.quantity || "",
        description: product.description || "",
        inStock: product.inStock ?? true,
        images: product.images || [],
      });
    }
  }, [product, isOpen]);

  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateProduct({
        productId: product._id,
        productInfo: { ...product, ...formData },
      }).unwrap();

      if (result.success) {
        toast.success(
          <h1 className="font-serif">Product updated successfully!</h1>,
          { position: "bottom-right" }
        );

        onClose();
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Remove image by index
  const handleRemoveImage = (idx) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== idx);
      return { ...prev, images: newImages };
    });
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <div className="flex gap-4 flex-wrap">
                {formData.images && formData.images.length > 0 ? (
                  formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Product ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border shadow transition-transform group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition-colors z-10"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No images</span>
                )}
                <label
                  className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-600 transition-colors bg-gray-50 cursor-pointer"
                  title="Add image"
                >
                  + Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddImage}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {formData.category && (
                  <option value={formData.category} key={formData.category}>
                    {formData.category} (Current)
                  </option>
                )}
                {categories?.data
                  ?.filter((cat) => cat.name !== formData.category)
                  .map((cat) => (
                    <option value={cat.name} key={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Regular Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Price ($)
              </label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              In Stock
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
