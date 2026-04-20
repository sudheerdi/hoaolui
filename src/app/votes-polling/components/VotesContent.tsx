import { useEffect, useState } from "react";
import PollsTable from "./PollsTable";
import {
  useLazyGetPollsQuery,
  useSubmitPollVoteMutation,
} from "@/src/services/hoa-polls";

export default function VotesContent() {
  const [getPolls, { data: pollsData, isSuccess }] = useLazyGetPollsQuery();
  const [submitPollVote] = useSubmitPollVoteMutation();

  const [activeTab, setActiveTab] = useState<"DRAFT" | "closed">("DRAFT");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPollIds, setSelectedPollIds] = useState<string[]>([]); // Default first 3 polls selected for active
  const [selectedClosedPollId, setSelectedClosedPollId] = useState<string>(""); // Default first poll selected for closed
  const [currentPage, setCurrentPage] = useState(1);
  const [showVoteConfirm, setShowVoteConfirm] = useState<{
    pollId: string;
    option: string;
  } | null>(null);
  const [votedPolls, setVotedPolls] = useState<{ [key: string]: string }>({});
  const itemsPerPage = 5;

  const [activePolls, setActivePolls] = useState<Poll[]>([]);
  const [closedPolls, setClosedPolls] = useState<Poll[]>([]);

  const currentPolls = pollsData?.filter((poll) => poll.status === activeTab);

  const [selectedVoteOption, setSelectedVoteOption] = useState<string>("");

  // Get selected polls for display with error handling
  const getSelectedPolls = () => {
    try {
      if (activeTab === "DRAFT") {
        const selected = activePolls.filter((poll) =>
          selectedPollIds.includes(poll.id),
        );
        // Fallback to default selection if no polls found
        return selected.length > 0 ? selected : activePolls.slice(0, 3);
      } else {
        const selected = closedPolls
          .filter((poll) => poll.id === selectedClosedPollId)
          .slice(0, 1);
        // Fallback to first poll if no poll found
        return selected.length > 0 ? selected : closedPolls.slice(0, 1);
      }
    } catch (error) {
      console.error("Error getting selected polls:", error);
      return activeTab === "DRAFT"
        ? activePolls.slice(0, 3)
        : closedPolls.slice(0, 1);
    }
  };

  const filteredPolls = currentPolls
    ? currentPolls.filter(
        (poll) =>
          poll.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          poll.type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  // Pagination for closed polls with error handling
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPolls.length / itemsPerPage),
  );
  const startIndex = Math.max(0, (currentPage - 1) * itemsPerPage);
  const paginatedPolls = filteredPolls.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Circular gauge chart component with error handling
  const CircularGaugeChart = ({
    data,
    totalVotes,
  }: {
    data: { id: string; description: string; noOfVotes: 0; poll: null }[];
    totalVotes: number;
  }) => {
    try {
      const size = 160;
      const strokeWidth = 20;
      const radius = (size - strokeWidth) / 2;
      const circumference = 2 * Math.PI * radius;
      const colors = ["#1FA372", "#4CAF8F", "#7DBFA3"];

      let accumulatedPercentage = 0;

      return (
        <div className="flex flex-col items-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
              />

              {/* Progress segments */}
              {data.map((item, index) => {
                const segmentLength =
                  (item.noOfVotes / totalVotes) * circumference;
                const offset =
                  circumference - (accumulatedPercentage / 100) * circumference;
                accumulatedPercentage += (item.noOfVotes / totalVotes) * 100;

                return (
                  <circle
                    key={index}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={colors[index] || "#gray"}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${segmentLength} ${circumference}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-gray-900">
                {totalVotes || 0}
              </div>
              <div className="text-xs text-gray-900 font-semibold">
                Total Votes
              </div>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error rendering gauge chart:", error);
      return (
        <div className="text-center text-gray-900 font-semibold">
          Error loading chart
        </div>
      );
    }
  };

  const handlePollSelection = (pollId: string) => {
    try {
      if (activeTab === "DRAFT") {
        if (selectedPollIds.includes(pollId)) {
          // Prevent deselecting all polls - keep at least one selected
          if (selectedPollIds.length > 1) {
            setSelectedPollIds(selectedPollIds.filter((id) => id !== pollId));
          }
        } else {
          if (selectedPollIds.length < 3) {
            setSelectedPollIds([...selectedPollIds, pollId]);
          }
        }
      } else {
        setSelectedClosedPollId(pollId);
      }
    } catch (error) {
      console.error("Error handling poll selection:", error);
    }
  };

  const handleTabChange = (tab: "DRAFT" | "closed") => {
    try {
      setActiveTab(tab);
      if (tab === "DRAFT") {
        setSelectedPollIds(
          pollsData
            ? pollsData
                .filter((poll) => poll.status === "DRAFT")
                .slice(0, 3)
                .map((poll) => poll.id)
            : [],
        );
      } else {
        setSelectedClosedPollId(
          pollsData
            ? pollsData
                .filter((poll) => poll.status === "closed")
                .slice(0, 1)
                .map((poll) => poll.id)[0] || ""
            : "",
        );
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error handling tab change:", error);
    }
  };

  const handlePageChange = (page: number) => {
    try {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error handling page change:", error);
    }
  };

  const handleVoteClick = (
    pollId: string,
    option: string,
    optionId: string,
  ) => {
    setSelectedVoteOption(optionId);
    if (votedPolls[pollId]) return; // Already voted
    setShowVoteConfirm({ pollId, option });
  };

  const handleSubmitVote = async () => {
    try {
      await submitPollVote(selectedVoteOption).unwrap();
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const confirmVote = () => {
    if (showVoteConfirm) {
      setVotedPolls((prev) => ({
        ...prev,
        [showVoteConfirm.pollId]: showVoteConfirm.option,
      }));
      setShowVoteConfirm(null);
    }
    handleSubmitVote();
  };

  const cancelVote = () => {
    setShowVoteConfirm(null);
  };

  const handleGetPolls = async () => {
    const polls = await getPolls().unwrap();
    const pollsWithTotalVotes = polls.map((poll) => ({
      ...poll,
      totalVotes: poll.options.reduce(
        (sum, option) => sum + option.noOfVotes,
        0,
      ),
    }));
    setActivePolls(
      pollsWithTotalVotes.filter((poll) => poll.status === "DRAFT"),
    );
    setClosedPolls(
      pollsWithTotalVotes.filter((poll) => poll.status === "closed"),
    );
    setSelectedPollIds(
      pollsWithTotalVotes
        .filter((poll) => poll.status === "DRAFT")
        .slice(0, 3)
        .map((poll) => poll.id),
    );
    setSelectedClosedPollId(
      pollsWithTotalVotes
        .filter((poll) => poll.status === "closed")
        .slice(0, 1)
        .map((poll) => poll.id)[0] || "",
    );
  };

  useEffect(() => {
    handleGetPolls();
  }, []);

  return (
    <div className="flex-1 p-1 flex flex-col overflow-hidden">
      {/* Poll Cards */}
      <div
        className={`grid gap-2 mb-2 flex-shrink-0 ${getSelectedPolls().length === 1 ? "grid-cols-1" : getSelectedPolls().length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
      >
        {getSelectedPolls().map((poll) => (
          <div
            key={poll.id}
            className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col"
            style={{ minHeight: "380px" }}
          >
            <h3 className="font-medium text-gray-900 mb-4 text-sm text-center min-h-[40px] leading-tight">
              {poll.question}
            </h3>

            <div className="flex items-center gap-4 flex-1">
              {/* Chart - Left Side - Centered */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <CircularGaugeChart
                  data={poll.options}
                  totalVotes={poll.totalVotes}
                />
              </div>

              {/* Voting Options - Right Side */}
              <div className="flex-1 space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Vote for an option:
                </h4>

                {poll.options.map((option, index) => {
                  const colors = ["#1FA372", "#4CAF8F", "#7DBFA3"];
                  const isVoted = votedPolls[poll.id] === option.id;
                  const isPollVoted = !!votedPolls[poll.id];
                  const isActive = activeTab === "DRAFT";

                  return (
                    <div key={index} className="space-y-1">
                      {/* Radio Button Option */}
                      <label
                        className={`flex items-center space-x-2 p-2 rounded-lg border transition-colors cursor-pointer ${
                          isVoted
                            ? "bg-green-50 border-green-200"
                            : isPollVoted || !isActive
                              ? "bg-gray-50 border-gray-200 cursor-not-allowed opacity-60"
                              : "hover:bg-gray-50 border-gray-200"
                        }`}
                        onClick={() =>
                          isActive &&
                          !isPollVoted &&
                          handleVoteClick(
                            poll.id,
                            option.description,
                            option.id,
                          )
                        }
                      >
                        <input
                          type="radio"
                          name={`poll-${poll.id}`}
                          checked={isVoted}
                          disabled={isPollVoted || !isActive}
                          className="w-4 h-4 text-[#1FA372] focus:ring-[#1FA372] cursor-pointer"
                          readOnly
                        />
                        <span className="text-sm text-gray-900 font-medium flex-1">
                          {option.description}
                        </span>
                        {isVoted && (
                          <i className="ri-check-line text-green-600 w-4 h-4 flex items-center justify-center"></i>
                        )}
                      </label>

                      {/* Percentage Bar */}
                      <div className="ml-6">
                        <div className="flex items-center justify-between text-xs text-gray-900 font-semibold mb-1">
                          <span>
                            {(option.noOfVotes / poll.totalVotes) * 100}%
                          </span>
                          <span>{option.noOfVotes} votes</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(option.noOfVotes / poll.totalVotes) * 100}%`,
                              backgroundColor: colors[index] || "#gray",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {votedPolls[poll.id] && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <i className="ri-check-circle-line text-green-600 w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-sm text-green-800 font-semibold">
                        You voted for: {votedPolls[poll.id]}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vote Confirmation Modal */}
      {showVoteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Your Vote
            </h3>
            <p className="text-gray-900 font-medium mb-6">
              Are you sure you want to vote for "{showVoteConfirm.option}"?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={confirmVote}
                className="flex-1 bg-[#1FA372] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1A8C62] transition-colors whitespace-nowrap cursor-pointer"
              >
                Yes, Vote
              </button>
              <button
                onClick={cancelVote}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E2E2] flex flex-col flex-1 min-h-0">
        {/* Tabs and Search */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex space-x-1">
            <button
              onClick={() => handleTabChange("DRAFT")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                activeTab === "DRAFT"
                  ? "bg-[#1FA372] text-white"
                  : "text-gray-900 font-semibold hover:text-gray-900"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => handleTabChange("closed")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                activeTab === "closed"
                  ? "bg-[#1FA372] text-white"
                  : "text-gray-900 font-semibold hover:text-gray-900"
              }`}
            >
              Closed
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value || "")}
              className="text-sm border border-gray-300 rounded px-3 py-2 pl-8 w-64"
            />
            <i className="ri-search-line absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"></i>
          </div>
        </div>

        {/* Table with fixed height and scroll */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <PollsTable
            polls={activeTab === "DRAFT" ? filteredPolls : paginatedPolls}
            selectedPollIds={
              activeTab === "DRAFT" ? selectedPollIds : [selectedClosedPollId]
            }
            onPollClick={handlePollSelection}
            activeTab={activeTab}
          />
        </div>

        {/* Pagination for closed polls */}
        {activeTab === "closed" && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 flex-shrink-0">
            <div className="text-sm text-gray-900 font-semibold">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredPolls.length)} of{" "}
              {filteredPolls.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-sm border rounded cursor-pointer ${
                      currentPage === page
                        ? "bg-[#1FA372] text-white border-[#1FA372]"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
