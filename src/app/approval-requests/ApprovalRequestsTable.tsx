'use client';

import { useState } from 'react';

interface ApprovalRequest {
  id: string;
  memberName: string;
  requestType: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  address: string;
}

interface ApprovalRequestsTableProps {
  requests: ApprovalRequest[];
  onViewDetails: (request: ApprovalRequest) => void;
  selectedRequest: ApprovalRequest | null;
  activeTab: 'open' | 'closed';
}

export default function ApprovalRequestsTable({ requests, onViewDetails, selectedRequest, activeTab }: ApprovalRequestsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(requests.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRequests = requests.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const getStatusChip = (status: string) => {
    if (status === 'approved') {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          Approved
        </span>
      );
    } else if (status === 'rejected') {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          Rejected
        </span>
      );
    }
    return null;
  };

  if (requests.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-file-list-3-line text-3xl text-gray-400"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
        <p className="text-gray-500">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#DCDCDC' }} className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">Name</th>
              <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">Request Type</th>
              <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">Address</th>
              <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">Date</th>
              {activeTab === 'closed' && (
                <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">Status</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRequests.map((request) => (
              <tr
                key={request.id}
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedRequest?.id === request.id ? 'bg-teal-50 border-l-4 border-teal-500' : ''
                }`}
                onClick={() => onViewDetails(request)}
              >
                <td className="px-4 py-3 text-base font-medium text-black">{request.memberName}</td>
                <td className="px-4 py-3 text-base font-medium text-black">{request.requestType}</td>
                <td className="px-4 py-3 text-base font-medium text-black">{request.address}</td>
                <td className="px-4 py-3 text-base font-medium text-black" suppressHydrationWarning={true}>{new Date(request.date).toLocaleDateString()}</td>
                {activeTab === 'closed' && (
                  <td className="px-4 py-3">
                    {getStatusChip(request.status)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer pr-8"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {startIndex + 1}-{Math.min(endIndex, requests.length)} of {requests.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
