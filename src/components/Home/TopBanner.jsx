import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllOffersQuery } from "../../redux/app/services/offer/offerApi";

export default function TopBanner() {
  const { data: AllOffers } = useGetAllOffersQuery();
  const offerImages = AllOffers?.data?.[0]?.images || [];

  const getLayoutConfig = (count) => {
    switch (count) {
      case 1:
        return [{ span: "col-span-4 row-span-2", size: "large" }];
      case 2:
        return [
          { span: "col-span-2 row-span-2", size: "medium" },
          { span: "col-span-2 row-span-2", size: "medium" },
        ];
      case 3:
        return [
          { span: "col-span-2 row-span-2", size: "medium" },
          { span: "col-span-2 row-span-1", size: "small" },
          { span: "col-span-2 row-span-1", size: "small" },
        ];
      case 4:
        return [
          { span: "col-span-1 row-span-2", size: "small" },
          { span: "col-span-1 row-span-1", size: "small" },
          { span: "col-span-2 row-span-1", size: "medium" },
          { span: "col-span-3 row-span-1", size: "large" },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      {/* Desktop */}
      <div
        className={`md:grid hidden max-w-7xl mx-auto gap-4 grid-cols-4 grid-rows-2 ${
          offerImages.length > 0 && "h-[80vh]"
        }`}
      >
        {offerImages.map((img, idx) => {
          const layout = getLayoutConfig(offerImages.length)[idx];
          return (
            <div
              key={img._id || img.public_id}
              className={`relative overflow-hidden rounded-xl shadow-lg ${layout?.span}`}
            >
              <img
                src={img.url}
                alt={img.name || "offer-image"}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="w-full md:hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          loop
        >
          {offerImages.map((img) => (
            <SwiperSlide key={img._id || img.public_id}>
              <div className="overflow-hidden">
                <img
                  className="w-full min-h-80 object-cover"
                  src={img.url}
                  alt={img.name || "offer-image"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
