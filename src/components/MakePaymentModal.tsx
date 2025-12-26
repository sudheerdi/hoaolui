'use client';

import { useState } from 'react';

interface MakePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MakePaymentModal({ isOpen, onClose }: MakePaymentModalProps) {
  const [amount, setAmount] = useState('0.00');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }
    alert('Payment submitted successfully!');
    onClose();
    setAmount('0.00');
    setPaymentMethod('card');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Make a Payment</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Payment Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Payment Method
            </label>
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full flex items-center space-x-3 px-4 py-3 border-2 rounded-lg transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#1FA372] bg-[#1FA372]/10'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'card' ? 'border-[#1FA372]' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'card' && (
                    <div className="w-3 h-3 rounded-full bg-[#1FA372]"></div>
                  )}
                </div>
                <i className="ri-bank-card-line text-xl text-gray-700"></i>
                <span className="text-base font-medium text-gray-900">Credit/Debit Card</span>
              </button>

              <button
                onClick={() => setPaymentMethod('bank')}
                className={`w-full flex items-center space-x-3 px-4 py-3 border-2 rounded-lg transition-all cursor-pointer ${
                  paymentMethod === 'bank'
                    ? 'border-[#1FA372] bg-[#1FA372]/10'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'bank' ? 'border-[#1FA372]' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'bank' && (
                    <div className="w-3 h-3 rounded-full bg-[#1FA372]"></div>
                  )}
                </div>
                <i className="ri-bank-line text-xl text-gray-700"></i>
                <span className="text-base font-medium text-gray-900">Bank Account</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Account:</span> Vesapogu, Sucheer
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Organization:</span> Joseph Creek Homeowner's Association
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-[#1FA372] text-white rounded-lg font-medium hover:bg-[#188f5f] transition-colors cursor-pointer whitespace-nowrap"
          >
            Submit Payment
          </button>
        </div>
      </div>
    </div>
  );
}
