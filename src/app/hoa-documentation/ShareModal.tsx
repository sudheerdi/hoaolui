"use client";

import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  documentName,
}: ShareModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [shareLink, setShareLink] = useState("");

  if (!isOpen) return null;

  const users = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "SJ",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@email.com",
      avatar: "MC",
    },
    { id: "3", name: "Emily Davis", email: "emily.d@email.com", avatar: "ED" },
    {
      id: "4",
      name: "Robert Wilson",
      email: "robert.w@email.com",
      avatar: "RW",
    },
    { id: "5", name: "Lisa Anderson", email: "lisa.a@email.com", avatar: "LA" },
  ];

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const generateShareLink = () => {
    setShareLink(
      "https://communityconnect.com/share/doc-" +
        Math.random().toString(36).substr(2, 9)
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Share Document</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">Document:</p>
            <p className="text-base font-semibold text-gray-900">
              {documentName}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Share with Users
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => toggleUser(user.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedUsers.includes(user.id)
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  {selectedUsers.includes(user.id) && (
                    <i className="ri-checkbox-circle-fill text-teal-600 text-xl"></i>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Or Generate Share Link
            </h3>
            {!shareLink ? (
              <button
                onClick={generateShareLink}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                <i className="ri-link mr-2"></i>
                Generate Shareable Link
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                >
                  <i className="ri-file-copy-line"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            disabled={selectedUsers.length === 0 && !shareLink}
            className="px-6 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
