import { useState } from 'react';

interface PaymentModalProps {
  onClose: () => void;
}

export default function PaymentModal({ onClose }: PaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log('Payment submitted:', { amount, paymentMethod });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">Make a Payment</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-black"></i>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Payment Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 font-medium">$</span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-black"
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-semibold text-black mb-3">
              Payment Method
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-[#1FA372] cursor-pointer"
                />
                <i className="ri-bank-card-line text-xl text-black"></i>
                <span className="text-sm font-medium text-black">Credit/Debit Card</span>
              </label>

              <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-[#1FA372] cursor-pointer"
                />
                <i className="ri-bank-line text-xl text-black"></i>
                <span className="text-sm font-medium text-black">Bank Account</span>
              </label>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-black/60 mb-1">Account: <span className="text-black font-medium">Vesapogu, Sucheer</span></p>
            <p className="text-xs text-black/60">Organization: <span className="text-black font-medium">Joseph Creek Homeowner's Association</span></p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#1FA372] text-white rounded-lg hover:bg-[#1A8C62] transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
