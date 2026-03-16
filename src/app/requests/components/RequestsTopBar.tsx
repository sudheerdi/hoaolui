import { useState } from "react";
import { useRouter } from "next/navigation";
import SendRequestModal from "./SendRequestModal";

export default function RequestsTopBar() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-end py-4 px-6 border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Send Request Button */}
            <button
              onClick={() => setShowRequestModal(true)}
              className="bg-[#1FA372] text-white px-5 py-2.5 rounded-lg text-base font-medium hover:bg-[#1A8C62] transition-colors cursor-pointer whitespace-nowrap"
            >
              Send Request
            </button>

            {/* Notification */}
            <div className="relative cursor-pointer">
              <i className="ri-notification-3-line text-black text-2xl w-6 h-6 flex items-center justify-center"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                3
              </span>
            </div>

            {/* Community Info */}
            <div className="text-right">
              <div className="text-base font-semibold text-black">
                Community Name 5
              </div>
              <div className="text-sm text-gray-600">Address</div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#1FA372] flex items-center justify-center text-white font-semibold text-base">
                  JD
                </div>
                <i
                  className={`ri-arrow-down-s-line text-black text-2xl transition-transform ${showDropdown ? "rotate-180" : ""}`}
                ></i>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => router.push("/profile")}
                    className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => router.push("/settings")}
                    className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-base text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Send Request Modal */}
      {showRequestModal && (
        <SendRequestModal onClose={() => setShowRequestModal(false)} />
      )}
    </>
  );
}
