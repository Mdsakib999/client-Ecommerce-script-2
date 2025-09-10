import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function OfferedProducts() {
  const targetDate = new Date("September 25, 2025 00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  });

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
      color: ["Natural Titanium", "Blue", "Silver", "Black"],
      rating: 4.8,
      inStock: true,
      description:
        "The Apple iPhone 15 Pro Max is Apple’s most advanced smartphone yet, built with aerospace-grade titanium for strength and reduced weight. It features a stunning 6.7-inch Super Retina XDR display with ProMotion for smoother visuals and ultra-bright performance. Powered by the A17 Pro chip, it delivers unmatched speed, power efficiency, and graphics capabilities for gaming and multitasking. The advanced triple-camera system includes a 48MP main camera, telephoto lens, and ultra-wide, capturing breathtaking photos and videos in all lighting conditions. With 5G connectivity, iOS 17, and all-day battery life, the iPhone 15 Pro Max redefines premium smartphones for professionals and enthusiasts alike.",
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
      color: ["Obsidian", "Porcelain", "Bay Blue"],
      rating: 4.6,
      inStock: true,
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
  ];

  return (
    <div className="max-w-7xl px-4 w-full mx-auto">
      {/* Section header */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 mb-6">
        <div className="flex items-center space-x-3">
          <img
            className="w-16 md:w-24"
            src="https://i.ibb.co.com/ymWS3hLw/megaphone-loudspeaker-making-announcement-vector.jpg"
            alt="offer"
          />
          <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold">
            Available Offer
          </h2>
        </div>
      </div>

      {/* Timer + Products */}
      <div className="flex flex-col lg:flex-row bg-red-200 items-center rounded-2xl p-6 lg:space-x-6 space-y-6 lg:space-y-0 ">
        {/* Timer */}
        <div className="w-full lg:w-1/4 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            ⏳ Offer Ends In
          </h1>
          <div className="flex space-x-4 text-center">
            <div>
              <div className="text-xl md:text-2xl font-semibold w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center">
                {timeLeft.days}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Days</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center">
                {timeLeft.hours}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Hours</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center">
                {timeLeft.minutes}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Mins</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center">
                {timeLeft.seconds}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Secs</div>
            </div>
          </div>
          <p className="border w-40 md:w-44 py-2 px-2 text-center rounded-full mt-8 cursor-pointer text-sm md:text-lg font-semibold hover:bg-gray-700 hover:text-white transition">
            View All Offers
          </p>
        </div>

        {/* Products */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-300 hover:scale-105"
              >
                {product.discountPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    SALE
                  </div>
                )}
                <div className="p-4 flex flex-col items-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full rounded-full object-cover "
                    />
                  </div>
                  <div className="w-full text-center">
                    <p className="text-sm text-gray-500 mb-1">
                      {product.category}
                    </p>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h2>
                    <div className="flex justify-center items-baseline space-x-2">
                      {product.discountPrice ? (
                        <>
                          <p className="text-lg font-bold text-red-500">
                            ${product.discountPrice}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            ${product.price}
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-bold text-gray-800">
                          ${product.price}
                        </p>
                      )}
                    </div>
                    <div className="pt-3">
                      <button
                        state={{ product }}
                        className="w-full cursor-pointer bg-gray-200 rounded-full py-2 px-4 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors hover:bg-gray-700 hover:text-white"
                      >
                        <ShoppingCart size={16} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
