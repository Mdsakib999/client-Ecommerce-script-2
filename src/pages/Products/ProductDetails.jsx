import {
  Award,
  RefreshCw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../../redux/app/features/cart/cartSlice";
import { useGetProductQuery } from "../../redux/app/services/product/productApi";
import { fakeReviews } from "../../utils/fakeReview";
import Loader from "../../utils/Loader";
export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState("specifications");
  const { id } = useParams();
  const [mainImage, setMainImage] = useState("");
  const { data: product, isLoading: isProductLoading } = useGetProductQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Use first image as default
  const images = product?.images || [];
  const displayImage = mainImage || images[0];
  // Helper function to parse specifications
  const parseSpecifications = (specString) => {
    if (!specString) return [];

    return specString
      .split(";")
      .map((item) => {
        const [key, value] = item.split(":").map((part) => part.trim());
        return { key, value };
      })
      .filter((item) => item.key && item.value);
  };
  // Average rating
  const avgRating =
    fakeReviews.reduce((acc, r) => acc + r.rating, 0) / fakeReviews.length;

  // Calculate discount percentage
  const discountPercent = product?.discountPrice
    ? Math.round(
        ((product?.price - product?.discountPrice) / product?.price) * 100
      )
    : 0;

  if (isProductLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span>
            <span>/</span>
            <span>{product?.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product?.name}</span>
          </div>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 p-8">
              <div className="relative mb-6">
                {discountPercent > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{discountPercent}%
                    </div>
                  </div>
                )}
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={displayImage}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 relative cursor-pointer transition-all duration-300 ${
                      displayImage === img
                        ? "ring-2 ring-gray-500"
                        : "hover:ring-4 hover:ring-gray-300"
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`thumb-${index}`}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="w-full lg:w-1/2 p-8 lg:pl-4">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product?.name}
              </h1>

              {/* Rating Section */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(avgRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {avgRating?.toFixed(1)}
                </span>
                <span className="text-gray-500">
                  ({fakeReviews?.length} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="mb-8">
                <div className="flex items-baseline space-x-4">
                  {product?.discountPrice ? (
                    <>
                      <span className="md:text-lg lg:text-3xl font-bold text-green-600">
                        Tk {product.discountPrice.toLocaleString()}
                      </span>
                      <span className="md:text-lg lg:text-xl text-gray-400 line-through">
                        Tk {product.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">
                      Tk {product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <p className="text-green-600 font-medium mt-1">
                    You save Tk{" "}
                    {(product.price - product.discountPrice).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Brand</div>
                  <div className="font-semibold text-gray-900">
                    {product.brand}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Availability</div>
                  <div
                    className={`font-semibold ${
                      product.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-md flex items-center justify-center space-x-3 transition-all duration-300 transform shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-xl">
                  <Shield className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-xs font-medium text-green-800">
                    Secure Payment
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-xl">
                  <Truck className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-xs font-medium text-blue-800">
                    Fast Delivery
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-indigo-50 rounded-xl">
                  <RefreshCw className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-xs font-medium text-indigo-800">
                    Easy Returns
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-yellow-50 rounded-xl">
                  <Award className="w-6 h-6 text-yellow-600 mb-2" />
                  <span className="text-xs font-medium text-yellow-800">
                    Quality Assured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("specifications")}
                className={`py-4 px-1 border-b-2 font-semibold text-lg transition-all duration-300 ${
                  activeTab === "specifications"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 border-b-2 font-semibold text-lg transition-all duration-300 ${
                  activeTab === "reviews"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Customer Reviews
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Specifications Tab */}
            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Product Specifications
                </h3>

                {/* Basic Information */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                    Product Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Brand</span>
                      <span className="text-gray-900 font-semibold">
                        {product.brand}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Category
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Stock Status
                      </span>
                      <span
                        className={`font-semibold ${
                          product.inStock ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Available Quantity
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {product.quantity} units
                      </span>
                    </div>
                  </div>
                </div>

                {product.specifications &&
                  parseSpecifications(product.specifications).length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                        Technical Specifications
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {parseSpecifications(product.specifications).map(
                          (spec, index) => (
                            <div
                              key={index}
                              className="flex justify-between py-3 border-b border-gray-200"
                            >
                              <span className="text-gray-600 font-medium">
                                {spec.key}
                              </span>
                              <span className="text-gray-900 font-semibold text-right max-w-[200px]">
                                {spec.value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Additional Information */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                    Additional Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center py-2">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">
                        Free shipping available
                      </span>
                    </div>
                    <div className="flex items-center py-2">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">
                        Easy returns within 7 days
                      </span>
                    </div>
                    <div className="flex items-center py-2">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">
                        Authentic product with warranty
                      </span>
                    </div>
                    <div className="flex items-center py-2">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-gray-700">
                        Customer support available 24/7
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                {/* Reviews Header */}
                <div className="flex flex-wrap items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(avgRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {avgRating.toFixed(1)} out of 5
                    </span>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {fakeReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-gray-200"
                          />
                        </div>

                        {/* Review Content */}
                        <div className="flex-1 w-full">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <div className="flex flex-wrap items-center space-x-3 mb-1 md:mb-0">
                              <h3 className="font-semibold text-gray-900">
                                {review.name}
                              </h3>
                              {review.verified && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>

                          {/* Stars */}
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Comment */}
                          <p className="text-gray-700 text-sm md:text-base">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Reviews Button */}
                <div className="text-center mt-8">
                  <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                    View All Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
