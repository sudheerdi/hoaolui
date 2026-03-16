
import { useState } from 'react';
import DocumentsTable from './DocumentsTable';
import DocumentsDrawer from './DocumentsDrawer';

export default function DocumentsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [allFilesSelected, setAllFilesSelected] = useState(true);

  const handleFolderSelect = (folderName: string) => {
    setSelectedFolder(folderName);
    setAllFilesSelected(false);
  };

  const handleAllFilesSelect = () => {
    setSelectedFolder(null);
    setAllFilesSelected(true);
  };

  return (
    <div className="flex gap-1 h-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white rounded-lg border border-[#E2E2E2] h-full flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-[#E2E2E2] flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA372] focus:border-transparent text-sm"
              />
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"></i>
            </div>
          </div>

          {/* All Files Checkbox */}
          <div className="p-4 border-b border-[#E2E2E2] flex-shrink-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={allFilesSelected}
                onChange={handleAllFilesSelect}
                className="mr-3 cursor-pointer"
              />
              <span className="font-medium text-black">All Files</span>
            </div>
          </div>

          {/* Table - Only this section scrolls */}
          <div className="flex-1 overflow-y-auto">
            <DocumentsTable
              searchQuery={searchQuery}
              selectedFolder={selectedFolder}
              onFolderSelect={handleFolderSelect}
              allFilesSelected={allFilesSelected}
            />
          </div>
        </div>
      </div>

      {/* Right Drawer */}
      <DocumentsDrawer
        selectedFolder={selectedFolder}
        allFilesSelected={allFilesSelected}
        onBackToAllFiles={handleAllFilesSelect}
      />
    </div>
  );
}
