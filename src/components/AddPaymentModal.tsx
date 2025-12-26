'use client';

import { useState } from 'react';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPaymentModal({ isOpen, onClose }: AddPaymentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    memberName: '',
    paymentType: '',
    amount: '',
    dueDate: '',
    status: '',
    notes: ''
  });

  const members = [
    'John Smith - Apt 101',
    'Sarah Johnson - Apt 102', 
    'Michael Brown - Apt 103',
    'Emily Davis - Apt 104',
    'David Wilson - Apt 105',
    'Lisa Anderson - Apt 106'
  ];

  const paymentTypes = [
    'Maintenance Fee',
    'Utility Bill',
    'Event Contribution',
    'Special Assessment',
    'Parking Fee'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setCurrentStep(1);
      setFormData({
        memberName: '',
        paymentType: '',
        amount: '',
        dueDate: '',
        status: '',
        notes: ''
      });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Add New Payment</h2>
                <div className="w-12 h-1 bg-[#1FA372] rounded-full mt-2"></div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    step <= currentStep ? 'bg-[#1FA372]' : 'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Select Member</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Community Member
                  </label>
                  <div className="relative">
                    <select
                      value={formData.memberName}
                      onChange={(e) => handleInputChange('memberName', e.target.value)}
                      className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-gray-900"
                    >
                      <option value="">Choose a member...</option>
                      {members.map((member, index) => (
                        <option key={index} value={member}>{member}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                      <i className="ri-user-line text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Type
                    </label>
                    <div className="relative">
                      <select
                        value={formData.paymentType}
                        onChange={(e) => handleInputChange('paymentType', e.target.value)}
                        className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-gray-900"
                      >
                        <option value="">Select type...</option>
                        {paymentTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                        <i className="ri-file-list-line text-gray-400"></i>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        placeholder="0.00"
                        className="w-full px-4 py-3 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-gray-900"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                        <i className="ri-money-dollar-circle-line text-gray-400"></i>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className="w-full px-4 py-3 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-gray-900"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                        <i className="ri-calendar-line text-gray-400"></i>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-gray-900"
                      >
                        <option value="">Select status...</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                        <i className="ri-check-line text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <div className="relative">
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Add any additional notes..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-gray-900 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Confirm & Submit</h3>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.memberName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment Type:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.paymentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="text-sm font-medium text-gray-900">${formData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Due Date:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`text-sm font-medium ${
                      formData.status === 'Paid' ? 'text-[#1FA372]' : 
                      formData.status === 'Pending' ? 'text-amber-600' : 'text-red-600'
                    }`}>{formData.status}</span>
                  </div>
                  {formData.notes && (
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Notes:</span>
                      <p className="text-sm text-gray-900 mt-1">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-between">
            <div>
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  Back
                </button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !formData.memberName) ||
                    (currentStep === 2 && (!formData.paymentType || !formData.amount || !formData.dueDate || !formData.status))
                  }
                  className="px-6 py-2 bg-[#1FA372] text-white rounded-lg hover:bg-[#188f5f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
                >
                  Next
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#1FA372] text-white rounded-lg hover:bg-[#188f5f] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-check-line mr-2"></i>
                  Save Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed top-4 right-4 z-60 bg-[#1FA372] text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <i className="ri-check-circle-line text-lg"></i>
          <span>Payment successfully added and reflected in dashboard.</span>
        </div>
      )}
    </>
  );
}
