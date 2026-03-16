import { useState } from 'react';

export default function CalendarTopBar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
            <i className="ri-notification-3-line text-2xl w-6 h-6 flex items-center justify-center"></i>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          {/* Community Name & Address */}
          <div className="text-right">
            <div className="text-base font-semibold text-gray-900">Community Name</div>
            <div className="text-sm text-gray-500">Address</div>
          </div>

          {/* Profile with Dropdown */}
          <div className="relative">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-10 h-10 bg-[#4D8555] rounded-full flex items-center justify-center text-white text-base font-medium">
                JD
              </div>
              <i className="ri-arrow-down-s-line text-gray-600 text-2xl w-6 h-6 flex items-center justify-center"></i>
            </div>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                  <i className="ri-user-line text-lg w-5 h-5 flex items-center justify-center"></i>
                  <span>Profile</span>
                </button>
                <button className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                  <i className="ri-settings-3-line text-lg w-5 h-5 flex items-center justify-center"></i>
                  <span>Settings</span>
                </button>
                <button className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                  <i className="ri-logout-box-line text-lg w-5 h-5 flex items-center justify-center"></i>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
