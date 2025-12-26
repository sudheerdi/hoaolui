'use client';

import { useState } from 'react';
import MakePaymentModal from './MakePaymentModal';

export default function UnpaidUsersTable() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const unpaidUsers = [
    { id: 1, name: 'John Smith', unit: 'Unit 4B', amount: '$450', dueDate: '2024-01-15', status: 'Overdue', days: 5 },
    { id: 2, name: 'Maria Garcia', unit: 'Unit 7C', amount: '$450', dueDate: '2024-01-20', status: 'Due Soon', days: 2 },
    { id: 3, name: 'Robert Johnson', unit: 'Unit 2A', amount: '$450', dueDate: '2024-01-10', status: 'Overdue', days: 12 },
    { id: 4, name: 'Lisa Chen', unit: 'Unit 5D', amount: '$450', dueDate: '2024-01-25', status: 'Pending', days: 0 },
    { id: 5, name: 'David Wilson', unit: 'Unit 8A', amount: '$450', dueDate: '2024-01-18', status: 'Due Soon', days: 1 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Due Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMakePayment = (user: any) => {
    setSelectedUser(user);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Unpaid Users</h3>
          <button className="text-sm text-[#1FA372] hover:text-[#188f5f] font-medium whitespace-nowrap cursor-pointer">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead style={{ backgroundColor: '#DCDCDC' }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {unpaidUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-black">{user.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">{user.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-black">{user.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base">
                    <button 
                      onClick={() => handleMakePayment(user)}
                      className="text-[#1FA372] hover:text-[#188f5f] font-bold whitespace-nowrap cursor-pointer"
                    >
                      Make Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MakePaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </>
  );
}
