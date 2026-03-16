"use client";
import { useState } from "react";

const violationsData = [
  {
    id: 1,
    type: "Parking Violation",
    progress: 75,
    action: "Acknowledgement",
    issued: "2024-01-15",
    description:
      "Vehicle parked in unauthorized area for extended period. Multiple warnings issued.",
    status: "In Progress",
    dueDate: "2024-02-15",
    fineAmount: "$150",
  },
  {
    id: 2,
    type: "Noise Complaint",
    progress: 40,
    action: "Acknowledgement",
    issued: "2024-01-10",
    description:
      "Excessive noise reported during late night hours. Violation of community quiet hours policy.",
    status: "Pending Response",
    dueDate: "2024-02-10",
    fineAmount: "$100",
  },
  {
    id: 3,
    type: "Pet Policy",
    progress: 20,
    action: "Acknowledgement",
    issued: "2024-01-08",
    description:
      "Unregistered pet observed on property. Pet registration required within 30 days.",
    status: "Action Required",
    dueDate: "2024-02-08",
    fineAmount: "$75",
  },
];

export default function ViolationsCard() {
  const [selectedType, setSelectedType] = useState("All types");
  const [selectedTime, setSelectedTime] = useState("All time");
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [showAcknowledgementModal, setShowAcknowledgementModal] =
    useState(false);
  const [selectedViolation, setSelectedViolation] = useState<
    (typeof violationsData)[0] | null
  >(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsViolation, setDetailsViolation] = useState<
    (typeof violationsData)[0] | null
  >(null);
  const [checkboxes, setCheckboxes] = useState({
    receipt: false,
    corrected: false,
    extension: false,
  });
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");

  const typeOptions = [
    "All types",
    "Parking Violation",
    "Noise Complaint",
    "Pet Policy",
  ];
  const timeOptions = [
    "All time",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
  ];

  const handleAcknowledgementClick = (
    violation: (typeof violationsData)[0],
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setSelectedViolation(violation);
    setShowAcknowledgementModal(true);
  };

  const handleRowClick = (violation: (typeof violationsData)[0]) => {
    setDetailsViolation(violation);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowAcknowledgementModal(false);
    setSelectedViolation(null);
    setCheckboxes({ receipt: false, corrected: false, extension: false });
    setSignature("");
    setDate("");
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Acknowledgement submitted:", {
      violation: selectedViolation,
      checkboxes,
      signature,
      date,
    });
    handleCloseModal();
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-black">Violations</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => {
                  setIsTypeOpen(!isTypeOpen);
                  setIsTimeOpen(false);
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg text-base font-medium text-black hover:border-[#1FA372] transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                {selectedType}
                <i className="ri-arrow-down-s-line text-lg"></i>
              </button>
              {isTypeOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]">
                  {typeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedType(option);
                        setIsTypeOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-base text-black hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg cursor-pointer whitespace-nowrap"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  setIsTimeOpen(!isTimeOpen);
                  setIsTypeOpen(false);
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg text-base font-medium text-black hover:border-[#1FA372] transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                {selectedTime}
                <i className="ri-arrow-down-s-line text-lg"></i>
              </button>
              {isTimeOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                  {timeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedTime(option);
                        setIsTimeOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-base text-black hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg cursor-pointer whitespace-nowrap"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-base font-semibold text-black">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-base font-semibold text-black">
                  Progress
                </th>
                <th className="text-left py-3 px-4 text-base font-semibold text-black">
                  Action
                </th>
                <th className="text-left py-3 px-4 text-base font-semibold text-black">
                  Issued
                </th>
              </tr>
            </thead>
            <tbody>
              {violationsData.map((violation) => (
                <tr
                  key={violation.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(violation)}
                >
                  <td className="py-4 px-4">
                    <span className="text-base font-medium text-black">
                      {violation.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                        <div
                          className="bg-[#1FA372] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${violation.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-base font-medium text-black">
                        {violation.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={(e) => handleAcknowledgementClick(violation, e)}
                      className="text-base font-medium text-[#1FA372] hover:underline cursor-pointer whitespace-nowrap"
                    >
                      {violation.action}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-base text-black">
                      {violation.issued}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && detailsViolation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-black">
                {detailsViolation.type}
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
                  {detailsViolation.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Status
                  </p>
                  <p className="text-base font-medium text-black">
                    {detailsViolation.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Fine Amount
                  </p>
                  <p className="text-base font-medium text-black">
                    {detailsViolation.fineAmount}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Issued Date
                  </p>
                  <p className="text-base text-black">
                    {detailsViolation.issued}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Due Date
                  </p>
                  <p className="text-base text-black">
                    {detailsViolation.dueDate}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-black/60 mb-2">
                  Progress
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#1FA372] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${detailsViolation.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-base font-medium text-black">
                    {detailsViolation.progress}%
                  </span>
                </div>
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

      {/* Acknowledgement Modal */}
      {showAcknowledgementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-black">Acknowledgement</h3>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl text-black"></i>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-4">
              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxes.receipt}
                    onChange={(e) =>
                      setCheckboxes({
                        ...checkboxes,
                        receipt: e.target.checked,
                      })
                    }
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1FA372] focus:ring-[#1FA372] cursor-pointer"
                  />
                  <span className="text-base text-black">
                    I acknowledge receipt of this notice.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxes.corrected}
                    onChange={(e) =>
                      setCheckboxes({
                        ...checkboxes,
                        corrected: e.target.checked,
                      })
                    }
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1FA372] focus:ring-[#1FA372] cursor-pointer"
                  />
                  <span className="text-base text-black">
                    I have corrected the violation.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkboxes.extension}
                    onChange={(e) =>
                      setCheckboxes({
                        ...checkboxes,
                        extension: e.target.checked,
                      })
                    }
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1FA372] focus:ring-[#1FA372] cursor-pointer"
                  />
                  <span className="text-base text-black">
                    I request an extension until:
                  </span>
                </label>
              </div>

              {/* Signature and Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-black mb-2">
                    Signature / Initials
                  </label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base text-black focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent"
                    placeholder=""
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-black mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="dd-mm-yyyy"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base text-black focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent"
                    />
                    <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-black/60 text-lg"></i>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm italic text-black/70">
                  *Please add your signature / initials near the signature. If
                  you do not wish to sign electronically, you may upload a
                  manually signed copy.*
                </p>
              </div>

              {/* Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-base text-black">
                  Please upload Document manually
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-base font-medium text-black hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-[#1FA372] text-white rounded-lg text-base font-medium hover:bg-[#1A8C62] transition-colors cursor-pointer whitespace-nowrap"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
