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
import { useUserAuthToken } from "../../helpers/hooks/useUserAuthToken";
import { useAppSelector } from "@/src/lib/hooks";

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

interface User {
  id: string;
  name: string;
  email: string;
  unit: string;
}

interface ViolationType {
  id: string;
  name: string;
  defaultContent: string;
  severity: "low" | "medium" | "high";
  icon: string;
}

export default function Dashboard() {
  const isAuthenticated = useUserAuthToken();
  const { user } = useAppSelector((state) => state.hoaUser);
  const [showSendViolationModal, setShowSendViolationModal] = useState(false);
  const [showMakePaymentModal, setShowMakePaymentModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedViolationType, setSelectedViolationType] = useState("");
  const [violationContent, setViolationContent] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      unit: "Unit 4B",
    },
    {
      id: "2",
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      unit: "Unit 7C",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@email.com",
      unit: "Unit 2A",
    },
    {
      id: "4",
      name: "Lisa Chen",
      email: "lisa.chen@email.com",
      unit: "Unit 5D",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@email.com",
      unit: "Unit 8A",
    },
    {
      id: "6",
      name: "Jennifer Lee",
      email: "jennifer.lee@email.com",
      unit: "Unit 3B",
    },
    {
      id: "7",
      name: "Michael Brown",
      email: "michael.brown@email.com",
      unit: "Unit 6C",
    },
    {
      id: "8",
      name: "Sarah Davis",
      email: "sarah.davis@email.com",
      unit: "Unit 1A",
    },
    {
      id: "9",
      name: "James Wilson",
      email: "james.wilson@email.com",
      unit: "Unit 9A",
    },
    {
      id: "10",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      unit: "Unit 10B",
    },
  ];

  const violationTypes: ViolationType[] = [
    {
      id: "1",
      name: "Parking Violation",
      defaultContent:
        "Your vehicle has been found in violation of the community parking regulations. Please ensure your vehicle is parked only in designated areas and follows all posted parking guidelines. Continued violations may result in towing at owner's expense.",
      severity: "medium",
      icon: "🚗",
    },
    {
      id: "2",
      name: "Noise Violation",
      defaultContent:
        "We have received complaints regarding excessive noise from your unit during quiet hours (10 PM - 7 AM). Please be mindful of noise levels to maintain a peaceful environment for all residents. This includes music, television, conversations, and other activities.",
      severity: "medium",
      icon: "🔊",
    },
    {
      id: "3",
      name: "Pet Violation",
      defaultContent:
        "Your pet has been observed violating community pet policies. All pets must be leashed in common areas, and owners are responsible for cleaning up after their pets. Please review the pet policy in your lease agreement.",
      severity: "high",
      icon: "🐕",
    },
    {
      id: "4",
      name: "Trash Violation",
      defaultContent:
        "Improper waste disposal has been observed. Please ensure all trash is placed in designated containers and areas only on collection days. Do not leave trash bags outside designated areas as this attracts pests and creates unsanitary conditions.",
      severity: "low",
      icon: "🗑️",
    },
    {
      id: "5",
      name: "Smoking Violation",
      defaultContent:
        "Smoking has been observed in non-smoking areas of the community. Please note that smoking is prohibited in all indoor common areas, elevators, and designated non-smoking zones. Please use designated smoking areas only.",
      severity: "medium",
      icon: "🚭",
    },
    {
      id: "6",
      name: "Pool Violation",
      defaultContent:
        "Pool facility rules have been violated. Please observe posted pool hours, guest policies, and safety regulations. Children must be supervised at all times. No glass containers, loud music, or inappropriate behavior is permitted in the pool area.",
      severity: "medium",
      icon: "🏊",
    },
    {
      id: "7",
      name: "Balcony Violation",
      defaultContent:
        "Unauthorized modifications or items have been observed on your balcony. All balcony modifications must be pre-approved by the HOA. Please remove any unauthorized items and submit proper requests for any desired changes.",
      severity: "low",
      icon: "🏠",
    },
    {
      id: "8",
      name: "Guest Violation",
      defaultContent:
        "Guest policy violations have been observed. All overnight guests must be registered with management for stays longer than 3 consecutive days. Please ensure your guests follow all community rules and regulations during their visit.",
      severity: "medium",
      icon: "👥",
    },
    {
      id: "9",
      name: "Other Violations",
      defaultContent:
        "A violation of community rules and regulations has been observed. Please review your lease agreement and community guidelines to ensure compliance with all policies. Contact the management office if you have any questions about community rules.",
      severity: "medium",
      icon: "⚠️",
    },
  ];

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

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.unit.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const handleUserSelect = (user: User) => {
    setSelectedUser(user.id);
    setUserSearchTerm(`${user.name} - ${user.unit}`);
    setShowUserDropdown(false);
  };

  const handleViolationTypeChange = (typeId: string) => {
    setSelectedViolationType(typeId);
    const selectedType = violationTypes.find((type) => type.id === typeId);
    if (selectedType) {
      setViolationContent(selectedType.defaultContent);
    } else {
      setViolationContent("");
    }
  };

  const handleSendViolation = () => {
    if (!selectedUser || !selectedViolationType || !violationContent.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const user = mockUsers.find((u) => u.id === selectedUser);
    const violationType = violationTypes.find(
      (vt) => vt.id === selectedViolationType
    );

    if (user && violationType) {
      alert(
        `Violation notice sent to ${user.name} (${user.unit}) for ${violationType.name}`
      );
      setShowSendViolationModal(false);
      setSelectedUser("");
      setSelectedViolationType("");
      setViolationContent("");
      setUserSearchTerm("");
    }
  };

  if (!isAuthenticated) return null;

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
          <div className="px-4 py-2 flex-shrink-0">
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
                    Welcome {user.firstName} {user.lastName}
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

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
        <div className="bg-white rounded-lg shadow-sm h-full overflow-y-auto border border-gray-100">
          <div className="p-4">
            <h3 className="text-lg font-bold text-black mb-4 text-center">
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-100"
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

      {showSendViolationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Send Violation Notice
              </h3>
              <button
                onClick={() => {
                  setShowSendViolationModal(false);
                  setSelectedUser("");
                  setSelectedViolationType("");
                  setViolationContent("");
                  setUserSearchTerm("");
                  setShowUserDropdown(false);
                }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-black mb-2">
                  Search Resident <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    value={userSearchTerm}
                    onChange={(e) => {
                      setUserSearchTerm(e.target.value);
                      setShowUserDropdown(true);
                      if (!e.target.value) {
                        setSelectedUser("");
                      }
                    }}
                    onFocus={() => setShowUserDropdown(true)}
                    placeholder="Search by name or unit number..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent"
                  />

                  {showUserDropdown &&
                    userSearchTerm &&
                    filteredUsers.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredUsers.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => handleUserSelect(user)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                          >
                            <div className="font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {user.unit} • {user.email}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-3">
                  Violation Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {violationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleViolationTypeChange(type.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-center hover:border-[#1FA372] cursor-pointer ${
                        selectedViolationType === type.id
                          ? "border-[#1FA372] bg-[#1FA372]/10 text-[#1FA372]"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-xs font-medium leading-tight">
                        {type.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-2">
                  Violation Notice Content{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={violationContent}
                  onChange={(e) => setViolationContent(e.target.value)}
                  placeholder="Select a violation type to see default content, or write your own message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent"
                  rows={8}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    You can edit the default content or write your own message
                  </p>
                  <p className="text-xs text-gray-500">
                    {violationContent.length}/500 characters
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => {
                  setShowSendViolationModal(false);
                  setSelectedUser("");
                  setSelectedViolationType("");
                  setViolationContent("");
                  setUserSearchTerm("");
                  setShowUserDropdown(false);
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendViolation}
                disabled={
                  !selectedUser ||
                  !selectedViolationType ||
                  !violationContent.trim()
                }
                className="flex-1 bg-[#1FA372] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#188f5f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Send Violation Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
