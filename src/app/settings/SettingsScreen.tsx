
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TabType = 'general' | 'appearance' | 'security';

export default function SettingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [showToast, setShowToast] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    language: 'English',
    timezone: 'America/Chicago',
    defaultView: 'Dashboard'
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: false,
    accentColor: '#1C7D7E'
  });

  const [securitySettings, setSecuritySettings] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false
  });

  const handleSave = () => {
    console.log('Saving settings:', { generalSettings, appearanceSettings, securitySettings });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    if (activeTab === 'general') {
      setGeneralSettings({
        language: 'English',
        timezone: 'America/Chicago',
        defaultView: 'Dashboard'
      });
    } else if (activeTab === 'appearance') {
      setAppearanceSettings({
        darkMode: false,
        accentColor: '#1C7D7E'
      });
    } else if (activeTab === 'security') {
      setSecuritySettings({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorAuth: false
      });
    }
  };

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <button 
            onClick={() => router.push('/')}
            className="hover:text-teal-600 transition-colors cursor-pointer"
          >
            Dashboard
          </button>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900 font-medium">Settings</span>
        </div>
      </div>

      {/* Header with Back Button */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackClick}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line text-gray-600"></i>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your preferences and account settings</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'general'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ fontFamily: 'Inter', fontSize: '16px' }}
            >
              <i className="ri-settings-3-line w-5 h-5 flex items-center justify-center"></i>
              <span>General</span>
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'appearance'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ fontFamily: 'Inter', fontSize: '16px' }}
            >
              <i className="ri-palette-line w-5 h-5 flex items-center justify-center"></i>
              <span>Appearance</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'security'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ fontFamily: 'Inter', fontSize: '16px' }}
            >
              <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center"></i>
              <span>Security</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 rounded-lg p-8" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            {/* General Tab */}
            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-semibold text-teal-700 mb-6" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                  General Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <div className="relative">
                      <select
                        value={generalSettings.language}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors appearance-none cursor-pointer"
                        style={{ fontFamily: 'Inter', fontSize: '16px' }}
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Chinese</option>
                      </select>
                      <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <div className="relative">
                      <select
                        value={generalSettings.timezone}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors appearance-none cursor-pointer"
                        style={{ fontFamily: 'Inter', fontSize: '16px' }}
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                      <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default View Preference
                    </label>
                    <div className="relative">
                      <select
                        value={generalSettings.defaultView}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, defaultView: e.target.value })}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors appearance-none cursor-pointer"
                        style={{ fontFamily: 'Inter', fontSize: '16px' }}
                      >
                        <option>Dashboard</option>
                        <option>Approval Requests</option>
                        <option>Violations</option>
                        <option>Calendar</option>
                        <option>Message Board</option>
                      </select>
                      <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-lg font-semibold text-teal-700 mb-6" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                  Appearance Settings
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className="ri-moon-line text-gray-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                          Dark Mode
                        </p>
                        <p className="text-sm text-gray-600">Enable dark theme for the dashboard</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAppearanceSettings({ ...appearanceSettings, darkMode: !appearanceSettings.darkMode })}
                      className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                        appearanceSettings.darkMode ? 'bg-teal-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          appearanceSettings.darkMode ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accent Color
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={appearanceSettings.accentColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, accentColor: e.target.value })}
                        className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={appearanceSettings.accentColor}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, accentColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        style={{ fontFamily: 'Inter', fontSize: '16px' }}
                        placeholder="#1C7D7E"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Choose your preferred accent color for the dashboard</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <i className="ri-information-line text-blue-600 mt-0.5"></i>
                      <div>
                        <p className="text-sm font-medium text-blue-900">Preview Changes</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Changes to appearance settings will be applied after saving
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-semibold text-teal-700 mb-6" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                  Security Settings
                </h2>
                <div className="space-y-6">
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Old Password
                        </label>
                        <input
                          type="password"
                          value={securitySettings.oldPassword}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, oldPassword: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                          style={{ fontFamily: 'Inter', fontSize: '16px' }}
                          placeholder="Enter old password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={securitySettings.newPassword}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                          style={{ fontFamily: 'Inter', fontSize: '16px' }}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={securitySettings.confirmPassword}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                          style={{ fontFamily: 'Inter', fontSize: '16px' }}
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className="ri-shield-check-line text-gray-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecuritySettings({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
                      className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                        securitySettings.twoFactorAuth ? 'bg-teal-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          securitySettings.twoFactorAuth ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <i className="ri-alert-line text-amber-600 mt-0.5"></i>
                      <div>
                        <p className="text-sm font-medium text-amber-900">Security Recommendation</p>
                        <p className="text-sm text-amber-700 mt-1">
                          We recommend using a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleReset}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                style={{ fontFamily: 'Inter', fontSize: '16px' }}
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 text-sm font-medium text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: '#1C7D7E', fontFamily: 'Inter', fontSize: '16px' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <i className="ri-check-line"></i>
            <span>Settings saved successfully</span>
          </div>
        </div>
      )}
    </div>
  );
}
