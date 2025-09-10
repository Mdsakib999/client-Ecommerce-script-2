import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function PopularProduct() {
  const products = [
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      brand: "Google",
      category: "Smartphones",
      price: 1099.99,
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
      category: "Laptop",
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
      category: "Computer",
      price: 899.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      color: ["Lunar Blue", "Stardust White"],
      rating: 4.1,
      inStock: true,
      description:
        "The Motorola Edge 40 Pro combines sleek design with flagship-level features, offering a well-balanced smartphone experience. Its curved 6.67-inch OLED display supports a 165Hz refresh rate, ensuring smooth scrolling and excellent color reproduction. Powered by the Snapdragon 8 Gen 2 chipset, it offers fast performance for everyday use, gaming, and multitasking. The triple-camera system delivers sharp and vibrant photos, with AI enhancements improving low-light and motion shots. With Motorola’s near-stock Android interface, users enjoy a clean and fast UI. Its fast-charging capability, durable build, and stylish design make the Motorola Edge 40 Pro a reliable and modern choice.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Update visibleCount dynamically on window resize
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleCount(4); // xl
      else if (width >= 1024) setVisibleCount(3); // lg
      else if (width >= 768) setVisibleCount(2); // md
      else setVisibleCount(1); // sm
    };

    updateVisibleCount(); // initial call
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < products.length - visibleCount)
      setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 mb-6">
        <h2 className="text-2xl md:text-4xl font-semibold">Popular Products</h2>
        <Link to={"/products"}>
          <p className="underline cursor-pointer text-md md:text-lg font-semibold">
            View All Products
          </p>
        </Link>
      </div>

      <div className="py-8 relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full disabled:opacity-40"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="px-2 flex-shrink-0"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="p-3">
                  <div className="bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-300 hover:scale-105">
                    {product.discountPrice && (
                      <div className="absolute top-1 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
                        SALE
                      </div>
                    )}
                    <div className="p-4 flex flex-col items-center">
                      <div className="w-40 h-40 mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="w-full text-center">
                        <p className="text-sm text-gray-500 mb-1">
                          {product.category}
                        </p>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 ">
                          <Link to={`/product/${product.id}`}>
                            {product.name}
                          </Link>
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
                          <button className="w-full  bg-gray-200 cursor-pointer rounded-full py-2 px-4 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors hover:bg-gray-700 hover:text-white">
                            <ShoppingCart size={16} />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= products.length - visibleCount}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full disabled:opacity-40"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
