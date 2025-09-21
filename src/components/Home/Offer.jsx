import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";

const Offer = () => {
  const offers = [
    {
      id: 1,
      title: "Save up to $40 on select cellphone & tablet",
      image:
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-yellow-100",
      buttonStyle: "bg-white text-gray-900 hover:bg-gray-50",
    },
    {
      id: 2,
      title: "Save up to 25% on furniture items",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-blue-200",
      buttonStyle: "bg-white text-gray-900 hover:bg-gray-50",
    },
    {
      id: 3,
      title: "Save up to $69 on select perfume items",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-pink-200",
      buttonStyle: "bg-white text-gray-900 hover:bg-gray-50",
    },
    {
      id: 4,
      title: "Save up to 30% on audio items",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-green-200",
      buttonStyle: "border border-gray-300 text-gray-900 hover:bg-gray-50",
    },
    {
      id: 5,
      title: "Save up to 30% on audio items",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-green-200",
      buttonStyle: "border border-gray-300 text-gray-900 hover:bg-gray-50",
    },
    {
      id: 6,
      title: "Save up to 30% on audio items",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-green-200",
      buttonStyle: "border border-gray-300 text-gray-900 hover:bg-gray-50",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Our Featured Offers
        </h2>
        <Link to={"/products"}>
          <p className="underline cursor-pointer text-md md:text-lg font-semibold">
            View All Products
          </p>
        </Link>
      </div>

      {/* Offers Grid */}
      <Swiper
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 }, // mobile
          768: { slidesPerView: 2 }, // tablet
          1024: { slidesPerView: 4 }, // desktop
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 group"
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {offers.map((offer) => (
          <SwiperSlide
            key={offer.id}
            className="flex flex-col items-center pb-16 text-center"
          >
            {/* Circular Image Container */}
            <div
              className={`
              relative w-64 h-64 ${offer.bgColor} rounded-full 
              flex items-center justify-center mb-6 overflow-hidden mx-auto
              hover:scale-105 transition-transform duration-300
            `}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-48 h-48 object-cover rounded-full"
              />
              <div className="absolute top-4 right-4 w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-6 max-w-xs leading-relaxed mx-auto h-12 pb-10">
              {offer.title}
            </h3>

            {/* Shop Now Button */}
            <Link to="/products">
              <button
                className={` shopBtn text-center mx-auto
              px-8 py-3 block rounded-lg font-medium text-sm transition-colors border border-gray-300 hover:border-[#1a1a2c] duration-200
              ${offer.buttonStyle}
            `}
              >
                Shop Now
              </button>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Offer;
