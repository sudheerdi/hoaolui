"use client";

import Sidebar from "../../components/Sidebar";
import PaymentStatusChart from "../../components/PaymentStatusChart";
import UserProfile from "../../components/UserProfile";
import BudgetChart from "../../components/BudgetChart";
import MakePaymentModal from "../../components/MakePaymentModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useAppSelector } from "@/src/lib/hooks";
import SendViolationModal from "@/src/components/modals/SendViolationModal";
import { useUserAuthToken } from "@/src/helpers/hooks/useUserAuthToken";

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 59000 },
  { month: "Aug", revenue: 64000 },
  { month: "Sep", revenue: 58000 },
  { month: "Oct", revenue: 62000 },
  { month: "Nov", revenue: 56000 },
  { month: "Dec", revenue: 70000 },
];

export default function Dashboard() {
  const isAuthenticated = useUserAuthToken();
  const { user } = useAppSelector((state) => state.hoaUser);
  const [showSendViolationModal, setShowSendViolationModal] = useState(false);
  const [showMakePaymentModal, setShowMakePaymentModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const upcomingEvents = [
    { id: 1, title: "Board Meeting", date: "2024-02-15", time: "7:00 PM" },
    { id: 2, title: "Pool Maintenance", date: "2024-02-18", time: "9:00 AM" },
    {
      id: 3,
      title: "Fire Safety Inspection",
      date: "2024-02-20",
      time: "10:00 AM",
    },
    { id: 4, title: "Landscaping Work", date: "2024-02-22", time: "8:00 AM" },
    { id: 5, title: "Community Event", date: "2024-02-25", time: "6:00 PM" },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1E293B] overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {showMobileMenu && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className="bg-[#1E293B] w-[280px] h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="text-white text-xl font-bold">Menu</div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-2 mb-6">
                <button
                  onClick={() => {
                    setShowMakePaymentModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-4 py-3 bg-[#1FA372] text-white text-sm font-medium rounded-lg hover:bg-[#188f5f] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-money-dollar-circle-line mr-2"></i>
                  Make a Payment
                </button>
                <button
                  onClick={() => {
                    setShowSendViolationModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-4 py-3 bg-[#1FA372] text-white text-sm font-medium rounded-lg hover:bg-[#188f5f] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-alert-line mr-2"></i>
                  Send Violation
                </button>
              </div>

              <Sidebar />
            </div>
          </div>
        </div>
      )}

      <div className="ml-0 lg:ml-[260px] lg:mr-[300px] p-[10px] h-screen flex flex-col">
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
          <div className="bg-white px-4 py-2 flex-shrink-0 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-menu-line text-xl"></i>
                </button>
                <div>
                  <div className="text-xl font-bold text-black">
                    Welcome {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Manage your community with ease
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowMakePaymentModal(true)}
                  className="hidden lg:block px-4 py-2 bg-[#1FA372] text-white text-sm font-medium rounded-lg hover:bg-[#188f5f] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Make a Payment
                </button>
                <button
                  onClick={() => setShowSendViolationModal(true)}
                  className="hidden lg:block px-4 py-2 bg-[#1FA372] text-white text-sm font-medium rounded-lg hover:bg-[#188f5f] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Send Violation
                </button>

                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    <i className="ri-notification-3-line text-lg"></i>
                  </button>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    3
                  </div>
                </div>

                <UserProfile />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9FAFB]">
            <div className="mb-4 block lg:hidden">
              <PaymentStatusChart />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:hidden">
              <div className="w-full">
                <BudgetChart />
              </div>
              <div className="w-full">
                <div className="bg-white rounded-lg shadow-sm p-6 h-auto border border-gray-100">
                  <h3 className="text-xl font-bold text-black mb-4">
                    Revenue Trends
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: "#000000", fontWeight: 500 }}
                        />
                        <YAxis
                          tick={{ fill: "#000000", fontWeight: 500 }}
                          tickFormatter={(value) =>
                            `$${(value / 1000).toFixed(0)}k`
                          }
                        />
                        <Tooltip
                          formatter={(value, name) => [
                            `$${value?.toLocaleString()}`,
                            "Revenue",
                          ]}
                          labelStyle={{ color: "#000" }}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                          }}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#1FA372"
                          barSize={5}
                          radius={[2.5, 2.5, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block mb-4">
              <PaymentStatusChart />
            </div>

            <div className="hidden lg:flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-[33.33%]">
                <BudgetChart />
              </div>
              <div className="w-full lg:w-[66.67%]">
                <div className="bg-white rounded-lg shadow-sm p-6 h-auto lg:h-[500px] border border-gray-100">
                  <h3 className="text-xl font-bold text-black mb-4">
                    Revenue Trends
                  </h3>
                  <div className="h-[300px] lg:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: "#000000", fontWeight: 500 }}
                        />
                        <YAxis
                          tick={{ fill: "#000000", fontWeight: 500 }}
                          tickFormatter={(value) =>
                            `$${(value / 1000).toFixed(0)}k`
                          }
                        />
                        <Tooltip
                          formatter={(value, name) => [
                            `$${value?.toLocaleString()}`,
                            "Revenue",
                          ]}
                          labelStyle={{ color: "#000" }}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                          }}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#1FA372"
                          barSize={5}
                          radius={[2.5, 2.5, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block fixed right-0 top-[10px] bottom-[10px] w-[280px] mr-[10px]">
        <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden border border-gray-100 flex flex-col">
          <div className="bg-white p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-black text-center">
              Upcoming Events
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto bg-[#F9FAFB] p-4">
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm"
                >
                  <h4 className="text-sm font-medium text-gray-900 mb-1 leading-tight">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">{event.date}</p>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MakePaymentModal
        isOpen={showMakePaymentModal}
        onClose={() => setShowMakePaymentModal(false)}
      />

      <SendViolationModal
        isOpen={showSendViolationModal}
        onClose={() => setShowSendViolationModal(false)}
      />
    </div>
  );
}
