import { Image as ImageIcon, Save, Loader2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddProductMutation } from "../../../redux/app/services/product/productApi";
import toast from "react-hot-toast";

export default function AddProduct({ categories = [] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
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
      specifications: "",
    },
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);
  const fileInputRef = useRef(null);

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index) => {
    if (specifications.length > 1) {
      const newSpecs = specifications.filter((_, i) => i !== index);
      setSpecifications(newSpecs);
      updateSpecificationsString(newSpecs);
    }
  };

  const updateSpecification = (index, field, value) => {
    const newSpecs = specifications.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    );
    setSpecifications(newSpecs);
    updateSpecificationsString(newSpecs);
  };

  const updateSpecificationsString = (specs) => {
    const validSpecs = specs.filter(
      (spec) => spec.key.trim() && spec.value.trim()
    );
    const specString = validSpecs
      .map((spec) => `${spec.key}: ${spec.value}`)
      .join("; ");
    setValue("specifications", specString);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setSelectedImages((prev) => [...prev, ...files].slice(0, 4));
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const [addProduct, { isLoading }] = useAddProductMutation();

  const onSubmit = async (data) => {
    if (selectedImages.length === 0) {
      toast.error(
        <h1 className="font-serif">
          Please upload at least one product image.
        </h1>,
        {
          position: "bottom-right",
        }
      );
      return;
    }

    const hasValidSpecs = specifications.some(
      (spec) => spec.key.trim() && spec.value.trim()
    );
    if (!hasValidSpecs) {
      toast.error(
        <h1 className="font-serif">Please add at least one specification.</h1>,
        {
          position: "bottom-right",
        }
      );
      return;
    }

    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      selectedImages.forEach((file) => {
        formData.append("images", file);
      });

      const result = await addProduct(formData).unwrap();

      if (result.success) {
        toast.success(
          <h1 className="font-serif">Product added successfully!</h1>,
          {
            position: "bottom-right",
          }
        );
        reset();
        setSelectedImages([]);
        setSpecifications([{ key: "", value: "" }]);
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        toast.error(
          <h1 className="font-serif">
            {result.message || "Failed to add product"}
          </h1>
        );
      }
    } catch {
      toast.error(<h1 className="font-serif">Failed to add product</h1>, {
        position: "bottom-right",
      });
    }
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
            placeholder="Enter product name"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
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
            {...register("brand", { required: "Brand is required" })}
            placeholder="Enter brand name"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${
              errors.brand
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.brand && (
            <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none bg-white ${
              errors.category
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
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
            min={0}
            {...register("price", { required: "Price is required" })}
            placeholder="Enter price"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${
              errors.price
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Discount Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Price
          </label>
          <input
            type="number"
            step="0.01"
            min={0}
            {...register("discountPrice", {
              required: "Discount price is required",
            })}
            placeholder="Enter discount price"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${
              errors.discountPrice
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.discountPrice && (
            <p className="text-red-500 text-xs mt-1">
              {errors.discountPrice.message}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            {...register("quantity", { required: "Quantity is required" })}
            placeholder="Enter stock quantity"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${
              errors.quantity
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* In Stock */}
        <div className="flex items-center gap-2 mt-5">
          <input type="checkbox" {...register("inStock", { required: true })} />
          <label className="text-gray-700 text-sm">In Stock</label>
        </div>
      </div>

      {/* Product Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Images (Max 4)
        </label>
        <div
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className={`cursor-pointer w-full p-4 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 transition-colors ${
            selectedImages.length === 0
              ? "border-gray-400"
              : "border-gray-400 hover:border-gray-500"
          }`}
        >
          <ImageIcon className="w-6 h-6 text-gray-500" />
          <span className="text-gray-500">Click to upload images</span>
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        {selectedImages.length === 0 && (
          <p className="text-red-500 text-xs mt-1">
            Please upload at least one image.
          </p>
        )}
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
          {...register("description", { required: "Description is required" })}
          placeholder="Enter product description"
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${
            errors.description
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-blue-500"
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Specifications */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Specifications
          </label>
          <button
            type="button"
            onClick={addSpecification}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Specification
          </button>
        </div>

        <div className="space-y-3">
          {specifications.map((spec, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) =>
                    updateSpecification(index, "key", e.target.value)
                  }
                  placeholder="Specification name (e.g., Bluetooth Version)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) =>
                    updateSpecification(index, "value", e.target.value)
                  }
                  placeholder="Specification value (e.g., 5.3)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              {specifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Preview of formatted specifications */}
        {watch("specifications") && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-600 mb-1 font-medium">
              Formatted Output:
            </p>
            <p className="text-sm text-gray-800">{watch("specifications")}</p>
          </div>
        )}

        {/* Hidden input for form submission */}
        <input type="hidden" {...register("specifications")} />
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-2">
        <button
          disabled={isLoading || selectedImages.length === 0}
          type="submit"
          className={`
            px-5 py-2.5 
            rounded-lg 
            font-medium 
            flex items-center gap-2 
            transition-all duration-200 
            ${
              isLoading || selectedImages.length === 0
                ? "bg-blue-400 cursor-not-allowed opacity-70"
                : "bg-blue-600 hover:bg-blue-700"
            }
            text-white
          `}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          <Save className="w-4 h-4" />
          {isLoading ? "Adding Product..." : "Add Product"}
        </button>
      </div>
    </form>
  );
}
