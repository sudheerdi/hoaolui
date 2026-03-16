"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MemberSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    documentUpdates: true,
    paymentReminders: true,
    communityAnnouncements: true,
    twoFactorAuth: false,
    profileVisibility: "community",
    showEmail: true,
    showPhone: false,
  });

  const handleToggle = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line text-gray-600 text-xl w-6 h-6 flex items-center justify-center"></i>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Notifications Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive notifications via email
                </p>
              </div>
              <button
                onClick={() => handleToggle("emailNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.emailNotifications ? "bg-[#4D8555]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive push notifications on your device
                </p>
              </div>
              <button
                onClick={() => handleToggle("pushNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.pushNotifications ? "bg-[#4D8555]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.pushNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive notifications via text message
                </p>
              </div>
              <button
                onClick={() => handleToggle("smsNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.smsNotifications ? "bg-[#4D8555]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.smsNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Document Updates</p>
                <p className="text-sm text-gray-500">
                  Get notified about new documents
                </p>
              </div>
              <button
                onClick={() => handleToggle("documentUpdates")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.documentUpdates ? "bg-[#4D8555]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.documentUpdates ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Payment Reminders</p>
                <p className="text-sm text-gray-500">
                  Receive reminders for upcoming payments
                </p>
              </div>
              <button
                onClick={() => handleToggle("paymentReminders")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.paymentReminders ? "bg-[#4D8555]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.paymentReminders
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  Community Announcements
                </p>
                <p className="text-sm text-gray-500">
                  Stay updated with community news
                </p>
              </div>
              <button
                onClick={() => handleToggle("communityAnnouncements")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.communityAnnouncements
                    ? "bg-[#4D8555]"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.communityAnnouncements
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Privacy &amp; Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
              <button
                onClick={() => handleToggle("twoFactorAuth")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.twoFactorAuth ? "bg-[#4D8555]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Profile Visibility
              </label>
              <div className="relative">
                <select
                  value={settings.profileVisibility}
                  onChange={(e) =>
                    handleSelectChange("profileVisibility", e.target.value)
                  }
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D8555] focus:border-transparent text-sm appearance-none cursor-pointer"
                >
                  <option value="public">Public</option>
                  <option value="community">Community Only</option>
                  <option value="private">Private</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 flex items-center justify-center"></i>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Show Email Address</p>
                <p className="text-sm text-gray-500">
                  Make your email visible to community members
                </p>
              </div>
              <button
                onClick={() => handleToggle("showEmail")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.showEmail ? "bg-[#4D8555]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showEmail ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Show Phone Number</p>
                <p className="text-sm text-gray-500">
                  Make your phone visible to community members
                </p>
              </div>
              <button
                onClick={() => handleToggle("showPhone")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  settings.showPhone ? "bg-[#4D8555]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showPhone ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  Change Password
                </span>
                <i className="ri-arrow-right-s-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
              </div>
            </button>
            <button className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  Download My Data
                </span>
                <i className="ri-arrow-right-s-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
              </div>
            </button>
            <button className="w-full px-4 py-3 text-left border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-red-600 whitespace-nowrap">
              <div className="flex items-center justify-between">
                <span className="font-medium">Delete Account</span>
                <i className="ri-arrow-right-s-line text-red-400 w-5 h-5 flex items-center justify-center"></i>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
