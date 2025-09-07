import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const ProductSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Sale Up To 60%",
      headline: "Buy 1 Get 1 Free",
      subtitle: "Bluetooth Speakers",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      color: "from-amber-400 to-orange-500",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      title: "Limited Time Offer",
      headline: "50% Off Everything",
      subtitle: "Wireless Headphones",
      image: "https://i.ibb.co.com/C5J51VbL/pexels-alialcantara-11340544.jpg?w=400&h=400&fit=crop",
      color: "from-purple-500 to-pink-500",
      buttonText: "Get Deals"
    },
    {
      id: 3,
      title: "New Collection",
      headline: "Premium Quality",
      subtitle: "Smart Watches",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      color: "from-blue-500 to-cyan-500",
      buttonText: "Explore"
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-96 rounded-2xl overflow-hidden shadow-2xl bg-white">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out transform ${
              index === currentSlide
                ? 'translate-x-0 opacity-100 scale-100'
                : index < currentSlide
                ? '-translate-x-full opacity-0 scale-95'
                : 'translate-x-full opacity-0 scale-95'
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-90`} />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-between h-full px-12">
              {/* Left Content */}
              <div className="flex-1 text-white max-w-md">
                <div className="space-y-4">
                  <p className="text-sm font-medium opacity-90 tracking-wide uppercase">
                    {slide.title}
                  </p>
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white hover:text-black">
                    {slide.headline}
                  </h1>
                  <p className="text-lg opacity-90 font-medium">
                    {slide.subtitle}
                  </p>
                  <button className="hover:bg-black group mt-6 px-8 py-3 bg-white text-gray-800 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2  cursor-pointer">
                    <ShoppingBag className="w-5 h-5 cursor-pointer" />
                    {slide.buttonText}
                  </button>
                </div>
              </div>

              {/* Right Product Image */}
              <div className="flex-1 flex justify-center items-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                    <img
                      src={slide.image}
                      alt={slide.subtitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group disabled:opacity-50"
      >
        <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group disabled:opacity-50"
      >
        <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-6 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};

export default ProductSwiper;