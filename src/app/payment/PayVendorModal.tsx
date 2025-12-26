'use client';

import { useState } from 'react';

interface PayVendorModalProps {
  vendor?: any;
  invoice?: any;
  onClose: () => void;
}

export default function PayVendorModal({ vendor, invoice, onClose }: PayVendorModalProps) {
  const [formData, setFormData] = useState({
    invoiceDate: invoice?.invoiceDate || '',
    invoiceDueDate: '',
    invoiceNumber: invoice?.invoiceNumber || '',
    invoiceAmount: invoice?.amount?.replace('$', '') || '',
    expenseCategory: '',
    expenseAmount: '',
    invoiceAction: 'schedule',
    paymentMethod: 'mail',
    paymentBankAccount: '',
    checkNumber: invoice?.checkNo || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Payment processed:', formData);
    onClose();
  };

  if (invoice) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold text-gray-900">INVOICE #{invoice.invoiceNumber}</h2>
                  <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    PENDING APPROVAL
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Invoice Summary</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-base font-medium text-black">HOA</span>
                      <span className="text-base font-medium text-black">Greenwood Park HOA</span>
                    </div>

                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-base font-medium text-black">VENDOR</span>
                      <div className="text-right">
                        <p className="text-base text-black font-medium">{invoice.vendor}</p>
                        <p className="text-sm text-black">725 Oak Dr. Suite 105</p>
                        <p className="text-sm text-black">Smyrna, GA 30080</p>
                      </div>
                    </div>

                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-base font-medium text-black">ISSUE DATE</span>
                      <span className="text-base font-medium text-black">{invoice.invoiceDate}</span>
                    </div>

                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-base font-medium text-black">DUE DATE</span>
                      <span className="text-base text-black font-semibold">{invoice.amount}</span>
                    </div>

                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-base font-medium text-black">SALES TAX</span>
                      <span className="text-base font-medium text-black">$25.00</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between text-base">
                      <span className="font-medium text-black">DESCRIPTION</span>
                      <span className="font-medium text-black">AMOUNT</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-base font-medium text-black">Lawn Maintenance</span>
                      <span className="text-base font-medium text-black">$575.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-base font-medium text-black">SUBTOTAL</span>
                      <span className="text-base font-medium text-black">$600.00</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-lg font-bold text-black">TOTAL</span>
                      <span className="text-lg font-bold text-black">$600.00</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Compliance Check</h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                      <span className="text-base font-medium text-black">W-9 on file: Yes</span>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                      <span className="text-base font-medium text-black">1099 reportable: No</span>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                      <span className="text-base font-medium text-black">No possible duplicates found</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-[#1FA372] text-white px-6 py-3 rounded-lg hover:bg-[#188f5f] transition-colors cursor-pointer whitespace-nowrap font-medium"
                    >
                      Approve & Create Payable
                    </button>

                    <button
                      className="w-full border-2 border-[#1FA372] text-[#1FA372] px-6 py-3 rounded-lg hover:bg-green-50 transition-colors cursor-pointer whitespace-nowrap font-medium"
                    >
                      Send for Board Approval
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Edit Invoice
                      </button>
                      <button
                        className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Void Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-4xl shadow-lg max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-6 border-b border-gray-100 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Pay Vendor</h2>
                <div className="w-12 h-1 bg-[#1FA372] rounded-full mt-2"></div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-base font-medium text-black mb-2">Vendor Information</h3>
              <div className="flex items-center space-x-3">
                <img src={vendor.logo} alt={vendor.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="text-base font-medium text-black">{vendor.name}</p>
                  <p className="text-sm font-medium text-black">{vendor.accountNumber}</p>
                  <p className="text-sm font-medium text-black">{vendor.address}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-base font-semibold text-black">Update Vendor Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-black mb-2">
                      Invoice Date
                    </label>
                    <input
                      type="date"
                      value={formData.invoiceDate}
                      onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-black font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-medium text-black mb-2">
                      Invoice Due Date
                    </label>
                    <input
                      type="date"
                      value={formData.invoiceDueDate}
                      onChange={(e) => handleInputChange('invoiceDueDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-black font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-black mb-2">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                    placeholder="INV-XXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-black font-medium"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-black mb-2">
                    Invoice Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.invoiceAmount}
                      onChange={(e) => handleInputChange('invoiceAmount', e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-black font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-black mb-2">
                    Expense Category
                  </label>
                  <select
                    value={formData.expenseCategory}
                    onChange={(e) => handleInputChange('expenseCategory', e.target.value)}
                    className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-black font-medium"
                  >
                    <option value="">Select category</option>
                    <option value="landscaping">Landscaping</option>
                    <option value="pool">Pool Maintenance</option>
                    <option value="security">Security</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="utilities">Utilities</option>
                    <option value="repairs">Repairs & Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-medium text-black mb-2">
                    Expense Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.expenseAmount}
                      onChange={(e) => handleInputChange('expenseAmount', e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-black font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-base font-semibold text-black">What would you like to do with this invoice?</h3>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="invoiceAction"
                      value="schedule"
                      checked={formData.invoiceAction === 'schedule'}
                      onChange={(e) => handleInputChange('invoiceAction', e.target.value)}
                      className="w-4 h-4 text-[#1FA372] focus:ring-[#1FA372]"
                    />
                    <span className="text-base font-medium text-black">Schedule Payment</span>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="invoiceAction"
                      value="paid"
                      checked={formData.invoiceAction === 'paid'}
                      onChange={(e) => handleInputChange('invoiceAction', e.target.value)}
                      className="w-4 h-4 text-[#1FA372] focus:ring-[#1FA372]"
                    />
                    <span className="text-base font-medium text-black">Mark as Paid</span>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="invoiceAction"
                      value="draft"
                      checked={formData.invoiceAction === 'draft'}
                      onChange={(e) => handleInputChange('invoiceAction', e.target.value)}
                      className="w-4 h-4 text-[#1FA372] focus:ring-[#1FA372]"
                    />
                    <span className="text-base font-medium text-black">Save as Draft and Pay Later</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-base font-semibold text-black mb-4">Payment Method</h3>

                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mail"
                        checked={formData.paymentMethod === 'mail'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="w-4 h-4 text-[#1FA372] focus:ring-[#1FA372] mt-0.5"
                      />
                      <div>
                        <span className="text-base font-medium text-black block">Mail Check</span>
                        <span className="text-sm font-medium text-black">$1.50 will be charged to your HOA-OL account</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="print"
                        checked={formData.paymentMethod === 'print'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="w-4 h-4 text-[#1FA372] focus:ring-[#1FA372]"
                      />
                      <span className="text-base font-medium text-black">Print Check</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-black mb-2">
                    Payment Bank Account
                  </label>
                  <div className="flex space-x-2">
                    <select
                      value={formData.paymentBankAccount}
                      onChange={(e) => handleInputChange('paymentBankAccount', e.target.value)}
                      className="flex-1 px-4 py-3 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-black font-medium"
                    >
                      <option value="">Select account</option>
                      <option value="checking-001">Checking Account - ****001</option>
                      <option value="checking-002">Checking Account - ****002</option>
                    </select>
                    <button className="w-10 h-10 flex items-center justify-center bg-[#1FA372] text-white rounded-lg hover:bg-[#188f5f] transition-colors cursor-pointer">
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-black mb-2">
                    Check Number
                  </label>
                  <input
                    type="text"
                    value={formData.checkNumber}
                    onChange={(e) => handleInputChange('checkNumber', e.target.value)}
                    placeholder="CHK-XXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-black font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100 flex justify-end space-x-3 rounded-b-xl">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#1FA372] text-white rounded-lg hover:bg-[#188f5f] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-check-line mr-2"></i>
              Process Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
