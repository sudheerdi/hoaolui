"use client";

import { useEffect, useState } from "react";
import {
  useLazyGetUnitsQuery,
  useSetUnitsBulkUploadMutation,
} from "@/src/services";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { useAppDispatch } from "@/src/lib/hooks";
import { setNotification } from "@/src/reducer/hoa-notificatio.reducer";

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
  const dispatch = useAppDispatch();
  const [getUnits, { data: unitsData, isLoading: unitsLoading }] =
    useLazyGetUnitsQuery();
  const [setUnitsBulkUpload] = useSetUnitsBulkUploadMutation();
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
  const [showAddUnitPopover, setShowAddUnitPopover] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "individual" | "bulk" | "changeOwner"
  >("individual");
  const [emailId, setEmailId] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [ownerSearchTerm, setOwnerSearchTerm] = useState("");
  const [showOwnerDropdown, setShowOwnerDropdown] = useState(false);
  const [filteredUnits, setFilteredUnits] = useState([]);

  const [individualUnitData, setIndividualUnitData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    country: "",
    zipcode: "",
  });

  const [changeOwnerData, setChangeOwnerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    country: "",
    zipcode: "",
  });

  const mockOwners = [
    {
      id: "1",
      name: "John Smith",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      mobile: "+1 (555) 123-4567",
      address1: "55 forest way",
      address2: "",
      city: "Greensboro",
      state: "NC",
      country: "USA",
      zipcode: "27409",
    },
    {
      id: "2",
      name: "Maria Garcia",
      firstName: "Maria",
      lastName: "Garcia",
      email: "maria.garcia@email.com",
      mobile: "+1 (555) 234-5678",
      address1: "42 maple street",
      address2: "Apt 5B",
      city: "Greensboro",
      state: "NC",
      country: "USA",
      zipcode: "27408",
    },
    {
      id: "3",
      name: "Robert Johnson",
      firstName: "Robert",
      lastName: "Johnson",
      email: "robert.j@email.com",
      mobile: "+1 (555) 345-6789",
      address1: "78 oak avenue",
      address2: "",
      city: "Greensboro",
      state: "NC",
      country: "USA",
      zipcode: "27410",
    },
    {
      id: "4",
      name: "Lisa Chen",
      firstName: "Lisa",
      lastName: "Chen",
      email: "lisa.chen@email.com",
      mobile: "+1 (555) 456-7890",
      address1: "91 pine road",
      address2: "Suite 12",
      city: "Greensboro",
      state: "NC",
      country: "USA",
      zipcode: "27407",
    },
    {
      id: "5",
      name: "David Wilson",
      firstName: "David",
      lastName: "Wilson",
      email: "david.w@email.com",
      mobile: "+1 (555) 567-8901",
      address1: "23 elm drive",
      address2: "",
      city: "Greensboro",
      state: "NC",
      country: "USA",
      zipcode: "27411",
    },
  ];

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

  const filteredOwners = mockOwners.filter((owner) =>
    owner.name.toLowerCase().includes(ownerSearchTerm.toLowerCase())
  );

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

  const isIndividualUnitFormValid = () => {
    const { firstName, lastName, email, mobile } = individualUnitData;
    return firstName.trim() && lastName.trim() && email.trim() && mobile.trim();
  };

  const handleIndividualUnitInputChange = (field: string, value: string) => {
    setIndividualUnitData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIndividualUnitSubmit = () => {
    if (emailId.trim()) {
      console.log("Adding individual unit with email:", emailId);
      setEmailId("");
      setShowAddUnitPopover(false);
    }
  };

  const handleDownloadSampleCSV = () => {
    const csvContent =
      "First Name,Last Name,Email ID,Mobile Number,Address 1,Address 2,City,State,Country,Zipcode\nJohn,Smith,john.smith@email.com,+1 (555) 123-4567,55 forest way,,Greensboro,NC,USA,27409\nMaria,Garcia,maria.garcia@email.com,+1 (555) 234-5678,42 maple street,Apt 5B,Greensboro,NC,USA,27408";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "sample_units_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkUploadSubmit = async () => {
    if (csvFile) {
      console.log("Uploading CSV file:", csvFile.name);
      setCsvFile(null);
      setShowAddUnitPopover(false);
    }
    const formData = new FormData();
    if (csvFile) {
      formData.append("file", csvFile);
    }

    try {
      await setUnitsBulkUpload(formData).unwrap();
      dispatch(
        setNotification({
          type: "success",
          message: "Units uploaded successfully.",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error
            ? error.data.error
            : "An unknown error occurred during bulk upload.",
        })
      );
    }
  };

  const handleChangeOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !changeOwnerData.firstName ||
      !changeOwnerData.lastName ||
      !changeOwnerData.email ||
      !changeOwnerData.mobile
    ) {
      return;
    }
    setShowAddUnitPopover(false);
    setChangeOwnerData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleChangeOwnerInputChange = (field: string, value: string) => {
    setChangeOwnerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOwnerSelect = (owner: (typeof mockOwners)[0]) => {
    setChangeOwnerData({
      firstName: owner.firstName,
      lastName: owner.lastName,
      email: owner.email,
      mobile: owner.mobile,
      address1: owner.address1,
      address2: owner.address2,
      state: owner.state,
      city: owner.city,
      country: owner.country,
      zipcode: owner.zipcode,
    });
    setOwnerSearchTerm(owner.name);
    setShowOwnerDropdown(false);
  };

  const isChangeOwnerFormValid = () => {
    const { firstName, lastName, email, mobile } = changeOwnerData;
    return firstName.trim() && lastName.trim() && email.trim() && mobile.trim();
  };

  const handleGetUnits = async () => {
    try {
      await getUnits(null).unwrap();
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error
            ? error?.data.error
            : "An unknown error occurred during bulk upload.",
        })
      );
    }
  };

  useEffect(() => {
    handleGetUnits();
  }, [getUnits]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUnits(unitsData?.units);
      return;
    }
    const units: any = unitsData?.units.filter((unit: any) => {
      const matchesSearch =
        unit.owners[0].firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        unit.owners[0].lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        unit.address1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.address2.toLowerCase().includes(searchTerm.toLowerCase());
      //const matchesType = unit.type === occupancyFilter;
      return matchesSearch;
    });
    setFilteredUnits(units);
  }, [searchTerm, unitsData]);

  return (
    <DashboardLayout>
      <div className="lg:ml-[260px] p-[10px] h-screen flex flex-col">
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      Units :
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {unitsData?.totalUnits}
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
                  <button
                    onClick={() => setShowAddUnitPopover(!showAddUnitPopover)}
                    className="px-4 py-2 bg-[#1FA372] text-white text-sm font-semibold rounded-lg hover:bg-[#188f5f] transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-2"
                  >
                    <i className="ri-add-line text-lg"></i>
                    <span>Add / Change Unit</span>
                  </button>

                  {showAddUnitPopover && (
                    <div className="absolute right-0 top-full mt-2 w-[500px] bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900">
                            Add / Change Unit
                          </h3>
                          <button
                            onClick={() => setShowAddUnitPopover(false)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                          >
                            <i className="ri-close-line text-xl"></i>
                          </button>
                        </div>

                        <div className="flex space-x-1 mb-4 bg-gray-100 rounded-full p-1">
                          <button
                            onClick={() => setActiveTab("individual")}
                            className={`flex-1 px-1 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                              activeTab === "individual"
                                ? "bg-white text-[#1FA372] shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            Individual Unit
                          </button>
                          <button
                            onClick={() => setActiveTab("bulk")}
                            className={`flex-1 px-1 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                              activeTab === "bulk"
                                ? "bg-white text-[#1FA372] shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            Bulk Units Upload
                          </button>
                          <button
                            onClick={() => setActiveTab("changeOwner")}
                            className={`flex-1 px-1 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                              activeTab === "changeOwner"
                                ? "bg-white text-[#1FA372] shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            Change Owner
                          </button>
                        </div>

                        {activeTab === "individual" ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  value={individualUnitData.firstName}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "firstName",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter first name"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  value={individualUnitData.lastName}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "lastName",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter last name"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Email ID
                                </label>
                                <input
                                  type="email"
                                  value={individualUnitData.email}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "email",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter email address"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Mobile Number
                                </label>
                                <input
                                  type="tel"
                                  value={individualUnitData.mobile}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "mobile",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter mobile number"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Address 1
                                </label>
                                <input
                                  type="text"
                                  value={individualUnitData.address1}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "address1",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter address 1"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Address 2
                                </label>
                                <input
                                  type="text"
                                  value={individualUnitData.address2}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "address2",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter address 2"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  City
                                </label>
                                <input
                                  type="text"
                                  value={individualUnitData.city}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "city",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter city"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  State
                                </label>
                                <input
                                  type="text"
                                  value={individualUnitData.state}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "state",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter state"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Country
                                </label>
                                <input
                                  type="text"
                                  value={individualUnitData.country}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "country",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter country"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Zipcode
                                </label>
                                <input
                                  type="text"
                                  value={individualUnitData.zipcode}
                                  onChange={(e) =>
                                    handleIndividualUnitInputChange(
                                      "zipcode",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter zipcode"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                            </div>

                            <button
                              onClick={handleIndividualUnitSubmit}
                              disabled={!isIndividualUnitFormValid()}
                              className={`w-full py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                                isIndividualUnitFormValid()
                                  ? "bg-[#1FA372] text-white hover:bg-[#188f5f]"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              Submit
                            </button>
                          </div>
                        ) : activeTab === "bulk" ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload CSV File
                              </label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1FA372] transition-colors">
                                <input
                                  type="file"
                                  accept=".csv"
                                  onChange={handleFileChange}
                                  className="hidden"
                                  id="csv-upload"
                                />
                                <label
                                  htmlFor="csv-upload"
                                  className="cursor-pointer flex flex-col items-center"
                                >
                                  <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2"></i>
                                  <span className="text-sm text-gray-600">
                                    {csvFile
                                      ? csvFile.name
                                      : "Click to upload CSV file"}
                                  </span>
                                </label>
                              </div>
                            </div>

                            <button
                              onClick={handleDownloadSampleCSV}
                              className="w-full py-2 border-2 border-[#1FA372] text-[#1FA372] rounded-lg font-semibold hover:bg-[#1FA372] hover:text-white transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
                            >
                              <i className="ri-download-line text-lg"></i>
                              <span>Sample CSV File</span>
                            </button>

                            <button
                              onClick={handleBulkUploadSubmit}
                              disabled={!csvFile}
                              className={`w-full py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                                csvFile
                                  ? "bg-[#1FA372] text-white hover:bg-[#188f5f]"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              Active
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="relative">
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <i className="ri-search-line text-gray-400 text-sm"></i>
                                </div>
                                <input
                                  type="text"
                                  value={ownerSearchTerm}
                                  onChange={(e) => {
                                    setOwnerSearchTerm(e.target.value);
                                    setShowOwnerDropdown(true);
                                  }}
                                  onFocus={() => setShowOwnerDropdown(true)}
                                  placeholder="Search owner by name"
                                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>

                              {showOwnerDropdown &&
                                ownerSearchTerm &&
                                filteredOwners.length > 0 && (
                                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {filteredOwners.map((owner) => (
                                      <div
                                        key={owner.id}
                                        onClick={() => handleOwnerSelect(owner)}
                                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                      >
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-sm font-medium text-gray-900">
                                              {owner.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                              {owner.email}
                                            </p>
                                          </div>
                                          <i className="ri-arrow-right-s-line text-gray-400"></i>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  value={changeOwnerData.firstName}
                                  onChange={(e) =>
                                    handleChangeOwnerInputChange(
                                      "firstName",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter first name"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  value={changeOwnerData.lastName}
                                  onChange={(e) =>
                                    handleChangeOwnerInputChange(
                                      "lastName",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter last name"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Email ID
                                </label>
                                <input
                                  type="email"
                                  value={changeOwnerData.email}
                                  onChange={(e) =>
                                    handleChangeOwnerInputChange(
                                      "email",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter email address"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Mobile Number
                                </label>
                                <input
                                  type="tel"
                                  value={changeOwnerData.mobile}
                                  onChange={(e) =>
                                    handleChangeOwnerInputChange(
                                      "mobile",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter mobile number"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FA372] focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Address 1
                                </label>
                                <input
                                  type="text"
                                  value={changeOwnerData.address1}
                                  readOnly
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Address 2
                                </label>
                                <input
                                  type="text"
                                  value={changeOwnerData.address2}
                                  readOnly
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  City
                                </label>
                                <input
                                  type="text"
                                  value={changeOwnerData.city}
                                  readOnly
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  State
                                </label>
                                <input
                                  type="text"
                                  value={changeOwnerData.state}
                                  readOnly
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Country
                                </label>
                                <input
                                  type="text"
                                  value={changeOwnerData.country}
                                  readOnly
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Zipcode
                                </label>
                                <input
                                  type="text"
                                  value={changeOwnerData.zipcode}
                                  readOnly
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
                                />
                              </div>
                            </div>

                            <button
                              onClick={handleChangeOwnerSubmit}
                              disabled={!isChangeOwnerFormValid()}
                              className={`w-full py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                                isChangeOwnerFormValid()
                                  ? "bg-[#1FA372] text-white hover:bg-[#188f5f]"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              Submit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

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

          <div className="flex-1 overflow-y-auto p-4 bg-[#F9FAFB]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredUnits?.map((unit: any) => (
                <div
                  key={unit.unitId}
                  className={`w-full ${
                    unit.type === "tenant" ? "h-[88px]" : "h-[68px]"
                  } bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <div className="flex items-start space-x-2">
                    <div
                      className={`w-6 h-6 ${getRandomColor(
                        unit.owners[0].firstName
                      )} rounded text-white text-xs font-medium flex items-center justify-center flex-shrink-0`}
                    >
                      {unit.owners[0].firstName[0]}
                      {unit.owners[0].lastName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-black truncate">
                        {unit.owners[0].firstName} {unit.owners[0].lastName}
                      </p>
                      <div className="text-xs font-medium text-black leading-tight truncate">
                        {unit.address1}
                      </div>
                      <div className="text-xs font-medium text-black leading-tight truncate">
                        {unit.address2}
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
    </DashboardLayout>
  );
}
