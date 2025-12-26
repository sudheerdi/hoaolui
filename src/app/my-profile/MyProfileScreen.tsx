'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MyProfileScreen() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@community.com',
    phone: '+1 (555) 123-4567',
    address: '123 Maple Street, Springfield, IL 62701',
    role: 'Community Administrator'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    setFormData({
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@community.com',
      phone: '+1 (555) 123-4567',
      address: '123 Maple Street, Springfield, IL 62701',
      role: 'Community Administrator'
    });
  };

  const handleChangePhoto = () => {
    console.log('Change photo clicked');
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
          <span className="text-gray-900 font-medium">My Profile</span>
        </div>
      </div>

      {/* Header with Back Button */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line text-gray-600"></i>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and account settings</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Photo & Quick Info */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src="https://readdy.ai/api/search-image?query=professional%20woman%20with%20friendly%20smile%20wearing%20business%20casual%20attire%20headshot%20portrait%20photo%20with%20clean%20white%20background%20modern%20corporate%20style%20high%20quality%20confident%20administrator&width=120&height=120&seq=profile-large-001&orientation=squarish"
                      alt="Sarah Johnson"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white mx-auto"
                      style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
                    />
                  </div>
                  <button
                    onClick={handleChangePhoto}
                    className="mt-4 px-4 py-2 text-sm font-medium text-teal-700 bg-white border border-teal-300 rounded-lg hover:bg-teal-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Change Photo
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                      {formData.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{formData.role}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
                      <span>Member since March 2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Editable Details */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-6" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                <h2 className="text-lg font-semibold text-teal-700 mb-6" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                  Personal Information
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        style={{ fontFamily: 'Inter', fontSize: '16px' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        style={{ fontFamily: 'Inter', fontSize: '16px' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        style={{ fontFamily: 'Inter', fontSize: '16px' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        style={{ fontFamily: 'Inter', fontSize: '16px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                      style={{ fontFamily: 'Inter', fontSize: '16px' }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                    style={{ fontFamily: 'Inter', fontSize: '16px' }}
                  >
                    Cancel
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
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <i className="ri-check-line"></i>
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
}