import { useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

export default function CustomerLoved() {
  const products = [
    {
      id: 1,
      category: "Health & Beauty",
      name: "Medicube Zero Pore Pink",
      price: 108,
      salePrice: 95,
      imageUrl: "https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg",
    },
    {
      id: 2,
      category: "Cosmetics",
      name: "Christian Dior Dior Addict",
      price: 100,
      imageUrl: "https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg",
    },
    {
      id: 3,
      category: "Electronics",
      name: "Noise Cancelling Headphones",
      price: 250,
      salePrice: 220,
      imageUrl: "https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg",
    },
    {
      id: 4,
      category: "Home & Kitchen",
      name: "Stainless Steel Coffee Maker",
      price: 120,
      imageUrl: "https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg",
    },
    {
      id: 5,
      category: "Smartphones",
      name: "iPhone 15 Pro",
      price: 1200,
      salePrice: 1100,
      imageUrl: "https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg",
    },
    {
      id: 6,
      category: "Appliances",
      name: "Air Fryer XL",
      price: 180,
      imageUrl: "https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Determine visible cards based on screen size using window.innerWidth
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1280) return 4; // xl
      if (width >= 1024) return 3; // lg
      if (width >= 768) return 2; // md
    }
    return 1; // sm
  };

  const visibleCount = getVisibleCount();

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < products.length - visibleCount)
      setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-semibold">Customer most loved</h2>
        <p className="underline cursor-pointer text-xl">View All Products</p>
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
              transform: `translateX(-${
                (currentIndex * 100) / visibleCount
              }%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`px-2 flex-shrink-0`}
                style={{ width: `${100 / visibleCount}%` }} // responsive width
              >
                <div className="bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-300 hover:scale-105">
                  {product.salePrice && (
                    <div className="absolute top-1 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
                      SALE
                    </div>
                  )}
                  <div className="p-4 flex flex-col items-center">
                    <div className="w-40 h-40 mb-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="w-full text-center">
                      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h2>
                      <div className="flex justify-center items-baseline space-x-2">
                        {product.salePrice ? (
                          <>
                            <p className="text-lg font-bold text-red-500">
                              ${product.salePrice}
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
                        <button className="w-full bg-gray-200 rounded-full py-2 px-4 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors hover:bg-gray-700 hover:text-white">
                          <ShoppingCart size={16} />
                          <span>Add to Cart</span>
                        </button>
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
