import { Image as ImageIcon, Save } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddProduct({ categories = [] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      price: "",
      discountPrice: "",
      quantity: "",
      inStock: true,
      description: "",
      images: [],
    },
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // max 4 at a time
    setSelectedImages((prev) => {
      const combined = [...prev, ...files].slice(0, 4);
      return combined;
    });
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    // Add selected images to form data
    data.images = selectedImages;

    console.log("Product Data:", data);
    alert("Product added successfully!");

    // Reset form and images
    reset();
    setSelectedImages([]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-auto p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-black text-center mb-4">
        Add New Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            {...register("name", { required: "Product name is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <input
            {...register("brand")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Discount Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register("discountPrice")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            {...register("quantity")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* In Stock */}
        <div className="flex items-center gap-2 mt-5">
          <input type="checkbox" {...register("inStock")} />
          <label className="text-gray-700 text-sm">In Stock</label>
        </div>
      </div>

      {/* Product Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Images (Max 4)
        </label>

        {/* Upload Box */}
        <div
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="cursor-pointer w-full p-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:border-blue-500 transition-colors"
        >
          <ImageIcon className="w-6 h-6 text-gray-500" />
          <span className="text-gray-500">Click to upload images</span>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("images")}
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Preview */}
        {selectedImages.length > 0 && (
          <div className="flex flex-wrap mt-2 gap-2">
            {selectedImages.map((file, idx) => (
              <div
                key={idx}
                className="w-20 h-20 border rounded overflow-hidden relative"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows="4"
          {...register("description")}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Add Product
        </button>
      </div>
    </form>
  );
}
