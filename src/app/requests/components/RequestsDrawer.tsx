
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

interface RequestsDrawerProps {
  request: Request;
  onClose: () => void;
}

export default function RequestsDrawer({ request, onClose }: RequestsDrawerProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'under review':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Request Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-close-line text-xl w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Request Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Type
            </label>
            <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
              {request.type}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
              {request.description}
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Details
            </label>
            <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
              {request.details}
            </div>
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                {request.priority}
              </span>
            </div>
          </div>

          {/* Submitted By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Submitted By
            </label>
            <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
              {request.submittedBy}
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned To
            </label>
            <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
              {request.assignedTo}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Submitted
            </label>
            <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
              {new Date(request.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <i className="ri-file-line text-gray-400 text-2xl mb-2 w-8 h-8 flex items-center justify-center mx-auto"></i>
                <div className="text-sm text-gray-500">No attachments</div>
              </div>
            </div>
          </div>

          {/* Comments/Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments
            </label>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500 italic">No comments yet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button className="flex-1 bg-[#1FA372] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1FA372]/90 transition-colors cursor-pointer whitespace-nowrap">
            Update Status
          </button>
          <button className="flex-1 border border-[#1FA372] text-[#1FA372] px-4 py-2 rounded-lg font-medium hover:bg-[#1FA372]/10 transition-colors cursor-pointer whitespace-nowrap">
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}
