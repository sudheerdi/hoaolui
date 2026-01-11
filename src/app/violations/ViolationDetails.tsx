"use client";

import { violationIcons } from "@/src/helpers";
import { useState } from "react";

interface ViolationDetailsProps {
  violation: Violation;
  onClose: () => void;
}

export default function ViolationDetails({
  violation,
  onClose,
}: ViolationDetailsProps) {
  const [showConfirmModal, setShowConfirmModal] = useState<{
    type: "resolve" | "warn";
    violation: Violation;
  } | null>(null);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);
  const [resolutionNote, setResolutionNote] = useState("");
  const [showPdfModal, setShowPdfModal] = useState(false);

  const getStatusChip = (status: string) => {
    const styles = {
      open: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      resolved: "bg-green-100 text-green-800 border-green-200",
    };

    const labels = {
      open: "Open",
      pending: "Pending",
      resolved: "Resolved",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium border ${
          styles[status as keyof typeof styles]
        }`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handleAction = (type: "resolve" | "warn", violation: Violation) => {
    setShowConfirmModal({ type, violation });
  };

  const confirmAction = () => {
    if (!showConfirmModal) return;

    const { type, violation } = showConfirmModal;
    const messages = {
      resolve: `Violation ${violation.id} has been resolved successfully.`,
      warn: `Warning sent to ${violation.user.firstName} ${violation.user.lastName} for violation ${violation.id}.`,
    };

    setShowToast({ message: messages[type], type: "success" });
    setShowConfirmModal(null);
    setResolutionNote("");

    setTimeout(() => setShowToast(null), 3000);
  };

  const handleExportPdf = () => {
    setShowPdfModal(true);
  };

  return (
    <>
      <div className="absolute right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Violation Details
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-xl">
              {violationIcons[violation.type.toLowerCase()]}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{violation.id}</h4>
              <p className="text-sm text-gray-600">{violation.type}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Export PDF */}
          <div className="flex items-center justify-between">
            {getStatusChip(violation.status)}
            <button
              onClick={handleExportPdf}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center space-x-1"
            >
              <i className="ri-file-pdf-line"></i>
              <span>Export PDF</span>
            </button>
          </div>

          {/* Member Information */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">
              Member Information
            </h5>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <i className="ri-user-line text-gray-400"></i>
                <span className="text-sm text-gray-900">
                  {violation.user.firstName} {violation.user.lastName}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-mail-line text-gray-400"></i>
                <span className="text-sm text-gray-600">
                  {violation.user.emailId}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-home-4-line text-gray-400"></i>
                <span className="text-sm text-gray-600">To Do</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-map-pin-line text-gray-400"></i>
                <span className="text-sm text-gray-600">To Do</span>
              </div>
            </div>
          </div>

          {/* Violation Details */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">
              Violation Description
            </h5>
            <p className="text-gray-700 text-sm leading-relaxed">
              {violation.description}
            </p>
          </div>

          {/* Report Information */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">
              Report Information
            </h5>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <i className="ri-calendar-line text-gray-400"></i>
                <span className="text-sm text-gray-600">
                  Reported on{" "}
                  {new Date(violation.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-user-voice-line text-gray-400"></i>
                <span className="text-sm text-gray-600">
                  Reported by {violation.createdAt}
                </span>
              </div>
            </div>
          </div>

          {/* Photo Attachments */}
          {/* {violation.photos && violation.photos.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Photo Evidence</h5>
              <div className="grid grid-cols-2 gap-3">
                {violation.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <i className="ri-image-line text-2xl text-gray-400"></i>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg transition-all cursor-pointer flex items-center justify-center">
                      <i className="ri-eye-line text-white opacity-0 hover:opacity-100 transition-opacity"></i>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {photo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          <div>
            <h5 className="font-medium text-gray-900 mb-3">Photo Evidence</h5>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <i className="ri-image-line text-2xl text-gray-400"></i>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg transition-all cursor-pointer flex items-center justify-center">
                  <i className="ri-eye-line text-white opacity-0 hover:opacity-100 transition-opacity"></i>
                </div>
                <p className="text-xs text-gray-600 mt-1 truncate">Photo</p>
              </div>
            </div>
          </div>

          {/* Resolution Notes */}
          {violation.generatedNotice && (
            <div>
              <h5 className="font-medium text-gray-900 mb-3">
                Resolution Notes
              </h5>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  {violation.generatedNotice}
                </p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Timeline</h5>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Violation Reported
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(violation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {violation.status === "OPEN" && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Under Review
                    </p>
                    <p className="text-xs text-gray-500">In progress</p>
                  </div>
                </div>
              )}
              {violation.status === "RESOLVED" && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Violation Resolved
                    </p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {violation.status !== "RESOLVED" && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="space-y-3">
              <button
                onClick={() => handleAction("resolve", violation)}
                className="w-full bg-[#1FA372] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#188f5f] transition-colors whitespace-nowrap"
              >
                <i className="ri-check-line mr-2"></i>
                Resolve Violation
              </button>
              <button
                onClick={() => handleAction("warn", violation)}
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-alert-line mr-2"></i>
                Send Warning
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Violation Report - {violation.id}
              </h3>
              <button
                onClick={() => setShowPdfModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)] bg-white">
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center border-b border-gray-200 pb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    VIOLATION NOTICE
                  </h1>
                  <p className="text-lg text-gray-600">{violation.id}</p>
                </div>

                {/* Violation Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Resident Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {violation.user.firstName} {violation.user.lastName}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {violation.user.emailId}
                      </p>
                      <p>
                        <span className="font-medium">Unit:</span> To Do
                      </p>
                      <p>
                        <span className="font-medium">Location:</span> To Do
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Violation Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Type:</span>{" "}
                        {violation.type}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        {violation.status.charAt(0).toUpperCase() +
                          violation.status.slice(1)}
                      </p>
                      <p>
                        <span className="font-medium">Date Reported:</span>{" "}
                        {new Date(violation.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p>
                        <span className="font-medium">Reported By:</span>{" "}
                        {violation.reportedById}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Violation Description
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed border border-gray-200 rounded-lg p-4 bg-gray-50">
                    {violation.description}
                  </p>
                </div>

                {/* Resolution Notes */}
                {violation.generatedNotice && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Resolution Notes
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed border border-green-200 rounded-lg p-4 bg-green-50">
                      {violation.generatedNotice}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="border-t border-gray-200 pt-6 text-center">
                  <p className="text-xs text-gray-500">
                    This document was generated on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowPdfModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center space-x-2"
              >
                <i className="ri-printer-line"></i>
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {showConfirmModal.type === "resolve" && "Resolve Violation"}
              {showConfirmModal.type === "warn" && "Send Warning"}
            </h3>
            <p className="text-gray-600 mb-4">
              {showConfirmModal.type === "resolve" &&
                `Are you sure you want to resolve violation ${showConfirmModal.violation.id}?`}
              {showConfirmModal.type === "warn" &&
                `Send a warning notice to ${showConfirmModal.violation.user.firstName} ${showConfirmModal.violation.user.lastName} for violation ${showConfirmModal.violation.id}?`}
            </p>

            {showConfirmModal.type === "resolve" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Notes (Optional)
                </label>
                <textarea
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Add notes about how this violation was resolved..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors whitespace-nowrap ${
                  showConfirmModal.type === "resolve"
                    ? "bg-[#1FA372] hover:bg-[#188f5f]"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {showConfirmModal.type === "resolve" && "Resolve"}
                {showConfirmModal.type === "warn" && "Send Warning"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-60">
          <div className="px-4 py-3 rounded-lg shadow-lg text-white bg-green-600">
            <div className="flex items-center space-x-2">
              <i className="ri-check-line"></i>
              <span className="font-medium">{showToast.message}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
