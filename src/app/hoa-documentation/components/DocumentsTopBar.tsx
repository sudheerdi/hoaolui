import { useState } from 'react';

export default function DocumentsTopBar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Empty */}
        <div></div>

        {/* Right side - Actions and Profile */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#1FA372] text-white px-5 py-2.5 rounded-lg font-medium text-base hover:bg-[#1A8C62] transition-colors cursor-pointer whitespace-nowrap">
            Make a Payment
          </button>
          
          {/* Notification */}
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-800 cursor-pointer">
              <i className="ri-notification-line text-2xl w-6 h-6 flex items-center justify-center"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                3
              </span>
            </button>
          </div>

          {/* Community Info and Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-base font-semibold text-[#515151]">Community Name 5</div>
              <div className="text-sm text-[#515151]">Address</div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-gray-600 text-lg w-5 h-5 flex items-center justify-center"></i>
                </div>
                <i className="ri-arrow-down-s-line text-gray-600 text-lg w-5 h-5 flex items-center justify-center"></i>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <i className="ri-user-line mr-2 text-lg w-5 h-5 inline-flex items-center justify-center"></i>
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <i className="ri-settings-line mr-2 text-lg w-5 h-5 inline-flex items-center justify-center"></i>
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button className="w-full text-left px-4 py-2 text-base text-red-600 hover:bg-gray-100 cursor-pointer">
                    <i className="ri-logout-box-line mr-2 text-lg w-5 h-5 inline-flex items-center justify-center"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
