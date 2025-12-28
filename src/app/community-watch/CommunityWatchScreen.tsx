'use client';

import Sidebar from '../../components/Sidebar';

export default function CommunityWatchScreen() {
  return (
    <div className="min-h-screen bg-[#1E293B] p-[10px]">
      <Sidebar />
      
      <div className="lg:ml-[260px] bg-white rounded-lg min-h-[calc(100vh-20px)] flex flex-col">
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Community Watch</h1>
          </div>
          <p className="text-gray-600">Neighborhood safety and security monitoring</p>
        </div>

        <div className="p-8 flex-1 overflow-y-auto bg-[#F9FAFB]">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center max-w-md">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                  <i className="ri-shield-check-line text-5xl text-teal-600"></i>
                </div>
                
                <div className="mb-6">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Modern%20community%20safety%20illustration%20with%20security%20shield%2C%20neighborhood%20watch%20concept%2C%20clean%20minimalist%20design%20with%20soft%20teal%20and%20gray%20colors%2C%20professional%20digital%20art%20style%2C%20simple%20background&width=400&height=300&seq=community-watch-placeholder&orientation=landscape"
                    alt="Community Watch Coming Soon"
                    className="w-full h-48 object-cover rounded-lg shadow-sm"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon – Stay Tuned</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We're working on an exciting new Community Watch feature that will help keep your neighborhood safe and connected. This module will include security alerts, incident reporting, and community safety coordination tools.
              </p>

              <div className="space-y-4 text-left bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Upcoming Features:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">Security incident reporting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">Neighborhood watch coordination</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">Safety alerts and notifications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">Emergency contact directory</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">Community safety resources</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-notification-line mr-2"></i>
                  Notify Me When Available
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
