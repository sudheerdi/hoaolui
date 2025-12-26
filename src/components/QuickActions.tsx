
'use client';

import { useState } from 'react';
import AddPaymentModal from './AddPaymentModal';
import CreatePollModal from './CreatePollModal';
import ViewApprovalsModal from './ViewApprovalsModal';

export default function QuickActions() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [isApprovalsModalOpen, setIsApprovalsModalOpen] = useState(false);

  const actions = [
    { 
      label: 'Add Payment', 
      icon: 'ri-add-circle-line', 
      color: 'bg-teal-600 hover:bg-teal-700',
      onClick: () => setIsPaymentModalOpen(true)
    },
    { 
      label: 'Create Poll', 
      icon: 'ri-survey-line', 
      color: 'bg-[#1FA372] hover:bg-[#1a8d63]',
      onClick: () => setIsPollModalOpen(true)
    },
    { 
      label: 'View Approvals', 
      icon: 'ri-check-double-line', 
      color: 'bg-indigo-600 hover:bg-indigo-700',
      onClick: () => setIsApprovalsModalOpen(true)
    },
  ];

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white font-medium transition-colors cursor-pointer whitespace-nowrap ${action.color}`}
            >
              <i className={`${action.icon} text-lg`}></i>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AddPaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <CreatePollModal 
        isOpen={isPollModalOpen}
        onClose={() => setIsPollModalOpen(false)}
      />

      <ViewApprovalsModal 
        isOpen={isApprovalsModalOpen}
        onClose={() => setIsApprovalsModalOpen(false)}
      />
    </>
  );
}
