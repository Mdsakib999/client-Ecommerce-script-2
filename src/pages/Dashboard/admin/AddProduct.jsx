import { Check, Edit, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

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

  const [categories, setCategories] = useState([
    { id: 1, name: "Smartphones" },
    { id: 2, name: "Gaming Phones" },
    { id: 3, name: "Clothes" },
    { id: 4, name: "Cosmetics" },
  ]);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", product);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;
    const newId = categories.length
      ? Math.max(...categories.map((cat) => cat.id)) + 1
      : 1;
    setCategories([...categories, { id: newId, name: newCategoryName }]);
    setNewCategoryName("");
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  const handleUpdateCategory = () => {
    if (newCategoryName.trim() === "") return;
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, name: newCategoryName } : cat
      )
    );
    setEditingCategory(null);
    setNewCategoryName("");
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    if (product.category === categories.find((cat) => cat.id === id)?.name) {
      setProduct((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSelectCategory = (categoryName) => {
    setProduct((prev) => ({ ...prev, category: categoryName }));
    closeCategoryModal();
  };

  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
    setNewCategoryName("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 ">
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:bg-gray-50 bg-white"
                onClick={openCategoryModal}
              >
                <span className="text-gray-500">
                  {product.category || "Select or manage categories"}
                </span>
              </div>
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
                Product Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              <div className="flex flex-wrap mt-2 gap-2">
                {product.images.map((file, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 border rounded overflow-hidden relative"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
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

      {/* Category Management Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-6  z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-black">
                Manage Categories
              </h3>
              <button
                type="button"
                onClick={closeCategoryModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Add/Edit Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {editingCategory ? "Edit Category" : "New Category"}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter category name"
                />
                <button
                  type="button"
                  onClick={
                    editingCategory ? handleUpdateCategory : handleAddCategory
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {editingCategory ? "Update" : "Add"}
                </button>
              </div>
            </div>

            {/* Category List */}
            <div className="max-h-64 overflow-y-auto">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`flex items-center justify-between p-2 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    product.category === cat.name
                      ? "bg-blue-50 border-blue-200"
                      : ""
                  }`}
                >
                  <span
                    className={`font-medium ${
                      product.category === cat.name
                        ? "text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {cat.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectCategory(cat.name)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Select category"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditCategory(cat)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit category"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeCategoryModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
