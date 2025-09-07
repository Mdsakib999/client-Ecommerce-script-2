import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Headphones, Camera, Watch, Speaker, Gamepad2, Laptop, Tablet } from 'lucide-react';
import Countup from '../shared/Countup';

const Featured = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: 'Smartphones',
      items: 24,
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-slate-900 to-slate-700',
      iconColor: 'text-slate-200',
      shadowColor: 'shadow-slate-500/20'
    },
    {
      id: 2,
      name: 'Audio & Headphones',
      items: 18,
      icon: Headphones,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-purple-600 to-purple-800',
      iconColor: 'text-purple-100',
      shadowColor: 'shadow-purple-500/30',
      featured: true
    },
    {
      id: 3,
      name: 'Cameras',
      items: 12,
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-emerald-500 to-teal-600',
      iconColor: 'text-emerald-100',
      shadowColor: 'shadow-emerald-500/30'
    },
    {
      id: 4,
      name: 'Smart Watches',
      items: 16,
      icon: Watch,
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-rose-500 to-pink-600',
      iconColor: 'text-rose-100',
      shadowColor: 'shadow-rose-500/30'
    },
    {
      id: 5,
      name: 'Speakers',
      items: 14,
      icon: Speaker,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-amber-500 to-orange-600',
      iconColor: 'text-amber-100',
      shadowColor: 'shadow-amber-500/30'
    },
    {
      id: 6,
      name: 'Gaming Accessories',
      items: 22,
      icon: Gamepad2,
      image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-indigo-600 to-blue-700',
      iconColor: 'text-indigo-100',
      shadowColor: 'shadow-indigo-500/30'
    },
    {
      id: 7,
      name: 'Laptops & PCs',
      items: 20,
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-gray-700 to-gray-900',
      iconColor: 'text-gray-200',
      shadowColor: 'shadow-gray-500/20'
    },
    {
      id: 8,
      name: 'Tablets',
      items: 15,
      icon: Tablet,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-cyan-500 to-blue-600',
      iconColor: 'text-cyan-100',
      shadowColor: 'shadow-cyan-500/30'
    }
  ];

  const itemsPerView = {
    mobile: 1,
    tablet: 3,
    desktop: 6
  };

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.scrollWidth / categories.length;
      const scrollPosition = itemWidth * index;
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const maxIndex = categories.length - itemsPerView.desktop;
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      
      return () => {
        scrollContainer.removeEventListener('scroll', updateScrollButtons);
      };
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-3">
          Featured Categories
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover the latest in electronic accessories and gadgets
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          disabled={!canScrollLeft}
          className={`absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 flex items-center justify-center transition-all duration-300 ${
            canScrollLeft 
              ? 'hover:bg-white hover:shadow-2xl hover:scale-110 text-gray-700 hover:text-purple-600' 
              : 'text-gray-300 cursor-not-allowed opacity-50'
          }`}
          aria-label="Previous categories"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        <button
          onClick={handleNext}
          disabled={!canScrollRight}
          className={`absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 flex items-center justify-center transition-all duration-300 ${
            canScrollRight 
              ? 'hover:bg-white hover:shadow-2xl hover:scale-110 text-gray-700 hover:text-purple-600' 
              : 'text-gray-300 cursor-not-allowed opacity-50'
          }`}
          aria-label="Next categories"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-8 lg:px-16 py-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="flex-shrink-0 group cursor-pointer"
                style={{ minWidth: '160px' }}
              >
                <div className="text-center">
                  {/* Category Card Container */}
                  <div className={`relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-4 rounded-3xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110  transition-all duration-500 ${category.shadowColor} shadow-lg group-hover:shadow-2xl overflow-hidden`}>
                    {/* Featured Badge */}
                    {category.featured && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full"></div>
                      <div className="absolute bottom-3 left-3 w-6 h-6 bg-white/10 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    
                    {/* Product Image Overlay */}
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute w-auto h-auto object-cover rounded-2xl transition-opacity duration-300"
                    />

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Category Info */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg group-hover:text-red-600 transition-colors duration-300 leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">
                      {category.items} Products
                    </p>
                  </div>

                  {/* Hover Line Effect */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-2 group-hover:w-16 transition-all duration-300 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 lg:mt-12 space-x-3">
        {Array.from({ length: Math.ceil(categories.length / 2) }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index * 2);
              scrollToIndex(index * 2);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / 2) === index
                ? 'bg-gradient-to-r from-blue-500 to-red-500 w-8 shadow-lg'
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1"> <Countup> 150 </Countup> + </div>
          <div className="text-gray-600 text-sm lg:text-base">Total Products</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1"><Countup> 8 </Countup></div>
          <div className="text-gray-600 text-sm lg:text-base">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-bold text-pink-600 mb-1"><Countup> 50 </Countup>+</div>
          <div className="text-gray-600 text-sm lg:text-base">Top Brands</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-bold text-emerald-600 mb-1"><Countup> 4.8 </Countup>★</div>
          <div className="text-gray-600 text-sm lg:text-base">Rating</div>
        </div>
      </div>
    </div>
  );
};

export default Featured;