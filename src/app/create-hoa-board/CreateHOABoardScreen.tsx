'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BoardMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
}

export default function CreateHOABoardScreen() {
  const router = useRouter();
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([
    { id: 1, name: '', email: '', phone: '', position: 'President' }
  ]);

  const positions = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Board Member',
    'Property Manager'
  ];

  const handleMemberChange = (id: number, field: keyof BoardMember, value: string) => {
    setBoardMembers(boardMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const addMember = () => {
    const newId = Math.max(...boardMembers.map(m => m.id)) + 1;
    setBoardMembers([
      ...boardMembers,
      { id: newId, name: '', email: '', phone: '', position: 'Board Member' }
    ]);
  };

  const removeMember = (id: number) => {
    if (boardMembers.length > 1) {
      setBoardMembers(boardMembers.filter(member => member.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              <i className="ri-check-line"></i>
            </div>
            <div className="w-24 h-1 bg-teal-600"></div>
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
            <div className="w-24 h-1 bg-gray-300"></div>
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create HOA Board</h1>
          <p className="text-gray-600">Step 2 of 2: Add your board members</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Board Members</h2>
            <button
              type="button"
              onClick={addMember}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <i className="ri-add-line"></i>
              Add Member
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {boardMembers.map((member, index) => (
                <div key={member.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Member {index + 1}</h3>
                    {boardMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(member.id)}
                        className="text-red-600 hover:text-red-700 cursor-pointer w-5 h-5 flex items-center justify-center"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position *
                      </label>
                      <select
                        value={member.position}
                        onChange={(e) => handleMemberChange(member.id, 'position', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all pr-8 cursor-pointer"
                        required
                      >
                        {positions.map(position => (
                          <option key={position} value={position}>{position}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(member.id, 'email', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(member.id, 'phone', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter phone number"
                        required
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
                  <strong>Note:</strong> Board members will receive an invitation email to join the platform and access their respective dashboards.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/create-community')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Complete Setup
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2024 CommUnity Connect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
