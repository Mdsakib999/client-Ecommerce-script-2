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
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Our Featured Offers
        </h2>
        <a
          href="#"
          className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2"
        >
          See All Products
        </a>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 group">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col relative items-center text-center"
          >
            {/* Circular Image Container */}
            <div
              className={`
              relative w-64 h-64 ${offer.bgColor} rounded-full 
              flex items-center justify-center mb-6 overflow-hidden
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

            {/* Offer Text */}
            <h3 className="text-lg font-medium text-gray-900 mb-6 max-w-xs leading-relaxed">
              {offer.title}
            </h3>

            {/* Shop Now Button */}
            <button
              className={` shopBtn
              px-8 py-3 absolute -bottom-10 block rounded-lg font-medium text-sm transition-colors border border-gray-300 hover:border-[#1a1a2c] duration-200
              ${offer.buttonStyle}
            `}
            >
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
