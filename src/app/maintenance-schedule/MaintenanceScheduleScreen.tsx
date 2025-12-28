'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

interface ServiceRecord {
  id: string;
  schedule: string;
  serviceType: string;
  description: string;
  frequency: string;
  responsibleParty: string;
  category: string;
  vendorDetails: {
    businessName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  isEditing?: boolean;
  isAdded?: boolean;
}

export default function MaintenanceScheduleScreen() {
  const [scheduledServices, setScheduledServices] = useState<ServiceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [currentVendorId, setCurrentVendorId] = useState<string>('');

  const sampleServices: ServiceRecord[] = [
    {
      id: '1',
      schedule: 'Monthly',
      serviceType: 'Elevator Maintenance',
      description: 'Inspection, lubrication, safety testing',
      frequency: 'Monthly / Quarterly',
      responsibleParty: 'Maintenance Vendor',
      category: 'Building & Structural Maintenance',
      vendorDetails: {
        businessName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      isAdded: false
    },
    {
      id: '2',
      schedule: 'Weekly',
      serviceType: 'Pool Cleaning',
      description: 'Chemical balance, debris removal, filter cleaning',
      frequency: 'Weekly',
      responsibleParty: 'Pool Service Company',
      category: 'Amenity Maintenance',
      vendorDetails: {
        businessName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      isAdded: false
    },
    {
      id: '3',
      schedule: 'Quarterly',
      serviceType: 'HVAC System Check',
      description: 'Filter replacement, system inspection, cleaning',
      frequency: 'Quarterly',
      responsibleParty: 'HVAC Contractor',
      category: 'Building & Structural Maintenance',
      vendorDetails: {
        businessName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      isAdded: false
    },
    {
      id: '4',
      schedule: 'Bi-Annual',
      serviceType: 'Fire Safety Inspection',
      description: 'Alarm testing, extinguisher check, exit signs',
      frequency: 'Bi-Annual',
      responsibleParty: 'Fire Safety Company',
      category: 'Safety & Security',
      vendorDetails: {
        businessName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      isAdded: false
    },
    {
      id: '5',
      schedule: 'Monthly',
      serviceType: 'Landscaping',
      description: 'Lawn care, pruning, seasonal planting',
      frequency: 'Monthly',
      responsibleParty: 'Landscaping Company',
      category: 'Grounds Maintenance',
      vendorDetails: {
        businessName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      isAdded: false
    }
  ];

  const filteredServices = sampleServices.filter(service =>
    service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFromSample = (sampleId: string) => {
    const service = sampleServices.find(s => s.id === sampleId);
    if (service) {
      const newService = { 
        ...service, 
        id: Date.now().toString(),
        schedule: '',
        isEditing: true,
        isAdded: true
      };
      setScheduledServices(prev => [...prev, newService]);
    }
  };

  const handleAddEmpty = () => {
    const newService: ServiceRecord = {
      id: Date.now().toString(),
      schedule: '',
      serviceType: '',
      description: '',
      frequency: '',
      responsibleParty: '',
      category: '',
      vendorDetails: {
        businessName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      isEditing: true
    };
    setScheduledServices(prev => [...prev, newService]);
  };

  const isSampleAdded = (sampleId: string) => {
    const service = sampleServices.find(s => s.id === sampleId);
    return scheduledServices.some(r => 
      r.serviceType === service?.serviceType && 
      r.description === service?.description &&
      r.frequency === service?.frequency
    );
  };

  const handleSave = () => {
    setScheduledServices(prev => 
      prev.map(service => ({ ...service, isEditing: false }))
    );
  };

  const handleEdit = (id: string) => {
    setScheduledServices(prev =>
      prev.map(service => 
        service.id === id ? { ...service, isEditing: true } : service
      )
    );
  };

  const handleDelete = () => {
    setScheduledServices(prev => 
      prev.filter(service => !selectedRows.includes(service.id))
    );
    setSelectedRows([]);
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleFieldChange = (id: string, field: keyof ServiceRecord, value: string) => {
    setScheduledServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const handleVendorDetailsClick = (id: string) => {
    setCurrentVendorId(id);
    setShowVendorModal(true);
  };

  const handleVendorFieldChange = (field: keyof ServiceRecord['vendorDetails'], value: string) => {
    setScheduledServices(prev =>
      prev.map(service =>
        service.id === currentVendorId 
          ? { 
              ...service, 
              vendorDetails: {
                ...service.vendorDetails,
                [field]: value
              }
            } 
          : service
      )
    );
  };

  const handleVendorSave = () => {
    setShowVendorModal(false);
    setCurrentVendorId('');
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCurrentVendorDetails = () => {
    const service = scheduledServices.find(s => s.id === currentVendorId);
    return service?.vendorDetails || {
      businessName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    };
  };

  return (
    <div className="flex min-h-screen bg-[#1E293B]">
      <Sidebar />
      
      <div className="lg:ml-[260px] m-[10px] bg-white rounded-lg h-[calc(100vh-20px)] flex flex-col flex-1">
        <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
                  <i className="ri-notification-3-line text-gray-600 text-lg"></i>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">3</span>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                <div className="font-bold">Sunset Gardens Community</div>
                <div className="text-xs text-gray-500">1234 Garden View Drive, Miami, FL 33101</div>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-gray-600"></i>
                </div>
                <i className="ri-arrow-down-s-line text-gray-600"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-[#F9FAFB]">
          <div className="bg-white rounded-lg border border-gray-200 flex flex-col" style={{ maxHeight: 'calc(50vh - 100px)' }}>
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Services</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAddEmpty}
                    className="px-4 py-2 bg-[#1FA372] text-white text-sm font-medium rounded-md hover:bg-[#188f5f] whitespace-nowrap cursor-pointer"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#1FA372] text-white text-sm font-medium rounded-md hover:bg-[#188f5f] whitespace-nowrap cursor-pointer"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => selectedRows.length > 0 && handleEdit(selectedRows[0])}
                    disabled={selectedRows.length !== 1}
                    className="px-4 py-2 bg-[#1FA372] text-white text-sm font-medium rounded-md hover:bg-[#188f5f] whitespace-nowrap cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={handleDelete}
                    disabled={selectedRows.length === 0}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: '#DCDCDC' }}>
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRows(scheduledServices.map(s => s.id));
                            } else {
                              setSelectedRows([]);
                            }
                          }}
                          checked={selectedRows.length === scheduledServices.length && scheduledServices.length > 0}
                          className="cursor-pointer"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Service Type
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Frequency
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Responsible Party
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider" style={{ color: '#000000' }}>
                        Vendor Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scheduledServices.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                            <p className="text-gray-500">Click Add button from sample records below or create a new empty record</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      scheduledServices.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(service.id)}
                              onChange={() => handleRowSelect(service.id)}
                              className="cursor-pointer"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                            {service.isEditing ? (
                              <input
                                type="date"
                                value={formatDateForInput(service.schedule)}
                                onChange={(e) => handleFieldChange(service.id, 'schedule', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              formatDateForDisplay(service.schedule) || service.schedule
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                            {service.isEditing ? (
                              <input
                                type="text"
                                value={service.serviceType}
                                onChange={(e) => handleFieldChange(service.id, 'serviceType', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              service.serviceType
                            )}
                          </td>
                          <td className="px-6 py-4 text-base text-black font-medium border-r border-gray-200">
                            {service.isEditing ? (
                              <textarea
                                value={service.description}
                                onChange={(e) => handleFieldChange(service.id, 'description', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={2}
                              />
                            ) : (
                              service.description
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                            {service.isEditing ? (
                              <input
                                type="text"
                                value={service.frequency}
                                onChange={(e) => handleFieldChange(service.id, 'frequency', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              service.frequency
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                            {service.isEditing ? (
                              <input
                                type="text"
                                value={service.responsibleParty}
                                onChange={(e) => handleFieldChange(service.id, 'responsibleParty', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              service.responsibleParty
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                            {service.isEditing ? (
                              <input
                                type="text"
                                value={service.category}
                                onChange={(e) => handleFieldChange(service.id, 'category', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              service.category
                            )}
                          </td>
                          <td className="px-6 py-4 text-base text-black font-medium">
                            {service.isEditing ? (
                              <button
                                onClick={() => handleVendorDetailsClick(service.id)}
                                className="text-[#1FA372] hover:text-[#188f5f] underline cursor-pointer"
                              >
                                Vendor Details
                              </button>
                            ) : (
                              service.vendorDetails.businessName || 
                              service.vendorDetails.firstName || 
                              service.vendorDetails.lastName ||
                              service.vendorDetails.email || 
                              service.vendorDetails.phoneNumber ? (
                                <div className="space-y-1">
                                  {service.vendorDetails.businessName && (
                                    <div className="text-base font-medium text-black">
                                      {service.vendorDetails.businessName}
                                    </div>
                                  )}
                                  {(service.vendorDetails.firstName || service.vendorDetails.lastName) && (
                                    <div className="text-base text-black font-medium">
                                      {[service.vendorDetails.firstName, service.vendorDetails.lastName].filter(Boolean).join(' ')}
                                    </div>
                                  )}
                                  {service.vendorDetails.email && (
                                    <div className="text-base text-black font-medium">
                                      {service.vendorDetails.email}
                                    </div>
                                  )}
                                  {service.vendorDetails.phoneNumber && (
                                    <div className="text-base text-black font-medium">
                                      {service.vendorDetails.phoneNumber}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400 text-base">No vendor details</span>
                              )
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 flex flex-col" style={{ maxHeight: 'calc(50vh - 100px)' }}>
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Services</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-search-line text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Search here"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="px-4 py-2 bg-[#1FA372] text-white text-sm font-medium rounded-md hover:bg-[#188f5f] whitespace-nowrap cursor-pointer">
                    Sample
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: '#DCDCDC' }}>
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Service Type
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Frequency
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Responsible Party
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-r border-gray-200" style={{ color: '#000000' }}>
                        Vendor Details
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider" style={{ color: '#000000' }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                          {service.serviceType}
                        </td>
                        <td className="px-6 py-4 text-base text-black font-medium border-r border-gray-200">
                          {service.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                          {service.frequency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                          {service.responsibleParty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium border-r border-gray-200">
                          {service.category}
                        </td>
                        <td className="px-6 py-4 text-base text-black font-medium border-r border-gray-200">
                          <button className="text-[#1FA372] hover:text-[#188f5f] underline cursor-pointer">
                            Vendor Details
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-black font-medium">
                          <button
                            onClick={() => handleAddFromSample(service.id)}
                            disabled={isSampleAdded(service.id)}
                            className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap cursor-pointer ${
                              isSampleAdded(service.id)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#1FA372] text-white hover:bg-[#188f5f]'
                            }`}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVendorModal && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Vendor Details</h3>
                <button
                  onClick={() => setShowVendorModal(false)}
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={getCurrentVendorDetails().businessName}
                  onChange={(e) => handleVendorFieldChange('businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={getCurrentVendorDetails().firstName}
                  onChange={(e) => handleVendorFieldChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={getCurrentVendorDetails().lastName}
                  onChange={(e) => handleVendorFieldChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={getCurrentVendorDetails().email}
                  onChange={(e) => handleVendorFieldChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={getCurrentVendorDetails().phoneNumber}
                  onChange={(e) => handleVendorFieldChange('phoneNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleVendorSave}
                className="px-4 py-2 bg-[#1FA372] text-white text-sm font-medium rounded-md hover:bg-[#188f5f] whitespace-nowrap cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
