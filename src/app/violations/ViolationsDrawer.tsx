interface ViolationsDrawerProps {
  violation: any;
  onClose: () => void;
}

export default function ViolationsDrawer({ violation, onClose }: ViolationsDrawerProps) {
  return (
    <div className="h-full bg-white border-l border-gray-200 shadow-lg flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Violation Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 cursor-pointer w-6 h-6 flex items-center justify-center"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {/* Status Badge */}
          <div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              violation.status === 'Resolved'
                ? 'bg-green-100 text-green-800'
                : violation.status === 'In Progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {violation.status}
            </span>
          </div>

          {/* Violation Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Violation Type</h3>
            <p className="text-base text-gray-900">{violation.type}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
            <p className="text-base text-gray-900">{violation.description}</p>
          </div>

          {/* Progress */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Progress</h3>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#1FA372] h-2 rounded-full transition-all"
                  style={{ width: `${violation.progress}%` }}
                ></div>
              </div>
              <span className="text-sm text-black font-medium whitespace-nowrap">
                {violation.progress}%
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Issued Date</h3>
              <p className="text-base text-gray-900">{violation.issued}</p>
            </div>
            {violation.dueDate && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date</h3>
                <p className="text-base text-gray-900">{violation.dueDate}</p>
              </div>
            )}
            {violation.resolvedDate && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Resolved Date</h3>
                <p className="text-base text-gray-900">{violation.resolvedDate}</p>
              </div>
            )}
          </div>

          {/* Fine Amount */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Fine Amount</h3>
            <p className="text-lg font-semibold text-gray-900">{violation.fine}</p>
          </div>

          {/* Additional Information */}
          {violation.additionalInfo && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Additional Information</h3>
              <p className="text-base text-gray-900">{violation.additionalInfo}</p>
            </div>
          )}

          {/* Attachments */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Attachments</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <i className="ri-file-text-line text-gray-400 text-xl w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-sm text-gray-900">violation_notice.pdf</span>
                </div>
                <button className="text-[#4D8555] hover:text-[#3d6a44] cursor-pointer">
                  <i className="ri-download-line text-lg w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <i className="ri-image-line text-gray-400 text-xl w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-sm text-gray-900">evidence_photo.jpg</span>
                </div>
                <button className="text-[#4D8555] hover:text-[#3d6a44] cursor-pointer">
                  <i className="ri-download-line text-lg w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-5 py-3 flex justify-end space-x-3 rounded-b-r-lg">
        <button
          onClick={onClose}
          className="px-5 py-2 text-sm border border-gray-300 rounded-lg text-black hover:bg-gray-50 cursor-pointer whitespace-nowrap"
        >
          Cancel
        </button>
        <button
          onClick={() => {}}
          className="px-5 py-2 text-sm bg-[#1FA372] text-white rounded-lg hover:bg-[#1A8C62] cursor-pointer whitespace-nowrap"
        >
          Submit Acknowledgement
        </button>
      </div>
    </div>
  );
}
