import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
      logo: "https://i.ibb.co.com/jk6G0frS/apple-inc-508812-1280.jpg",
    },
    {
      id: 3,
      name: "Huawei",
      logo: "https://i.ibb.co.com/jk6G0frS/apple-inc-508812-1280.jpg",
    },
    {
      id: 4,
      name: "Vivo",
      logo: "https://i.ibb.co.com/jk6G0frS/apple-inc-508812-1280.jpg",
    },
    {
      id: 5,
      name: "HiKOKI",
      logo: "https://i.ibb.co.com/jk6G0frS/apple-inc-508812-1280.jpg",
    },
    {
      id: 6,
      name: "Samsung",
      logo: "https://i.ibb.co.com/jk6G0frS/apple-inc-508812-1280.jpg",
    },
    {
      id: 7,
      name: "LG",
      logo: "https://i.ibb.co.com/jk6G0frS/apple-inc-508812-1280.jpg",
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
          modules={[Autoplay]}
          spaceBetween={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="w-36 h-24 bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow duration-200 cursor-pointer mx-auto">
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
      </div>
    </div>
  );
};

export default Brands;
