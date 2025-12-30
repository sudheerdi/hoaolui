"use client";

import { useEffect, useState } from "react";
import {
  useLazyGetViolationDefaultsQuery,
  useLazyGetUsersQuery,
} from "@/src/services";
import { violationIcons } from "@/src/helpers";

interface SendViolationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function SendViolationModal({
  isOpen,
  onClose,
}: SendViolationModalProps) {
  const [
    getViolationDefaults,
    { data: defaultViolationsData, isLoading: isLoadingViolationsDefaults },
  ] = useLazyGetViolationDefaultsQuery();
  const [getUsers, { data: usersData }] = useLazyGetUsersQuery();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedViolationType, setSelectedViolationType] = useState("");
  const [violationContent, setViolationContent] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

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
    const selectedType = defaultViolationsData?.violationDefaults.find(
      (type) => type.id === typeId
    );
    if (selectedType) {
      setViolationContent(selectedType.templateDescription);
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
      onClose();
      setSelectedUser("");
      setSelectedViolationType("");
      setViolationContent("");
      setUserSearchTerm("");
    }
  };

  const handleGetViolationDefaults = async () => {
    try {
      await getViolationDefaults(null);
    } catch (error) {
      console.error("Error fetching violation defaults:", error);
    }
  };

  const handleGetUsers = async (searchTerm: string) => {
    await getUsers(searchTerm);
  };

  useEffect(() => {
    if (isOpen) handleGetViolationDefaults();
  }, [isOpen]);

  useEffect(() => {
    if (userSearchTerm && userSearchTerm.length > 2) {
      handleGetUsers(userSearchTerm);
    }
  }, [userSearchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Send Violation Notice
          </h3>
          <button
            onClick={() => {
              onClose();
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
                placeholder="Search by address..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent"
              />

              {showUserDropdown &&
                userSearchTerm &&
                usersData &&
                usersData.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {usersData.map((user: any) => (
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
              {defaultViolationsData &&
                defaultViolationsData.violationDefaults.map((violation) => (
                  <button
                    key={violation.id}
                    onClick={() => handleViolationTypeChange(violation.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center hover:border-[#1FA372] cursor-pointer ${
                      selectedViolationType === violation.id
                        ? "border-[#1FA372] bg-[#1FA372]/10 text-[#1FA372]"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {violationIcons[violation.violationType.toLowerCase()]}
                    </div>
                    <div className="text-xs font-medium leading-tight break-words">
                      {violation.violationType}
                    </div>
                  </button>
                ))}
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-black mb-2">
              Violation Notice Content <span className="text-red-500">*</span>
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
              onClose();
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
  );
}
