"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";

interface Unit {
  id: string;
  name: string;
  address: string;
  type: "owner" | "tenant";
}

interface Document {
  id: string;
  name: string;
  type: "PDF" | "DOC";
  content: string;
}

export default function UnitsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [occupancyFilter, setOccupancyFilter] = useState<"owner" | "tenant">(
    "owner"
  );
  const [showTenantDetails, setShowTenantDetails] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Unit | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const mockUnits: Unit[] = [
    {
      id: "1",
      name: "John Smith",
      address: "55, forest way ,\nGreensboro, NC-27409.",
      type: "owner",
    },
    {
      id: "2",
      name: "Maria Garcia",
      address: "42, maple street ,\nGreensboro, NC-27408.",
      type: "tenant",
    },
    {
      id: "3",
      name: "Robert Johnson",
      address: "78, oak avenue ,\nGreensboro, NC-27410.",
      type: "owner",
    },
    {
      id: "4",
      name: "Lisa Chen",
      address: "91, pine road ,\nGreensboro, NC-27407.",
      type: "owner",
    },
    {
      id: "5",
      name: "David Wilson",
      address: "23, elm drive ,\nGreensboro, NC-27411.",
      type: "tenant",
    },
    {
      id: "6",
      name: "Jennifer Lee",
      address: "67, birch lane ,\nGreensboro, NC-27406.",
      type: "owner",
    },
    {
      id: "7",
      name: "Michael Brown",
      address: "15, cedar court ,\nGreensboro, NC-27412.",
      type: "tenant",
    },
    {
      id: "8",
      name: "Sarah Davis",
      address: "89, willow way ,\nGreensboro, NC-27405.",
      type: "owner",
    },
    {
      id: "9",
      name: "James Wilson",
      address: "34, spruce street ,\nGreensboro, NC-27413.",
      type: "owner",
    },
    {
      id: "10",
      name: "Emily Rodriguez",
      address: "56, poplar place ,\nGreensboro, NC-27404.",
      type: "tenant",
    },
    {
      id: "11",
      name: "Thomas Anderson",
      address: "12, hickory hill ,\nGreensboro, NC-27414.",
      type: "owner",
    },
    {
      id: "12",
      name: "Amanda White",
      address: "98, chestnut circle ,\nGreensboro, NC-27403.",
      type: "tenant",
    },
    {
      id: "13",
      name: "Christopher Lee",
      address: "45, walnut walk ,\nGreensboro, NC-27415.",
      type: "owner",
    },
    {
      id: "14",
      name: "Jessica Taylor",
      address: "73, magnolia manor ,\nGreensboro, NC-27402.",
      type: "tenant",
    },
    {
      id: "15",
      name: "Daniel Martinez",
      address: "29, dogwood drive ,\nGreensboro, NC-27416.",
      type: "owner",
    },
    {
      id: "16",
      name: "Michelle Thompson",
      address: "61, sycamore square ,\nGreensboro, NC-27401.",
      type: "owner",
    },
    {
      id: "17",
      name: "Kevin Garcia",
      address: "84, redwood ridge ,\nGreensboro, NC-27417.",
      type: "tenant",
    },
    {
      id: "18",
      name: "Rachel Moore",
      address: "17, cypress creek ,\nGreensboro, NC-27418.",
      type: "owner",
    },
    {
      id: "19",
      name: "Brandon Clark",
      address: "52, juniper junction ,\nGreensboro, NC-27419.",
      type: "tenant",
    },
    {
      id: "20",
      name: "Nicole Lewis",
      address: "76, aspen alley ,\nGreensboro, NC-27420.",
      type: "owner",
    },
    {
      id: "21",
      name: "Ryan Walker",
      address: "38, fir forest ,\nGreensboro, NC-27421.",
      type: "tenant",
    },
    {
      id: "22",
      name: "Stephanie Hall",
      address: "63, beech boulevard ,\nGreensboro, NC-27422.",
      type: "owner",
    },
    {
      id: "23",
      name: "Justin Young",
      address: "19, palm parkway ,\nGreensboro, NC-27423.",
      type: "owner",
    },
    {
      id: "24",
      name: "Melissa King",
      address: "85, bamboo bend ,\nGreensboro, NC-27424.",
      type: "tenant",
    },
    {
      id: "25",
      name: "Andrew Wright",
      address: "41, laurel lane ,\nGreensboro, NC-27425.",
      type: "owner",
    },
    {
      id: "26",
      name: "Heather Lopez",
      address: "74, rose ridge ,\nGreensboro, NC-27426.",
      type: "tenant",
    },
    {
      id: "27",
      name: "Joshua Hill",
      address: "26, tulip terrace ,\nGreensboro, NC-27427.",
      type: "owner",
    },
    {
      id: "28",
      name: "Crystal Scott",
      address: "59, lily lane ,\nGreensboro, NC-27428.",
      type: "owner",
    },
    {
      id: "29",
      name: "Nathan Green",
      address: "92, daisy drive ,\nGreensboro, NC-27429.",
      type: "tenant",
    },
    {
      id: "30",
      name: "Amber Adams",
      address: "14, violet valley ,\nGreensboro, NC-27430.",
      type: "owner",
    },
    {
      id: "31",
      name: "Tyler Baker",
      address: "47, iris avenue ,\nGreensboro, NC-27431.",
      type: "tenant",
    },
    {
      id: "32",
      name: "Brittany Nelson",
      address: "81, orchid oaks ,\nGreensboro, NC-27432.",
      type: "owner",
    },
    {
      id: "33",
      name: "Jacob Carter",
      address: "33, sunflower street ,\nGreensboro, NC-27433.",
      type: "owner",
    },
    {
      id: "34",
      name: "Samantha Mitchell",
      address: "68, carnation court ,\nGreensboro, NC-27434.",
      type: "tenant",
    },
    {
      id: "35",
      name: "Aaron Perez",
      address: "25, peony place ,\nGreensboro, NC-27435.",
      type: "owner",
    },
    {
      id: "36",
      name: "Danielle Roberts",
      address: "57, azalea avenue ,\nGreensboro, NC-27436.",
      type: "tenant",
    },
  ];

  const mockDocuments: Document[] = [
    {
      id: "1",
      name: "Lease Agreement",
      type: "PDF",
      content:
        "This is a comprehensive lease agreement document containing all terms and conditions for the rental property. The lease includes monthly rent amount, security deposit, lease duration, maintenance responsibilities, and other important clauses.",
    },
    {
      id: "2",
      name: "Tenant Information",
      type: "DOC",
      content:
        "Complete tenant information including personal details, employment verification, references, emergency contacts, and background check results. This document contains all verified information about the tenant.",
    },
    {
      id: "3",
      name: "Property Inspection Report",
      type: "PDF",
      content:
        "Detailed property inspection report conducted before tenant move-in. Includes condition of all rooms, appliances, fixtures, and any existing damages or issues noted at the time of inspection.",
    },
    {
      id: "4",
      name: "Insurance Documents",
      type: "PDF",
      content:
        "Tenant insurance policy documents including liability coverage, personal property protection, and additional living expenses coverage as required by the lease agreement.",
    },
  ];

  const filteredUnits = mockUnits.filter((unit) => {
    const matchesSearch =
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = unit.type === occupancyFilter;
    return matchesSearch && matchesType;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRandomColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleTenantDetailsClick = (unit: Unit) => {
    setSelectedTenant(unit);
    setShowTenantDetails(true);
  };

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  return (
    <div className="min-h-screen bg-[#1E293B] overflow-hidden">
      <Sidebar />

      <div className="lg:ml-[260px] p-[10px] h-screen flex flex-col">
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      Units :
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      345
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-search-line text-gray-400 text-sm"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Search here"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="occupancy"
                        value="owner"
                        checked={occupancyFilter === "owner"}
                        onChange={(e) =>
                          setOccupancyFilter(
                            e.target.value as "owner" | "tenant"
                          )
                        }
                        className="w-4 h-4 border-gray-300 focus:ring-[#1FA372] accent-[#1FA372]"
                        style={{ accentColor: "#1FA372" }}
                      />
                      <span className="text-sm font-bold text-black">
                        Owner Occupied
                      </span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="occupancy"
                        value="tenant"
                        checked={occupancyFilter === "tenant"}
                        onChange={(e) =>
                          setOccupancyFilter(
                            e.target.value as "owner" | "tenant"
                          )
                        }
                        className="w-4 h-4 border-gray-300 focus:ring-[#1FA372] accent-[#1FA372]"
                        style={{ accentColor: "#1FA372" }}
                      />
                      <span className="text-sm font-bold text-black">
                        Tenant Occupied
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
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
                    <p className="text-sm font-semibold text-gray-900">
                      Community Name &
                    </p>
                    <p className="text-xs text-gray-500">Address</p>
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

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredUnits.map((unit) => (
                <div
                  key={unit.id}
                  className={`w-full ${
                    unit.type === "tenant" ? "h-[88px]" : "h-[68px]"
                  } bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <div className="flex items-start space-x-2">
                    <div
                      className={`w-6 h-6 ${getRandomColor(
                        unit.name
                      )} rounded text-white text-xs font-medium flex items-center justify-center flex-shrink-0`}
                    >
                      {getInitials(unit.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-black truncate">
                        {unit.name}
                      </p>
                      <div className="text-xs font-medium text-black leading-tight">
                        {unit.address.split("\n").map((line, index) => (
                          <div key={index} className="truncate">
                            {line}
                          </div>
                        ))}
                      </div>
                      {unit.type === "tenant" && (
                        <button
                          onClick={() => handleTenantDetailsClick(unit)}
                          className="text-xs text-green-600 hover:text-green-700 font-medium mt-1 cursor-pointer"
                        >
                          Tenant Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Details Modal */}
      {showTenantDetails && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Tenant Details
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedTenant.name}
                </p>
              </div>
              <button
                onClick={() => setShowTenantDetails(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {mockDocuments.map((document) => (
                  <div
                    key={document.id}
                    onClick={() => handleDocumentClick(document)}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                        <i
                          className={`${
                            document.type === "PDF"
                              ? "ri-file-pdf-2-fill text-red-500"
                              : "ri-file-word-2-fill text-blue-500"
                          } text-xl`}
                        ></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {document.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {document.type} Document
                        </p>
                      </div>
                      <i className="ri-arrow-right-s-line text-gray-400"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {showDocumentModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedDocument.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedDocument.type} Document
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-download-line mr-2"></i>
                  Download
                </button>
                <button
                  onClick={() => setShowDocumentModal(false)}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden p-6">
              <div className="h-full bg-gray-100 rounded-lg p-6 overflow-y-auto">
                {selectedDocument.type === "PDF" ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <i className="ri-file-pdf-2-fill text-red-500 text-6xl mb-4"></i>
                    <p className="text-gray-600 text-sm mb-4">
                      PDF Document Preview
                    </p>
                    <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        {selectedDocument.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedDocument.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <i className="ri-file-word-2-fill text-blue-500 text-6xl mb-4"></i>
                    <p className="text-gray-600 text-sm mb-4">
                      Document Preview
                    </p>
                    <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        {selectedDocument.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedDocument.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
