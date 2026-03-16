
interface Request {
  id: number;
  type: string;
  description: string;
  date: string;
  status: string;
  priority: string;
  submittedBy: string;
  assignedTo: string;
  details: string;
}

interface RequestsTableProps {
  requests: Request[];
  onRequestClick: (request: Request) => void;
  selectedRequestId?: number | null;
}

export default function RequestsTable({ requests, onRequestClick, selectedRequestId }: RequestsTableProps) {
  const getStatusColor = (status: string) => {
    if (status === 'Completed' || status === 'Approved') {
      return 'bg-[#1FA372]/10 text-[#1FA372]';
    } else if (status === 'In Progress' || status === 'Under Review') {
      return 'bg-[#1FA372]/20 text-[#1FA372]';
    } else {
      return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#DCDCDC]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-black">Type</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-black">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-black">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-black">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {requests.map((request) => (
            <tr
              key={request.id}
              onClick={() => onRequestClick(request)}
              className={`cursor-pointer transition-colors ${
                selectedRequestId === request.id
                  ? 'bg-[#1FA372]/5 border-l-4 border-l-[#1FA372]'
                  : 'hover:bg-gray-50'
              }`}
            >
              <td className="px-6 py-4 text-sm text-black font-medium">{request.type}</td>
              <td className="px-6 py-4 text-sm text-black font-medium">{request.description}</td>
              <td className="px-6 py-4 text-sm text-black font-medium">{request.date}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
