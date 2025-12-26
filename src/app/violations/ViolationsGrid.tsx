import { useState } from 'react';

interface Violation {
  id: number;
  type: string;
  description: string;
  unit: string;
  resident: string;
  date: string;
  status: 'open' | 'resolved' | 'pending';
  severity: 'high' | 'medium' | 'low';
  image?: string;
}

interface ViolationsGridProps {
  violations: Violation[];
  onViolationClick: (violation: Violation) => void;
}

export default function ViolationsGrid({ violations, onViolationClick }: ViolationsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(violations.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentViolations = violations.slice(startIndex, endIndex);

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

  const getStatusDisplay = (status: string) => {
    if (status === 'open') {
      return (
        <div className="w-full bg-red-100 rounded-full h-2">
          <div className="bg-red-400 h-2 rounded-full w-3/12"></div>
        </div>
      );
    } else if (status === 'pending') {
      return (
        <div className="w-full bg-orange-100 rounded-full h-2">
          <div className="bg-orange-400 h-2 rounded-full w-7/12"></div>
        </div>
      );
    } else {
      return (
        <div className="w-full bg-green-100 rounded-full h-2">
          <div className="bg-green-400 h-2 rounded-full w-full"></div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#DCDCDC' }} className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#000000' }}>Violation ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#000000' }}>Property</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#000000' }}>Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#000000' }}>Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#000000' }}>Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#000000' }}>Priority</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#000000' }}>Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentViolations.map((violation) => (
              <tr 
                key={violation.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onViolationClick(violation)}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{violation.type}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{violation.description}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{violation.unit}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{violation.resident}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{violation.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    violation.severity === 'high' ? 'bg-red-100 text-red-700' :
                    violation.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {violation.severity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {getStatusDisplay(violation.status)}
                </td>
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
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {startIndex + 1}-{Math.min(endIndex, violations.length)} of {violations.length}
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