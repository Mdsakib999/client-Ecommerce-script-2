import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

const products = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max",
    brand: "Apple",
    category: "Smartphones",
    price: 1299.99,
    discountPrice: 1199.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    image1:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-1?w=300",
    image2:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-2?w=300",
    image3:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-3?w=300",
    color: ["Natural Titanium", "Blue", "Silver", "Black"],
    rating: 4.8,
    inStock: true,
    warranty: "1 Year Official Apple Warranty",
    deliveryTime: "3 - 5 Business Days",
    deliveryCharge: "Free Delivery",
    description:
      "The Apple iPhone 15 Pro Max is Apples most advanced smartphone yet, built with aerospace-grade titanium for strength and reduced weight. It features a stunning 6.7-inch Super Retina XDR display with ProMotion for smoother visuals and ultra-bright performance. Powered by the A17 Pro chip, it delivers unmatched speed, power efficiency, and graphics capabilities for gaming and multitasking. The advanced triple-camera system includes a 48MP main camera, telephoto lens, and ultra-wide, capturing breathtaking photos and videos in all lighting conditions. With 5G connectivity, iOS 17, and all-day battery life, the iPhone 15 Pro Max redefines premium smartphones for professionals and enthusiasts alike.",
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "Smartphones",
    price: 1099.99,
    discountPrice: 999.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=300&h=300&fit=crop",
    image1: "https://i.ibb.co.com/KxvJM3mP/pexels-fotios-photos-1092644.jpg",
    image2:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=300&h=300&fi",
    color: ["Obsidian", "Porcelain", "Bay Blue"],
    rating: 4.6,
    inStock: true,
    warranty: "2 Years Official Google Warranty",
    deliveryTime: "5 - 7 Business Days",
    deliveryCharge: "$15 Standard Delivery",
    description:
      "The Google Pixel 8 Pro is designed to deliver the best of Android with Google’s clean software and AI-driven performance. Equipped with the Google Tensor G3 chip, it offers cutting-edge AI features such as enhanced voice recognition, live translation, and advanced photo editing tools like Magic Eraser. Its 6.7-inch LTPO OLED display supports adaptive refresh rates up to 120Hz for smooth scrolling and vivid visuals. The Pixel 8 Pro’s triple camera system, led by a powerful 50MP sensor, captures incredible details, while Night Sight and Real Tone ensure accurate photos in any condition. With long software support, it’s built to last.",
  },
  {
    id: 5,
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    category: "Smartphones",
    price: 849.99,
    discountPrice: 749.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    color: ["Graphite", "Blue", "White"],
    rating: 4.4,
    inStock: true,
    description:
      "The Xiaomi 14 Pro combines high-end performance with sleek design at a competitive price point. Featuring a large AMOLED display with vibrant colors and a 120Hz refresh rate, it ensures immersive visuals whether for gaming, streaming, or browsing. Powered by the Snapdragon 8 Gen 3 chipset, it offers blazing-fast performance and efficient multitasking. The advanced Leica-engineered camera system includes a 50MP primary lens, telephoto zoom, and ultra-wide sensor for professional-grade photography. With fast charging, long-lasting battery, and MIUI optimization, the Xiaomi 14 Pro balances premium features with affordability, making it an excellent choice for users seeking flagship performance without breaking the bank.",
  },
  {
    id: 7,
    name: "Huawei Mate 60 Pro",
    brand: "Huawei",
    category: "Smartphones",
    price: 999.99,
    discountPrice: 899.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    color: ["Black", "White", "Purple"],
    rating: 4.2,
    inStock: true,
    description:
      "The Huawei Mate 60 Pro is a powerhouse flagship built with innovative design and powerful internals. Featuring a large OLED display with ultra-high resolution and adaptive refresh rate, it ensures smooth visuals and crystal-clear clarity. Its cutting-edge processor and optimized HarmonyOS provide lightning-fast performance and energy efficiency. The camera system, developed with Huawei’s imaging expertise, offers stunning detail with its high-resolution sensors and AI-enhanced image processing. Built-in satellite communication support enhances connectivity in remote areas. With long-lasting battery, superfast charging, and premium materials, the Huawei Mate 60 Pro sets new standards for smartphones that blend style, innovation, and reliable performance.",
  },
  {
    id: 8,
    name: "Asus ROG Phone 7",
    brand: "Asus",
    category: "Gaming Phones",
    price: 1099.99,
    discountPrice: 949.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
    color: ["Phantom Black", "Storm White"],
    rating: 4.6,
    inStock: true,
    description:
      "The Asus ROG Phone 7 is a gaming powerhouse designed specifically for mobile gamers who demand performance and style. Featuring a 6.78-inch AMOLED display with a 165Hz refresh rate and ultra-low touch latency, it delivers a flawless gaming experience. Powered by the Snapdragon 8 Gen 2 processor and advanced cooling systems, it prevents overheating during extended sessions. The massive 6000mAh battery supports fast charging, ensuring uninterrupted play. Its AirTrigger controls provide console-like precision, while the dual front-facing speakers deliver immersive audio. With RGB lighting, customizable gaming modes, and durable build quality, the ROG Phone 7 is the ultimate gaming companion.",
  },
  {
    id: 10,
    name: "Motorola Edge 40 Pro",
    brand: "Motorola",
    category: "Smartphones",
    price: 899.99,
    discountPrice: 799.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    color: ["Lunar Blue", "Stardust White"],
    rating: 4.1,
    inStock: true,
    description:
      "The Motorola Edge 40 Pro combines sleek design with flagship-level features, offering a well-balanced smartphone experience. Its curved 6.67-inch OLED display supports a 165Hz refresh rate, ensuring smooth scrolling and excellent color reproduction. Powered by the Snapdragon 8 Gen 2 chipset, it offers fast performance for everyday use, gaming, and multitasking. The triple-camera system delivers sharp and vibrant photos, with AI enhancements improving low-light and motion shots. With Motorola’s near-stock Android interface, users enjoy a clean and fast UI. Its fast-charging capability, durable build, and stylish design make the Motorola Edge 40 Pro a reliable and modern choice.",
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
  // const location = useLocation();
  // const product = location.state?.product;
  const product = products.find((p) => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState(product.image);

  console.log(products);

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
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* Main Image */}
          <div className="w-full flex items-center justify-center">
            <img
              src={mainImage}
              alt={product.name}
              className="rounded-2xl w-full h-80 object-cover transition duration-300"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {[product.image, product.image1, product.image2, product.image3]
              .filter(Boolean)
              .map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 ${
                    mainImage === img ? "border-red-500" : "border-transparent"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Info Section */}
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

          {/* Price */}
          <div className="flex items-center space-x-3 mb-6">
            {product.discountPrice ? (
              <>
                <p className="text-2xl font-bold text-red-500">
                  ${product.discountPrice}
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
            <button className="flex-1 bg-gray-600 hover:bg-gray-800 cursor-pointer text-white font-semibold py-2 md:py-3 px-4 whitespace-nowrap rounded-full flex items-center justify-center space-x-2 transition">
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button className="flex-1 bg-red-500 cursor-pointer opacity-90 hover:bg-red-800 text-white font-semibold whitespace-nowrap py-2 md:py-3 px-4 rounded-full transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= Tabs ================= */}
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
                  ${product.discountPrice || product.price}
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

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 opacity-80">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-gray-50 rounded-xl pb-4 flex flex-col items-center space-y-2"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-36 object-cover rounded-lg"
                />
                <h3 className="font-semibold text-gray-800 text-lg text-center whitespace-nowrap">
                  {p.name}
                </h3>
                <div className="flex items-center space-x-2">
                  {p.discountPrice ? (
                    <>
                      <p className="text-red-500 font-bold">
                        ${p.discountPrice}
                      </p>
                      <p className="text-gray-400 line-through">${p.price}</p>
                    </>
                  ) : (
                    <p className="text-gray-800 font-bold">${p.price}</p>
                  )}
                </div>
                <button className="bg-gray-200 rounded-full py-2  w-4/5 font-semibold cursor-pointer text-sm flex items-center justify-center space-x-2 transition-colors hover:bg-gray-700 hover:text-white">
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
