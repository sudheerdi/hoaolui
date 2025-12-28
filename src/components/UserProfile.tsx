"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "../lib/hooks";

export default function UserProfile() {
  const { user } = useAppSelector((state) => state.hoaUser);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <div className="w-10 h-10 bg-[#1FA372] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </span>
        </div>
        <div className="w-5 h-5 flex items-center justify-center">
          <i
            className={`ri-arrow-${
              isOpen ? "up" : "down"
            }-s-line text-gray-600`}
          ></i>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.emailId}</p>
            </div>

            <div className="py-2">
              <Link
                href="/my-profile"
                prefetch={false}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-user-line text-gray-600"></i>
                </div>
                <span>My Profile</span>
              </Link>

              <Link
                href="/settings"
                prefetch={false}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-settings-3-line text-gray-600"></i>
                </div>
                <span>Settings</span>
              </Link>

              <Link
                href="/notifications"
                prefetch={false}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-notification-3-line text-gray-600"></i>
                </div>
                <span>Notifications</span>
              </Link>

              <Link
                href="/create-community"
                prefetch={false}
                className="flex items-center space-x-3 px-4 py-2.5 text-sm text-white bg-[#1FA372] hover:bg-[#188f5f] transition-colors cursor-pointer mx-2 rounded-lg mt-2 whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-add-circle-line"></i>
                </div>
                <span>Create Community</span>
              </Link>
            </div>

            <div className="border-t border-gray-100 pt-2 mt-2">
              <Link
                href="/login"
                prefetch={false}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-logout-box-line"></i>
                </div>
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
