import { useState } from 'react';

interface SendRequestModalProps {
  onClose: () => void;
}

export default function SendRequestModal({ onClose }: SendRequestModalProps) {
  const [selectedType, setSelectedType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ selectedType, title, description, attachment });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[700px] max-h-[500px] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Send Request</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-close-line text-2xl w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {/* Request Type - Horizontal Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Request Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="requestType"
                    value="general"
                    checked={selectedType === 'general'}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-4 h-4 text-[#1FA372] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">General Requests</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="requestType"
                    value="architectural"
                    checked={selectedType === 'architectural'}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-4 h-4 text-[#1FA372] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">Architectural Requests</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="requestType"
                    value="reserve"
                    checked={selectedType === 'reserve'}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-4 h-4 text-[#1FA372] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">Reserve</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="requestType"
                    value="maintenance"
                    checked={selectedType === 'maintenance'}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-4 h-4 text-[#1FA372] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">Unit Maintenance</span>
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-sm w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent"
                placeholder="Enter request title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="text-sm w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent resize-none"
                placeholder="Enter request description"
                required
              />
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachment
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="file-upload"
                  onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <i className="ri-upload-cloud-line text-gray-400 text-3xl mb-2 w-8 h-8 flex items-center justify-center"></i>
                  <span className="text-sm text-gray-600">
                    {attachment ? attachment.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX, JPG, PNG (max. 10MB)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#1FA372] text-white rounded-lg font-medium hover:bg-[#1A8C62] transition-colors cursor-pointer whitespace-nowrap"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
