import React, { useState } from 'react';
import { 
  Search, Filter, Star, MessageCircle, Eye, Trash2, Flag, 
  CheckCircle, XCircle, Clock, AlertTriangle, Send, X,
  ThumbsUp, ThumbsDown, MoreVertical, User, Calendar,
  Package, TrendingUp, Award, MessageSquare
} from 'lucide-react';

const ManageReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [bulkSelected, setBulkSelected] = useState([]);

  // Sample reviews data
  const [reviews, setReviews] = useState([
    {
      id: 'REV-001',
      productId: 'PRD-001',
      productName: 'Wireless Bluetooth Headphones',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      rating: 5,
      title: 'Excellent sound quality!',
      comment: 'These headphones exceeded my expectations. The sound quality is crystal clear and the battery life is amazing. Highly recommended!',
      date: '2024-09-10',
      status: 'approved',
      helpful: 15,
      notHelpful: 2,
      verified: true,
      adminResponse: null,
      flagged: false,
      flagReason: null
    },
    {
      id: 'REV-002',
      productId: 'PRD-002',
      productName: 'Running Shoes - Blue',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      rating: 4,
      title: 'Good shoes but sizing runs small',
      comment: 'Quality is good and they are comfortable for running. However, I had to return and get a size larger than usual. Make sure to order a size up!',
      date: '2024-09-08',
      status: 'approved',
      helpful: 8,
      notHelpful: 1,
      verified: true,
      adminResponse: {
        message: 'Thank you for the feedback! We\'ve updated our sizing guide to help other customers.',
        date: '2024-09-09',
        respondedBy: 'Admin Team'
      },
      flagged: false,
      flagReason: null
    },
    {
      id: 'REV-003',
      productId: 'PRD-003',
      productName: 'Coffee Maker Pro',
      customerName: 'Mike Wilson',
      customerEmail: 'mike@example.com',
      rating: 2,
      title: 'Disappointing purchase',
      comment: 'The coffee maker broke after just 2 weeks of use. Very disappointed with the quality. Would not recommend.',
      date: '2024-09-06',
      status: 'pending',
      helpful: 3,
      notHelpful: 5,
      verified: true,
      adminResponse: null,
      flagged: true,
      flagReason: 'Quality concern'
    },
    {
      id: 'REV-004',
      productId: 'PRD-001',
      productName: 'Wireless Bluetooth Headphones',
      customerName: 'Emma Davis',
      customerEmail: 'emma@example.com',
      rating: 1,
      title: 'Terrible product and service',
      comment: 'This is the worst product I have ever bought. Complete waste of money. The company should be ashamed!',
      date: '2024-09-05',
      status: 'rejected',
      helpful: 0,
      notHelpful: 12,
      verified: false,
      adminResponse: null,
      flagged: true,
      flagReason: 'Inappropriate language'
    },
    {
      id: 'REV-005',
      productId: 'PRD-004',
      productName: 'Laptop Stand',
      customerName: 'Alex Brown',
      customerEmail: 'alex@example.com',
      rating: 4,
      title: 'Solid build quality',
      comment: 'Well made laptop stand. Easy to adjust and very stable. Good value for money.',
      date: '2024-09-04',
      status: 'pending',
      helpful: 6,
      notHelpful: 0,
      verified: true,
      adminResponse: null,
      flagged: false,
      flagReason: null
    }
  ]);

  const products = [
    'Wireless Bluetooth Headphones',
    'Running Shoes - Blue', 
    'Coffee Maker Pro',
    'Laptop Stand',
    'Gaming Mouse RGB'
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesProduct = productFilter === 'all' || review.productName === productFilter;
    return matchesSearch && matchesRating && matchesStatus && matchesProduct;
  });

  const handleStatusChange = (reviewId, newStatus) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, status: newStatus } : review
    ));
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    }
  };

  const handleSubmitResponse = () => {
    if (!adminResponse.trim()) return;

    setReviews(prev => prev.map(review => 
      review.id === selectedReview.id 
        ? { 
            ...review, 
            adminResponse: {
              message: adminResponse,
              date: new Date().toISOString().split('T')[0],
              respondedBy: 'Admin Team'
            }
          }
        : review
    ));

    setAdminResponse('');
    setShowResponseModal(false);
    setSelectedReview(null);
  };

  const handleBulkSelect = (reviewId) => {
    setBulkSelected(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleBulkAction = (action) => {
    if (bulkSelected.length === 0) return;

    if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${bulkSelected.length} reviews?`)) {
        setReviews(prev => prev.filter(review => !bulkSelected.includes(review.id)));
        setBulkSelected([]);
      }
    } else {
      setReviews(prev => prev.map(review => 
        bulkSelected.includes(review.id) 
          ? { ...review, status: action }
          : review
      ));
      setBulkSelected([]);
    }
  };

  const stats = [
    {
      label: 'Total Reviews',
      value: reviews.length,
      icon: MessageSquare,
      color: 'blue',
      change: '+12%'
    },
    {
      label: 'Pending Review',
      value: reviews.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'yellow',
      change: '+5%'
    },
    {
      label: 'Average Rating',
      value: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
      icon: Star,
      color: 'green',
      change: '+0.2'
    },
    {
      label: 'Flagged Reviews',
      value: reviews.filter(r => r.flagged).length,
      icon: Flag,
      color: 'red',
      change: '-2%'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Review Management</h1>
          <p className="text-gray-600">Manage customer reviews and feedback</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-3xl font-bold text-black">{stat.value}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'yellow' ? 'bg-yellow-100' :
                stat.color === 'green' ? 'bg-green-100' :
                'bg-red-100'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'yellow' ? 'text-yellow-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  'text-red-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews, customers, products..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Rating Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            {/* Status Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* Product Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            >
              <option value="all">All Products</option>
              {products.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>

          {/* Bulk Actions */}
          {bulkSelected.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{bulkSelected.length} selected</span>
              <button 
                onClick={() => handleBulkAction('approved')}
                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Approve
              </button>
              <button 
                onClick={() => handleBulkAction('rejected')}
                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Reject
              </button>
              <button 
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Review Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={bulkSelected.includes(review.id)}
                    onChange={() => handleBulkSelect(review.id)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm font-medium text-gray-700">{review.rating}/5</span>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                        {getStatusIcon(review.status)}
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <CheckCircle className="w-3 h-3" />
                          Verified Purchase
                        </span>
                      )}
                      {review.flagged && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Flag className="w-3 h-3" />
                          Flagged
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{review.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {review.customerName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {review.productName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(review.id, 'approved')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(review.id, 'rejected')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setSelectedReview(review);
                      setShowResponseModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Respond"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
              
              {/* Review Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  {review.helpful}
                </button>
                <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  {review.notHelpful}
                </button>
              </div>

              {/* Admin Response */}
              {review.adminResponse && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Admin Response</span>
                    <span className="text-xs text-blue-600">
                      {new Date(review.adminResponse.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-blue-700">{review.adminResponse.message}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-600">
            {searchTerm || ratingFilter !== 'all' || productFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'No customer reviews available yet'}
          </p>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-black">Respond to Review</h2>
              <button 
                onClick={() => {
                  setShowResponseModal(false);
                  setSelectedReview(null);
                  setAdminResponse('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Review Summary */}
            <div className="p-6 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                {renderStars(selectedReview.rating)}
                <span className="font-medium text-gray-700">{selectedReview.rating}/5</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{selectedReview.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                by {selectedReview.customerName} • {selectedReview.productName}
              </p>
              <p className="text-gray-700">{selectedReview.comment}</p>
            </div>

            {/* Response Form */}
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Response
              </label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                placeholder="Write your response to the customer..."
              />
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button 
                onClick={() => {
                  setShowResponseModal(false);
                  setSelectedReview(null);
                  setAdminResponse('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitResponse}
                disabled={!adminResponse.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;