import React from 'react';
import { Store, Award, Users, CheckCircle } from 'lucide-react';
import {Link} from 'react-router'

const Pride = () => {
  const achievements = [
    {
      icon: <Store className="w-16 h-16 text-red-600" />,
      title: "Physical presence",
      subtitle: "18+ Outlets Covering 20k SQFT Physical Domain",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100"
    },
    {
      icon: <Award className="w-16 h-16 text-green-600" />,
      title: "10 Years of Service",
      subtitle: "200+ SKUs",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      badge: "!0 years",
      badgeText: "Khaas food"
    },
    {
      icon: <Users className="w-16 h-16 text-teal-600" />,
      title: "Consumer Satisfaction",
      subtitle: "200k+ Loyal Khaas Consumer Served",
      bgColor: "bg-teal-50",
      iconBg: "bg-teal-100",
      stars: true
    },
    {
      icon: <CheckCircle className="w-16 h-16 text-blue-600" />,
      title: "ISO Certified",
      subtitle: "An ISO Certified Company",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      certification: "ISO 22000:2018"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-2">OUR PRIDE</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`${achievement.bgColor} border border-gray-200 rounded-2xl p-8 text-center relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              {/* Special Badge for 10 Years Service */}
              {achievement.badge && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold transform rotate-12">
                  {achievement.badge}
                </div>
              )}

              {/* ISO Certification Badge */}
              {achievement.certification && (
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold border-4 border-white shadow-lg">
                  <div className="text-center leading-tight">
                    <div>CERTIFIED</div>
                    <div className="text-2xl font-black">ISO</div>
                    <div className="text-xs">22000:2018</div>
                  </div>
                </div>
              )}

              {/* Icon Container */}
              <div className={`${achievement.iconBg} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-gray-200`}>
                {achievement.icon}
              </div>

              {/* Special Quality Badge for Service */}
              {achievement.badgeText && (
                <div className="mb-4">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                    10
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full inline-block text-black font-semibold text-sm">
                    {achievement.badgeText}
                  </div>
                </div>
              )}

              {/* Stars for Customer Satisfaction */}
              {achievement.stars && (
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-700 rounded-full p-4">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-black mb-3">
                {achievement.title}
              </h3>

              {/* Subtitle */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {achievement.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
                  <Link to="/products">
                      <button className="group bg-white text-gray-800 px-8 py-2 rounded-full font-semibold text-lg hover:bg-gray-700 transform hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                        Start Shopping
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </button>
                    </Link>
        </div>
      </div>
    </section>
  );
};

export default Pride;