'use client';

import { useState } from 'react';

interface ApprovalRequest {
  id: string;
  requestId: string;
  memberName: string;
  memberEmail: string;
  requestType: string;
  description: string;
  fullDescription: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  attachments?: string[];
  icon: string;
  priority: 'low' | 'medium' | 'high';
}

interface ApprovalRequestDetailsProps {
  request: ApprovalRequest;
  onClose: () => void;
}

export default function ApprovalRequestDetails({ request, onClose }: ApprovalRequestDetailsProps) {
  const [showConfirmModal, setShowConfirmModal] = useState<{ type: 'approve' | 'reject' | 'info'; request: ApprovalRequest } | null>(null);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const getStatusChip = (status: string) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    
    const labels = {
      pending: 'Pending',
      approved: 'Approved', 
      rejected: 'Rejected'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getPriorityChip = (priority: string) => {
    const styles = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[priority as keyof typeof styles]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </span>
    );
  };

  const handleAction = (type: 'approve' | 'reject' | 'info', request: ApprovalRequest) => {
    setShowConfirmModal({ type, request });
  };

  const confirmAction = () => {
    if (!showConfirmModal) return;
    
    const { type, request } = showConfirmModal;
    const messages = {
      approve: `Request ${request.requestId} has been approved successfully.`,
      reject: `Request ${request.requestId} has been rejected.`,
      info: `Information request sent to ${request.memberName}.`
    };

    setShowToast({ message: messages[type], type: type === 'info' ? 'info' : 'success' });
    setShowConfirmModal(null);
    
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <>
      <div className="absolute right-[10px] top-[10px] bottom-[10px] w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-y-auto z-40">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Request Details</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <i className={`${request.icon} text-xl text-teal-600`}></i>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{request.requestId}</h4>
              <p className="text-sm text-gray-600">{request.requestType}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center justify-between">
            {getStatusChip(request.status)}
            {getPriorityChip(request.priority)}
          </div>

          {/* Member Information */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Member Information</h5>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <i className="ri-user-line text-gray-400"></i>
                <span className="text-sm text-gray-900">{request.memberName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-mail-line text-gray-400"></i>
                <span className="text-sm text-gray-600">{request.memberEmail}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-calendar-line text-gray-400"></i>
                <span className="text-sm text-gray-600">
                  {new Date(request.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Request Description */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Description</h5>
            <p className="text-gray-700 text-sm leading-relaxed">{request.fullDescription}</p>
          </div>

          {/* Attachments */}
          {request.attachments && request.attachments.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Attachments</h5>
              <div className="space-y-2">
                {request.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <i className="ri-file-line text-gray-400"></i>
                      <span className="text-sm text-gray-700">{attachment}</span>
                    </div>
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium whitespace-nowrap">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Timeline</h5>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Request Submitted</p>
                  <p className="text-xs text-gray-500">{new Date(request.date).toLocaleDateString()}</p>
                </div>
              </div>
              {request.status !== 'pending' && (
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    request.status === 'approved' ? 'bg-green-600' : 'bg-red-600'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Request {request.status === 'approved' ? 'Approved' : 'Rejected'}
                    </p>
                    <p className="text-xs text-gray-500">Today</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {request.status === 'pending' && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="space-y-3">
              <button
                onClick={() => handleAction('approve', request)}
                className="w-full bg-[#1FA372] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#188f5f] transition-colors whitespace-nowrap"
              >
                <i className="ri-check-line mr-2"></i>
                Approve Request
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleAction('reject', request)}
                  className="flex-1 border-2 border-red-600 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors whitespace-nowrap"
                >
                  <i className="ri-close-line mr-2"></i>
                  Reject
                </button>
                <button
                  onClick={() => handleAction('info', request)}
                  className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors whitespace-nowrap"
                >
                  <i className="ri-question-line mr-2"></i>
                  Request Info
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {showConfirmModal.type === 'approve' && 'Approve Request'}
              {showConfirmModal.type === 'reject' && 'Reject Request'}
              {showConfirmModal.type === 'info' && 'Request Additional Information'}
            </h3>
            <p className="text-gray-600 mb-6">
              {showConfirmModal.type === 'approve' && `Are you sure you want to approve request ${showConfirmModal.request.requestId}?`}
              {showConfirmModal.type === 'reject' && `Are you sure you want to reject request ${showConfirmModal.request.requestId}?`}
              {showConfirmModal.type === 'info' && `Send a request for additional information for ${showConfirmModal.request.requestId}?`}
            </p>
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
                  showConfirmModal.type === 'approve' ? 'bg-[#1FA372] hover:bg-[#188f5f]' :
                  showConfirmModal.type === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {showConfirmModal.type === 'approve' && 'Approve'}
                {showConfirmModal.type === 'reject' && 'Reject'}
                {showConfirmModal.type === 'info' && 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-60">
          <div className={`px-4 py-3 rounded-lg shadow-lg text-white ${
            showToast.type === 'success' ? 'bg-green-600' : 'bg-indigo-600'
          }`}>
            <div className="flex items-center space-x-2">
              <i className={`${showToast.type === 'success' ? 'ri-check-line' : 'ri-information-line'}`}></i>
              <span className="font-medium">{showToast.message}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}