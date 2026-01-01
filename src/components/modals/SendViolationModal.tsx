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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Violation Details:
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

        <div className="flex flex-1 overflow-hidden">
          <div className="w-[45%] border-r border-gray-200 p-6 overflow-y-auto bg-gray-50">
            <div className="mb-6">
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
                  placeholder="Search address"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent"
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
              <h4 className="text-base font-semibold text-gray-900 mb-4">
                Select violation type
              </h4>
              <div className="space-y-2">
                {defaultViolationsData &&
                  defaultViolationsData.violationDefaults.map((violation) => (
                    <button
                      key={violation.id}
                      onClick={() => handleViolationTypeChange(violation.id)}
                      disabled={!selectedUser}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center space-x-3 cursor-pointer ${
                        !selectedUser
                          ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                          : selectedViolationType === violation.id
                          ? "border-[#1FA372] bg-[#1FA372]/10"
                          : "border-gray-200 bg-white hover:border-[#1FA372] hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-2xl">
                        {violationIcons[violation.violationType.toLowerCase()]}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`text-sm font-medium ${
                            !selectedUser ? "text-gray-400" : "text-gray-900"
                          }`}
                        >
                          {violation.violationType}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="w-[55%] p-6 overflow-y-auto">
            {selectedViolationType ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Violation:
                  </label>
                  <input
                    type="text"
                    value={
                      violationTypes.find((v) => v.id === selectedViolationType)
                        ?.name || ""
                    }
                    readOnly
                    className="w-full px-3 py-2 border-b border-gray-300 text-sm focus:outline-none bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description of Violation:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    className="w-full px-3 py-2 border-b border-gray-300 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section of CC&Rs Violated:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter section"
                    className="w-full px-3 py-2 border-b border-gray-300 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Observed:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter date"
                    className="w-full px-3 py-2 border-b border-gray-300 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Observed:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter time"
                    className="w-full px-3 py-2 border-b border-gray-300 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reported By (if applicable):
                  </label>
                  <input
                    type="text"
                    placeholder="Enter reporter name"
                    className="w-full px-3 py-2 border-b border-gray-300 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photographic / Witness Evidence (if applicable): [Attach or
                    insert details here]
                  </label>
                  <textarea
                    placeholder="Enter evidence details"
                    className="w-full px-3 py-2 border-b border-gray-300 text-sm focus:outline-none resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    onClick={() => {
                      alert("Saved for later");
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Save for later
                  </button>
                  <button
                    onClick={() => {
                      alert("Review initiated");
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Review
                  </button>
                  <button
                    onClick={handleSendViolation}
                    className="px-6 py-2 bg-[#1FA372] text-white rounded-lg font-medium hover:bg-[#188f5f] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <i className="ri-file-list-3-line text-5xl mb-3"></i>
                  <p className="text-sm">
                    Select an address and violation type to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
