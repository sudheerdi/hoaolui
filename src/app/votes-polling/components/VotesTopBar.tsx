"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VotesTopBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative cursor-pointer">
            <i className="ri-notification-3-line text-gray-900 text-2xl w-6 h-6 flex items-center justify-center"></i>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              3
            </span>
          </div>

          {/* Community Info */}
          <div className="text-right">
            <div className="text-base font-semibold text-gray-900">
              Greenwood Community
            </div>
            <div className="text-sm text-gray-900 font-medium">
              123 Main Street, Springfield
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-[#1FA372] rounded-full flex items-center justify-center text-white font-medium text-base">
                JD
              </div>
              <i className="ri-arrow-down-s-line text-gray-900 text-2xl w-6 h-6 flex items-center justify-center"></i>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleProfile}
                  className="w-full text-left px-4 py-2 text-base text-gray-900 font-medium hover:bg-gray-50 flex items-center space-x-2"
                >
                  <i className="ri-user-line text-lg w-5 h-5 flex items-center justify-center"></i>
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleSettings}
                  className="w-full text-left px-4 py-2 text-base text-gray-900 font-medium hover:bg-gray-50 flex items-center space-x-2"
                >
                  <i className="ri-settings-3-line text-lg w-5 h-5 flex items-center justify-center"></i>
                  <span>Settings</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-base text-red-600 font-medium hover:bg-gray-50 flex items-center space-x-2"
                >
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
