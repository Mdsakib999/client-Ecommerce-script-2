import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { addToCart } from "../../redux/app/features/cart/cartSlice";
import { useGetAllProductQuery } from "../../redux/app/services/product/productApi";
import Loader from "../../utils/Loader";

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

  const params = {
    limit: 3,
  };

  const { data: productsData, isLoading: isProductLoading } =
    useGetAllProductQuery(params);

  const products = productsData?.data || [];

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isProductLoading) return <Loader />;

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
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full rounded-full object-cover "
                    />
                  </div>
                  <div className="w-full text-center">
                    <p className="text-sm text-gray-500 mb-1">
                      {product.category}
                    </p>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      <Link to={`/product/${product.id}`}>
                        {product.name.slice(0, 25)}
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
                      <button
                        onClick={() => handleAddToCart(product)}
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
