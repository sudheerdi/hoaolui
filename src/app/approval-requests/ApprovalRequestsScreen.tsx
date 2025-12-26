"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ApprovalRequestsTable from "./ApprovalRequestsTable";
import ApprovalRequestDetails from "./ApprovalRequestDetails";

interface ApprovalRequest {
  id: string;
  requestId: string;
  memberName: string;
  memberEmail: string;
  requestType: string;
  description: string;
  fullDescription: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  attachments?: string[];
  icon: string;
  priority: "low" | "medium" | "high";
  address: string;
}

export default function ApprovalRequestsScreen() {
  const [selectedRequest, setSelectedRequest] =
    useState<ApprovalRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");

  const mockRequests: ApprovalRequest[] = [
    {
      id: "1",
      requestId: "REQ-2024-001",
      memberName: "Sarah Johnson",
      memberEmail: "sarah.johnson@email.com",
      requestType: "Maintenance Request",
      description: "Elevator repair needed urgently",
      fullDescription:
        "The elevator in Building A has been making unusual noises and stopped working yesterday evening. Multiple residents have reported being stuck briefly. This requires immediate attention from a certified technician. The issue seems to be with the motor system based on the grinding sounds reported.",
      status: "pending",
      date: "2024-01-15",
      attachments: ["elevator-photo.jpg", "maintenance-report.pdf"],
      icon: "ri-tools-line",
      priority: "high",
      address: "123 Main St, Apt 4A",
    },
    {
      id: "2",
      requestId: "REQ-2024-002",
      memberName: "Michael Chen",
      memberEmail: "michael.chen@email.com",
      requestType: "Event Permission",
      description: "Community BBQ event approval",
      fullDescription:
        "Requesting permission to organize a community BBQ event in the central courtyard on Saturday, January 28th from 2 PM to 8 PM. Expected attendance: 50-60 residents. Will provide own equipment, tables, and cleanup crew. Need access to outdoor electrical outlets.",
      status: "pending",
      date: "2024-01-14",
      attachments: ["event-plan.pdf"],
      icon: "ri-calendar-event-line",
      priority: "medium",
      address: "123 Main St, Apt 2B",
    },
    {
      id: "3",
      requestId: "REQ-2024-003",
      memberName: "Emily Rodriguez",
      memberEmail: "emily.rodriguez@email.com",
      requestType: "Parking Permit",
      description: "Additional parking space request",
      fullDescription:
        "Requesting an additional parking permit for a second vehicle. Current permit #A-245 for primary vehicle. New vehicle: 2023 Honda Civic, License: ABC-1234. Willing to pay additional monthly fee. Have been on waiting list for 3 months.",
      status: "approved",
      date: "2024-01-13",
      icon: "ri-car-line",
      priority: "low",
      address: "123 Main St, Apt 1C",
    },
    {
      id: "4",
      requestId: "REQ-2024-004",
      memberName: "David Kim",
      memberEmail: "david.kim@email.com",
      requestType: "Noise Complaint",
      description: "Excessive noise from Unit 4B",
      fullDescription:
        "Ongoing noise issues from Unit 4B during late evening hours (10 PM - 2 AM). Loud music, footsteps, and conversations disturbing sleep. Have attempted direct communication with no resolution. Requesting official intervention and noise policy enforcement.",
      status: "pending",
      date: "2024-01-12",
      icon: "ri-volume-up-line",
      priority: "high",
      address: "123 Main St, Apt 3A",
    },
    {
      id: "5",
      requestId: "REQ-2024-005",
      memberName: "Lisa Thompson",
      memberEmail: "lisa.thompson@email.com",
      requestType: "Pet Registration",
      description: "New pet registration approval",
      fullDescription:
        "Requesting approval to register a new pet: Golden Retriever puppy, 8 weeks old, fully vaccinated. Have provided all required documentation including vaccination records, pet insurance, and training certification. Previous pet registration was in good standing.",
      status: "rejected",
      date: "2024-01-11",
      icon: "ri-heart-line",
      priority: "low",
      address: "123 Main St, Apt 5B",
    },
    {
      id: "6",
      requestId: "REQ-2024-006",
      memberName: "James Wilson",
      memberEmail: "james.wilson@email.com",
      requestType: "Facility Booking",
      description: "Community room reservation",
      fullDescription:
        "Requesting reservation of the main community room for a birthday party on February 5th from 6 PM to 11 PM. Expected guests: 25 people. Will provide own decorations and catering. Need access to kitchen facilities and AV equipment for music.",
      status: "approved",
      date: "2024-01-10",
      icon: "ri-home-4-line",
      priority: "medium",
      address: "123 Main St, Apt 6A",
    },
    {
      id: "7",
      requestId: "REQ-2024-007",
      memberName: "Anna Martinez",
      memberEmail: "anna.martinez@email.com",
      requestType: "Maintenance Request",
      description: "Pool heating system repair",
      fullDescription:
        "The community pool heating system has not been working for the past week. Water temperature is too cold for comfortable swimming. Multiple residents have complained. Need professional assessment and repair of the heating unit.",
      status: "approved",
      date: "2024-01-09",
      icon: "ri-tools-line",
      priority: "medium",
      address: "123 Main St, Apt 7C",
    },
    {
      id: "8",
      requestId: "REQ-2024-008",
      memberName: "Robert Taylor",
      memberEmail: "robert.taylor@email.com",
      requestType: "Security Request",
      description: "Additional security camera installation",
      fullDescription:
        "Requesting installation of additional security cameras in the parking garage due to recent vandalism incidents. Proposed locations include entrance/exit points and blind spots identified by security assessment.",
      status: "pending",
      date: "2024-01-08",
      icon: "ri-camera-line",
      priority: "high",
      address: "123 Main St, Apt 8B",
    },
    {
      id: "9",
      requestId: "REQ-2024-009",
      memberName: "Jennifer Lee",
      memberEmail: "jennifer.lee@email.com",
      requestType: "Landscaping Request",
      description: "Garden area renovation proposal",
      fullDescription:
        "Proposal to renovate the central garden area with new plants, improved irrigation system, and walking paths. Includes detailed landscaping plan and cost estimates. Will enhance property value and resident enjoyment.",
      status: "rejected",
      date: "2024-01-07",
      icon: "ri-plant-line",
      priority: "low",
      address: "123 Main St, Apt 9A",
    },
    {
      id: "10",
      requestId: "REQ-2024-010",
      memberName: "Mark Anderson",
      memberEmail: "mark.anderson@email.com",
      requestType: "Policy Change",
      description: "Pet policy modification request",
      fullDescription:
        "Requesting modification to current pet policy to allow larger dog breeds. Current policy restricts dogs over 50 pounds. Proposing increase to 75 pounds with additional requirements for training certification and insurance.",
      status: "pending",
      date: "2024-01-06",
      icon: "ri-file-text-line",
      priority: "medium",
      address: "123 Main St, Apt 10C",
    },
  ];

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "open"
        ? request.status === "pending"
        : request.status === "approved" || request.status === "rejected";

    return matchesSearch && matchesTab;
  });

  const openCount = mockRequests.filter(
    (req) => req.status === "pending"
  ).length;
  const closedCount = mockRequests.filter(
    (req) => req.status === "approved" || req.status === "rejected"
  ).length;

  return (
    <div className="min-h-screen bg-[#1E293B] p-[10px]">
      <Sidebar />

      <div className="lg:ml-[260px] bg-white rounded-lg min-h-[calc(100vh-20px)] flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <i className="ri-file-list-3-line text-teal-600"></i>
                <span className="text-sm font-bold text-black">
                  Open : {openCount}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="ri-check-line text-green-600"></i>
                <span className="text-sm font-bold text-black">
                  Closed : {closedCount}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                  <i className="ri-notification-3-line text-lg"></i>
                </button>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-teal-600">CN</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Community Name
                  </p>
                  <p className="text-xs text-gray-500">Community Address</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`flex-1 transition-all duration-300 ${
              selectedRequest ? "mr-[384px]" : ""
            }`}
          >
            <div className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="text-lg font-medium text-black mb-1">
                        Hello Approver,
                      </p>
                      <p className="text-base font-medium text-black">
                        <span className="font-bold">Home owner</span> has
                        submitted an approval request, please review and take
                        action.
                      </p>
                    </div>

                    <div className="mb-4">
                      <textarea
                        placeholder="Add your comments or notes here..."
                        className="w-full h-[55px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap">
                        <i className="ri-check-line mr-2"></i>
                        Approve
                      </button>
                      <button className="border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors whitespace-nowrap">
                        <i className="ri-close-line mr-2"></i>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <div className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("open")}
                      className={`pb-1 text-base font-medium transition-colors whitespace-nowrap ${
                        activeTab === "open"
                          ? "text-[#1FA372] border-b-2 border-[#1FA372]"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <i className="ri-file-list-3-line mr-2"></i>
                      Open
                    </button>
                    <button
                      onClick={() => setActiveTab("closed")}
                      className={`pb-1 text-base font-medium transition-colors whitespace-nowrap ${
                        activeTab === "closed"
                          ? "text-[#1FA372] border-b-2 border-[#1FA372]"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <i className="ri-check-line mr-2"></i>
                      Closed
                    </button>
                  </div>

                  <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-search-line text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Search requests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <ApprovalRequestsTable
                  requests={filteredRequests}
                  onViewDetails={setSelectedRequest}
                  selectedRequest={selectedRequest}
                  activeTab={activeTab}
                />
              </div>
            </div>
          </div>

          {selectedRequest && (
            <ApprovalRequestDetails
              request={selectedRequest}
              onClose={() => setSelectedRequest(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
