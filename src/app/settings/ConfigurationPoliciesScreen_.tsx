'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';
import UserProfile from '../../components/UserProfile';

interface ViolationFeeRow {
  id: string;
  type: string;
  compliancePeriod: string;
  responsePeriod: string;
  fine: string;
  interestRate: string;
  lateFeePolicy: string;
  notes: string;
  isAdded: boolean;
}

const sampleViolations: ViolationFeeRow[] = [
  {
    id: '1',
    type: 'Minor Maintenance (Grass, Trash Area, Mailbox/unit, Guest)',
    compliancePeriod: '7-14 days',
    responsePeriod: '5 days',
    fine: '$5',
    interestRate: '—',
    lateFeePolicy: 'Flat $5 if unpaid after 15 days',
    notes: 'Provides fair window for homeowners to correct minor issues.',
    isAdded: false
  },
  {
    id: '2',
    type: 'Pets (Noise, Parking)',
    compliancePeriod: '5-7 days',
    responsePeriod: '5 days',
    fine: '$5',
    interestRate: '—',
    lateFeePolicy: '$5 or 5% per month on unpaid balance',
    notes: 'These violations can usually be resolved quickly.',
    isAdded: false
  },
  {
    id: '3',
    type: 'Major or Architectural',
    compliancePeriod: '15-30 days',
    responsePeriod: '5 days',
    fine: '$5',
    interestRate: '—',
    lateFeePolicy: '$5 or 5% per month on unpaid balance',
    notes: 'Allows sufficient time to submit architectural requests or obtain approval.',
    isAdded: false
  },
  {
    id: '4',
    type: 'Fence, Construction without approval, Mechanical Repair',
    compliancePeriod: '24-72 hours',
    responsePeriod: '24 hours',
    fine: '$5',
    interestRate: '—',
    lateFeePolicy: 'Immediate fine, $25 one fee if unresolved',
    notes: 'Immediate action required. HOA may take immediate action required. HOA may take immediate action required.',
    isAdded: false
  }
];

export default function ConfigurationPoliciesScreen() {
  const [activeTab, setActiveTab] = useState('violations');
  const [topTableRows, setTopTableRows] = useState<ViolationFeeRow[]>([]);
  const [sampleRows, setSampleRows] = useState<ViolationFeeRow[]>(sampleViolations);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<ViolationFeeRow>>({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleAddRow = (row: ViolationFeeRow) => {
    setTopTableRows([...topTableRows, { ...row, isAdded: true }]);
    setSampleRows(sampleRows.map(r => r.id === row.id ? { ...r, isAdded: true } : r));
  };

  const handleDeleteRow = (rowId: string) => {
    setTopTableRows(topTableRows.filter(r => r.id !== rowId));
    setSampleRows(sampleRows.map(r => r.id === rowId ? { ...r, isAdded: false } : r));
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      newSet.delete(rowId);
      return newSet;
    });
  };

  const handleSelectRow = (rowId: string) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  const handleEdit = (row: ViolationFeeRow) => {
    setEditingRow(row.id);
    setEditedData(row);
  };

  const handleSaveEdit = () => {
    if (editingRow) {
      setTopTableRows(topTableRows.map(r => 
        r.id === editingRow ? { ...r, ...editedData } : r
      ));
      setEditingRow(null);
      setEditedData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedData({});
  };

  const handleInputChange = (field: keyof ViolationFeeRow, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const renderTableCell = (row: ViolationFeeRow, field: keyof ViolationFeeRow, isEditing: boolean) => {
    if (field === 'id' || field === 'isAdded') return null;
    
    if (isEditing && editingRow === row.id) {
      return (
        <input
          type="text"
          value={(editedData[field] as string) || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-medium text-black"
        />
      );
    }
    
    return <span className="text-sm text-black font-medium">{row[field]}</span>;
  };

  return (
    <div className="min-h-screen bg-[#1E293B] overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowMobileMenu(false)}>
          <div className="bg-[#1E293B] w-[280px] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="text-white text-xl font-bold">Menu</div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      <div className="ml-0 lg:ml-[260px] p-[10px] h-screen flex flex-col">
        <div className="bg-[#F9FAFB] rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
          <div className="bg-white px-4 py-2 flex-shrink-0 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-menu-line text-xl"></i>
                </button>
                <div>
                  <div className="text-xl font-bold text-black">Configuration & Policies</div>
                  <div className="text-sm text-gray-600 mt-1">Manage violation fees and community policies</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    <i className="ri-notification-3-line text-lg"></i>
                  </button>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    3
                  </div>
                </div>
                <UserProfile />
              </div>
            </div>
          </div>

          <div className="flex border-b border-gray-200 flex-shrink-0 bg-white">
            <button
              onClick={() => setActiveTab('violations')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'violations'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Violation & Late fee schedule
            </button>
            <button
              onClick={() => setActiveTab('escalation')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'escalation'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Violation & Dues Late Payment Escalation Policy
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'amenities'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Amenities & Reservations
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'notifications'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Notification Settings
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto bg-[#F9FAFB]">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {activeTab === 'violations' && 'Violation & Late Fee Schedule'}
                  {activeTab === 'escalation' && 'Violation & Dues Late Payment Escalation Policy'}
                  {activeTab === 'amenities' && 'Amenities & Reservations'}
                  {activeTab === 'notifications' && 'Notification Settings'}
                </h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 whitespace-nowrap cursor-pointer">
                    Add
                  </button>
                  <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 whitespace-nowrap cursor-pointer">
                    Save
                  </button>
                  <button className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded hover:bg-gray-600 whitespace-nowrap cursor-pointer">
                    Edit
                  </button>
                  <button 
                    onClick={() => {
                      selectedRows.forEach(rowId => handleDeleteRow(rowId));
                    }}
                    disabled={selectedRows.size === 0}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                  <table className="w-full min-w-max">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">TYPE</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">COMPLIANCE PERIOD (DAYS)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">RESPONSE PERIOD (APPEAL)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">FINE ($)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">INTEREST RATE (IF NO RESPONSE)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">LATE FEE POLICY</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">NOTES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topTableRows.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-12 text-center text-gray-400 text-sm">
                            Click Add button from sample records below or create a new empty record
                          </td>
                        </tr>
                      ) : (
                        topTableRows.map((row) => (
                          <tr key={row.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 cursor-pointer"
                                checked={selectedRows.has(row.id)}
                                onChange={() => handleSelectRow(row.id)}
                              />
                            </td>
                            <td className="px-4 py-3">{renderTableCell(row, 'type', true)}</td>
                            <td className="px-4 py-3">{renderTableCell(row, 'compliancePeriod', true)}</td>
                            <td className="px-4 py-3">{renderTableCell(row, 'responsePeriod', true)}</td>
                            <td className="px-4 py-3">{renderTableCell(row, 'fine', true)}</td>
                            <td className="px-4 py-3">{renderTableCell(row, 'interestRate', true)}</td>
                            <td className="px-4 py-3">{renderTableCell(row, 'lateFeePolicy', true)}</td>
                            <td className="px-4 py-3">{renderTableCell(row, 'notes', true)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">
                  {activeTab === 'violations' && 'Violation & Late Fee Schedule (Sample - for reference only) - Please refere your Bylaws and add'}
                  {activeTab === 'escalation' && 'Violation & Dues Late Payment Escalation Policy (Sample - for reference only)'}
                  {activeTab === 'amenities' && 'Amenities & Reservations (Sample - for reference only)'}
                  {activeTab === 'notifications' && 'Notification Settings (Sample - for reference only)'}
                </h3>
                <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 whitespace-nowrap cursor-pointer">
                  Sample
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                  <table className="w-full min-w-max">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">TYPE</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">COMPLIANCE PERIOD (DAYS)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">RESPONSE PERIOD (APPEAL)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">FINE ($)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">INTEREST RATE (IF NO RESPONSE)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">LATE FEE POLICY</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">NOTES</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleRows.map((row) => (
                        <tr key={row.id} className={`border-t border-gray-200 ${row.isAdded ? 'bg-gray-100 opacity-50' : 'hover:bg-gray-50'}`}>
                          <td className="px-4 py-3 text-sm text-black font-medium">{row.type}</td>
                          <td className="px-4 py-3 text-sm text-black font-medium">{row.compliancePeriod}</td>
                          <td className="px-4 py-3 text-sm text-black font-medium">{row.responsePeriod}</td>
                          <td className="px-4 py-3 text-sm text-black font-medium">{row.fine}</td>
                          <td className="px-4 py-3 text-sm text-black font-medium">{row.interestRate}</td>
                          <td className="px-4 py-3 text-sm text-black font-medium">{row.lateFeePolicy}</td>
                          <td className="px-4 py-3 text-sm text-black font-medium">{row.notes}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleAddRow(row)}
                              disabled={row.isAdded}
                              className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
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
      </div>
    </div>
  );
}
