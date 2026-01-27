"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/src/lib/hooks";
import { useCreatePollMutation } from "@/src/services";
import { setNotification } from "@/src/reducer/hoa-notificatio.reducer";

interface SendViolationModalProps {
  isOpen: boolean;
  onClose: (e?: boolean) => void;
}

export default function SendViolationModal({
  isOpen,
  onClose,
}: SendViolationModalProps) {
  const dispatch = useAppDispatch();

  const [createPoll] = useCreatePollMutation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [pollData, setPollData] = useState<PollsRequestType>({
    question: "",
    options: [
      { id: "1", text: "" },
      { id: "2", text: "" },
    ],
    type: "ANONYMOUS",
    endDate: "",
    description: "",
  });

  // Poll creation functions
  const addOption = () => {
    const newOption: PollOption = {
      id: Date.now().toString(),
      text: "",
    };
    setPollData((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
  };

  const removeOption = (id: string) => {
    if (pollData.options.length > 2) {
      setPollData((prev) => ({
        ...prev,
        options: prev.options.filter((option) => option.id !== id),
      }));
    }
  };

  const updateOption = (id: string, text: string) => {
    setPollData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === id ? { ...option, text } : option,
      ),
    }));
  };

  const handleSubmit = async () => {
    try {
      const requestData: PollsRequestType = { ...pollData };
      requestData.endDate = `${new Intl.DateTimeFormat("en-CA").format(new Date(pollData.endDate))}T23:59:00`;
      await createPoll(requestData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose(true);
        resetForm();
      }, 2000);
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error?.data.error,
        }),
      );
    }
  };

  const resetForm = () => {
    setPollData({
      question: "",
      options: [
        { id: "1", text: "" },
        { id: "2", text: "" },
      ],
      type: "ANONYMOUS",
      endDate: "",
      description: "",
    });
  };

  const isFormValid = () => {
    return (
      pollData.question.trim().length > 0 &&
      pollData.options.every((option) => option.text.trim().length > 0) &&
      pollData.endDate.length > 0
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {showSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Poll Created Successfully!
            </h3>
            <p className="text-gray-600">
              Your poll has been published and is now live for community voting.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Create Poll
                </h2>
                <button
                  onClick={() => onClose(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            {/* Poll Type Selection */}
            <div className="p-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() =>
                    setPollData((prev) => ({
                      ...prev,
                      type: "ANONYMOUS",
                    }))
                  }
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    pollData.type === "ANONYMOUS"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                        pollData.type === "ANONYMOUS"
                          ? "border-teal-500 bg-teal-500"
                          : "border-gray-300"
                      }`}
                    >
                      {pollData.type === "ANONYMOUS" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Anonymous
                      </h4>
                      <p className="text-xs text-gray-600">
                        Voters' identities are hidden
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() =>
                    setPollData((prev) => ({
                      ...prev,
                      type: "OPEN",
                    }))
                  }
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    pollData.type === "OPEN"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                        pollData.type === "OPEN"
                          ? "border-teal-500 bg-teal-500"
                          : "border-gray-300"
                      }`}
                    >
                      {pollData.type === "OPEN" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Open
                      </h4>
                      <p className="text-xs text-gray-600">
                        Voters' identities are visible
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column - Poll Question & Description */}
                <div className="space-y-4">
                  {/* Poll Question */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poll Question *
                    </label>
                    <textarea
                      value={pollData.question}
                      onChange={(e) =>
                        setPollData((prev) => ({
                          ...prev,
                          question: e.target.value,
                        }))
                      }
                      placeholder="Enter your poll question..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={pollData.description}
                      onChange={(e) =>
                        setPollData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Add additional context or details..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      rows={2}
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={pollData.endDate}
                      onChange={(e) =>
                        setPollData((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Right Column - Poll Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poll Options *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Add at least 2 options for your poll
                  </p>

                  <div className="space-y-2">
                    {pollData.options.map((option, index) => (
                      <div
                        key={option.id}
                        className="flex items-baseline space-x-2"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {index + 1}
                          </span>
                        </div>
                        <textarea
                          value={option.text}
                          onChange={(e) =>
                            updateOption(option.id, e.target.value)
                          }
                          placeholder={`Option ${index + 1}`}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                          rows={3}
                        />

                        {pollData.options.length > 2 && (
                          <button
                            onClick={() => removeOption(option.id)}
                            className="w-7 h-7 flex items-center justify-center text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {pollData.options.length < 6 && (
                    <button
                      onClick={addOption}
                      className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-teal-500 hover:text-teal-600 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Add Options
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => onClose(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className={`px-6 py-2 text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    isFormValid()
                      ? "bg-[#1FA372] text-white hover:bg-[#1a8d63]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <i className="ri-send-plane-line mr-2"></i>
                  Create Poll
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
