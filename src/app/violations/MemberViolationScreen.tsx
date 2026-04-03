"use client";
import { useEffect, useState } from "react";
import ViolationsTable from "./components/ViolationsTable";
import ViolationsDrawer from "./components/ViolationsDrawer";
import AcknowledgementModal from "./components/AcknowledgementModal";
import ViolationsTopBar from "./components/ViolationsTopBar";
import { useLazyGetMemberViolationsQuery } from "@/src/services/hoa-violations";

export default function MemberViolationScreen() {
  const [getMemberViolations, { data: memberViolationsData, isSuccess }] =
    useLazyGetMemberViolationsQuery();

  const [activeTab, setActiveTab] = useState<"open" | "resolved">("open");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [timeFilter, setTimeFilter] = useState("All time");
  const [selectedViolation, setSelectedViolation] = useState<any>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);

  const handleRowClick = (violation: any) => {
    setSelectedViolation(violation);
    setShowDrawer(true);
  };

  const handleAcknowledgementClick = (violation: any) => {
    setSelectedViolation(violation);
    setShowAcknowledgement(true);
  };

  const fetchViolations = async () => {
    await getMemberViolations(null);
  };

  useEffect(() => {
    fetchViolations();
  }, [getMemberViolations]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] flex-1 flex flex-col ml-[260px] min-h-[calc(100vh-20px)]">
      <ViolationsTopBar />
      <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        <div className="flex flex-row h-full">
          {/* Main Content */}
          <div className="flex-1 p-6">
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
                {isSuccess && (
                  <ViolationsTable
                    violations={memberViolationsData.violations.filter(
                      (v) => activeTab === v.status.toLowerCase(),
                    )}
                    onRowClick={handleRowClick}
                    onAcknowledgementClick={handleAcknowledgementClick}
                    isResolved={activeTab === "resolved"}
                    selectedViolationId={selectedViolation?.id}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Drawer - Absolute positioned */}
          {showDrawer && selectedViolation && (
            <div className="w-96">
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
