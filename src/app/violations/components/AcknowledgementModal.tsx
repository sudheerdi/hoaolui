import { useState } from 'react';

interface AcknowledgementModalProps {
  violation: any;
  onClose: () => void;
}

export default function AcknowledgementModal({ violation, onClose }: AcknowledgementModalProps) {
  const [formData, setFormData] = useState({
    receiptAcknowledged: false,
    violationCorrected: false,
    extensionRequested: false,
    extensionDate: '',
    signature: '',
    date: '',
    document: null as File | null
  });

  const handleSubmit = () => {
    console.log('Acknowledgement submitted:', formData);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-lg shadow-xl w-[420px] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between rounded-t-lg">
            <h3 className="text-base font-semibold text-black">Acknowledgement</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="receipt"
                  checked={formData.receiptAcknowledged}
                  onChange={(e) =>
                    setFormData({ ...formData, receiptAcknowledged: e.target.checked })
                  }
                  className="mt-0.5 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="receipt" className="text-sm text-black cursor-pointer">
                  I acknowledge receipt of this notice.
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="corrected"
                  checked={formData.violationCorrected}
                  onChange={(e) =>
                    setFormData({ ...formData, violationCorrected: e.target.checked })
                  }
                  className="mt-0.5 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="corrected" className="text-sm text-black cursor-pointer">
                  I have corrected the violation.
                </label>
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="extension"
                    checked={formData.extensionRequested}
                    onChange={(e) =>
                      setFormData({ ...formData, extensionRequested: e.target.checked })
                    }
                    className="mt-0.5 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="extension" className="text-sm text-black cursor-pointer">
                    I request an extension until:
                  </label>
                </div>
                {formData.extensionRequested && (
                  <input
                    type="date"
                    value={formData.extensionDate}
                    onChange={(e) =>
                      setFormData({ ...formData, extensionDate: e.target.value })
                    }
                    className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 ml-6"
                  />
                )}
              </div>
            </div>

            {/* Signature and Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">
                  Signature / Initials
                </label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded px-3 py-1.5"
                  placeholder="Enter signature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 bg-gray-50"
                  placeholder="dd-mm-yyyy"
                />
              </div>
            </div>

            {/* Note */}
            <div className="text-xs text-black/60 italic bg-gray-50 p-3 rounded">
              *Please add your signature / Initials near the signature. If you do not wish to
              sign electronically, you may upload a manually signed copy.*
            </div>

            {/* Document Upload */}
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50">
                <input
                  type="file"
                  id="document-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFormData({ ...formData, document: file });
                  }}
                />
                <label htmlFor="document-upload" className="cursor-pointer">
                  <p className="text-sm text-black/70">
                    {formData.document ? formData.document.name : 'Please upload Document manually'}
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-5 py-3 flex justify-end space-x-3 rounded-b-lg">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm border border-gray-300 rounded-lg text-black hover:bg-gray-50 cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-sm bg-[#1FA372] text-white rounded-lg hover:bg-[#1A8C62] cursor-pointer whitespace-nowrap"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}