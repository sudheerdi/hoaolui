'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { path: '/payment', label: 'Payments', icon: 'ri-money-dollar-circle-line' },
    { path: '/violations', label: 'Violations', icon: 'ri-alert-line' },
    { path: '/approval-requests', label: 'Approvals', icon: 'ri-file-list-3-line' },
    { path: '/units', label: 'Units', icon: 'ri-building-line' },
    { path: '/votes-polling', label: 'Votes', icon: 'ri-pie-chart-line' },
    { path: '/calendar', label: 'Calendar', icon: 'ri-calendar-line' },
    { path: '/hoa-documentation', label: 'Documents', icon: 'ri-folder-line' },
    { path: '/message-board', label: 'Message Board', icon: 'ri-message-3-line' },
    { path: '/settings', label: 'Configuration Policies', icon: 'ri-settings-3-line' },
    { path: '/maintenance-schedule', label: 'Maintenance Schedule', icon: 'ri-tools-line' },
    { path: '/community-watch', label: 'Community Watch', icon: 'ri-eye-line' },
  ];

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-screen w-[260px] bg-[#1E293B] flex-col z-50">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1FA372] rounded-lg flex items-center justify-center">
            <i className="ri-home-4-line text-white text-xl"></i>
          </div>
          <span className="text-white font-bold text-lg">HOA-OL</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              prefetch={false}
              className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#374151] text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${item.icon} text-lg`}></i>
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}