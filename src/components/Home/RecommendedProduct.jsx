import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useGetAllProductQuery } from "../../redux/app/services/product/productApi";
import Loader from "../../utils/Loader";
import Product from "../../pages/Products/Product";

export default function RecommendedProduct() {
  const params = {
    limit: 10,
  };

  const { data: productsData, isLoading: isProductLoading } =
    useGetAllProductQuery(params);

  const products = productsData?.data || [];

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

  if (isProductLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 mb-6">
        <h2 className="text-2xl md:text-4xl font-semibold">
          Recommended for you
        </h2>

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
            className="flex transition-transform duration-700 ease-in-out mb-6"
            style={{
              width: `${(products.length * 100) / visibleCount}%`,
              transform: `translateX(-${
                (currentIndex * 100) / products.length
              }%)`,
            }}
          >
            {products?.map((product) => (
              <div
                key={product?._id}
                style={{ width: `${100 / products.length}%` }}
                className="px-2 box-border"
              >
                <Product product={product} />
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
