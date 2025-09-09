import React, { useState } from 'react';
import { Search, Bell, ShoppingCart, Grid3X3, User, Settings, MessageSquare, HelpCircle, ChevronLeft, Minus, Plus, MoreVertical } from 'lucide-react';
import shoppingcart from '../../../assets/about-image1.jpg'
export default function CustomerDashboard() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Casual Jeans Blue',
      price: 213.99,
      size: 'L',
      quantity: 1,
      image: 'https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg'
    },
    {
      id: 2,
      name: 'Casual Hoodie Blue',
      price: 189.99,
      size: 'M',
      quantity: 1,
      image: 'https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Party', 'Winter', 'Men', 'Woman'];

  const featuredProducts = [
    {
      id: 1,
      image: 'https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg',
      title: 'Casual Denim Shirt',
      price: 89.99
    },
    {
      id: 2,
      image: 'https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg',
      title: 'Blue Hoodie',
      price: 129.99
    },
    {
      id: 3,
      image: 'https://i.ibb.co.com/fVjSnPgR/pexels-shottrotter-1034653.jpg',
      title: 'White Casual Shirt',
      price: 79.99
    }
  ];

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Style.</h1>
        </div>
        
        <nav className="mt-8">
          <div className="px-6 py-3 bg-blue-50 border-r-4 border-blue-500">
            <div className="flex items-center text-blue-600">
              <Grid3X3 className="w-5 h-5 mr-3" />
              <span className="font-medium">Dashboard</span>
            </div>
          </div>
          
          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3" />
              <span>Profile</span>
            </div>
          </div>
          
          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </div>
          </div>
          
          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-3" />
              <span>Message</span>
            </div>
          </div>
          
          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-3" />
              <span>Support</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <p className="text-gray-500 text-sm">Hello Nanah</p>
              <h2 className="text-xl font-semibold text-gray-800">Welcome Back !</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search best items"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Monday, 6 September 2022</span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Bell className="w-6 h-6" />
                </button>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">N</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Content Area */}
          <div className="flex-1 px-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Explore Your True Style</h3>
                  <p className="text-gray-600 mb-6">
                    Fashion is part of the daily life, which can<br />
                    all the time, with all the events
                  </p>
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Let's Go!
                  </button>
                </div>
                <div className="flex-shrink-0 ml-8">
                  <img 
                    src={shoppingcart} 
                    alt="shoppingcart"
                    className="rounded-lg w-100"
                  />
                </div>
              </div>
            </div>

            {/* Featured Products */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Featured Products</h3>
                <button className="text-blue-500 font-medium hover:text-blue-600">See All</button>
              </div>

              {/* Category Filter */}
              <div className="flex space-x-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-w-3 aspect-h-4">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 mb-1">{product.title}</h4>
                      <p className="text-blue-500 font-semibold">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shopping Cart Sidebar */}
          <div className="w-80 bg-white shadow-lg">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ChevronLeft className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="font-semibold text-gray-800">My Cart</h3>
                </div>
                <ShoppingCart className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Cart Items */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-blue-500 font-semibold">${item.price}</p>
                          <p className="text-gray-500 text-sm">SIZE: {item.size}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-500 font-medium">FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}