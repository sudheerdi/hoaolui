import React from "react";

interface PollsTableProps {
  polls: Poll[];
  selectedPollIds: string[];
  onPollClick: (pollId: string) => void;
  activeTab: "DRAFT" | "closed";
}

export default function PollsTable({
  polls,
  selectedPollIds,
  onPollClick,
  activeTab,
}: PollsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Topic
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              End Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {polls.map((poll) => (
            <tr
              key={poll.id}
              onClick={() => onPollClick(poll.id)}
              className={`cursor-pointer transition-colors ${
                selectedPollIds.includes(poll.id)
                  ? "bg-green-50 border-l-4 border-l-[#4D8555]"
                  : "hover:bg-gray-50"
              }`}
            >
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                {poll.question}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                {poll.type}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                {poll.createdOn}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                {poll.endDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
