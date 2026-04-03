import { useLazyGetDocumenmtsQuery } from "@/src/services/hoa-documents";
import { useEffect, useState } from "react";

interface DocumentsTableProps {
  searchQuery: string;
  selectedFolder: string | null;
  onFolderSelect: (folderName: string) => void;
  allFilesSelected: boolean;
}

const folderData = [
  {
    name: "Meeting Agenda",
    documents: "8 Files",
    created: "2025-01-15",
    lastUpdatedBy: "Admin",
    subFolders: [],
  },
  {
    name: "Administrative",
    documents: "24 Files",
    created: "2025-01-15",
    lastUpdatedBy: "Admin",
    subFolders: [
      {
        name: "CCR & ByLaws",
        documents: "5 Files",
        created: "2025-01-15",
        lastUpdatedBy: "Legal Team",
      },
      {
        name: "Amendments",
        documents: "3 Files",
        created: "2025-01-14",
        lastUpdatedBy: "Sarah Johnson",
      },
      {
        name: "Association Formation Document",
        documents: "2 Files",
        created: "2025-01-13",
        lastUpdatedBy: "Admin",
      },
      {
        name: "Master Deed",
        documents: "4 Files",
        created: "2025-01-12",
        lastUpdatedBy: "Legal Team",
      },
      {
        name: "Association Rules and Regulations",
        documents: "6 Files",
        created: "2025-01-11",
        lastUpdatedBy: "Admin",
      },
      {
        name: "Resolutions",
        documents: "2 Files",
        created: "2025-01-10",
        lastUpdatedBy: "Board Secretary",
      },
      {
        name: "Policy",
        documents: "2 Files",
        created: "2025-01-09",
        lastUpdatedBy: "Admin",
      },
    ],
  },
  {
    name: "Financial",
    documents: "18 Files",
    created: "2025-01-15",
    lastUpdatedBy: "Finance Team",
    subFolders: [
      {
        name: "Audit/Fiscal Review",
        documents: "4 Files",
        created: "2025-01-15",
        lastUpdatedBy: "Auditor",
      },
      {
        name: "Fiscal Budget",
        documents: "3 Files",
        created: "2025-01-14",
        lastUpdatedBy: "Finance Team",
      },
      {
        name: "Misc Checks",
        documents: "2 Files",
        created: "2025-01-13",
        lastUpdatedBy: "Treasurer",
      },
      {
        name: "Monthly Financial",
        documents: "6 Files",
        created: "2025-01-12",
        lastUpdatedBy: "Finance Team",
      },
      {
        name: "Reserve Funds",
        documents: "3 Files",
        created: "2025-01-11",
        lastUpdatedBy: "Finance Team",
      },
    ],
  },
  {
    name: "Forms",
    documents: "16 Files",
    created: "2025-01-15",
    lastUpdatedBy: "Admin",
    subFolders: [
      {
        name: "Arch Documents",
        documents: "5 Files",
        created: "2025-01-15",
        lastUpdatedBy: "Architecture Committee",
      },
      {
        name: "Insurance",
        documents: "4 Files",
        created: "2025-01-14",
        lastUpdatedBy: "Insurance Agent",
      },
      {
        name: "Lease",
        documents: "4 Files",
        created: "2025-01-13",
        lastUpdatedBy: "Property Manager",
      },
      {
        name: "Profile",
        documents: "3 Files",
        created: "2025-01-12",
        lastUpdatedBy: "Admin",
      },
    ],
  },
];

export default function DocumentsTable({
  searchQuery,
  selectedFolder,
  onFolderSelect,
  allFilesSelected,
}: DocumentsTableProps) {
  const [getDocuments] = useLazyGetDocumenmtsQuery();
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((name) => name !== folderName)
        : [...prev, folderName],
    );
  };

  const filteredData = folderData.filter(
    (folder) =>
      folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.subFolders.some((subFolder) =>
        subFolder.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  useEffect(() => {
    getDocuments(null);
  }, [getDocuments]);

  return (
    <div className="h-full flex flex-col">
      <div className="overflow-auto flex-1">
        <table className="w-full">
          <thead className="bg-[#DCDCDC] sticky top-0">
            <tr>
              <th className="text-left p-4 font-medium text-black text-sm">
                Name
              </th>
              <th className="text-left p-4 font-medium text-black text-sm">
                Documents
              </th>
              <th className="text-left p-4 font-medium text-black text-sm">
                Created
              </th>
              <th className="text-left p-4 font-medium text-black text-sm">
                Last updated by
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((folder, index) => (
              <>
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      {folder.subFolders.length > 0 && (
                        <button
                          onClick={() => toggleFolder(folder.name)}
                          className="mr-2 w-4 h-4 flex items-center justify-center cursor-pointer"
                        >
                          <i
                            className={`${expandedFolders.includes(folder.name) ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line"} w-4 h-4 flex items-center justify-center`}
                          ></i>
                        </button>
                      )}
                      <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center mr-3">
                        <i className="ri-folder-line text-yellow-600 w-4 h-4 flex items-center justify-center"></i>
                      </div>
                      <button
                        onClick={() => onFolderSelect(folder.name)}
                        className="font-medium text-black hover:text-[#1FA372] cursor-pointer"
                      >
                        {folder.name}
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-black">{folder.documents}</td>
                  <td className="p-4 text-black">{folder.created}</td>
                  <td className="p-4 text-black">{folder.lastUpdatedBy}</td>
                </tr>
                {expandedFolders.includes(folder.name) &&
                  folder.subFolders.map((subFolder, subIndex) => (
                    <tr
                      key={`${index}-${subIndex}`}
                      className="border-b border-gray-100 hover:bg-gray-50 bg-gray-25"
                    >
                      <td className="p-4">
                        <div className="flex items-center pl-6">
                          <div className="w-6 h-6 bg-yellow-50 rounded flex items-center justify-center mr-3">
                            <i className="ri-folder-line text-yellow-500 w-3 h-3 flex items-center justify-center"></i>
                          </div>
                          <button
                            onClick={() => onFolderSelect(subFolder.name)}
                            className="font-medium text-black hover:text-[#1FA372] cursor-pointer text-sm"
                          >
                            {subFolder.name}
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-black text-sm">
                        {subFolder.documents}
                      </td>
                      <td className="p-4 text-black text-sm">
                        {subFolder.created}
                      </td>
                      <td className="p-4 text-black text-sm">
                        {subFolder.lastUpdatedBy}
                      </td>
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
