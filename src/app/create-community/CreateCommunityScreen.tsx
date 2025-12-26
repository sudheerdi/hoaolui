
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCommunityScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('community');
  const [formData, setFormData] = useState({
    communityName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    captcha: ''
  });

  const [hoaBoardData, setHoaBoardData] = useState([
    { id: 1, name: '', position: 'President' },
    { id: 2, name: '', position: 'Vice President' },
    { id: 3, name: '', position: 'Board Member' },
    { id: 4, name: '', position: 'Vice President' }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBoardMemberChange = (id: number, field: string, value: string) => {
    setHoaBoardData(hoaBoardData.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Community</h1>
          <p className="text-gray-600">Set up your community management platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('community')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'community'
                    ? 'bg-teal-50 text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Create Your Community *
              </button>
              <button
                onClick={() => setActiveTab('board')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'board'
                    ? 'bg-teal-50 text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Create HOA Board
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'community' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Community Name *
                  </label>
                  <input
                    type="text"
                    name="communityName"
                    value={formData.communityName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter community name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter street address"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="City"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="State"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="ZIP code"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="Country"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Captcha *
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-mono text-lg">
                      7 + 3 = ?
                    </div>
                    <input
                      type="text"
                      name="captcha"
                      value={formData.captcha}
                      onChange={handleChange}
                      className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-center"
                      placeholder="Answer"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.push('/register')}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Create Community
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'board' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">HOA Board Members</h2>
                  <p className="text-gray-600">Add board members to your community (Optional)</p>
                </div>

                <div className="space-y-4">
                  {hoaBoardData.map((member, index) => (
                    <div key={member.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Name
                          </label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => handleBoardMemberChange(member.id, 'name', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                            placeholder="Search for member name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Position
                          </label>
                          <input
                            type="text"
                            value={member.position}
                            onChange={(e) => handleBoardMemberChange(member.id, 'position', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                            placeholder="Position"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-information-line text-blue-600"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Board member setup is optional. You can add or modify board members later from the settings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('community')}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Back to Community
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Complete Setup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2024 CommUnity Connect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
