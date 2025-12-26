"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import UserProfile from "../../components/UserProfile";
import VendorDetailsPanel from "./VendorDetailsPanel";
import AddVendorModal from "./AddVendorModal";
import PayVendorModal from "./PayVendorModal";

export default function PaymentScreen() {
  const [selectedTab, setSelectedTab] = useState("vendors");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showPayVendor, setShowPayVendor] = useState(false);
  const [vendorToPay, setVendorToPay] = useState<any>(null);
  const [invoiceToPay, setInvoiceToPay] = useState<any>(null);

  const vendors = [
    {
      id: 1,
      logo: "https://readdy.ai/api/search-image?query=professional%20landscaping%20company%20logo%20with%20green%20leaf%20design%20on%20white%20background%20simple%20modern&width=80&height=80&seq=vendor1&orientation=squarish",
      name: "Green Lawn Services",
      accountNumber: "ACC-2024-001",
      address: "123 Garden St, Miami, FL 33101",
      recentPayment: "$2,450",
      email: "contact@greenlawn.com",
      phone: "(305) 555-0123",
      companyInfo: "Professional landscaping and lawn maintenance services",
      ein: "12-3456789",
      website: "www.greenlawn.com",
      department: "Landscaping",
    },
    {
      id: 2,
      logo: "https://readdy.ai/api/search-image?query=professional%20pool%20maintenance%20company%20logo%20with%20blue%20water%20wave%20design%20on%20white%20background%20simple%20modern&width=80&height=80&seq=vendor2&orientation=squarish",
      name: "Crystal Pool Maintenance",
      accountNumber: "ACC-2024-002",
      address: "456 Water Ave, Miami, FL 33102",
      recentPayment: "$1,850",
      email: "info@crystalpool.com",
      phone: "(305) 555-0456",
      companyInfo: "Pool cleaning and maintenance specialists",
      ein: "98-7654321",
      website: "www.crystalpool.com",
      department: "Pool Services",
    },
    {
      id: 3,
      logo: "https://readdy.ai/api/search-image?query=professional%20security%20company%20logo%20with%20shield%20design%20on%20white%20background%20simple%20modern&width=80&height=80&seq=vendor3&orientation=squarish",
      name: "SecureGuard Systems",
      accountNumber: "ACC-2024-003",
      address: "789 Safety Blvd, Miami, FL 33103",
      recentPayment: "$3,200",
      email: "support@secureguard.com",
      phone: "(305) 555-0789",
      companyInfo: "Security systems and monitoring services",
      ein: "45-6789012",
      website: "www.secureguard.com",
      department: "Security",
    },
    {
      id: 4,
      logo: "https://readdy.ai/api/search-image?query=professional%20cleaning%20company%20logo%20with%20broom%20design%20on%20white%20background%20simple%20modern&width=80&height=80&seq=vendor4&orientation=squarish",
      name: "Sparkle Clean Co",
      accountNumber: "ACC-2024-004",
      address: "321 Fresh St, Miami, FL 33104",
      recentPayment: "$980",
      email: "hello@sparkleclean.com",
      phone: "(305) 555-0321",
      companyInfo: "Commercial and residential cleaning services",
      ein: "78-9012345",
      website: "www.sparkleclean.com",
      department: "Cleaning",
    },
  ];

  const paymentHistory = [
    {
      id: 1,
      vendor: "Green Lawn Services",
      vendorLogo:
        "https://readdy.ai/api/search-image?query=professional%20landscaping%20company%20logo%20with%20green%20leaf%20design%20on%20white%20background%20simple%20modern&width=80&height=80&seq=vendor1&orientation=squarish",
      type: "Mail Check",
      amount: "$2,450",
      checkNo: "CHK-1001",
      status: "Delivered",
      invoiceDate: "2024-01-05",
      paymentDate: "2024-01-10",
      estDelivery: "2024-01-15",
      invoiceNumber: "INV-00973",
    },
    {
      id: 2,
      vendor: "Crystal Pool Maintenance",
      vendorLogo:
        "https://readdy.ai/api/search-image?query=professional%20pool%20maintenance%20company%20logo%20with%20blue%20water%20wave%20design%20on%20white%20background%20simple%20modern&width=80&height=80&seq=vendor2&orientation=squarish",
      type: "Print Check",
      amount: "$1,850",
      checkNo: "CHK-1002",
      status: "Paid",
      invoiceDate: "2024-01-08",
      paymentDate: "2024-01-12",
      estDelivery: "N/A",
      invoiceNumber: "INV-00974",
    },
    {
      id: 3,
      vendor: "SecureGuard Systems",
      vendorLogo:
        "https://readdy.ai/api/search-image?query=professional%20security%20company%20logo%20with%20shield%20design%20on%20white%20background%20simple%20modern&width=80&height=80&seq=vendor3&orientation=squarish",
      type: "Mail Check",
      amount: "$3,200",
      checkNo: "CHK-1003",
      status: "Pending Approval",
      invoiceDate: "2024-01-10",
      paymentDate: "2024-01-14",
      estDelivery: "2024-01-18",
      invoiceNumber: "INV-00975",
    },
    {
      id: 4,
      vendor: "Sparkle Clean Co",
      vendorLogo:
        "https://readdy.ai/api/search-image?query=professional%20cleaning%20company%20logo%20with%20broom%20design%20on%20white%20background%20simple%20modern&width=80&height=80&seq=vendor4&orientation=squarish",
      type: "Print Check",
      amount: "$980",
      checkNo: "CHK-1004",
      status: "Paid",
      invoiceDate: "2024-01-12",
      paymentDate: "2024-01-15",
      estDelivery: "N/A",
      invoiceNumber: "INV-00976",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (vendor: any) => {
    setSelectedVendor(vendor);
    setShowVendorDetails(true);
  };

  const handlePayVendor = (vendor: any) => {
    setVendorToPay(vendor);
    setShowPayVendor(true);
  };

  const handlePayInvoice = (invoice: any) => {
    setInvoiceToPay(invoice);
    setShowPayVendor(true);
  };

  const exportToCSV = () => {
    const headers = [
      "Vendor",
      "Type",
      "Amount",
      "Check No.",
      "Status",
      "Invoice Date",
      "Payment Date",
      "Est. Delivery",
    ];
    const rows = paymentHistory.map((p) => [
      p.vendor,
      p.type,
      p.amount,
      p.checkNo,
      p.status,
      p.invoiceDate,
      p.paymentDate,
      p.estDelivery,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payment-history.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#1E293B] overflow-hidden">
      <Sidebar />

      <div className="lg:ml-[260px] p-[10px] h-screen flex flex-col">
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div></div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <i className="ri-notification-3-line text-xl text-gray-600 cursor-pointer hover:text-gray-800"></i>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Greenwood Community & 123 Main Street
                </span>
                <UserProfile />
              </div>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-6"
            suppressHydrationWarning={true}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex items-center justify-between px-6">
                  <nav className="flex space-x-8">
                    {[
                      {
                        id: "vendors",
                        label: "Vendors",
                        icon: "ri-building-line",
                      },
                      {
                        id: "history",
                        label: "Invoices",
                        icon: "ri-file-list-3-line",
                      },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap ${
                          selectedTab === tab.id
                            ? "border-[#1FA372] text-[#1FA372]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <i className={`${tab.icon} text-lg`}></i>
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                  <div className="flex items-center space-x-3">
                    {selectedTab === "history" && (
                      <button
                        onClick={exportToCSV}
                        className="border-2 border-[#1FA372] text-[#1FA372] px-4 py-2 rounded-lg hover:bg-[#1FA372] hover:text-white transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-file-download-line"></i>
                        <span>Export CSV</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowAddVendor(true)}
                      className="bg-[#1FA372] text-white px-4 py-2 rounded-lg hover:bg-[#188f5f] transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-add-line"></i>
                      <span>New Vendor</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                {selectedTab === "vendors" && (
                  <div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead style={{ backgroundColor: "#DCDCDC" }}>
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Vendor
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Account Number
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Address
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Recent Payment
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {vendors.map((vendor) => (
                            <tr key={vendor.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={vendor.logo}
                                    alt={vendor.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                  <span className="text-base font-medium text-black">
                                    {vendor.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                {vendor.accountNumber}
                              </td>
                              <td className="px-6 py-4 text-base font-medium text-black">
                                {vendor.address}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                {vendor.recentPayment}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base">
                                <button
                                  onClick={() => handlePayVendor(vendor)}
                                  className="text-[#1FA372] hover:text-[#188f5f] mr-3 whitespace-nowrap cursor-pointer font-bold"
                                >
                                  Pay Vendor
                                </button>
                                <button
                                  onClick={() => handleViewDetails(vendor)}
                                  className="text-[#1FA372] hover:text-[#188f5f] whitespace-nowrap cursor-pointer font-bold"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {selectedTab === "history" && (
                  <div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead style={{ backgroundColor: "#DCDCDC" }}>
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Vendor
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Type
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Check No.
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Invoice Date
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Payment Date
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Est. Delivery
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-black">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {paymentHistory.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={payment.vendorLogo}
                                    alt={payment.vendor}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                  <span className="text-base font-medium text-black">
                                    {payment.vendor}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                {payment.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                {payment.amount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                {payment.checkNo}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                    payment.status
                                  )}`}
                                >
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                {payment.invoiceDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                {payment.paymentDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-black">
                                {payment.estDelivery}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-base">
                                {payment.status === "Paid" ||
                                payment.status === "Delivered" ? (
                                  <button className="text-[#1FA372] hover:text-[#188f5f] transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer font-bold">
                                    <i className="ri-download-line"></i>
                                    <span>Download</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handlePayInvoice(payment)}
                                    className="text-[#1FA372] hover:text-[#188f5f] transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer font-bold"
                                  >
                                    <i className="ri-money-dollar-circle-line"></i>
                                    <span>Pay Now</span>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVendorDetails && selectedVendor && (
        <VendorDetailsPanel
          vendor={selectedVendor}
          onClose={() => {
            setShowVendorDetails(false);
            setSelectedVendor(null);
          }}
        />
      )}

      {showAddVendor && (
        <AddVendorModal onClose={() => setShowAddVendor(false)} />
      )}

      {showPayVendor && (vendorToPay || invoiceToPay) && (
        <PayVendorModal
          vendor={vendorToPay}
          invoice={invoiceToPay}
          onClose={() => {
            setShowPayVendor(false);
            setVendorToPay(null);
            setInvoiceToPay(null);
          }}
        />
      )}
    </div>
  );
}
