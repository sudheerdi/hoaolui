"use client";

import { useEffect, useState } from "react";
import ViolationDetails from "./ViolationDetails";
import { useLazyGetViolationsQuery } from "../../services";
import SendViolationModal from "../../components/modals/SendViolationModal";
import { useAppDispatch } from "@/src/lib/hooks";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { setNotification } from "@/src/reducer/hoa-notificatio.reducer";

export default function ViolationsScreen() {
  const dispatch = useAppDispatch();
  const [getViolations, { data: violationsData }] = useLazyGetViolationsQuery();
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("OPEN");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSendViolationModal, setShowSendViolationModal] = useState(false);
  const [filteredViolations, setFilteredViolations] = useState(
    Array<Violation>,
  );
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currentViolations, setCurrentViolations] = useState(Array<Violation>);
  const [openViolationsCount, setOpenViolationsCount] = useState(0);
  const [resolvedViolationsCount, setResolvedViolationsCount] = useState(0);

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

  const getStatusDisplay = (status: string) => {
    if (status === "open") {
      return (
        <div className="w-full bg-red-100 rounded-full h-2">
          <div className="bg-red-400 h-2 rounded-full w-3/12"></div>
        </div>
      );
    } else if (status === "pending") {
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

  const handleGetAllViolations = async () => {
    try {
      const result = await getViolations(null).unwrap();
      const violations = result.violations;

      setTotalPages(Math.ceil(violations.length / rowsPerPage));
      setStartIndex((currentPage - 1) * rowsPerPage);
      setEndIndex(startIndex + rowsPerPage);
      const currentViolations = violations.slice(
        startIndex,
        startIndex + rowsPerPage,
      );
      setCurrentViolations(currentViolations);
      const openViolationsCount = violations.filter(
        (v) => v.status === "OPEN",
      ).length;
      setOpenViolationsCount(openViolationsCount);
      setResolvedViolationsCount(violations.length - openViolationsCount);
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error?.data.error || "Unable to load violations",
        }),
      );
    }
  };

  useEffect(() => {
    handleGetAllViolations();
  }, []);

  useEffect(() => {
    const filteredViolations = currentViolations.filter((violation) => {
      const matchesSearch =
        violation.user.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        violation.user.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        violation.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        violation.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = violation.status === statusFilter;

      return searchTerm === "" ? matchesStatus : matchesSearch && matchesStatus;
    });
    setFilteredViolations(filteredViolations);
  }, [searchTerm, currentViolations, statusFilter]);

  return (
    <DashboardLayout>
      <div className="lg:ml-[260px] bg-white rounded-lg min-h-[calc(100vh-20px)] flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <i className="ri-alert-line text-red-500"></i>
                  <span className="text-sm font-bold text-black">Open :</span>
                  <span className="text-sm font-bold text-red-600">
                    {openViolationsCount}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="ri-check-line text-green-500"></i>
                  <span className="text-sm font-bold text-black">
                    Resolved :
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    {resolvedViolationsCount}
                  </span>
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
                  <p className="text-sm font-semibold text-gray-900">
                    Community Name
                  </p>
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
          <div
            className={`flex-1 transition-all duration-300 ${
              selectedViolation ? "mr-[384px]" : ""
            }`}
          >
            <div className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
              {/* Single Card with Tabs and Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Tabs Header */}
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-between px-6">
                    <nav className="flex space-x-8">
                      <button
                        onClick={() => setStatusFilter("OPEN")}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap ${
                          statusFilter === "OPEN"
                            ? "border-[#1FA372] text-[#1FA372]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <i className="ri-alert-line text-lg"></i>
                        <span>Open</span>
                      </button>
                      <button
                        onClick={() => setStatusFilter("RESOLVED")}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap ${
                          statusFilter === "RESOLVED"
                            ? "border-[#1FA372] text-[#1FA372]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
                      <thead style={{ backgroundColor: "#DCDCDC" }}>
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
                        {filteredViolations?.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="ri-shield-check-line text-2xl text-gray-400"></i>
                              </div>
                              <h3 className="text-sm font-medium text-gray-900 mb-1">
                                No violations found
                              </h3>
                              <p className="text-sm text-gray-500">
                                Try adjusting your search or filter criteria.
                              </p>
                            </td>
                          </tr>
                        ) : (
                          filteredViolations?.map((violation) => (
                            <tr
                              key={violation.id}
                              className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                                selectedViolation?.id === violation.id
                                  ? "bg-green-50 border-l-4 border-l-teal-600"
                                  : ""
                              }`}
                              onClick={() => setSelectedViolation(violation)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-base font-medium text-black">
                                    {violation.user.firstName}{" "}
                                    {violation.user.lastName}
                                  </div>
                                  <div className="text-base font-medium text-black">
                                    {violation.user.emailId}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-base font-medium text-black">
                                  To Do
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-base font-medium text-black">
                                  {violation.type}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusDisplay(violation.status)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div
                                  className="text-base font-medium text-black"
                                  suppressHydrationWarning={true}
                                >
                                  {new Date(
                                    violation.createdAt,
                                  ).toLocaleDateString()}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {filteredViolations && filteredViolations.length > 0 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Rows per page:
                        </span>
                        <select
                          value={rowsPerPage}
                          onChange={(e) =>
                            handleRowsPerPageChange(Number(e.target.value))
                          }
                          className="pr-8 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {startIndex + 1}-
                          {Math.min(endIndex, filteredViolations?.length)} of{" "}
                          {filteredViolations.length}
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
      <SendViolationModal
        isOpen={showSendViolationModal}
        onClose={(e) => {
          setShowSendViolationModal(false);
          if (e) handleGetAllViolations();
        }}
      />
    </DashboardLayout>
  );
}
