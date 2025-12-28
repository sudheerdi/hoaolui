"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Link from "next/link";

export default function PaymentStatusChart() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedCategory, setSelectedCategory] = useState("Unpaid");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingAllAmounts, setEditingAllAmounts] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editedAmounts, setEditedAmounts] = useState<{ [key: number]: number }>(
    {}
  );
  const [editedStatuses, setEditedStatuses] = useState<{
    [key: number]: string;
  }>({});
  const itemsPerPage = 5;

  const paymentData = [
    { name: "Paid", value: 195, color: "#63A16C" },
    { name: "Unpaid", value: 17, color: "#D97777" },
    { name: "Others", value: 8, color: "#f59e0b" },
  ];

  const [usersData, setUsersData] = useState({
    Paid: [
      {
        id: 1,
        name: "John Smith",
        address: "A-101, Maple Street, Downtown District",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        address: "B-205, Oak Avenue, Riverside Area",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 3,
        name: "Michael Brown",
        address: "C-302, Pine Road, Hillside Community",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 4,
        name: "Emily Davis",
        address: "A-204, Elm Street, Garden District",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 5,
        name: "David Wilson",
        address: "B-108, Cedar Lane, Lakeside Village",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 15,
        name: "Mark Thompson",
        address: "C-105, Birch Boulevard, Sunset Heights",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 16,
        name: "Jessica Clark",
        address: "A-307, Willow Way, Greenfield Park",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 17,
        name: "Ryan Lewis",
        address: "B-402, Spruce Street, Valley View",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 18,
        name: "Maria Garcia",
        address: "C-201, Ash Avenue, Mountain Ridge",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 19,
        name: "Thomas Anderson",
        address: "A-306, Cherry Circle, Meadowbrook",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 20,
        name: "Linda Martinez",
        address: "B-104, Poplar Place, Riverside Gardens",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
      {
        id: 21,
        name: "Robert Johnson",
        address: "C-403, Hickory Heights, Woodland Estates",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 0,
        status: "Paid",
      },
    ],
    Unpaid: [
      {
        id: 6,
        name: "Robert Miller",
        address: "C-401, Maple Street, Downtown District",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 12,
        status: "Unpaid",
      },
      {
        id: 7,
        name: "Lisa Anderson",
        address: "A-305, Oak Avenue, Riverside Area",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 8,
        status: "Unpaid",
      },
      {
        id: 8,
        name: "James Taylor",
        address: "B-203, Pine Road, Hillside Community",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 5,
        status: "Unpaid",
      },
      {
        id: 9,
        name: "Jennifer White",
        address: "C-106, Elm Street, Garden District",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 18,
        status: "Unpaid",
      },
      {
        id: 10,
        name: "Christopher Lee",
        address: "A-402, Cedar Lane, Lakeside Village",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 25,
        status: "Unpaid",
      },
      {
        id: 22,
        name: "Patricia Wilson",
        address: "B-301, Birch Boulevard, Sunset Heights",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 7,
        status: "Unpaid",
      },
      {
        id: 23,
        name: "Steven Davis",
        address: "C-205, Willow Way, Greenfield Park",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 15,
        status: "Unpaid",
      },
      {
        id: 24,
        name: "Nancy Brown",
        address: "A-108, Spruce Street, Valley View",
        amount: 450.0,
        dueDate: "2024-01-15",
        daysOverdue: 22,
        status: "Unpaid",
      },
    ],
    Others: [
      {
        id: 11,
        name: "Amanda Garcia",
        address: "B-301, Ash Avenue, Mountain Ridge",
        amount: 400.0,
        lateFee: 50.0,
        dueDate: "2023-11-15",
        daysOverdue: 75,
        status: "Unpaid",
      },
      {
        id: 12,
        name: "Daniel Martinez",
        address: "C-204, Cherry Circle, Meadowbrook",
        amount: 400.0,
        lateFee: 50.0,
        dueDate: "2023-10-15",
        daysOverdue: 105,
        status: "Unpaid",
      },
      {
        id: 13,
        name: "Michelle Rodriguez",
        address: "A-103, Poplar Place, Riverside Gardens",
        amount: 400.0,
        lateFee: 50.0,
        dueDate: "2023-12-15",
        daysOverdue: 45,
        status: "Unpaid",
      },
      {
        id: 14,
        name: "Kevin Thompson",
        address: "C-302, Hickory Heights, Woodland Estates",
        amount: 400.0,
        lateFee: 50.0,
        dueDate: "2023-09-15",
        daysOverdue: 135,
        status: "Unpaid",
      },
      {
        id: 25,
        name: "Charles Miller",
        address: "C-302, Sycamore Street, Parkside Manor",
        amount: 400.0,
        lateFee: 50.0,
        dueDate: "2023-08-15",
        daysOverdue: 165,
        status: "Unpaid",
      },
      {
        id: 26,
        name: "Helen Clark",
        address: "A-205, Magnolia Drive, Creekside Village",
        amount: 400.0,
        lateFee: 50.0,
        dueDate: "2023-07-15",
        daysOverdue: 195,
        status: "Unpaid",
      },
    ],
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePieClick = (data: any) => {
    setSelectedCategory(data.name);
    setCurrentPage(1);
  };

  const handleMouseEnter = (data: any, index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleEditAllAmounts = () => {
    setEditingAllAmounts(true);
    const currentUsers =
      usersData[selectedCategory as keyof typeof usersData] || [];
    const amounts: { [key: number]: number } = {};
    const statuses: { [key: number]: string } = {};
    currentUsers.forEach((user) => {
      amounts[user.id] = user.amount;
      statuses[user.id] = user.status;
    });
    setEditedAmounts(amounts);
    setEditedStatuses(statuses);
  };

  const handleSubmitAllAmounts = () => {
    const updatedUsersData = { ...usersData };
    const categoryUsers =
      updatedUsersData[selectedCategory as keyof typeof usersData];

    categoryUsers.forEach((user) => {
      if (editedAmounts[user.id] !== undefined) {
        user.amount = editedAmounts[user.id];
      }
      if (editedStatuses[user.id] !== undefined) {
        user.status = editedStatuses[user.id];
      }
    });

    setUsersData(updatedUsersData);
    setEditingAllAmounts(false);
    setEditedAmounts({});
    setEditedStatuses({});
  };

  const handleEditRowAmount = (userId: number) => {
    setEditingRowId(userId);
    const user = usersData[selectedCategory as keyof typeof usersData].find(
      (u) => u.id === userId
    );
    if (user) {
      setEditedAmounts({ [userId]: user.amount });
      setEditedStatuses({ [userId]: user.status });
    }
  };

  const handleSubmitRowAmount = (userId: number) => {
    const updatedUsersData = { ...usersData };
    const categoryUsers =
      updatedUsersData[selectedCategory as keyof typeof usersData];
    const userIndex = categoryUsers.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
      if (editedAmounts[userId] !== undefined) {
        categoryUsers[userIndex].amount = editedAmounts[userId];
      }
      if (editedStatuses[userId] !== undefined) {
        categoryUsers[userIndex].status = editedStatuses[userId];
      }
    }

    setUsersData(updatedUsersData);
    setEditingRowId(null);
    setEditedAmounts({});
    setEditedStatuses({});
  };

  const handleAmountChange = (userId: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setEditedAmounts((prev) => ({ ...prev, [userId]: numValue }));
  };

  const handleStatusChange = (userId: number, value: string) => {
    setEditedStatuses((prev) => ({ ...prev, [userId]: value }));
  };

  const handleNotifyAll = () => {
    alert("Notification sent to everyone");
  };

  const currentUsers =
    usersData[selectedCategory as keyof typeof usersData] || [];
  const totalPages = Math.ceil(currentUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageUsers = currentUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setEditingAllAmounts(false);
    setEditingRowId(null);
    setEditedAmounts({});
    setEditedStatuses({});
  };

  const getTabColor = (category: string) => {
    const item = paymentData.find((data) => data.name === category);
    return item ? item.color : "#6b7280";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <div className="text-sm font-semibold text-gray-900 mb-2">
            Violation $400
          </div>
          <div className="text-sm font-medium text-gray-700">Fine $50</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-100">
          <Link
            href="/violations"
            className="cursor-pointer hover:opacity-80 transition-opacity flex-1"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-alert-line text-red-500 text-sm"></i>
                <span className="text-xs font-medium text-gray-700">
                  Violations:
                </span>
                <span className="text-sm font-bold text-red-600">3</span>
              </div>
            </div>
          </Link>
          <Link
            href="/approval-requests"
            className="cursor-pointer hover:opacity-80 transition-opacity flex-1"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-file-list-3-line text-blue-500 text-sm"></i>
                <span className="text-xs font-medium text-gray-700">
                  Requests:
                </span>
                <span className="text-sm font-bold text-blue-600">5</span>
              </div>
            </div>
          </Link>
          <Link
            href="/votes-polling"
            className="cursor-pointer hover:opacity-80 transition-opacity flex-1"
          >
            <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-bar-chart-box-line text-green-500 text-sm"></i>
                <span className="text-xs font-medium text-gray-700">
                  Polls:
                </span>
                <span className="text-sm font-bold text-green-600">2</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="mb-2" style={{ marginTop: "-40px" }}>
          <h3 className="text-xl font-bold text-black">
            Monthly Payment Status
          </h3>
        </div>
        <div className="mb-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer pr-8"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center mb-4">
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={hoveredIndex !== null ? 75 : 70}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={handlePieClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ cursor: "pointer" }}
                >
                  {paymentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={hoveredIndex === index ? "#ffffff" : "none"}
                      strokeWidth={hoveredIndex === index ? 3 : 0}
                      style={{
                        filter:
                          hoveredIndex === index ? "brightness(1.1)" : "none",
                        transform:
                          hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "center",
                        transition: "all 0.2s ease-in-out",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} units`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-1/2 pl-4">
            <div className="space-y-3">
              {paymentData.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleCategoryChange(item.name)}
                  className={`w-full px-4 py-2 text-sm rounded-lg cursor-pointer whitespace-nowrap transition-colors text-left flex items-center justify-between ${
                    selectedCategory === item.name
                      ? "text-white border"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === item.name ? item.color : undefined,
                    borderColor:
                      selectedCategory === item.name ? item.color : undefined,
                  }}
                >
                  <span>{item.name}</span>
                  <span>({item.value})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-black">{selectedCategory}</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={
                editingAllAmounts
                  ? handleSubmitAllAmounts
                  : handleEditAllAmounts
              }
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-teal-600 transition-colors cursor-pointer"
              title={
                editingAllAmounts ? "Submit All Changes" : "Edit All Amounts"
              }
            >
              <i
                className={`${
                  editingAllAmounts ? "ri-check-line" : "ri-edit-line"
                } text-lg`}
              ></i>
            </button>
            <button
              onClick={handleNotifyAll}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
              title="Select alert to notify all owner"
            >
              <i className="ri-notification-3-line text-lg"></i>
            </button>
            <span className="text-sm text-gray-500">
              Select alert to notify all owner
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#DCDCDC" }}>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-bold text-black">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-bold text-black">
                  Address
                </th>
                <th className="px-4 py-3 text-left font-bold text-black">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-bold text-black">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left font-bold text-black">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-bold text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentPageUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-black font-medium">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-black">
                    <div
                      className="truncate max-w-[200px] cursor-pointer"
                      title={user.address}
                    >
                      {user.address}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-black relative">
                    {editingAllAmounts || editingRowId === user.id ? (
                      <input
                        type="number"
                        value={editedAmounts[user.id] || user.amount}
                        onChange={(e) =>
                          handleAmountChange(user.id, e.target.value)
                        }
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        step="0.01"
                        min="0"
                      />
                    ) : selectedCategory === "Others" && "lateFee" in user ? (
                      <div
                        className="cursor-pointer"
                        title={`Unpaid: $${user.amount.toFixed(
                          2
                        )}, Late Fee: $${(user as any).lateFee.toFixed(2)}`}
                      >
                        ${(user.amount + (user as any).lateFee).toFixed(2)}
                      </div>
                    ) : (
                      `$${user.amount.toFixed(2)}`
                    )}
                  </td>
                  <td className="px-4 py-3 text-black">{user.dueDate}</td>
                  <td className="px-4 py-3">
                    {editingAllAmounts || editingRowId === user.id ? (
                      <select
                        value={editedStatuses[user.id] || user.status}
                        onChange={(e) =>
                          handleStatusChange(user.id, e.target.value)
                        }
                        className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer pr-6"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          user.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          editingRowId === user.id
                            ? handleSubmitRowAmount(user.id)
                            : handleEditRowAmount(user.id)
                        }
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-teal-600 transition-colors cursor-pointer"
                        title={editingRowId === user.id ? "Submit" : "Edit"}
                      >
                        <i
                          className={`${
                            editingRowId === user.id
                              ? "ri-check-line"
                              : "ri-edit-line"
                          } text-sm`}
                        ></i>
                      </button>
                      <button
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                        title="Send Notification"
                      >
                        <i className="ri-notification-3-line text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, currentUsers.length)} of {currentUsers.length}{" "}
              users
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded-lg cursor-pointer whitespace-nowrap ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-sm rounded-lg cursor-pointer whitespace-nowrap ${
                      currentPage === page
                        ? "bg-teal-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm rounded-lg cursor-pointer whitespace-nowrap ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
