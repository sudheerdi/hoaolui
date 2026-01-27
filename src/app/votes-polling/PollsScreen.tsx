"use client";

import { useEffect, useState } from "react";
import UserProfile from "../../components/UserProfile";
import { useLazyGetPollsQuery } from "@/src/services";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import CreatePollModal from "@/src/components/modals/CreatePollModal";

export default function PollsScreen() {
  const [getPolls, { data: pollsData, isSuccess }] = useLazyGetPollsQuery();
  // Original state variables
  const [selectedPolls, setSelectedPolls] = useState<string[]>([]);
  const [selectedClosedPoll, setSelectedClosedPoll] =
    useState<string>("POLL-004");

  // New state variables from modified content
  const [activeTab, setActiveTab] = useState<"DRAFT" | "closed">("DRAFT");
  const [closedPollPage, setClosedPollPage] = useState(1);

  // Create poll popover state
  const [showCreatePopover, setShowCreatePopover] = useState(false);

  const [activePolls, setActivePolls] = useState<Poll[] | undefined>([]);

  const [closedPolls, setClosedPolls] = useState<Poll[] | undefined>([]);

  const [filteredPolls, setFilteredPolls] = useState<Poll[] | undefined>([]);
  const [selectedPollObjects, setSelectedPollObjects] = useState<
    Poll[] | undefined
  >([]);
  const [totalClosedPages, setTotalClosedPages] = useState(0);
  const [currentClosedPolls, setCurrentClosedPolls] = useState<
    Poll[] | undefined
  >([]);

  // Closed polls pagination - Updated to show 3 rows per page
  const closedPollsPerPage = 3;

  const closedStartIndex = (closedPollPage - 1) * closedPollsPerPage;
  const closedEndIndex = closedStartIndex + closedPollsPerPage;

  // Closed polls pagination handlers
  const handleClosedPrevPage = () => {
    if (closedPollPage > 1) {
      setClosedPollPage(closedPollPage - 1);
    }
  };

  const handleClosedNextPage = () => {
    if (closedPollPage < totalClosedPages) {
      setClosedPollPage(closedPollPage + 1);
    }
  };

  const handleTabChange = (tab: "DRAFT" | "closed") => {
    setActiveTab(tab);
    setClosedPollPage(1);
    // Set default selections based on tab
    if (tab === "DRAFT") {
      setSelectedPolls([]);
    } else {
      setSelectedClosedPoll("POLL-004");
    }
  };

  const handleClosedPollSelection = (pollId: string) => {
    setSelectedClosedPoll(pollId);
  };

  const handleTotalVotes = (options: Poll["options"]) => {
    return options.reduce((total, option) => total + option.noOfVotes, 0);
  };

  const handleGetPolls = async () => {
    await getPolls();
  };

  useEffect(() => {
    handleGetPolls();
  }, []);

  useEffect(() => {
    if (!pollsData) return;
    // Filter polls based on active tab (active or closed)
    const data = [...pollsData].reverse();
    const filteredPolls = data?.filter((poll) =>
      activeTab === "DRAFT"
        ? poll.status === "DRAFT"
        : poll.status === "closed",
    );

    setFilteredPolls(
      activeTab === "DRAFT" ? filteredPolls?.slice(0, 3) : filteredPolls,
    );
  }, [pollsData, activeTab]);

  useEffect(() => {
    // Get selected poll objects - show first 3 for active, selected one for closed
    const selectedPollObjects =
      activeTab === "DRAFT"
        ? filteredPolls?.slice(0, 3)
        : filteredPolls?.filter((poll) => poll.id === selectedClosedPoll);
    setSelectedPollObjects(selectedPollObjects);

    setTotalClosedPages(
      filteredPolls?.length
        ? Math.ceil(filteredPolls?.length / closedPollsPerPage)
        : 0,
    );

    setCurrentClosedPolls(
      activeTab === "closed"
        ? filteredPolls?.slice(closedStartIndex, closedEndIndex)
        : [],
    );
  }, [filteredPolls, activeTab]);

  const renderChart = (poll: Poll, index: number) => {
    const colors = ["#14b8a6", "#3b82f6", "#8b5cf6", "#f59e0b"];

    return (
      <div
        key={poll.id}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-medium text-black">
              {poll.question}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  poll.type === "anonymous"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {poll.type === "ANONYMOUS" ? "Anonymous" : "Open"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-teal-600">
              {handleTotalVotes(poll.options)}
            </div>
            <div className="text-sm text-black font-medium">Total Votes</div>
          </div>
        </div>

        {/* Gauge Chart */}
        <div className="relative w-full h-32 flex items-end justify-center mb-4">
          <svg viewBox="0 0 200 120" className="w-full h-full">
            {/* Background Arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Progress Arcs for Each Option */}
            {(() => {
              let cumulativePercentage = 0;

              return poll.options.map((option, optionIndex) => {
                const startPercentage = cumulativePercentage;
                // cumulativePercentage += option.percentage;
                cumulativePercentage += 0; // To Do

                const totalArcLength = 251.2;
                const startOffset = (startPercentage / 100) * totalArcLength;
                // const segmentLength =
                //   (option.percentage / 100) * totalArcLength;
                const segmentLength = (0 / 100) * totalArcLength; // To Do

                return (
                  <path
                    key={optionIndex}
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={colors[optionIndex % colors.length]}
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${segmentLength} ${totalArcLength}`}
                    strokeDashoffset={-startOffset}
                    className="transition-all duration-300"
                  />
                );
              });
            })()}

            {/* Center Text */}
            <text
              x="100"
              y="85"
              textAnchor="middle"
              className="text-lg font-bold fill-gray-900"
            >
              {/* {poll.totalVotes} */} To Do
            </text>
            <text
              x="100"
              y="100"
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              Total Votes
            </text>
          </svg>
        </div>

        {/* Options Legend */}
        <div className="space-y-2">
          {poll.options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: colors[optionIndex % colors.length],
                  }}
                ></div>
                <span className="text-sm text-black font-medium">
                  {option.description}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-black">
                  {/* {option.percentage}% */} To Do
                </span>
                <span className="text-sm text-black font-medium">
                  {option.noOfVotes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="lg:ml-[260px] bg-white rounded-lg min-h-[calc(100vh-20px)] flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="w-20 h-1 bg-[#1FA372] mt-1 rounded-full"></div>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-bold">
                  Note: max 3 active polls allowed
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowCreatePopover(!showCreatePopover)}
                  className="bg-[#1FA372] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1a8d63] transition-colors flex items-center space-x-2 whitespace-nowrap"
                >
                  <i className="ri-add-line"></i>
                  <span>Create Poll</span>
                </button>

                {/* Create Poll Modal */}
                <CreatePollModal
                  isOpen={showCreatePopover}
                  onClose={(e) => {
                    setShowCreatePopover(false);
                    if (e) handleGetPolls();
                  }}
                />
              </div>
              <div className="relative">
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer">
                  <i className="ri-notification-line text-xl"></i>
                </button>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">3</span>
                </div>
              </div>
              <UserProfile />
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden bg-[#F9FAFB]">
          <div className="flex-1">
            <div className="p-4 space-y-4 h-[calc(100vh-80px)] overflow-y-auto">
              {/* Tab Selector */}
              <div className="px-4 py-4 bg-gray-50 flex gap-4">
                <button
                  onClick={() => handleTabChange("DRAFT")}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === "DRAFT"
                      ? "text-[#1FA372] border-b-2 border-[#1FA372]"
                      : "text-gray-500"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => handleTabChange("closed")}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === "closed"
                      ? "text-[#1FA372] border-b-2 border-[#1FA372]"
                      : "text-gray-500"
                  }`}
                >
                  Closed
                </button>
              </div>

              {/* Charts Section */}
              {selectedPollObjects && selectedPollObjects.length > 0 && (
                <div className="px-4 mb-6">
                  <div
                    className={`${
                      activeTab === "closed"
                        ? "flex justify-center"
                        : selectedPollObjects.length === 1
                          ? "grid grid-cols-1 max-w-md"
                          : selectedPollObjects.length === 2
                            ? "grid grid-cols-2"
                            : "grid grid-cols-3"
                    } gap-4`}
                  >
                    {selectedPollObjects.map((poll, index) =>
                      renderChart(poll, index),
                    )}
                  </div>
                </div>
              )}

              {/* Polls Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mx-4 mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead
                      style={{ backgroundColor: "#DCDCDC" }}
                      className="border-b border-gray-200"
                    >
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                          Topic
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                          Start Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                          End Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPolls &&
                        filteredPolls.map((poll) => (
                          <tr
                            key={poll.id}
                            className={`hover:bg-gray-50 transition-colors ${
                              activeTab === "closed" ? "cursor-pointer" : ""
                            } ${
                              activeTab === "closed" &&
                              selectedClosedPoll === poll.id
                                ? "bg-green-50 border-l-4 border-l-teal-600"
                                : ""
                            }`}
                            onClick={() =>
                              activeTab === "closed" &&
                              handleClosedPollSelection(poll.id)
                            }
                          >
                            <td className="px-4 py-2">
                              <div className="text-base font-medium text-black">
                                {poll.question}
                              </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                  poll.type === "anonymous"
                                    ? "bg-purple-100 text-purple-800 border-purple-200"
                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                }`}
                              >
                                {poll.type === "ANONYMOUS"
                                  ? "Anonymous"
                                  : "Open"}
                              </span>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <span
                                className="text-base text-black font-medium"
                                suppressHydrationWarning={true}
                              >
                                {new Date(poll.createdOn).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <span
                                className="text-base text-black font-medium"
                                suppressHydrationWarning={true}
                              >
                                {new Date(poll.endDate).toLocaleDateString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls - Only for Closed Polls */}
                {activeTab === "closed" && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
                    <div className="text-sm text-gray-700">
                      Page {closedPollPage} of {totalClosedPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleClosedPrevPage}
                        disabled={closedPollPage === 1}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleClosedNextPage}
                        disabled={closedPollPage === totalClosedPages}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close popover */}
      {showCreatePopover && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowCreatePopover(false)}
        ></div>
      )}
    </DashboardLayout>
  );
}
