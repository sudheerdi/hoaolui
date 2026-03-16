"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "../lib/hooks";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.hoaUser);
  const userRole = user?.memberships[0]?.role || "COMMUNITY_ADMIN";

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "ri-dashboard-line" },
    {
      path: "/payment",
      label: "Payments",
      icon: "ri-money-dollar-circle-line",
    },
    { path: "/violations", label: "Violations", icon: "ri-alert-line" },
    userRole === "COMMUNITY_ADMIN" && {
      path: "/approval-requests",
      label: "Approvals",
      icon: "ri-file-list-3-line",
    },
    userRole === "COMMUNITY_ADMIN" && {
      path: "/units",
      label: "Units",
      icon: "ri-building-line",
    },
    { path: "/votes-polling", label: "Votes", icon: "ri-pie-chart-line" },
    { path: "/calendar", label: "Calendar", icon: "ri-calendar-line" },
    { path: "/hoa-documentation", label: "Documents", icon: "ri-folder-line" },
    {
      path: "/message-board",
      label: "Message Board",
      icon: "ri-message-3-line",
    },
    userRole === "COMMUNITY_ADMIN" && {
      path: "/settings",
      label: "Configuration Policies",
      icon: "ri-settings-3-line",
    },
    userRole === "COMMUNITY_ADMIN" && {
      path: "/maintenance-schedule",
      label: "Maintenance Schedule",
      icon: "ri-tools-line",
    },
    userRole === "COMMUNITY_ADMIN" && {
      path: "/community-watch",
      label: "Community Watch",
      icon: "ri-eye-line",
    },
    userRole === "COMMUNITY_MEMBER" && {
      label: "Requests",
      icon: "ri-file-list-3-line",
      path: "/requests",
    },
    userRole === "COMMUNITY_MEMBER" && {
      label: "Service Recommendations",
      icon: "ri-customer-service-2-line",
      path: "/service-recommendations",
    },
  ];

  return (
    <div
      className="hidden lg:block fixed left-0 top-0 h-screen w-[260px] bg-[#1E293B] flex-col z-50"
      suppressHydrationWarning
    >
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1FA372] rounded-lg flex items-center justify-center">
            <i className="ri-home-4-line text-white text-xl"></i>
          </div>
          <span className="text-white font-bold text-lg">HOA-OL</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4" suppressHydrationWarning>
        {menuItems.map((item) => {
          if (!item) return null;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              prefetch={false}
              className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#374151] text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              suppressHydrationWarning
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${item.icon} text-lg`}></i>
              </div>
              <span className="text-base font-medium" suppressHydrationWarning>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
