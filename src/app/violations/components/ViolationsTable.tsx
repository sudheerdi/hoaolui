interface ViolationsTableProps {
  violations: any[];
  onRowClick: (violation: any) => void;
  onAcknowledgementClick: (violation: any) => void;
  isResolved: boolean;
  selectedViolationId?: number | null;
}

export default function ViolationsTable({
  violations,
  onRowClick,
  onAcknowledgementClick,
  isResolved,
  selectedViolationId,
}: ViolationsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#DCDCDC]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-black">
              Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-black">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-black">
              Action
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-black">
              Issued
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {violations.map((violation) => (
            <tr
              key={violation.id}
              onClick={() => onRowClick(violation)}
              className={`cursor-pointer transition-colors ${
                selectedViolationId === violation.id
                  ? "bg-green-50 border-l-4 border-l-[#1FA372]"
                  : "hover:bg-gray-50"
              }`}
            >
              <td className="px-6 py-4 text-sm text-black font-medium">
                {violation.type}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                    <div
                      className="bg-[#1FA372] h-2 rounded-full transition-all"
                      style={{ width: `${violation.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-black font-medium whitespace-nowrap">
                    {violation.progress}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                {isResolved ? (
                  <span className="text-sm text-black font-medium">
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAcknowledgementClick(violation);
                    }}
                    className="text-sm text-[#1FA372] hover:text-[#1A8C62] hover:underline cursor-pointer font-medium"
                  >
                    Acknowledgement
                  </button>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-black font-medium">
                {new Date(violation.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
