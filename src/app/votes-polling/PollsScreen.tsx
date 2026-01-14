"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import UserProfile from "../../components/UserProfile";
import { useCreatePollMutation } from "@/src/services";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { useAppDispatch } from "@/src/lib/hooks";
import { setNotification } from "@/src/reducer/hoa-notificatio.reducer";

// Interface definition for Poll
interface Poll {
  id: string;
  title: string;
  type: "anonymous" | "open";
  status: "active" | "closed";
  totalVotes: number;
  createdDate: string;
  endDate: string;
  options: {
    text: string;
    votes: number;
    percentage: number;
  }[];
}

interface PollOption {
  id: string;
  text: string;
}

interface PollData {
  question: string;
  options: PollOption[];
  type: "ANONYMOUS" | "OPEN";
  endDate: string;
  description: string;
}

export default function PollsScreen() {
  const dispatch = useAppDispatch();

  const [createPoll] = useCreatePollMutation();
  // Original state variables
  const [selectedPolls, setSelectedPolls] = useState<string[]>([]);
  const [selectedClosedPoll, setSelectedClosedPoll] =
    useState<string>("POLL-004");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  // New state variables from modified content
  const [activeTab, setActiveTab] = useState<"active" | "closed">("active");
  const [closedPollPage, setClosedPollPage] = useState(1);

  // Create poll popover state
  const [showCreatePopover, setShowCreatePopover] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pollData, setPollData] = useState<PollData>({
    question: "",
    options: [
      { id: "1", text: "" },
      { id: "2", text: "" },
    ],
    type: "ANONYMOUS",
    endDate: "",
    description: "",
  });

  // Mock data for polls
  const mockPolls: Poll[] = [
    {
      id: "POLL-001",
      title:
        "Should we install new playground equipment in the community park?",
      type: "open",
      status: "active",
      totalVotes: 127,
      createdDate: "2024-01-15",
      endDate: "2024-01-30",
      options: [
        { text: "Yes, install new equipment", votes: 89, percentage: 70 },
        { text: "No, keep current equipment", votes: 25, percentage: 20 },
        { text: "Repair existing equipment first", votes: 13, percentage: 10 },
      ],
    },
    {
      id: "POLL-002",
      title: "What time should the community pool close during weekdays?",
      type: "anonymous",
      status: "active",
      totalVotes: 94,
      createdDate: "2024-01-12",
      endDate: "2024-01-25",
      options: [
        { text: "8:00 PM", votes: 42, percentage: 45 },
        { text: "9:00 PM", votes: 35, percentage: 37 },
        { text: "10:00 PM", votes: 17, percentage: 18 },
      ],
    },
    {
      id: "POLL-003",
      title: "Which community event would you like to see this summer?",
      type: "open",
      status: "active",
      totalVotes: 156,
      createdDate: "2024-01-05",
      endDate: "2024-01-20",
      options: [
        { text: "BBQ & Music Festival", votes: 78, percentage: 50 },
        { text: "Movie Night Under Stars", votes: 47, percentage: 30 },
        { text: "Sports Tournament", votes: 31, percentage: 20 },
      ],
    },
    {
      id: "POLL-004",
      title: "Should we implement a new guest parking policy?",
      type: "anonymous",
      status: "closed",
      totalVotes: 73,
      createdDate: "2024-01-10",
      endDate: "2024-01-28",
      options: [
        { text: "Yes, limit to 2 hours", votes: 38, percentage: 52 },
        { text: "Yes, require permits", votes: 22, percentage: 30 },
        { text: "No, keep current policy", votes: 13, percentage: 18 },
      ],
    },
    {
      id: "POLL-005",
      title: "What improvements should we prioritize for the clubhouse?",
      type: "open",
      status: "closed",
      totalVotes: 112,
      createdDate: "2023-12-28",
      endDate: "2024-01-15",
      options: [
        { text: "Kitchen renovation", votes: 56, percentage: 50 },
        { text: "New furniture", votes: 34, percentage: 30 },
        { text: "Audio/Visual upgrades", votes: 22, percentage: 20 },
      ],
    },
    {
      id: "POLL-006",
      title: "Should we allow food trucks in the community on weekends?",
      type: "anonymous",
      status: "closed",
      totalVotes: 89,
      createdDate: "2024-01-08",
      endDate: "2024-01-22",
      options: [
        { text: "Yes, every weekend", votes: 45, percentage: 51 },
        { text: "Yes, once a month", votes: 31, percentage: 35 },
        { text: "No, not allowed", votes: 13, percentage: 14 },
      ],
    },
  ];

  // Filter polls based on active tab (active or closed)
  const filteredPolls = mockPolls.filter((poll) =>
    activeTab === "active" ? poll.status === "active" : poll.status === "closed"
  );

  // Get selected poll objects - show first 3 for active, selected one for closed
  const selectedPollObjects =
    activeTab === "active"
      ? filteredPolls.slice(0, 3)
      : filteredPolls.filter((poll) => poll.id === selectedClosedPoll);

  // Closed polls pagination - Updated to show 3 rows per page
  const closedPollsPerPage = 3;
  const totalClosedPages = Math.ceil(filteredPolls.length / closedPollsPerPage);
  const closedStartIndex = (closedPollPage - 1) * closedPollsPerPage;
  const closedEndIndex = closedStartIndex + closedPollsPerPage;
  const currentClosedPolls =
    activeTab === "closed"
      ? filteredPolls.slice(closedStartIndex, closedEndIndex)
      : [];

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

  const handleTabChange = (tab: "active" | "closed") => {
    setActiveTab(tab);
    setClosedPollPage(1);
    // Set default selections based on tab
    if (tab === "active") {
      setSelectedPolls([]);
    } else {
      setSelectedClosedPoll("POLL-004");
    }
  };

  const handleClosedPollSelection = (pollId: string) => {
    setSelectedClosedPoll(pollId);
  };

  // Poll creation functions
  const addOption = () => {
    const newOption: PollOption = {
      id: Date.now().toString(),
      text: "",
    };
    setPollData((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
  };

  const removeOption = (id: string) => {
    if (pollData.options.length > 2) {
      setPollData((prev) => ({
        ...prev,
        options: prev.options.filter((option) => option.id !== id),
      }));
    }
  };

  const updateOption = (id: string, text: string) => {
    setPollData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === id ? { ...option, text } : option
      ),
    }));
  };

  const handleSubmit = async () => {
    try {
      const requestParams = {
        question: pollData.question,
        type: pollData.type,
        description: pollData.description,
      };
      await createPoll(requestParams);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowCreatePopover(false);
        resetForm();
      }, 2000);
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error?.data.error,
        })
      );
    }
  };

  const resetForm = () => {
    setPollData({
      question: "",
      options: [
        { id: "1", text: "" },
        { id: "2", text: "" },
      ],
      type: "ANONYMOUS",
      endDate: "",
      description: "",
    });
  };

  const isFormValid = () => {
    return (
      pollData.question.trim().length > 0 &&
      pollData.options.every((option) => option.text.trim().length > 0) &&
      pollData.endDate.length > 0
    );
  };

  const renderChart = (poll: Poll, index: number) => {
    const colors = ["#14b8a6", "#3b82f6", "#8b5cf6", "#f59e0b"];

    return (
      <div
        key={poll.id}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-medium text-black">{poll.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-black font-medium">{poll.id}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  poll.type === "anonymous"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {poll.type === "anonymous" ? "Anonymous" : "Open"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-teal-600">
              {poll.totalVotes}
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
                cumulativePercentage += option.percentage;

                const totalArcLength = 251.2;
                const startOffset = (startPercentage / 100) * totalArcLength;
                const segmentLength =
                  (option.percentage / 100) * totalArcLength;

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
              {poll.totalVotes}
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
                  {option.text}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-black">
                  {option.percentage}%
                </span>
                <span className="text-sm text-black font-medium">
                  {option.votes}
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

                {/* Create Poll Popover */}
                {showCreatePopover && (
                  <div className="absolute top-full right-0 mt-2 w-[900px] bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    {showSuccess ? (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="ri-check-line text-2xl text-green-600"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Poll Created Successfully!
                        </h3>
                        <p className="text-gray-600">
                          Your poll has been published and is now live for
                          community voting.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                              Create Poll
                            </h2>
                            <button
                              onClick={() => setShowCreatePopover(false)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                              <i className="ri-close-line text-xl"></i>
                            </button>
                          </div>
                        </div>

                        {/* Poll Type Selection */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="grid grid-cols-2 gap-3">
                            <div
                              onClick={() =>
                                setPollData((prev) => ({
                                  ...prev,
                                  type: "ANONYMOUS",
                                }))
                              }
                              className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                                pollData.type === "ANONYMOUS"
                                  ? "border-teal-500 bg-teal-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                    pollData.type === "ANONYMOUS"
                                      ? "border-teal-500 bg-teal-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {pollData.type === "ANONYMOUS" && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">
                                    Anonymous
                                  </h4>
                                  <p className="text-xs text-gray-600">
                                    Voters' identities are hidden
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div
                              onClick={() =>
                                setPollData((prev) => ({
                                  ...prev,
                                  type: "OPEN",
                                }))
                              }
                              className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                                pollData.type === "OPEN"
                                  ? "border-teal-500 bg-teal-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                    pollData.type === "OPEN"
                                      ? "border-teal-500 bg-teal-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {pollData.type === "OPEN" && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">
                                    Open
                                  </h4>
                                  <p className="text-xs text-gray-600">
                                    Voters' identities are visible
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Left Column - Poll Question & Description */}
                            <div className="space-y-4">
                              {/* Poll Question */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Poll Question *
                                </label>
                                <textarea
                                  value={pollData.question}
                                  onChange={(e) =>
                                    setPollData((prev) => ({
                                      ...prev,
                                      question: e.target.value,
                                    }))
                                  }
                                  placeholder="Enter your poll question..."
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                  rows={3}
                                />
                              </div>

                              {/* Description */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Description (Optional)
                                </label>
                                <textarea
                                  value={pollData.description}
                                  onChange={(e) =>
                                    setPollData((prev) => ({
                                      ...prev,
                                      description: e.target.value,
                                    }))
                                  }
                                  placeholder="Add additional context or details..."
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                  rows={2}
                                />
                              </div>

                              {/* End Date */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  End Date *
                                </label>
                                <input
                                  type="date"
                                  value={pollData.endDate}
                                  onChange={(e) =>
                                    setPollData((prev) => ({
                                      ...prev,
                                      endDate: e.target.value,
                                    }))
                                  }
                                  min={new Date().toISOString().split("T")[0]}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                              </div>
                            </div>

                            {/* Right Column - Poll Options */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Poll Options *
                              </label>
                              <p className="text-xs text-gray-500 mb-3">
                                Add at least 2 options for your poll
                              </p>

                              <div className="space-y-2">
                                {pollData.options.map((option, index) => (
                                  <div
                                    key={option.id}
                                    className="flex items-baseline space-x-2"
                                  >
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                      <span className="text-xs font-medium text-gray-600">
                                        {index + 1}
                                      </span>
                                    </div>
                                    <textarea
                                      value={option.text}
                                      onChange={(e) =>
                                        updateOption(option.id, e.target.value)
                                      }
                                      placeholder={`Option ${index + 1}`}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                      rows={3}
                                    />

                                    {pollData.options.length > 2 && (
                                      <button
                                        onClick={() => removeOption(option.id)}
                                        className="w-7 h-7 flex items-center justify-center text-red-500 hover:text-red-700 cursor-pointer"
                                      >
                                        <i className="ri-delete-bin-line text-sm"></i>
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>

                              {pollData.options.length < 6 && (
                                <button
                                  onClick={addOption}
                                  className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-teal-500 hover:text-teal-600 transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  <i className="ri-add-line mr-1"></i>
                                  Add Options
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-200">
                          <div className="flex items-center justify-end space-x-3">
                            <button
                              onClick={() => setShowCreatePopover(false)}
                              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSubmit}
                              disabled={!isFormValid()}
                              className={`px-6 py-2 text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                                isFormValid()
                                  ? "bg-[#1FA372] text-white hover:bg-[#1a8d63]"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              <i className="ri-send-plane-line mr-2"></i>
                              Create Poll
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
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
                  onClick={() => handleTabChange("active")}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === "active"
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
              {selectedPollObjects.length > 0 && (
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
                      renderChart(poll, index)
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
                      {(activeTab === "active"
                        ? filteredPolls
                        : currentClosedPolls
                      ).map((poll) => (
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
                              {poll.title}
                            </div>
                            <div className="text-sm text-black font-medium">
                              {poll.id}
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
                              {poll.type === "anonymous" ? "Anonymous" : "Open"}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <span
                              className="text-base text-black font-medium"
                              suppressHydrationWarning={true}
                            >
                              {new Date(poll.createdDate).toLocaleDateString()}
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
