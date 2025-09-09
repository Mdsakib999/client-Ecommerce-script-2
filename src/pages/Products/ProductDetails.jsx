import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

const products = [
  {
    id: 1,
    category: "Health & Beauty",
    name: "Medicube Zero Pore Pink",
    price: 108,
    salePrice: 95,
    imageUrl:
      "https://i.ibb.co.com/tMd7xstr/istockphoto-1246138278-1024x1024.jpg",
    description:
      "Medicube Zero Pore Pink is a premium skincare solution designed to minimize pores and improve skin texture. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free f",
  },
  {
    id: 2,
    category: "Cosmetics",
    name: "Christian Dior Dior Addict",
    price: 100,
    salePrice: 75,
    imageUrl: "https://i.ibb.co.com/9kKVfzL0/pexels-pixabay-51383.jpg",
    description:
      "Christian Dior Dior Addict is a luxurious perfume with a blend of floral and sensual notes.",
  },
  {
    id: 3,
    category: "Home & Kitchen",
    name: "Stainless Steel Coffee Maker",
    price: 120,
    salePrice: 55,
    imageUrl: "https://i.ibb.co.com/p6Sx7pgz/phantom-drone-camera.jpg",
    description:
      "High-quality stainless steel coffee maker for rich, flavorful coffee every morning.",
  },
  {
    id: 4,
    category: "Health & Beauty",
    name: "Vitamin C Serum",
    price: 50,
    salePrice: 40,
    imageUrl:
      "https://i.ibb.co.com/tMd7xstr/istockphoto-1246138278-1024x1024.jpg",
    description: "Brightening Vitamin C Serum for glowing skin.",
  },
  {
    id: 5,
    category: "Health & Beauty",
    name: "Collagen Cream",
    price: 70,
    salePrice: 60,
    imageUrl:
      "https://i.ibb.co.com/tMd7xstr/istockphoto-1246138278-1024x1024.jpg",
    description: "Anti-aging collagen cream to reduce wrinkles.",
  },
  {
    id: 6,
    category: "Health & Beauty",
    name: "Vitamin C Serum",
    price: 50,
    salePrice: 40,
    imageUrl:
      "https://i.ibb.co.com/tMd7xstr/istockphoto-1246138278-1024x1024.jpg",
    description: "Brightening Vitamin C Serum for glowing skin.",
  },
  {
    id: 7,
    category: "Health & Beauty",
    name: "Collagen Cream",
    price: 70,
    salePrice: 60,
    imageUrl:
      "https://i.ibb.co.com/tMd7xstr/istockphoto-1246138278-1024x1024.jpg",
    description: "Anti-aging collagen cream to reduce wrinkles.",
  },
];

// Sample reviews
const reviews = [
  {
    id: 1,
    user: "Alice Johnson",
    rating: 5,
    comment: "Amazing product! Really improved my skin.",
    date: "2025-08-01",
  },
  {
    id: 2,
    user: "David Smith",
    rating: 4,
    comment: "Good quality but a bit pricey.",
    date: "2025-07-21",
  },
  {
    id: 3,
    user: "Maria Lee",
    rating: 5,
    comment: "Exceeded my expectations! Highly recommend.",
    date: "2025-06-15",
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showReviewModal, setShowReviewModal] = useState(false);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
      </div>
    );
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Average rating
  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  // Same category products
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Product Details */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-2xl w-full h-80 object-cover"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">
            {product.description.split(" ").slice(0, 15).join(" ")}{" "}
            <span className="opacity-80 text-xl">. . . . . . .</span>
          </p>

          {/* Average Rating */}
          <div className="flex items-center mb-4 -mt-2">
            <span className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.round(avgRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </span>
            <span className="ml-3 text-gray-600 font-semibold">
              {avgRating.toFixed(1)} / 5
            </span>
          </div>

          <div className="flex items-center space-x-3 mb-6">
            {product.salePrice ? (
              <>
                <p className="text-2xl font-bold text-red-500">
                  ${product.salePrice}
                </p>
                <p className="text-lg text-gray-400 line-through">
                  ${product.price}
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-gray-800">
                ${product.price}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="pb-5">
            <p className="text-lg font-semibold p-1 opacity-80">Quantity</p>
            <div className="flex items-center gap-6 bg-gray-100 rounded-md w-32 justify-between p-2 px-3 text-center text-xl font-semibold opacity-85">
              <button
                onClick={decreaseQuantity}
                className="hover:text-red-500 transition cursor-pointer"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="hover:text-red-500 transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 md:gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-800 cursor-pointer text-white font-semibold py-2 md:py-3 px-4 whitespace-nowrap rounded-full flex items-center justify-center space-x-2 transition">
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button className="flex-1 bg-red-500 cursor-pointer opacity-90 hover:bg-red-800 text-white font-semibold whitespace-nowrap py-2 md:py-3 px-4 rounded-full transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= Description & Review Tabs ================= */}
      <div className="mt-12 border-t border-gray-200 pt-4">
        {/* Tab Buttons */}
        <div className="flex gap-6 border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 font-semibold cursor-pointer ${
              activeTab === "description"
                ? "border-b-2 border-red-600 text-black "
                : "text-gray-500"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 font-semibold cursor-pointer ${
              activeTab === "reviews"
                ? "border-b-2 border-red-600 text-black"
                : "text-gray-500"
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="text-gray-700">
          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="mt-3 text-[15px] leading-7 text-gray-600">
              <p>{product.description}</p>
              <p className="mt-4">
                This product belongs to the{" "}
                <span className="font-semibold">{product.category}</span>{" "}
                category. It is priced at{" "}
                <span className="font-semibold">
                  ${product.salePrice || product.price}
                </span>{" "}
                and designed to ensure customer satisfaction.
              </p>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Reviews ({reviews.length})
                </h2>

                {/* Average Rating */}
                <div className="flex items-center mb-4">
                  <span className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.round(avgRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </span>
                  <span className="ml-3 text-gray-600 font-semibold">
                    {avgRating.toFixed(1)} / 5
                  </span>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-xl p-4 space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-800">
                          {review.user}
                        </p>
                        <p className="text-gray-500 text-sm">{review.date}</p>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Add Review Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow-md"
                >
                  Add Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Same Category Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 opacity-80">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="border border-gray-200 rounded-xl p-4 flex flex-col items-center space-y-1"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <h3 className="font-semibold text-gray-800 text-lg text-center whitespace-nowrap">
                  {p.name}
                </h3>
                <div className="flex items-center space-x-2">
                  {p.salePrice ? (
                    <>
                      <p className="text-red-500 font-bold">${p.salePrice}</p>
                      <p className="text-gray-400 line-through">${p.price}</p>
                    </>
                  ) : (
                    <p className="text-gray-800 font-bold">${p.price}</p>
                  )}
                </div>
                <button className="bg-blue-600 opacity-85 hover:bg-blue-800 text-white py-1 md:py-1 px-4 rounded-full flex items-center justify-center space-x-1 transition">
                  <ShoppingCart size={16} />
                  <span>Details</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
