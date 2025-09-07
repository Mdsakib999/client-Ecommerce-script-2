import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      discount: 'Sale Up To 60%',
      title: 'Buy 1 Get 1 Free',
      subtitle: 'Bluetooth Speakers',
      buttonText: 'Shop Now',
      productImage: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-amber-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-amber-400 to-orange-500'
    },
    {
      id: 2,
      discount: 'Limited Time Offer',
      title: 'Premium Audio Experience',
      subtitle: 'Wireless Headphones',
      buttonText: 'Discover',
      productImage: 'https://i.ibb.co.com/C5J51VbL/pexels-alialcantara-11340544.jpg?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-blue-400 to-purple-500',
      bgColor: 'bg-gradient-to-br from-blue-400 to-purple-500'
    },
    {
      id: 3,
      discount: 'New Arrival',
      title: 'Smart Home Audio',
      subtitle: 'Voice Assistant Speakers',
      buttonText: 'Learn More',
      productImage: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-green-400 to-teal-500',
      bgColor: 'bg-gradient-to-br from-green-400 to-teal-500'
    }
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
    <div className="relative w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`min-w-full relative ${slide.bgColor} overflow-hidden`}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between h-full min-h-[500px] lg:min-h-[400px] p-8 lg:p-12">
              {/* Content Section */}
              <div className="flex-1 text-left text-white z-10 lg:pr-8 mb-8 lg:mb-0">
                <div className="space-y-4 lg:space-y-6">
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-700">
                    {slide.discount}
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  
                  <p className="text-lg lg:text-xl opacity-90 font-medium">
                    {slide.subtitle}
                  </p>
<<<<<<< HEAD
                  
                  <button className="group bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-700 transform hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
=======
                  <button className="hover:bg-black group mt-6 px-8 py-3 bg-white text-gray-800 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2  cursor-pointer">
                    <ShoppingBag className="w-5 h-5 cursor-pointer " />
>>>>>>> 840672c74d2fc7f4ff66abb663e7745490b1ec14
                    {slide.buttonText}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>

              {/* Product Image Section */}
              <div className="flex-1 relative flex justify-center items-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
                  <img
                    src={slide.productImage}
                    alt={slide.subtitle}
                    className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full transform translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-32 translate-y-32"></div>
          </div>
        ))}
      </div>

      {/* Pagination Dots - Left Bottom */}
      <div className="absolute bottom-6 left-6 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Right Bottom */}
      <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
        <button
          onClick={prevSlide}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium z-20">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default ProductSwiper;