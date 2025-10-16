import { useMemo } from "react";
import { useGetAllProductQuery } from "../../redux/app/services/product/productApi";
import OfferTimer from "./OfferTimer";
import Loader from "../../utils/Loader";
import Product from "../../pages/Products/Product";

export default function OfferedProducts() {
  const targetDate = new Date("January 25, 2026 00:00:00").getTime();

  const params = useMemo(() => ({ limit: 3 }), []);
  const { data: productsData, isLoading: isProductLoading } =
    useGetAllProductQuery(params);
  const products = productsData?.data || [];
  if (isProductLoading) return <Loader />;

  return (
    <div className="max-w-7xl px-4 w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 mb-6">
        <div className="flex items-center space-x-3">
          <img
            className="w-16 md:w-24"
            src="https://i.ibb.co/ymWS3hLw/megaphone-loudspeaker-making-announcement-vector.jpg"
            alt="offer"
          />
          <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold">
            Available Offer
          </h2>
        </div>
      </div>

      {/* Timer + Products */}
      <div className="shadow-md flex flex-col lg:flex-row items-center rounded-2xl p-6 lg:space-x-6 space-y-6 lg:space-y-0">
        {/* Timer */}
        <div className="w-full lg:w-1/4 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            ⏳ Offer Ends In
          </h1>
          <OfferTimer targetDate={targetDate} />
          <p className="border w-40 md:w-44 py-2 px-2 text-center rounded-full mt-8 cursor-pointer text-sm md:text-lg font-semibold hover:bg-gray-700 hover:text-white transition">
            View All Offers
          </p>
        </div>

        {/* Products */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Product key={product?._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
