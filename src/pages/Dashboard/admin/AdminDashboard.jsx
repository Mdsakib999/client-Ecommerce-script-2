import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign,
  Eye,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  Filter,
  Search,
  Download,
  Plus,
  MoreVertical,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Sample data
  const salesData = [
    { name: 'Mon', sales: 4200, orders: 24 },
    { name: 'Tue', sales: 3800, orders: 19 },
    { name: 'Wed', sales: 5200, orders: 32 },
    { name: 'Thu', sales: 4800, orders: 28 },
    { name: 'Fri', sales: 6200, orders: 38 },
    { name: 'Sat', sales: 7800, orders: 45 },
    { name: 'Sun', sales: 5600, orders: 31 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3B82F6' },
    { name: 'Clothing', value: 25, color: '#8B5CF6' },
    { name: 'Home & Garden', value: 20, color: '#10B981' },
    { name: 'Sports', value: 12, color: '#F59E0B' },
    { name: 'Books', value: 8, color: '#EF4444' }
  ];

  const recentOrders = [
    { id: '#12547', customer: 'John Smith', amount: '$156.00', status: 'completed', time: '2 min ago' },
    { id: '#12546', customer: 'Sarah Johnson', amount: '$89.50', status: 'processing', time: '5 min ago' },
    { id: '#12545', customer: 'Mike Brown', amount: '$234.00', status: 'shipped', time: '12 min ago' },
    { id: '#12544', customer: 'Emma Davis', amount: '$67.25', status: 'pending', time: '18 min ago' },
    { id: '#12543', customer: 'Tom Wilson', amount: '$189.99', status: 'completed', time: '25 min ago' }
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 245, revenue: '$24,500', trend: 'up' },
    { name: 'Smart Watch', sales: 189, revenue: '$18,900', trend: 'up' },
    { name: 'Laptop Stand', sales: 156, revenue: '$7,800', trend: 'down' },
    { name: 'Phone Case', sales: 134, revenue: '$2,680', trend: 'up' },
    { name: 'Bluetooth Speaker', sales: 98, revenue: '$9,800', trend: 'down' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const MetricCard = ({ title, value, change, changeType, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {changeType === 'up' ? (
          <ArrowUp size={16} className="text-green-500 mr-1" />
        ) : (
          <ArrowDown size={16} className="text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">vs last period</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your store overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value="$45,678"
            change="+12.5%"
            changeType="up"
            icon={DollarSign}
            color="bg-blue-500"
          />
          <MetricCard
            title="Total Orders"
            value="1,234"
            change="+8.2%"
            changeType="up"
            icon={ShoppingCart}
            color="bg-green-500"
          />
          <MetricCard
            title="Total Customers"
            value="856"
            change="+15.3%"
            changeType="up"
            icon={Users}
            color="bg-purple-500"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.2%"
            change="-2.1%"
            changeType="down"
            icon={TrendingUp}
            color="bg-orange-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">Revenue</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Orders</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#1d4ed8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View all</button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{order.amount}</p>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View all</button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{product.revenue}</p>
                      <div className="flex items-center">
                        {product.trend === 'up' ? (
                          <ArrowUp size={14} className="text-green-500 mr-1" />
                        ) : (
                          <ArrowDown size={14} className="text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {product.trend === 'up' ? '+5.2%' : '-2.1%'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group">
              <div className="text-center">
                <Plus size={24} className="text-gray-400 group-hover:text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Add Product</span>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group">
              <div className="text-center">
                <ShoppingCart size={24} className="text-gray-400 group-hover:text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-green-600">Process Orders</span>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group">
              <div className="text-center">
                <Users size={24} className="text-gray-400 group-hover:text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">Manage Customers</span>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors group">
              <div className="text-center">
                <BarChart3 size={24} className="text-gray-400 group-hover:text-orange-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600">View Reports</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}