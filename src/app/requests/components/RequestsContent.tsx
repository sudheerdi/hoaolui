import { useState } from 'react';
import RequestsTable from './RequestsTable';
import RequestsDrawer from './RequestsDrawer';
import SendRequestModal from './SendRequestModal';

interface Request {
  id: number;
  type: string;
  description: string;
  date: string;
  status: string;
  priority: string;
  submittedBy: string;
  assignedTo: string;
  details: string;
}

export default function RequestsContent() {
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSendRequest, setShowSendRequest] = useState(false);

  const openRequests: Request[] = [
    {
      id: 1,
      type: 'General Request',
      description: 'Request for pool access card replacement',
      date: '2024-01-15',
      status: 'Pending Review',
      priority: 'Medium',
      submittedBy: 'John Smith',
      assignedTo: 'HOA Admin',
      details: 'Lost pool access card during vacation. Need replacement as soon as possible.'
    },
    {
      id: 2,
      type: 'Architectural Request',
      description: 'Permission to install solar panels',
      date: '2024-01-12',
      status: 'Under Review',
      priority: 'High',
      submittedBy: 'Sarah Johnson',
      assignedTo: 'Architecture Committee',
      details: 'Planning to install solar panels on roof. Attached design plans and specifications.'
    },
    {
      id: 3,
      type: 'Unit Maintenance',
      description: 'HVAC system not working properly',
      date: '2024-01-10',
      status: 'In Progress',
      priority: 'High',
      submittedBy: 'Michael Brown',
      assignedTo: 'Maintenance Team',
      details: 'Air conditioning unit making loud noises and not cooling effectively.'
    },
    {
      id: 4,
      type: 'Reserve',
      description: 'Community room reservation for birthday party',
      date: '2024-01-08',
      status: 'Pending Review',
      priority: 'Low',
      submittedBy: 'Emily Davis',
      assignedTo: 'HOA Admin',
      details: 'Would like to reserve community room for birthday celebration on February 15th.'
    },
    {
      id: 5,
      type: 'General Request',
      description: 'Request for parking permit for guest',
      date: '2024-01-05',
      status: 'Pending Review',
      priority: 'Medium',
      submittedBy: 'David Wilson',
      assignedTo: 'HOA Admin',
      details: 'Need temporary parking permit for visiting family member staying for two weeks.'
    }
  ];

  const closedRequests: Request[] = [
    {
      id: 6,
      type: 'General Request',
      description: 'Request for mailbox key replacement',
      date: '2023-12-20',
      status: 'Completed',
      priority: 'Medium',
      submittedBy: 'Lisa Anderson',
      assignedTo: 'HOA Admin',
      details: 'Lost mailbox key. Replacement provided on 2024-01-05.'
    },
    {
      id: 7,
      type: 'Architectural Request',
      description: 'Permission to paint front door',
      date: '2023-12-15',
      status: 'Approved',
      priority: 'Low',
      submittedBy: 'Robert Taylor',
      assignedTo: 'Architecture Committee',
      details: 'Request to paint front door navy blue. Approved with color sample.'
    },
    {
      id: 8,
      type: 'Unit Maintenance',
      description: 'Leaking faucet in kitchen',
      date: '2023-12-10',
      status: 'Completed',
      priority: 'Medium',
      submittedBy: 'Jennifer Martinez',
      assignedTo: 'Maintenance Team',
      details: 'Kitchen faucet was leaking. Repaired on 2023-12-18.'
    }
  ];

  const filteredRequests = activeTab === 'open' ? openRequests : closedRequests;

  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request);
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setSelectedRequest(null);
  };

  return (
    <div className="relative h-full">
      {/* Main Content */}
      <div className={`h-full transition-all duration-300 ${showDrawer ? 'pr-96' : ''}`}>
        <div className="h-full flex flex-col">
          {/* Tabs and Search */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-full">
                <button
                  onClick={() => setActiveTab('open')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'open'
                      ? 'bg-[#1FA372] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Open
                </button>
                <button
                  onClick={() => setActiveTab('closed')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'closed'
                      ? 'bg-[#1FA372] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Closed
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-3 py-2 pl-9 w-64"
                />
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"></i>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <RequestsTable 
              requests={filteredRequests}
              onRequestClick={handleRequestClick}
              selectedRequestId={selectedRequest?.id}
            />
          </div>
        </div>
      </div>

      {/* Drawer - Absolute positioned */}
      {showDrawer && selectedRequest && (
        <div className="absolute top-0 right-0 h-full w-96">
          <RequestsDrawer
            request={selectedRequest}
            onClose={handleCloseDrawer}
          />
        </div>
      )}

      {/* Send Request Modal */}
      {showSendRequest && (
        <SendRequestModal onClose={() => setShowSendRequest(false)} />
      )}
    </div>
  );
}
