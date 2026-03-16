"use client";
import { useState } from "react";

const requestsData = [
  {
    id: 1,
    requestType: "Maintenance Request",
    description: "Repair broken fence in backyard area",
    date: "2024-01-20",
    status: "In Progress",
    priority: "High",
    assignedTo: "John Smith",
    estimatedCompletion: "2024-01-25",
    notes:
      "Fence panels damaged during recent storm. Requires immediate attention for security purposes.",
  },
  {
    id: 2,
    requestType: "Architectural Request",
    description: "Install new patio cover and outdoor lighting",
    date: "2024-01-18",
    status: "Under Review",
    priority: "Medium",
    assignedTo: "Sarah Johnson",
    estimatedCompletion: "2024-02-05",
    notes:
      "Architectural review board will assess the design plans. Approval expected within 2 weeks.",
  },
  {
    id: 3,
    requestType: "Pool Access",
    description: "Request additional pool access cards for family",
    date: "2024-01-15",
    status: "Approved",
    priority: "Low",
    assignedTo: "Mike Davis",
    estimatedCompletion: "2024-01-22",
    notes:
      "Two additional access cards approved. Ready for pickup at the front office.",
  },
];

export default function RequestsCard() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [modalRequest, setModalRequest] = useState<
    (typeof requestsData)[0] | null
  >(null);

  const handleRowClick = (request: (typeof requestsData)[0]) => {
    setModalRequest(request);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-[#FF8C42]";
      case "Under Review":
        return "text-[#1FA372]";
      case "Approved":
        return "text-[#1FA372]";
      default:
        return "text-black";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-[#FF8C42]";
      case "Low":
        return "text-[#1FA372]";
      default:
        return "text-black";
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-black">Requests</h3>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <i className="ri-search-line text-2xl text-black"></i>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-base font-semibold text-black">
                  Request Type
                </th>
                <th className="text-left py-3 px-4 text-base font-semibold text-black">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-base font-semibold text-black">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {requestsData.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(request)}
                >
                  <td className="py-4 px-4">
                    <span className="text-base font-medium text-black">
                      {request.requestType}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-base text-black">
                      {request.description}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-base text-black">{request.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && modalRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-black">
                {modalRequest.requestType}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl text-black"></i>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="text-sm font-semibold text-black/60 mb-1">
                  Description
                </p>
                <p className="text-base text-black">
                  {modalRequest.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Status
                  </p>
                  <p
                    className={`text-base font-medium ${getStatusColor(modalRequest.status)}`}
                  >
                    {modalRequest.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Priority
                  </p>
                  <p
                    className={`text-base font-medium ${getPriorityColor(modalRequest.priority)}`}
                  >
                    {modalRequest.priority}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Submitted Date
                  </p>
                  <p className="text-base text-black">{modalRequest.date}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Est. Completion
                  </p>
                  <p className="text-base text-black">
                    {modalRequest.estimatedCompletion}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-black/60 mb-1">
                  Assigned To
                </p>
                <p className="text-base font-medium text-black">
                  {modalRequest.assignedTo}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-black/60 mb-1">
                  Notes
                </p>
                <p className="text-base text-black">{modalRequest.notes}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-base font-medium text-black hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
