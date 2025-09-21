import { useState } from "react";
import { useParams } from "react-router";
import { useGetProductQuery } from "../../redux/app/services/product/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/app/features/cart/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState("");
  const { data: product } = useGetProductQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-blue-500">Product Not Found</h1>
      </div>
    );
  }

  // Use first image as default
  const images = product.images || [];
  const displayImage = mainImage || images[0];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full flex items-center justify-center">
            <img
              src={displayImage}
              alt={product.name}
              className="rounded-2xl w-full h-80 object-cover transition duration-300"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 ${
                  displayImage === img ? "border-red-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center space-x-3 mb-6">
            {product.discountPrice ? (
              <>
                <p className="text-2xl font-bold text-red-500">
                  ৳{product.discountPrice}
                </p>
                <p className="text-lg text-gray-400 line-through">
                  ৳{product.price}
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-gray-800">
                ৳{product.price}
              </p>
            )}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Brand:</span> {product.brand}
          </div>
          <div className="mb-4">
            <span className="font-semibold">In Stock:</span>{" "}
            {product.inStock ? "Yes" : "No"}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Quantity:</span> {product.quantity}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Created:</span>{" "}
            {new Date(product.createdAt).toLocaleDateString()}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Updated:</span>{" "}
            {new Date(product.updatedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1 md:gap-4 mt-6">
            <button
              onClick={() => {
                handleAddToCart(product);
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-800 cursor-pointer text-white font-semibold py-2 md:py-3 px-4 whitespace-nowrap rounded-full flex items-center justify-center space-x-2 transition"
            >
              <span>Add to Cart</span>
            </button>
            <button className="flex-1 bg-red-500 cursor-pointer opacity-90 hover:bg-red-600 text-white font-semibold whitespace-nowrap py-2 md:py-3 px-4 rounded-full transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
