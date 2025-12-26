'use client';

import { useState } from 'react';

interface ApprovalRequest {
  id: string;
  memberName: string;
  requestType: string;
  description: string;
  fullDescription: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  attachments?: string[];
  icon: string;
}

interface ViewApprovalsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewApprovalsModal({ isOpen, onClose }: ViewApprovalsModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<{ type: 'approve' | 'reject' | 'info'; request: ApprovalRequest } | null>(null);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const mockRequests: ApprovalRequest[] = [
    {
      id: '1',
      memberName: 'Sarah Johnson',
      requestType: 'Maintenance Request',
      description: 'Elevator repair needed urgently',
      fullDescription: 'The elevator in Building A has been making unusual noises and stopped working yesterday evening. Multiple residents have reported being stuck briefly. This requires immediate attention from a certified technician. The issue seems to be with the motor system based on the grinding sounds reported.',
      status: 'pending',
      date: '2024-01-15',
      attachments: ['elevator-photo.jpg', 'maintenance-report.pdf'],
      icon: 'ri-tools-line'
    },
    {
      id: '2',
      memberName: 'Michael Chen',
      requestType: 'Event Permission',
      description: 'Community BBQ event approval',
      fullDescription: 'Requesting permission to organize a community BBQ event in the central courtyard on Saturday, January 28th from 2 PM to 8 PM. Expected attendance: 50-60 residents. Will provide own equipment, tables, and cleanup crew. Need access to outdoor electrical outlets.',
      status: 'pending',
      date: '2024-01-14',
      attachments: ['event-plan.pdf'],
      icon: 'ri-calendar-event-line'
    },
    {
      id: '3',
      memberName: 'Emily Rodriguez',
      requestType: 'Parking Permit',
      description: 'Additional parking space request',
      fullDescription: 'Requesting an additional parking permit for a second vehicle. Current permit #A-245 for primary vehicle. New vehicle: 2023 Honda Civic, License: ABC-1234. Willing to pay additional monthly fee. Have been on waiting list for 3 months.',
      status: 'approved',
      date: '2024-01-13',
      icon: 'ri-car-line'
    },
    {
      id: '4',
      memberName: 'David Kim',
      requestType: 'Noise Complaint',
      description: 'Excessive noise from Unit 4B',
      fullDescription: 'Ongoing noise issues from Unit 4B during late evening hours (10 PM - 2 AM). Loud music, footsteps, and conversations disturbing sleep. Have attempted direct communication with no resolution. Requesting official intervention and noise policy enforcement.',
      status: 'pending',
      date: '2024-01-12',
      icon: 'ri-volume-up-line'
    },
    {
      id: '5',
      memberName: 'Lisa Thompson',
      requestType: 'Pet Registration',
      description: 'New pet registration approval',
      fullDescription: 'Requesting approval to register a new pet: Golden Retriever puppy, 8 weeks old, fully vaccinated. Have provided all required documentation including vaccination records, pet insurance, and training certification. Previous pet registration was in good standing.',
      status: 'rejected',
      date: '2024-01-11',
      icon: 'ri-heart-line'
    },
    {
      id: '6',
      memberName: 'James Wilson',
      requestType: 'Facility Booking',
      description: 'Community room reservation',
      fullDescription: 'Requesting reservation of the main community room for a birthday party on February 5th from 6 PM to 11 PM. Expected guests: 25 people. Will provide own decorations and catering. Need access to kitchen facilities and AV equipment for music.',
      status: 'pending',
      date: '2024-01-10',
      icon: 'ri-home-4-line'
    }
  ];

  const filteredRequests = mockRequests.filter(request => {
    if (selectedFilter === 'all') return true;
    return request.status === selectedFilter;
  });

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
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
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
      approve: `Request from ${request.memberName} has been approved successfully.`,
      reject: `Request from ${request.memberName} has been rejected.`,
      info: `Information request sent to ${request.memberName}.`
    };

    setShowToast({ message: messages[type], type: type === 'info' ? 'info' : 'success' });
    setShowConfirmModal(null);
    
    setTimeout(() => setShowToast(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[1200px] h-[700px] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Approvals Center</h2>
              <div className="w-16 h-1 bg-teal-600 mt-1 rounded-full"></div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex space-x-1 mt-4 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: 'all', label: 'All Requests' },
              { key: 'pending', label: 'Pending' },
              { key: 'approved', label: 'Approved' },
              { key: 'rejected', label: 'Rejected' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedFilter === filter.key
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Panel - Requests List */}
          <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
            {filteredRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-file-list-3-line text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals right now!</h3>
                <p className="text-gray-500">All requests have been processed. Check back later for new submissions.</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedRequest?.id === request.id
                        ? 'border-teal-200 bg-teal-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`${request.icon} text-teal-600`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{request.memberName}</h4>
                          {getStatusChip(request.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{request.requestType}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">{request.description}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(request.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel - Request Details */}
          <div className="w-1/2 flex flex-col">
            {selectedRequest ? (
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Member Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <i className={`${selectedRequest.icon} text-xl text-teal-600`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedRequest.memberName}</h3>
                      <p className="text-sm text-gray-600">{selectedRequest.requestType}</p>
                    </div>
                    <div className="ml-auto">
                      {getStatusChip(selectedRequest.status)}
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Request Description</h4>
                      <p className="text-gray-700 leading-relaxed">{selectedRequest.fullDescription}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Submission Date</h4>
                      <p className="text-gray-600">{new Date(selectedRequest.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>

                    {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                        <div className="space-y-2">
                          {selectedRequest.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                              <i className="ri-file-line text-gray-400"></i>
                              <span className="text-sm text-gray-700">{attachment}</span>
                              <button className="ml-auto text-teal-600 hover:text-teal-700 text-sm">
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedRequest.status === 'pending' && (
                  <div className="border-t border-gray-200 p-6">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAction('approve', selectedRequest)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-check-line mr-2"></i>
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction('reject', selectedRequest)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-close-line mr-2"></i>
                        Reject
                      </button>
                      <button
                        onClick={() => handleAction('info', selectedRequest)}
                        className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-question-line mr-2"></i>
                        Request Info
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-file-text-line text-2xl text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Request</h3>
                  <p className="text-gray-500">Choose a request from the list to view details and take action.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {showConfirmModal.type === 'approve' && 'Approve Request'}
              {showConfirmModal.type === 'reject' && 'Reject Request'}
              {showConfirmModal.type === 'info' && 'Request Additional Information'}
            </h3>
            <p className="text-gray-600 mb-6">
              {showConfirmModal.type === 'approve' && `Are you sure you want to approve ${showConfirmModal.request.memberName}'s request?`}
              {showConfirmModal.type === 'reject' && `Are you sure you want to reject ${showConfirmModal.request.memberName}'s request?`}
              {showConfirmModal.type === 'info' && `Send a request for additional information to ${showConfirmModal.request.memberName}?`}
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
                  showConfirmModal.type === 'approve' ? 'bg-green-600 hover:bg-green-700' :
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
        <div className="fixed top-4 right-4 z-70">
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
    </div>
  );
}