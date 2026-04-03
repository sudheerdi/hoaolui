import { useState } from 'react';

interface DocumentsDrawerProps {
  selectedFolder: string | null;
  allFilesSelected: boolean;
  onBackToAllFiles: () => void;
}

const allFiles = [
  // Meeting Agenda
  { name: 'Board Meeting Agenda Jan 2024', size: '1.2 MB', author: 'Admin', date: 'Jan 25, 2024', type: 'pdf', folder: 'Meeting Agenda' },
  { name: 'Committee Meeting Agenda', size: '987 KB', author: 'Secretary', date: 'Jan 22, 2024', type: 'doc', folder: 'Meeting Agenda' },
  { name: 'Annual Meeting Agenda', size: '1.5 MB', author: 'Admin', date: 'Jan 20, 2024', type: 'pdf', folder: 'Meeting Agenda' },
  
  // Administrative - CCR & ByLaws
  { name: 'Community Bylaws', size: '3.2 MB', author: 'Legal Team', date: 'Jan 25, 2024', type: 'pdf', folder: 'CCR & ByLaws' },
  { name: 'CCR Document', size: '2.8 MB', author: 'Legal Team', date: 'Jan 24, 2024', type: 'pdf', folder: 'CCR & ByLaws' },
  
  // Administrative - Amendments
  { name: 'Amendment 2024-01', size: '1.1 MB', author: 'Sarah Johnson', date: 'Jan 23, 2024', type: 'doc', folder: 'Amendments' },
  { name: 'Amendment History', size: '1.5 MB', author: 'Legal Team', date: 'Jan 21, 2024', type: 'xls', folder: 'Amendments' },
  
  // Administrative - Association Formation Document
  { name: 'Formation Certificate', size: '2.1 MB', author: 'Admin', date: 'Jan 20, 2024', type: 'pdf', folder: 'Association Formation Document' },
  
  // Administrative - Master Deed
  { name: 'Master Deed Original', size: '4.2 MB', author: 'Legal Team', date: 'Jan 19, 2024', type: 'pdf', folder: 'Master Deed' },
  { name: 'Master Deed Amendments', size: '1.8 MB', author: 'Legal Team', date: 'Jan 18, 2024', type: 'pdf', folder: 'Master Deed' },
  
  // Administrative - Association Rules and Regulations
  { name: 'Community Rules 2024', size: '2.5 MB', author: 'Admin', date: 'Jan 17, 2024', type: 'pdf', folder: 'Association Rules and Regulations' },
  { name: 'Pet Policy Rules', size: '654 KB', author: 'Admin', date: 'Jan 16, 2024', type: 'doc', folder: 'Association Rules and Regulations' },
  
  // Administrative - Resolutions
  { name: 'Board Resolution 2024-01', size: '876 KB', author: 'Board Secretary', date: 'Jan 15, 2024', type: 'doc', folder: 'Resolutions' },
  
  // Administrative - Policy
  { name: 'Parking Policy', size: '543 KB', author: 'Admin', date: 'Jan 14, 2024', type: 'pdf', folder: 'Policy' },
  
  // Financial - Audit/Fiscal Review
  { name: 'Annual Audit Report 2023', size: '3.8 MB', author: 'Auditor', date: 'Jan 25, 2024', type: 'pdf', folder: 'Audit/Fiscal Review' },
  { name: 'Fiscal Review Q4', size: '2.1 MB', author: 'Auditor', date: 'Jan 22, 2024', type: 'xls', folder: 'Audit/Fiscal Review' },
  
  // Financial - Fiscal Budget
  { name: 'Budget 2024', size: '2.7 MB', author: 'Finance Team', date: 'Jan 24, 2024', type: 'xls', folder: 'Fiscal Budget' },
  { name: 'Budget Variance Report', size: '1.3 MB', author: 'Finance Team', date: 'Jan 21, 2024', type: 'xls', folder: 'Fiscal Budget' },
  
  // Financial - Misc Checks
  { name: 'Vendor Payment Check', size: '432 KB', author: 'Treasurer', date: 'Jan 23, 2024', type: 'pdf', folder: 'Misc Checks' },
  
  // Financial - Monthly Financial
  { name: 'January Financial Statement', size: '1.9 MB', author: 'Finance Team', date: 'Jan 25, 2024', type: 'xls', folder: 'Monthly Financial' },
  { name: 'December Financial Statement', size: '1.8 MB', author: 'Finance Team', date: 'Jan 15, 2024', type: 'xls', folder: 'Monthly Financial' },
  
  // Financial - Reserve Funds
  { name: 'Reserve Fund Analysis', size: '2.2 MB', author: 'Finance Team', date: 'Jan 20, 2024', type: 'xls', folder: 'Reserve Funds' },
  
  // Forms - Arch Documents
  { name: 'Architecture Request Form', size: '765 KB', author: 'Architecture Committee', date: 'Jan 25, 2024', type: 'pdf', folder: 'Arch Documents' },
  { name: 'Modification Guidelines', size: '1.1 MB', author: 'Architecture Committee', date: 'Jan 22, 2024', type: 'doc', folder: 'Arch Documents' },
  
  // Forms - Insurance
  { name: 'Insurance Policy 2024', size: '3.5 MB', author: 'Insurance Agent', date: 'Jan 24, 2024', type: 'pdf', folder: 'Insurance' },
  { name: 'Insurance Claim Form', size: '543 KB', author: 'Insurance Agent', date: 'Jan 20, 2024', type: 'pdf', folder: 'Insurance' },
  
  // Forms - Lease
  { name: 'Lease Agreement Template', size: '1.7 MB', author: 'Property Manager', date: 'Jan 23, 2024', type: 'doc', folder: 'Lease' },
  { name: 'Lease Renewal Form', size: '654 KB', author: 'Property Manager', date: 'Jan 19, 2024', type: 'pdf', folder: 'Lease' },
  
  // Forms - Profile
  { name: 'Resident Profile Form', size: '432 KB', author: 'Admin', date: 'Jan 22, 2024', type: 'pdf', folder: 'Profile' },
  { name: 'Emergency Contact Form', size: '321 KB', author: 'Admin', date: 'Jan 18, 2024', type: 'doc', folder: 'Profile' }
];

const folderFiles = {
  'Meeting Agenda': [
    { name: 'Board Meeting Agenda Jan 2024', size: '1.2 MB', author: 'Admin', date: 'Jan 25, 2024', type: 'pdf' },
    { name: 'Committee Meeting Agenda', size: '987 KB', author: 'Secretary', date: 'Jan 22, 2024', type: 'doc' },
    { name: 'Annual Meeting Agenda', size: '1.5 MB', author: 'Admin', date: 'Jan 20, 2024', type: 'pdf' },
  ],
  'Administrative': [
    { name: 'Community Bylaws', size: '3.2 MB', author: 'Legal Team', date: 'Jan 25, 2024', type: 'pdf' },
    { name: 'Formation Certificate', size: '2.1 MB', author: 'Admin', date: 'Jan 20, 2024', type: 'pdf' },
    { name: 'Master Deed Original', size: '4.2 MB', author: 'Legal Team', date: 'Jan 19, 2024', type: 'pdf' },
  ],
  'CCR & ByLaws': [
    { name: 'Community Bylaws', size: '3.2 MB', author: 'Legal Team', date: 'Jan 25, 2024', type: 'pdf' },
    { name: 'CCR Document', size: '2.8 MB', author: 'Legal Team', date: 'Jan 24, 2024', type: 'pdf' },
  ],
  'Amendments': [
    { name: 'Amendment 2024-01', size: '1.1 MB', author: 'Sarah Johnson', date: 'Jan 23, 2024', type: 'doc' },
    { name: 'Amendment History', size: '1.5 MB', author: 'Legal Team', date: 'Jan 21, 2024', type: 'xls' },
  ],
  'Association Formation Document': [
    { name: 'Formation Certificate', size: '2.1 MB', author: 'Admin', date: 'Jan 20, 2024', type: 'pdf' },
  ],
  'Master Deed': [
    { name: 'Master Deed Original', size: '4.2 MB', author: 'Legal Team', date: 'Jan 19, 2024', type: 'pdf' },
    { name: 'Master Deed Amendments', size: '1.8 MB', author: 'Legal Team', date: 'Jan 18, 2024', type: 'pdf' },
  ],
  'Association Rules and Regulations': [
    { name: 'Community Rules 2024', size: '2.5 MB', author: 'Admin', date: 'Jan 17, 2024', type: 'pdf' },
    { name: 'Pet Policy Rules', size: '654 KB', author: 'Admin', date: 'Jan 16, 2024', type: 'doc' },
  ],
  'Resolutions': [
    { name: 'Board Resolution 2024-01', size: '876 KB', author: 'Board Secretary', date: 'Jan 15, 2024', type: 'doc' },
  ],
  'Policy': [
    { name: 'Parking Policy', size: '543 KB', author: 'Admin', date: 'Jan 14, 2024', type: 'pdf' },
  ],
  'Financial': [
    { name: 'Annual Audit Report 2023', size: '3.8 MB', author: 'Auditor', date: 'Jan 25, 2024', type: 'pdf' },
    { name: 'Budget 2024', size: '2.7 MB', author: 'Finance Team', date: 'Jan 24, 2024', type: 'xls' },
    { name: 'January Financial Statement', size: '1.9 MB', author: 'Finance Team', date: 'Jan 25, 2024', type: 'xls' },
  ],
  'Audit/Fiscal Review': [
    { name: 'Annual Audit Report 2023', size: '3.8 MB', author: 'Auditor', date: 'Jan 25, 2024', type: 'pdf' },
    { name: 'Fiscal Review Q4', size: '2.1 MB', author: 'Auditor', date: 'Jan 22, 2024', type: 'xls' },
  ],
  'Fiscal Budget': [
    { name: 'Budget 2024', size: '2.7 MB', author: 'Finance Team', date: 'Jan 24, 2024', type: 'xls' },
    { name: 'Budget Variance Report', size: '1.3 MB', author: 'Finance Team', date: 'Jan 21, 2024', type: 'xls' },
  ],
  'Misc Checks': [
    { name: 'Vendor Payment Check', size: '432 KB', author: 'Treasurer', date: 'Jan 23, 2024', type: 'pdf' },
  ],
  'Monthly Financial': [
    { name: 'January Financial Statement', size: '1.9 MB', author: 'Finance Team', date: 'Jan 25, 2024', type: 'xls' },
    { name: 'December Financial Statement', size: '1.8 MB', author: 'Finance Team', date: 'Jan 15, 2024', type: 'xls' },
  ],
  'Reserve Funds': [
    { name: 'Reserve Fund Analysis', size: '2.2 MB', author: 'Finance Team', date: 'Jan 20, 2024', type: 'xls' },
  ],
  'Forms': [
    { name: 'Architecture Request Form', size: '765 KB', author: 'Architecture Committee', date: 'Jan 25, 2024', type: 'pdf' },
    { name: 'Insurance Policy 2024', size: '3.5 MB', author: 'Insurance Agent', date: 'Jan 24, 2024', type: 'pdf' },
    { name: 'Lease Agreement Template', size: '1.7 MB', author: 'Property Manager', date: 'Jan 23, 2024', type: 'doc' },
  ],
  'Arch Documents': [
    { name: 'Architecture Request Form', size: '765 KB', author: 'Architecture Committee', date: 'Jan 25, 2024', type: 'pdf' },
    { name: 'Modification Guidelines', size: '1.1 MB', author: 'Architecture Committee', date: 'Jan 22, 2024', type: 'doc' },
  ],
  'Insurance': [
    { name: 'Insurance Policy 2024', size: '3.5 MB', author: 'Insurance Agent', date: 'Jan 24, 2024', type: 'pdf' },
    { name: 'Insurance Claim Form', size: '543 KB', author: 'Insurance Agent', date: 'Jan 20, 2024', type: 'pdf' },
  ],
  'Lease': [
    { name: 'Lease Agreement Template', size: '1.7 MB', author: 'Property Manager', date: 'Jan 23, 2024', type: 'doc' },
    { name: 'Lease Renewal Form', size: '654 KB', author: 'Property Manager', date: 'Jan 19, 2024', type: 'pdf' },
  ],
  'Profile': [
    { name: 'Resident Profile Form', size: '432 KB', author: 'Admin', date: 'Jan 22, 2024', type: 'pdf' },
    { name: 'Emergency Contact Form', size: '321 KB', author: 'Admin', date: 'Jan 18, 2024', type: 'doc' },
  ]
};

export default function DocumentsDrawer({ selectedFolder, allFilesSelected, onBackToAllFiles }: DocumentsDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'ri-file-pdf-line';
      case 'doc':
        return 'ri-file-word-line';
      case 'xls':
        return 'ri-file-excel-line';
      default:
        return 'ri-file-text-line';
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'text-red-600 bg-red-100';
      case 'doc':
        return 'text-blue-600 bg-blue-100';
      case 'xls':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const rawFiles = allFilesSelected ? allFiles : (folderFiles[selectedFolder as keyof typeof folderFiles] || []);
  
  // Filter files based on search query
  const displayFiles = rawFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const drawerTitle = allFilesSelected ? 'All Files' : selectedFolder || 'Documents';

  return (
    <div className="w-80 bg-white rounded-lg border border-[#E2E2E2] h-full flex flex-col">
      <div className="p-4 border-b border-[#E2E2E2]">
        <h3 className="font-semibold text-lg text-black">{drawerTitle}</h3>
        {selectedFolder && !allFilesSelected && (
          <button
            onClick={onBackToAllFiles}
            className="mt-2 text-[#1FA372] hover:text-[#1A8C62] text-sm cursor-pointer flex items-center"
          >
            <i className="ri-arrow-left-line mr-1 w-4 h-4 flex items-center justify-center"></i>
            Back to All Files
          </button>
        )}
        
        {/* Search for All Files */}
        {allFilesSelected && (
          <div className="mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-sm"
              />
              <i className="ri-search-line absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"></i>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {displayFiles.map((file, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded flex items-center justify-center ${getFileColor(file.type)}`}>
                  <i className={`${getFileIcon(file.type)} w-5 h-5 flex items-center justify-center`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-black text-sm truncate">{file.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">By {file.author}</p>
                  <p className="text-xs text-gray-500">{file.date}</p>
                  {allFilesSelected && 'folder' in file && (
                    <p className="text-xs text-gray-400 mt-1">{file.folder}</p>
                  )}
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <button className="bg-[#1FA372] text-white px-3 py-1 rounded text-xs hover:bg-[#1A8C62] cursor-pointer whitespace-nowrap">
                    View
                  </button>
                  <button className="text-[#1FA372] hover:text-[#1A8C62] text-xs cursor-pointer whitespace-nowrap">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
