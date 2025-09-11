import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      discount: "Sale Up To 60%",
      title: "Buy 1 Get 1 Free",
      subtitle: "Bluetooth Speakers",
      buttonText: "Shop Now",
      productImage:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1920&h=800&fit=crop&crop=center",
      gradient: "from-blue-400/80 to-purple-500/80",
    },
    {
      id: 2,
      discount: "Limited Time Offer",
      title: "Premium Audio Experience",
      subtitle: "Wireless Headphones",
      buttonText: "Discover",
      productImage:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1920&h=800&fit=crop&crop=center",
      gradient: "from-rose-400/80 to-orange-500/80",
    },
    {
      id: 3,
      discount: "New Arrival",
      title: "Smart Home Audio",
      subtitle: "Voice Assistant Speakers",
      buttonText: "Learn More",
      productImage:
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=1920&h=800&fit=crop&crop=center",
      gradient: "from-green-400/80 to-teal-500/80",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  return (
    <div className="">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full relative min-h-[650px]"
              style={{
                backgroundImage: `url(${slide.productImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
              ></div>

              {/* Dark Overlay for Better Text Readability */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Centered Content */}
              <div className="absolute scale-80 inset-0 flex items-center justify-center">
                <div className="text-center text-white z-10 px-4 max-w-4xl mx-auto">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium border border-white/20">
                      {slide.discount}
                    </div>

                    <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg">
                      {slide.title}
                    </h1>

                    <p className="text-xl lg:text-2xl opacity-90 font-medium drop-shadow-md max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>

                    <Link to="/products">
                      <button className="group bg-white text-gray-800 px-8 py-2 rounded-full font-semibold text-lg hover:bg-gray-700 transform hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                        {slide.buttonText}
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Background Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full transform translate-x-48 -translate-y-48 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full transform -translate-x-48 translate-y-48 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          ))}
        </div>

        {/* Pagination Dots - Bottom Center */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full border border-white/30 ${
                index === currentSlide
                  ? "bg-white w-10 h-3"
                  : "bg-white/50 hover:bg-white/75 w-3 h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Sides */}
        <button
          onClick={prevSlide}
          className="absolute opacity-0 sm:opacity-100 left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute opacity-0 sm:opacity-100 right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Counter */}
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium z-20 border border-white/20">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}
