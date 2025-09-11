import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function TopBanner() {
  return (
    <>
      <div className="md:flex gap-4 hidden max-w-7xl mx-auto">
        <div className="w-3/5 h-[80vh] flex flex-col gap-4">
          <img
            className="h-[392px] w-full object-cover"
            src="https://i.ibb.co.com/h6RZ6QC/pexels-sora-shimazaki-5926445.jpg"
            alt="sale-image"
          />
          <img
            className="h-[392px] w-full object-cover"
            src="https://i.ibb.co.com/v4xFsCMV/pexels-karolina-grabowska-5650047.jpg"
          />
        </div>
        <div className="w-2/5 relative">
          <div className="">
            <img
              className="h-[800px]"
              src="https://i.ibb.co.com/KcWJ3Hrs/Gemini-Generated-Image-wt78iywt78iywt78.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="w-full visible md:hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={1}
          loop={false}
        >
          <SwiperSlide>
            <div className=" text-white rounded-lg">
              <img
                className="h-full"
                src="https://i.ibb.co.com/KcWJ3Hrs/Gemini-Generated-Image-wt78iywt78iywt78.png"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" text-white rounded-lg">
              <img
                src="https://i.ibb.co.com/WpxYhKvZ/Gemini-Generated-Image-j8s1ztj8s1ztj8s1.png"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" text-white rounded-lg">
              <img
                src="https://i.ibb.co.com/23YjBpT6/Gemini-Generated-Image-4ob5fj4ob5fj4ob5.png"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
