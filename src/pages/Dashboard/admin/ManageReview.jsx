import React, { useState } from 'react';
import { Star, Trash2, User } from 'lucide-react';

const ManageReview = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: "Wireless Bluetooth Headphones",
      customerName: "John Smith",
      customerEmail: "john.smith@email.com",
      rating: 5,
      review: "Excellent sound quality and comfortable to wear. Battery life is outstanding and the noise cancellation works perfectly.",
      date: "2024-09-10",
      verified: true
    },
    {
      id: 2,
      productName: "Smart Fitness Watch",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@email.com",
      rating: 4,
      review: "Great features and accurate tracking. The display could be brighter in sunlight, but overall very satisfied with the purchase.",
      date: "2024-09-08",
      verified: true
    },
    {
      id: 3,
      productName: "Professional Camera Lens",
      customerName: "Mike Wilson",
      customerEmail: "mike.wilson@email.com",
      rating: 2,
      review: "The lens has some quality issues. Not as sharp as expected and there's some chromatic aberration. Disappointed with this purchase.",
      date: "2024-09-05",
      verified: false
    },
    {
      id: 4,
      productName: "Gaming Mechanical Keyboard",
      customerName: "Emma Davis",
      customerEmail: "emma.davis@email.com",
      rating: 5,
      review: "Perfect for gaming! The switches feel amazing and the RGB lighting is customizable. Highly recommend for any serious gamer.",
      date: "2024-09-03",
      verified: true
    },
    {
      id: 5,
      productName: "Wireless Phone Charger",
      customerName: "David Brown",
      customerEmail: "david.brown@email.com",
      rating: 3,
      review: "Charges okay but gets quite warm during use. Works with my phone case which is good. Average product overall.",
      date: "2024-09-01",
      verified: true
    },
    {
      id: 6,
      productName: "USB-C Hub",
      customerName: "Lisa Anderson",
      customerEmail: "lisa.anderson@email.com",
      rating: 4,
      review: "Works great with my laptop. All ports function properly and it's compact for travel.",
      date: "2024-08-28",
      verified: true
    }
  ]);

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600 bg-green-50';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Review Management</h1>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{reviews.length}</div>
              <div className="text-sm text-gray-500">Total Reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-4 sm:p-5">
                {/* Header with Product Name and Delete Button */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight pr-2 flex-1">{review.productName}</h3>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 ml-2"
                    title="Delete Review"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                {/* Customer Info */}
                <div className="mb-4">
                  <div className="flex items-center space-x-1 mb-1">
                    <User size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900 truncate">{review.customerName}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate pl-5">{review.customerEmail}</p>
                  <div className="flex items-center flex-wrap gap-2 mt-2 text-xs text-gray-500 pl-5">
                    <span className="whitespace-nowrap">{new Date(review.date).toLocaleDateString()}</span>
                    {review.verified && (
                      <>
                        <span>•</span>
                        <span className="text-blue-600 font-medium whitespace-nowrap">Verified</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getRatingColor(review.rating)}`}>
                    {review.rating}/5
                  </span>
                </div>
                
                {/* Review Text */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed break-words overflow-hidden"
                     style={{
                       display: '-webkit-box',
                       WebkitLineClamp: '4',
                       WebkitBoxOrient: 'vertical'
                     }}>
                    {review.review}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Results Count */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Showing {reviews.length} reviews
        </div>
      </div>
    </div>
  );
};

export default ManageReview;