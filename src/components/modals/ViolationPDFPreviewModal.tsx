"use client";

interface ViolationPDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: {
    communityName: string;
    date: string;
    propertyAddress: string;
    homeownerName: string;
    violationType: string;
    description: string;
    ccrsSection: string;
    dateObserved: string;
    timeObserved: string;
    reportedBy: string;
    evidence: File[];
  };
}

export default function ViolationPDFPreviewModal({
  isOpen,
  onClose,
  onConfirm,
  formData,
}: ViolationPDFPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Violation Notice Preview
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="bg-white p-12 shadow-sm max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#4A5568] mb-2">
                HOA General / Custom Violation Notice
              </h1>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-48">
                    Community Name:
                  </span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.communityName || "_________________________"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-48">Date:</span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.date || "_________________________"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-48">
                    Property Address:
                  </span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.propertyAddress || "_________________________"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-48">
                    Homeowner Name:
                  </span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.homeownerName || "_________________________"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#4A5568] mb-3">
                Subject: Notice of HOA Policy Violation
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                Dear [Homeowner Name],
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                This letter serves as formal notice that your property located
                at the address above is in violation of one or more sections of
                the community's Covenants, Conditions, and Restrictions (CC&Rs)
                and/or HOA Rules and Regulations. This form may be used for any
                custom or general violation observed by HOA administration.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#4A5568] mb-4">
                Violation Details:
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-56">
                    - Type of Violation:
                  </span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.violationType ||
                      "_________________________________"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-56">
                    - Description of Violation:
                  </span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.description ||
                      "_________________________________"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-56">
                    - Section of CC&Rs Violated:
                  </span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.ccrsSection ||
                      "_________________________________"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-56">
                    - Date Observed:
                  </span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.dateObserved || "_____________________"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-56">
                    - Time Observed:
                  </span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.timeObserved || "_____________________"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-56">
                    - Reported By (if applicable):
                  </span>
                  <span className="text-gray-900 border-b border-gray-300 flex-1">
                    {formData.reportedBy || "_____________________"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-56">
                    - Photographic / Witness Evidence (if applicable):
                  </span>
                  <span className="text-gray-900 flex-1">
                    {formData.evidence.map((file, index) => (
                      <span key={index}>{file.name}</span>
                    )) || "_____________________"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#4A5568] mb-4">
                Required Action:
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Please take corrective action to bring your property into
                compliance with the HOA's governing documents by [DATE]. Failure
                to correct this issue may result in:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>- Additional fines as outlined in HOA policy.</li>
                <li>- Suspension of privileges or access to common areas.</li>
                <li>
                  - Further enforcement or legal action as allowed by the CC&Rs.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#4A5568] mb-4">
                Additional Notes / Special Instructions (if any):
              </h2>
              <div className="space-y-3">
                <div className="border-b border-gray-300 h-6"></div>
                <div className="border-b border-gray-300 h-6"></div>
                <div className="border-b border-gray-300 h-6"></div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#4A5568] mb-4">
                Next Steps:
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                If you believe this notice was sent in error or have questions
                regarding the violation, please contact the HOA Office at:
              </p>
              <div className="space-y-2 text-sm ml-4">
                <div className="flex items-center space-x-2">
                  <i className="ri-mail-line text-blue-600"></i>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-900 border-b border-gray-300">
                    _________________
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-phone-line text-red-600"></i>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="text-gray-900 border-b border-gray-300">
                    _________________
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#4A5568] mb-4">
                Acknowledgment:
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-gray-700">
                    I acknowledge receipt of this notice.
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-gray-700">
                    I have corrected the violation.
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-gray-700">
                    I request an extension until: _________________
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex">
                <span className="font-medium text-gray-700 w-32">
                  Signature:
                </span>
                <span className="text-gray-900 border-b border-gray-300 flex-1">
                  _________________________
                </span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-32">Date:</span>
                <span className="text-gray-900 border-b border-gray-300 flex-1">
                  _________________________
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-300 space-y-3 text-sm">
              <div className="flex">
                <span className="font-medium text-gray-700 w-56">
                  HOA Representative Name:
                </span>
                <span className="text-gray-900 border-b border-gray-300 flex-1">
                  _________________________
                </span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-56">Title:</span>
                <span className="text-gray-900 border-b border-gray-300 flex-1">
                  _________________________
                </span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-56">Contact:</span>
                <span className="text-gray-900 border-b border-gray-300 flex-1">
                  _________________________
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-[#1FA372] text-white rounded-lg font-medium hover:bg-[#188f5f] transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-check-line mr-2"></i>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
