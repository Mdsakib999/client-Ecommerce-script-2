import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Brands = () => {
  const brands = [
    {
      id: 1,
      name: "Sony",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
    },
    {
      id: 2,
      name: "ThinkPad",
      logo: "https://logos-world.net/wp-content/uploads/2020/08/ThinkPad-Logo.png",
    },
    {
      id: 3,
      name: "Huawei",
      logo: "https://logos-world.net/wp-content/uploads/2020/07/Huawei-Logo.png",
    },
    {
      id: 4,
      name: "Vivo",
      logo: "https://logos-world.net/wp-content/uploads/2020/08/Vivo-Logo.png",
    },
    {
      id: 5,
      name: "HiKOKI",
      logo: "https://www.hikoki-powertools.com/images/logo-hikoki.svg",
    },
    {
      id: 6,
      name: "Samsung",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png",
    },
    {
      id: 7,
      name: "LG",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/LG-Logo.png",
    },
    {
      id: 8,
      name: "LG",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/LG-Logo.png",
    },
    {
      id: 9,
      name: "LG",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/LG-Logo.png",
    },
    {
      id: 10,
      name: "LG",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/LG-Logo.png",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 relative">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-8 text-gray-900">
        Shop By Brands
      </h2>

      {/* Swiper Carousel */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={5}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div
                className="w-36 h-24 bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow duration-200 cursor-pointer mx-auto"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-10 object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                  style={{ maxWidth: "120px" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Brands;