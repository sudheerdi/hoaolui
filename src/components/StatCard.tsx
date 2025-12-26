
'use client';

interface StatCardProps {
  title: string;
  amount: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export default function StatCard({ title, amount, icon, bgColor, iconColor }: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-2 shadow-sm border border-gray-100`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-xl font-bold text-gray-900">{amount}</p>
        </div>
        <div className={`w-8 h-8 flex items-center justify-center ${iconColor} rounded-lg`}>
          <i className={`${icon} text-base`}></i>
        </div>
      </div>
    </div>
  );
}
