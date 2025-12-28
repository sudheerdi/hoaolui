'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ViolationDetails from './ViolationDetails';

interface Violation {
  id: string;
  violationId: string;
  memberName: string;
  memberEmail: string;
  memberUnit: string;
  violationType: string;
  description: string;
  fullDescription: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'resolved' | 'pending';
  date: string;
  reportedBy: string;
  photos?: string[];
  icon: string;
  location: string;
  resolutionNotes?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  unit: string;
}

interface ViolationType {
  id: string;
  name: string;
  defaultContent: string;
  severity: 'low' | 'medium' | 'high';
  icon: string;
}

export default function ViolationsScreen() {
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('open');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSendViolationModal, setShowSendViolationModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedViolationType, setSelectedViolationType] = useState('');
  const [violationContent, setViolationContent] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const mockUsers: User[] = [
    { id: '1', name: 'John Smith', email: 'john.smith@email.com', unit: 'Unit 4B' },
    { id: '2', name: 'Maria Garcia', email: 'maria.garcia@email.com', unit: 'Unit 7C' },
    { id: '3', name: 'Robert Johnson', email: 'robert.johnson@email.com', unit: 'Unit 2A' },
    { id: '4', name: 'Lisa Chen', email: 'lisa.chen@email.com', unit: 'Unit 5D' },
    { id: '5', name: 'David Wilson', email: 'david.wilson@email.com', unit: 'Unit 8A' },
    { id: '6', name: 'Jennifer Lee', email: 'jennifer.lee@email.com', unit: 'Unit 3B' },
    { id: '7', name: 'Michael Brown', email: 'michael.brown@email.com', unit: 'Unit 6C' },
    { id: '8', name: 'Sarah Davis', email: 'sarah.davis@email.com', unit: 'Unit 1A' },
    { id: '9', name: 'James Wilson', email: 'james.wilson@email.com', unit: 'Unit 9A' },
    { id: '10', name: 'Emily Rodriguez', email: 'emily.rodriguez@email.com', unit: 'Unit 10B' }
  ];

  const violationTypes: ViolationType[] = [
    {
      id: '1',
      name: 'Parking Violation',
      defaultContent: 'Your vehicle has been found in violation of the community parking regulations. Please ensure your vehicle is parked only in designated areas and follows all posted parking guidelines. Continued violations may result in towing at owner\'s expense.',
      severity: 'medium',
      icon: '🚗'
    },
    {
      id: '2',
      name: 'Noise Violation',
      defaultContent: 'We have received complaints regarding excessive noise from your unit during quiet hours (10 PM - 7 AM). Please be mindful of noise levels to maintain a peaceful environment for all residents. This includes music, television, conversations, and other activities.',
      severity: 'medium',
      icon: '🔊'
    },
    {
      id: '3',
      name: 'Pet Violation',
      defaultContent: 'Your pet has been observed violating community pet policies. All pets must be leashed in common areas, and owners are responsible for cleaning up after their pets. Please review the pet policy in your lease agreement.',
      severity: 'high',
      icon: '🐕'
    },
    {
      id: '4',
      name: 'Trash Violation',
      defaultContent: 'Improper waste disposal has been observed. Please ensure all trash is placed in designated containers and areas only on collection days. Do not leave trash bags outside designated areas as this attracts pests and creates unsanitary conditions.',
      severity: 'low',
      icon: '🗑️'
    },
    {
      id: '5',
      name: 'Smoking Violation',
      defaultContent: 'Smoking has been observed in non-smoking areas of the community. Please note that smoking is prohibited in all indoor common areas, elevators, and designated non-smoking zones. Please use designated smoking areas only.',
      severity: 'medium',
      icon: '🚭'
    },
    {
      id: '6',
      name: 'Pool Violation',
      defaultContent: 'Pool facility rules have been violated. Please observe posted pool hours, guest policies, and safety regulations. Children must be supervised at all times. No glass containers, loud music, or inappropriate behavior is permitted in the pool area.',
      severity: 'medium',
      icon: '🏊'
    },
    {
      id: '7',
      name: 'Balcony Violation',
      defaultContent: 'Unauthorized modifications or items have been observed on your balcony. All balcony modifications must be pre-approved by the HOA. Please remove any unauthorized items and submit proper requests for any desired changes.',
      severity: 'low',
      icon: '🏠'
    },
    {
      id: '8',
      name: 'Guest Violation',
      defaultContent: 'Guest policy violations have been observed. All overnight guests must be registered with management for stays longer than 3 consecutive days. Please ensure your guests follow all community rules and regulations during their visit.',
      severity: 'medium',
      icon: '👥'
    },
    {
      id: '9',
      name: 'Other Violations',
      defaultContent: 'A violation of community rules and regulations has been observed. Please review your lease agreement and community guidelines to ensure compliance with all policies. Contact the management office if you have any questions about community rules.',
      severity: 'medium',
      icon: '⚠️'
    }
  ];

  const mockViolations: Violation[] = [
    {
      id: '1',
      violationId: 'VIO-2024-001',
      memberName: 'John Smith',
      memberEmail: 'john.smith@email.com',
      memberUnit: 'Unit 4B',
      violationType: 'Parking Violation',
      description: 'Vehicle parked in fire lane',
      fullDescription: 'Red Honda Civic (License: XYZ-789) parked in designated fire lane for over 2 hours. Vehicle was blocking emergency access route. Multiple residents reported the violation. Owner was contacted but vehicle remained in violation.',
      severity: 'high',
      status: 'open',
      date: '2024-01-15',
      reportedBy: 'Security Guard',
      photos: ['parking-violation-1.jpg', 'parking-violation-2.jpg'],
      icon: '🚗',
      location: 'Building A - Fire Lane',
      resolutionNotes: ''
    },
    {
      id: '2',
      violationId: 'VIO-2024-002',
      memberName: 'Maria Garcia',
      memberEmail: 'maria.garcia@email.com',
      memberUnit: 'Unit 7C',
      violationType: 'Noise Violation',
      description: 'Loud music after quiet hours',
      fullDescription: 'Excessive noise levels reported from Unit 7C during quiet hours (10 PM - 7 AM). Multiple neighbors complained about loud music and party sounds continuing until 2:30 AM. This is the third noise violation this month.',
      severity: 'medium',
      status: 'pending',
      date: '2024-01-14',
      reportedBy: 'Multiple Residents',
      photos: ['noise-complaint.jpg'],
      icon: '🔊',
      location: 'Building B - Unit 7C',
      resolutionNotes: 'Warning issued. Resident agreed to keep noise levels down.'
    },
    {
      id: '3',
      violationId: 'VIO-2024-003',
      memberName: 'Robert Johnson',
      memberEmail: 'robert.johnson@email.com',
      memberUnit: 'Unit 2A',
      violationType: 'Pet Violation',
      description: 'Unleashed dog in common area',
      fullDescription: 'Large dog observed running unleashed in the central courtyard and playground area. Pet policy clearly states all dogs must be leashed in common areas. Dog was aggressive toward children playing in the area.',
      severity: 'high',
      status: 'resolved',
      date: '2024-01-13',
      reportedBy: 'Resident Parent',
      photos: ['unleashed-dog.jpg'],
      icon: '🐕',
      location: 'Central Courtyard',
      resolutionNotes: 'Owner fined $150. Agreed to keep dog leashed. No further incidents reported.'
    },
    {
      id: '4',
      violationId: 'VIO-2024-004',
      memberName: 'Lisa Chen',
      memberEmail: 'lisa.chen@email.com',
      memberUnit: 'Unit 5D',
      violationType: 'Trash Violation',
      description: 'Improper waste disposal',
      fullDescription: 'Household trash left outside designated collection area. Bags were torn open by animals, creating mess and attracting pests. Violation of community waste management policy.',
      severity: 'low',
      status: 'resolved',
      date: '2024-01-12',
      reportedBy: 'Maintenance Staff',
      photos: ['trash-violation.jpg'],
      icon: '🗑️',
      location: 'Building C - Rear Entrance',
      resolutionNotes: 'Resident educated on proper disposal procedures. Area cleaned.'
    },
    {
      id: '5',
      violationId: 'VIO-2024-005',
      memberName: 'David Wilson',
      memberEmail: 'david.wilson@email.com',
      memberUnit: 'Unit 8A',
      violationType: 'Smoking Violation',
      description: 'Smoking in non-smoking area',
      fullDescription: 'Resident observed smoking cigarettes in the lobby and elevator areas. Community is designated as smoke-free in all indoor common areas. Multiple residents complained about smoke odor.',
      severity: 'medium',
      status: 'open',
      date: '2024-01-11',
      reportedBy: 'Front Desk Staff',
      photos: [],
      icon: '🚭',
      location: 'Main Lobby',
      resolutionNotes: ''
    },
    {
      id: '6',
      violationId: 'VIO-2024-006',
      memberName: 'Jennifer Lee',
      memberEmail: 'jennifer.lee@email.com',
      memberUnit: 'Unit 3B',
      violationType: 'Pool Violation',
      description: 'Pool use after hours',
      fullDescription: 'Resident and guests using pool facilities after 10 PM closing time. Pool area was left unsecured with lights on and equipment scattered around. Security cameras captured the violation.',
      severity: 'medium',
      status: 'pending',
      date: '2024-01-10',
      reportedBy: 'Security System',
      photos: ['pool-after-hours.jpg'],
      icon: '🏊',
      location: 'Pool Area',
      resolutionNotes: 'First warning issued. Pool access card temporarily suspended.'
    },
    {
      id: '7',
      violationId: 'VIO-2024-007',
      memberName: 'Michael Brown',
      memberEmail: 'michael.brown@email.com',
      memberUnit: 'Unit 6C',
      violationType: 'Balcony Violation',
      description: 'Unauthorized balcony modifications',
      fullDescription: 'Resident installed unauthorized awning and decorative elements on balcony without HOA approval. Modifications do not comply with community aesthetic guidelines and may violate building codes.',
      severity: 'low',
      status: 'open',
      date: '2024-01-09',
      reportedBy: 'HOA Inspector',
      photos: ['balcony-modification.jpg'],
      icon: '🏠',
      location: 'Building B - Unit 6C Balcony',
      resolutionNotes: ''
    },
    {
      id: '8',
      violationId: 'VIO-2024-008',
      memberName: 'Sarah Davis',
      memberEmail: 'sarah.davis@email.com',
      memberUnit: 'Unit 1A',
      violationType: 'Guest Violation',
      description: 'Unregistered overnight guests',
      fullDescription: 'Multiple unregistered guests staying overnight for extended period (5+ days). Community policy requires guest registration for stays longer than 3 consecutive days. Parking violations also occurred.',
      severity: 'medium',
      status: 'resolved',
      date: '2024-01-08',
      reportedBy: 'Property Manager',
      photos: [],
      icon: '👥',
      location: 'Unit 1A',
      resolutionNotes: 'Guests registered retroactively. $75 fine applied. Policy explained to resident.'
    }
  ];

  const filteredViolations = mockViolations.filter(violation => {
    const matchesSearch = violation.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.violationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.violationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || violation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredViolations.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentViolations = filteredViolations.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.unit.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const handleUserSelect = (user: User) => {
    setSelectedUser(user.id);
    setUserSearchTerm(`${user.name} - ${user.unit}`);
    setShowUserDropdown(false);
  };

  const handleViolationTypeChange = (typeId: string) => {
    setSelectedViolationType(typeId);
    const selectedType = violationTypes.find(type => type.id === typeId);
    if (selectedType) {
      setViolationContent(selectedType.defaultContent);
    } else {
      setViolationContent('');
    }
  };

  const handleSendViolation = () => {
    if (!selectedUser || !selectedViolationType || !violationContent.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const user = mockUsers.find(u => u.id === selectedUser);
    const violationType = violationTypes.find(vt => vt.id === selectedViolationType);
    
    if (user && violationType) {
      alert(`Violation notice sent to ${user.name} (${user.unit}) for ${violationType.name}`);
      setShowSendViolationModal(false);
      setSelectedUser('');
      setSelectedViolationType('');
      setViolationContent('');
      setUserSearchTerm('');
    }
  };

  const getStatusChip = (status: string) => {
    const styles = {
      open: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      resolved: 'bg-green-100 text-green-800 border-green-200'
    };
    
    const labels = {
      open: 'Open',
      pending: 'Pending',
      resolved: 'Resolved'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const openViolationsCount = mockViolations.filter(v => v.status === 'open').length;
  const resolvedViolationsCount = mockViolations.filter(v => v.status === 'resolved').length;

  const getStatusDisplay = (status: string) => {
    if (status === 'open') {
      return (
        <div className="w-full bg-red-100 rounded-full h-2">
          <div className="bg-red-400 h-2 rounded-full w-3/12"></div>
        </div>
      );
    } else if (status === 'pending') {
      return (
        <div className="w-full bg-orange-100 rounded-full h-2">
          <div className="bg-orange-400 h-2 rounded-full w-7/12"></div>
        </div>
      );
    } else {
      return (
        <div className="w-full bg-green-100 rounded-full h-2">
          <div className="bg-green-400 h-2 rounded-full w-full"></div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#1E293B] p-[10px]">
      <Sidebar />
      
      <div className="lg:ml-[260px] bg-white rounded-lg min-h-[calc(100vh-20px)] flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <i className="ri-alert-line text-red-500"></i>
                  <span className="text-sm font-bold text-black">Open :</span>
                  <span className="text-sm font-bold text-red-600">{openViolationsCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-check-line text-green-500"></i>
                  <span className="text-sm font-bold text-black">Resolved :</span>
                  <span className="text-sm font-bold text-green-600">{resolvedViolationsCount}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSendViolationModal(true)}
                className="bg-[#1FA372] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#188f5f] transition-colors whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Send Violation
              </button>
              
              <div className="relative">
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                  <i className="ri-notification-3-line text-lg"></i>
                </button>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Community Name</p>
                  <p className="text-xs text-gray-500">Community Address</p>
                </div>
                <div className="relative">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20woman%20with%20friendly%20smile%20wearing%20business%20casual%20attire%20headshot%20portrait%20photo%20with%20clean%20white%20background%20modern%20corporate%20style%20high%20quality&width=80&height=80&seq=user-profile-001&orientation=squarish"
                    alt="Community"
                    className="w-10 h-10 rounded-full object-cover border-2 border-teal-600"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden bg-[#F9FAFB]">
          <div className={`flex-1 transition-all duration-300 ${selectedViolation ? 'mr-[384px]' : ''}`}>
            <div className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
              {/* Single Card with Tabs and Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Tabs Header */}
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-between px-6">
                    <nav className="flex space-x-8">
                      <button
                        onClick={() => setStatusFilter('open')}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap ${
                          statusFilter === 'open'
                            ? 'border-[#1FA372] text-[#1FA372]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <i className="ri-alert-line text-lg"></i>
                        <span>Open</span>
                      </button>
                      <button
                        onClick={() => setStatusFilter('resolved')}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap ${
                          statusFilter === 'resolved'
                            ? 'border-[#1FA372] text-[#1FA372]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <i className="ri-check-line text-lg"></i>
                        <span>Resolved</span>
                      </button>
                    </nav>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="ri-search-line text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Search violations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead style={{ backgroundColor: '#DCDCDC' }}>
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                            Member
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                            Address
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentViolations.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="ri-shield-check-line text-2xl text-gray-400"></i>
                              </div>
                              <h3 className="text-sm font-medium text-gray-900 mb-1">No violations found</h3>
                              <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                            </td>
                          </tr>
                        ) : (
                          currentViolations.map((violation) => (
                            <tr 
                              key={violation.id} 
                              className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedViolation?.id === violation.id ? 'bg-green-50 border-l-4 border-l-teal-600' : ''}`}
                              onClick={() => setSelectedViolation(violation)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-base font-medium text-black">{violation.memberName}</div>
                                  <div className="text-base font-medium text-black">{violation.memberEmail}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-base font-medium text-black">{violation.memberUnit}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-base font-medium text-black">{violation.violationType}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusDisplay(violation.status)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-base font-medium text-black" suppressHydrationWarning={true}>
                                  {new Date(violation.date).toLocaleDateString()}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {filteredViolations.length > 0 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Rows per page:</span>
                        <select
                          value={rowsPerPage}
                          onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                          className="pr-8 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {startIndex + 1}-{Math.min(endIndex, filteredViolations.length)} of {filteredViolations.length}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                          >
                            Previous
                          </button>
                          <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Panel */}
          {selectedViolation && (
            <ViolationDetails 
              violation={selectedViolation}
              onClose={() => setSelectedViolation(null)}
            />
          )}
        </div>
      </div>

      {/* Send Violation Modal */}
      {showSendViolationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Send Violation Notice</h3>
              <button
                onClick={() => {
                  setShowSendViolationModal(false);
                  setSelectedUser('');
                  setSelectedViolationType('');
                  setViolationContent('');
                  setUserSearchTerm('');
                  setShowUserDropdown(false);
                }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* Search Resident */}
              <div>
                <label className="block text-base font-medium text-black mb-2">
                  Search Resident <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    value={userSearchTerm}
                    onChange={(e) => {
                      setUserSearchTerm(e.target.value);
                      setShowUserDropdown(true);
                      if (!e.target.value) {
                        setSelectedUser('');
                      }
                    }}
                    onFocus={() => setShowUserDropdown(true)}
                    placeholder="Search by name or unit number..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  
                  {/* Search Dropdown */}
                  {showUserDropdown && userSearchTerm && filteredUsers.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredUsers.map(user => (
                        <button
                          key={user.id}
                          onClick={() => handleUserSelect(user)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.unit} • {user.email}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Violation Type Selection */}
              <div>
                <label className="block text-base font-medium text-black mb-3">
                  Violation Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {violationTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => handleViolationTypeChange(type.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-center hover:border-teal-300 ${
                        selectedViolationType === type.id
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-xs font-medium leading-tight">{type.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Violation Content */}
              <div>
                <label className="block text-base font-medium text-black mb-2">
                  Violation Notice Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={violationContent}
                  onChange={(e) => setViolationContent(e.target.value)}
                  placeholder="Select a violation type to see default content, or write your own message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  rows={8}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    You can edit the default content or write your own message
                  </p>
                  <p className="text-xs text-gray-500">
                    {violationContent.length}/500 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => {
                  setShowSendViolationModal(false);
                  setSelectedUser('');
                  setSelectedViolationType('');
                  setViolationContent('');
                  setUserSearchTerm('');
                  setShowUserDropdown(false);
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleSendViolation}
                disabled={!selectedUser || !selectedViolationType || !violationContent.trim()}
                className="flex-1 bg-[#1FA372] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#188f5f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Send Violation Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
