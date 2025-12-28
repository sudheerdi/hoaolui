"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import UserProfile from "../../components/UserProfile";
import MessageList from "./MessageList";
import MessageDetails from "./MessageDetails";
import CreateAnnouncementModal from "./CreateAnnouncementModal";

export interface Message {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  time: string;
  tag: "Event" | "Alert" | "Info";
  priority: "High" | "Medium" | "Low";
  attachments?: {
    type: "image" | "file";
    name: string;
    url: string;
  }[];
  likes: number;
  comments: number;
  isRead: boolean;
}

export default function MessageBoardScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      title: "Community Pool Maintenance Schedule",
      content:
        "Dear Residents,\n\nWe are pleased to announce that the community pool will undergo scheduled maintenance from February 15-20, 2024. During this time, the pool will be temporarily closed to ensure proper cleaning and equipment servicing.\n\nMaintenance activities will include:\n• Deep cleaning and chemical balancing\n• Filter system inspection and replacement\n• Pool deck pressure washing\n• Safety equipment check\n\nWe apologize for any inconvenience and appreciate your understanding. The pool will reopen on February 21st with extended hours to make up for the closure.\n\nThank you for your cooperation.",
      author: "Sarah Johnson",
      authorAvatar:
        "https://readdy.ai/api/search-image?query=professional%20woman%20with%20brown%20hair%20smiling%20headshot%20portrait%20business%20attire%20clean%20white%20background&width=40&height=40&seq=author1&orientation=squarish",
      date: "Feb 10, 2024",
      time: "9:30 AM",
      tag: "Event",
      priority: "Medium",
      attachments: [
        {
          type: "image",
          name: "pool-maintenance-schedule.jpg",
          url: "https://readdy.ai/api/search-image?query=swimming%20pool%20maintenance%20schedule%20calendar%20chart%20with%20dates%20and%20activities%20clean%20professional%20layout&width=400&height=300&seq=pool1&orientation=landscape",
        },
      ],
      likes: 24,
      comments: 8,
      isRead: false,
    },
    {
      id: "2",
      title: "URGENT: Water Service Interruption Notice",
      content:
        "ATTENTION ALL RESIDENTS\n\nDue to emergency repairs on the main water line, there will be a temporary water service interruption on February 12, 2024, from 8:00 AM to 2:00 PM.\n\nAffected areas:\n• Building A (Units 101-150)\n• Building B (Units 201-250)\n• Community Center\n\nWe recommend:\n• Filling containers with water beforehand\n• Avoiding laundry during this period\n• Planning meals that don't require water preparation\n\nWater trucks will be available in the main parking area for emergency needs. We sincerely apologize for this inconvenience and will work to restore service as quickly as possible.\n\nFor updates, please check our website or call the emergency hotline: (555) 123-4567",
      author: "Michael Chen",
      authorAvatar:
        "https://readdy.ai/api/search-image?query=professional%20asian%20man%20with%20glasses%20smiling%20headshot%20portrait%20business%20suit%20clean%20white%20background&width=40&height=40&seq=author2&orientation=squarish",
      date: "Feb 9, 2024",
      time: "2:15 PM",
      tag: "Alert",
      priority: "High",
      likes: 45,
      comments: 23,
      isRead: true,
    },
    {
      id: "3",
      title: "Annual HOA Meeting - March 15th",
      content:
        "Dear Community Members,\n\nYou are cordially invited to attend our Annual HOA Meeting scheduled for March 15, 2024, at 7:00 PM in the Community Center.\n\nAgenda items include:\n• 2023 Financial Report Review\n• 2024 Budget Approval\n• Board Member Elections\n• Proposed Amenity Improvements\n• Community Feedback Session\n\nLight refreshments will be provided. Please bring a valid ID for voting purposes. Proxy forms are available at the management office for those unable to attend.\n\nYour participation is crucial for our community's continued success. We look forward to seeing you there!",
      author: "Emily Davis",
      authorAvatar:
        "https://readdy.ai/api/search-image?query=professional%20blonde%20woman%20smiling%20headshot%20portrait%20business%20attire%20clean%20white%20background&width=40&height=40&seq=author3&orientation=squarish",
      date: "Feb 8, 2024",
      time: "10:45 AM",
      tag: "Event",
      priority: "High",
      attachments: [
        {
          type: "file",
          name: "meeting-agenda.pdf",
          url: "#",
        },
      ],
      likes: 67,
      comments: 15,
      isRead: true,
    },
    {
      id: "4",
      title: "New Recycling Guidelines Effective Immediately",
      content:
        "Hello Neighbors,\n\nWe are implementing new recycling guidelines to improve our environmental impact and comply with updated city regulations.\n\nNew Guidelines:\n• Glass items must be separated into designated green bins\n• Cardboard should be flattened before disposal\n• Electronics recycling available every first Saturday\n• Hazardous materials collection quarterly\n\nRecycling bins will be color-coded:\n🟢 Green: Glass and bottles\n🔵 Blue: Paper and cardboard\n🟡 Yellow: Plastic containers\n\nThank you for helping us maintain a cleaner, greener community!",
      author: "Robert Wilson",
      authorAvatar:
        "https://readdy.ai/api/search-image?query=professional%20middle%20aged%20man%20with%20beard%20smiling%20headshot%20portrait%20business%20shirt%20clean%20white%20background&width=40&height=40&seq=author4&orientation=squarish",
      date: "Feb 7, 2024",
      time: "3:20 PM",
      tag: "Info",
      priority: "Medium",
      likes: 32,
      comments: 12,
      isRead: true,
    },
    {
      id: "5",
      title: "Security Camera System Upgrade Complete",
      content:
        "Dear Residents,\n\nWe are pleased to inform you that the security camera system upgrade has been successfully completed. The new system provides enhanced coverage and improved image quality for better community safety.\n\nUpgrade highlights:\n• 4K resolution cameras at all entry points\n• Night vision capabilities\n• Motion detection alerts\n• 30-day recording storage\n• Mobile app access for board members\n\nAll cameras are positioned in common areas only, respecting privacy guidelines. The system is monitored 24/7 by our security partner.\n\nYour safety is our priority. Thank you for your patience during the installation process.",
      author: "Lisa Anderson",
      authorAvatar:
        "https://readdy.ai/api/search-image?query=professional%20woman%20with%20curly%20hair%20smiling%20headshot%20portrait%20business%20attire%20clean%20white%20background&width=40&height=40&seq=author5&orientation=squarish",
      date: "Feb 6, 2024",
      time: "11:30 AM",
      tag: "Info",
      priority: "Medium",
      likes: 56,
      comments: 19,
      isRead: true,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(
    messages[0]
  );
  const [filterTag, setFilterTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateAnnouncement = (
    announcement: Omit<Message, "id" | "likes" | "comments" | "isRead">
  ) => {
    const newMessage: Message = {
      ...announcement,
      id: Date.now().toString(),
      likes: 0,
      comments: 0,
      isRead: false,
    };
    setMessages([newMessage, ...messages]);
    setSelectedMessage(newMessage);
  };

  const filteredMessages = messages.filter((message) => {
    const matchesTag = filterTag === "All" || message.tag === filterTag;
    const matchesSearch =
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-black">Message Board</h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage community announcements
            </p>
          </div>
          <UserProfile />
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-black">All Messages</h2>
                <span className="text-sm text-gray-500">
                  {filteredMessages.length} total
                </span>
              </div>

              <div className="relative mb-4">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA372] text-sm text-black"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilterTag("All")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    filterTag === "All"
                      ? "bg-[#1FA372] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterTag("Event")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    filterTag === "Event"
                      ? "bg-[#1FA372] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Event
                </button>
                <button
                  onClick={() => setFilterTag("Alert")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    filterTag === "Alert"
                      ? "bg-[#1FA372] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Alert
                </button>
                <button
                  onClick={() => setFilterTag("Info")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    filterTag === "Info"
                      ? "bg-[#1FA372] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Info
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <MessageList
                messages={filteredMessages}
                selectedMessageId={selectedMessage?.id}
                onSelectMessage={setSelectedMessage}
              />
            </div>
          </div>

          <div className="flex-1 bg-white overflow-y-auto">
            {selectedMessage ? (
              <MessageDetails message={selectedMessage} />
            ) : (
              <div className="h-full flex items-center justify-center text-black text-base font-medium">
                <div className="text-center">
                  <i className="ri-message-3-line text-6xl text-gray-300 mb-4"></i>
                  <p className="text-lg font-medium text-gray-500">
                    Select a message to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateAnnouncementModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateAnnouncement}
      />
    </div>
  );
}
