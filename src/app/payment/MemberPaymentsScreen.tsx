"use client";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
import Sidebar from "@/src/components/Sidebar";
import UserProfile from "@/src/components/UserProfile";

export default function MemberPaymentsScreen() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const paymentHistory = [
    {
      activeDate: "Jun 17, 2025",
      description: "Bank Account Payment",
      charge: "Paid by Sucheer Vesapogu",
      payment: "$405.00",
      balance: "$0.00",
    },
    {
      activeDate: "Apr 30, 2025",
      description: "Quarterly HOA Dues Payment(quarterly)",
      charge: "Due Jun 30, 2025",
      payment: "$135.00",
      balance: "$405.00",
    },
    {
      activeDate: "Jan 30, 2025",
      description: "Quarterly HOA Dues Payment(quarterly)",
      charge: "Due Mar 30, 2025",
      payment: "$135.00",
      balance: "$270.00",
    },
    {
      activeDate: "Oct 30, 2024",
      description: "Quarterly HOA Dues Payment(quarterly)",
      charge: "Due Dec 30, 2024",
      payment: "$135.00",
      balance: "$135.00",
    },
    {
      activeDate: "Jul 30, 2024",
      description: "Bank Account Payment",
      charge: "Paid by Sucheer Vesapogu",
      payment: "$135.00",
      balance: "$0.00",
    },
    {
      activeDate: "Jul 30, 2024",
      description: "Quarterly HOA Dues Payment(quarterly)",
      charge: "Due Sep 30, 2024",
      payment: "$135.00",
      balance: "$135.00",
    },
    {
      activeDate: "Jun 30, 2024",
      description: "Bank Account Payment",
      charge: "Paid by Sucheer Vesapogu",
      payment: "$135.00",
      balance: "$0.00",
    },
    {
      activeDate: "Apr 30, 2024",
      description: "Quarterly HOA Dues Payment(quarterly)",
      charge: "Due Jun 30, 2024",
      payment: "$135.00",
      balance: "$135.00",
    },
    {
      activeDate: "Apr 29, 2024",
      description: "Bank Account Payment",
      charge: "Paid by Sucheer Vesapogu",
      payment: "$135.00",
      balance: "$0.00",
    },
    {
      activeDate: "Apr 27, 2024",
      description: "Q12024 HOA Dues",
      charge: "Due Jun 30, 2024",
      payment: "$135.00",
      balance: "$135.00",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1E293B] overflow-hidden">
      <Sidebar />

      <div className="lg:ml-[260px] p-[10px] h-screen flex flex-col">
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div></div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <i className="ri-notification-3-line text-xl text-gray-600 cursor-pointer hover:text-gray-800"></i>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Greenwood Community & 123 Main Street
                </span>
                <UserProfile />
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Make Payment Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-6 py-2.5 bg-[#1FA372] text-white rounded-lg hover:bg-[#1A8C62] transition-colors font-medium whitespace-nowrap cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <i className="ri-money-dollar-circle-line text-lg"></i>
                  Make Payment
                </button>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-6">
                {/* Left Card - Account Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="mb-6">
                    <p className="text-sm text-black/60 mb-1">
                      Name:{" "}
                      <span className="text-black font-medium">
                        Vesapogu, Sucheer
                      </span>
                    </p>
                    <p className="text-sm text-black/60 mb-1">
                      Organization:{" "}
                      <span className="text-black font-medium">
                        Joseph Creek Homeowner's Association
                      </span>
                    </p>
                    <p className="text-sm text-black/60">
                      Amount Due:{" "}
                      <span className="text-black font-semibold">
                        $0.00 USD
                      </span>
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-black/80">
                      There are no outstanding charges on your account.
                    </p>
                  </div>

                  {/* Auto-Pay Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-lightbulb-line text-xl text-yellow-600"></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-black mb-1">
                          Bill Payment Made Easy, with Auto-Pay.
                        </h3>
                        <p className="text-sm text-black/60">
                          Eliminate late fees with our paid, no-hassle service.
                        </p>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-[#1FA372] text-white rounded-lg hover:bg-[#1A8C62] transition-colors font-medium text-sm whitespace-nowrap cursor-pointer">
                      Enable Auto-Pay
                    </button>
                  </div>
                </div>

                {/* Right Card - Checkout */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-black">Checkout</h2>
                    <p className="text-lg font-semibold text-black">
                      Amount Due:{" "}
                      <span className="text-[#1FA372]">$0.00 USD</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-black mb-3">
                        Selected Charges:
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-black/60">
                            No charges selected
                          </span>
                          <span className="text-base font-semibold text-black">
                            $0.00
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-base font-semibold text-black">
                          Total:
                        </span>
                        <span className="text-2xl font-bold text-[#1FA372]">
                          $0.00
                        </span>
                      </div>
                      <button
                        disabled
                        className="w-full py-3 bg-gray-300 text-white rounded-lg font-semibold text-base cursor-not-allowed"
                      >
                        Make a Payment of $0.00
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment History Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-black">
                    Payment History
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                          Active Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-black uppercase tracking-wider">
                          Charge
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-black uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-black uppercase tracking-wider">
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paymentHistory.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-semibold">
                            {item.activeDate}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="text-[#1FA372] hover:text-[#1A8C62] cursor-pointer font-semibold">
                              {item.description}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-semibold text-right">
                            {item.charge}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-semibold text-right">
                            {item.payment}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-bold text-right">
                            {item.balance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {showPaymentModal && (
              <PaymentModal onClose={() => setShowPaymentModal(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
