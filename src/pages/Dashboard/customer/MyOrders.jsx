import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, Eye, Download, Star, RotateCcw } from 'lucide-react';

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample customer orders data
  const orders = [
    {
      id: 'ORD-001',
      orderNumber: '#1001',
      date: '2024-09-10',
      status: 'delivered',
      total: 299.99,
      items: [
        { name: 'Wireless Bluetooth Headphones', price: 199.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Phone Case - Clear', price: 29.99, quantity: 2, image: '/api/placeholder/60/60' },
        { name: 'USB-C Cable', price: 19.99, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      deliveryDate: '2024-09-12',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      orderNumber: '#1002',
      date: '2024-09-08',
      status: 'shipped',
      total: 149.50,
      items: [
        { name: 'Running Shoes - Blue', price: 89.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Athletic Socks', price: 24.99, quantity: 2, image: '/api/placeholder/60/60' }
      ],
      estimatedDelivery: '2024-09-15',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-003',
      orderNumber: '#1003',
      date: '2024-09-06',
      status: 'processing',
      total: 89.99,
      items: [
        { name: 'Coffee Maker', price: 89.99, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      estimatedDelivery: '2024-09-18'
    },
    {
      id: 'ORD-004',
      orderNumber: '#1004',
      date: '2024-09-05',
      status: 'pending',
      total: 199.99,
      items: [
        { name: 'Laptop Stand', price: 79.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Wireless Mouse', price: 59.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Mousepad', price: 19.99, quantity: 2, image: '/api/placeholder/60/60' }
      ]
    },
    {
      id: 'ORD-005',
      orderNumber: '#1005',
      date: '2024-08-30',
      status: 'cancelled',
      total: 75.00,
      items: [
        { name: 'Water Bottle', price: 25.00, quantity: 3, image: '/api/placeholder/60/60' }
      ],
      cancelledDate: '2024-09-01'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusMessage = (order) => {
    switch (order.status) {
      case 'delivered':
        return `Delivered on ${new Date(order.deliveryDate).toLocaleDateString()}`;
      case 'shipped':
        return `Estimated delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}`;
      case 'processing':
        return order.estimatedDelivery ? `Estimated delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}` : 'Being prepared for shipment';
      case 'pending':
        return 'Order confirmation pending';
      case 'cancelled':
        return `Cancelled on ${new Date(order.cancelledDate).toLocaleDateString()}`;
      default:
        return '';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your order history</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-black">{orders.length}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'delivered').length}</div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === 'shipped').length}</div>
            <div className="text-sm text-gray-600">In Transit</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">{orders.filter(o => ['processing', 'pending'].includes(o.status)).length}</div>
            <div className="text-sm text-gray-600">Processing</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order number or product name..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="delivered">Delivered</option>
              <option value="shipped">Shipped</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-black">{order.orderNumber}</h3>
                      <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-black">${order.total.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>
                
                {/* Status Message */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{getStatusMessage(order)}</p>
                  {order.trackingNumber && (
                    <p className="text-sm text-blue-600 mt-1">
                      Tracking: <span className="font-mono">{order.trackingNumber}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>Qty: {item.quantity}</span>
                          <span>${item.price.toFixed(2)} each</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  
                  {order.status === 'delivered' && (
                    <>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Star className="w-4 h-4" />
                        Write Review
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                        Return/Exchange
                      </button>
                    </>
                  )}
                  
                  {['shipped', 'delivered'].includes(order.status) && order.trackingNumber && (
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Truck className="w-4 h-4" />
                      Track Package
                    </button>
                  )}
                  
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : "You haven't placed any orders yet"}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Start Shopping
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;