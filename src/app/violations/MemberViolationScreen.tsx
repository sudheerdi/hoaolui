"use client";
import { useState } from "react";
import ViolationsTable from "./ViolationsTable";
import ViolationsDrawer from "./ViolationsDrawer";
import AcknowledgementModal from "./AcknowledgementModal";
import ViolationsTopBar from "./ViolationsTopBar";

export default function MemberViolationScreen() {
  const [activeTab, setActiveTab] = useState<"open" | "resolved">("open");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [timeFilter, setTimeFilter] = useState("All time");
  const [selectedViolation, setSelectedViolation] = useState<any>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);

  const openViolations = [
    {
      id: 1,
      type: "Parking Violation",
      progress: 75,
      issued: "2024-01-15",
      description: "Vehicle parked in unauthorized area",
      status: "Pending",
      dueDate: "2024-02-15",
      fine: "$50.00",
      additionalInfo:
        "Vehicle was parked in a fire lane for over 2 hours. Please ensure proper parking in designated areas.",
    },
    {
      id: 2,
      type: "Noise Violation",
      progress: 50,
      issued: "2024-01-10",
      description: "Excessive noise complaint from neighbors",
      status: "In Progress",
      dueDate: "2024-02-10",
      fine: "$75.00",
      additionalInfo:
        "Multiple complaints received about loud music after 10 PM. Please adhere to quiet hours policy.",
    },
    {
      id: 3,
      type: "Pet Violation",
      progress: 25,
      issued: "2024-01-08",
      description: "Unleashed pet in common area",
      status: "Pending",
      dueDate: "2024-02-08",
      fine: "$100.00",
      additionalInfo:
        "Pet must be leashed at all times in common areas per HOA regulations.",
    },
    {
      id: 4,
      type: "Trash Violation",
      progress: 60,
      issued: "2024-01-05",
      description: "Improper waste disposal",
      status: "In Progress",
      dueDate: "2024-02-05",
      fine: "$50.00",
      additionalInfo:
        "Trash bins left out beyond collection day. Please return bins within 24 hours of pickup.",
    },
    {
      id: 5,
      type: "Smoking Violation",
      progress: 40,
      issued: "2024-01-03",
      description: "Smoking in non-designated area",
      status: "Pending",
      dueDate: "2024-02-03",
      fine: "$150.00",
      additionalInfo:
        "Smoking is only permitted in designated areas. Please use designated smoking zones.",
    },
  ];

  const resolvedViolations = [
    {
      id: 6,
      type: "Parking Violation",
      progress: 100,
      issued: "2023-12-20",
      description: "Vehicle parked in fire lane",
      status: "Resolved",
      resolvedDate: "2024-01-10",
      fine: "$100.00",
      additionalInfo:
        "Violation resolved. Fine paid and vehicle moved to proper parking space.",
    },
    {
      id: 7,
      type: "Noise Violation",
      progress: 100,
      issued: "2023-12-15",
      description: "Late night party disturbance",
      status: "Resolved",
      resolvedDate: "2024-01-05",
      fine: "$75.00",
      additionalInfo:
        "Resident acknowledged violation and agreed to comply with quiet hours policy.",
    },
    {
      id: 8,
      type: "Landscaping Violation",
      progress: 100,
      issued: "2023-12-10",
      description: "Overgrown lawn and hedges",
      status: "Resolved",
      resolvedDate: "2023-12-28",
      fine: "$50.00",
      additionalInfo: "Landscaping completed and approved by HOA inspection.",
    },
  ];

  const handleRowClick = (violation: any) => {
    setSelectedViolation(violation);
    setShowDrawer(true);
  };

  const handleAcknowledgementClick = (violation: any) => {
    setSelectedViolation(violation);
    setShowAcknowledgement(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] flex-1 flex flex-col ml-[260px] min-h-[calc(100vh-20px)]">
      <ViolationsTopBar />
      <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        <div className="relative h-full">
          {/* Main Content */}
          <div
            className={`h-full transition-all duration-300 ${showDrawer ? "pr-96" : ""}`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] h-full flex flex-col">
              {/* Tabs and Filters */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Tabs */}
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-full">
                    <button
                      onClick={() => setActiveTab("open")}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        activeTab === "open"
                          ? "bg-[#1FA372] text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => setActiveTab("resolved")}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        activeTab === "resolved"
                          ? "bg-[#1FA372] text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Resolved
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-sm border border-gray-300 rounded px-3 py-2 pl-9 w-64"
                      />
                      <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"></i>
                    </div>

                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="text-sm border border-gray-300 rounded px-3 py-2 pr-8"
                    >
                      <option>All types</option>
                      <option>Parking Violation</option>
                      <option>Noise Violation</option>
                      <option>Pet Violation</option>
                      <option>Trash Violation</option>
                      <option>Smoking Violation</option>
                      <option>Landscaping Violation</option>
                    </select>

                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="text-sm border border-gray-300 rounded px-3 py-2 pr-8"
                    >
                      <option>All time</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>Last year</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-auto">
                <ViolationsTable
                  violations={
                    activeTab === "open" ? openViolations : resolvedViolations
                  }
                  onRowClick={handleRowClick}
                  onAcknowledgementClick={handleAcknowledgementClick}
                  isResolved={activeTab === "resolved"}
                  selectedViolationId={selectedViolation?.id}
                />
              </div>
            </div>
          </div>

          {/* Drawer - Absolute positioned */}
          {showDrawer && selectedViolation && (
            <div className="absolute top-0 right-0 h-full w-96">
              <ViolationsDrawer
                violation={selectedViolation}
                onClose={() => setShowDrawer(false)}
              />
            </div>
          )}

          {/* Acknowledgement Modal */}
          {showAcknowledgement && (
            <AcknowledgementModal
              violation={selectedViolation}
              onClose={() => setShowAcknowledgement(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
