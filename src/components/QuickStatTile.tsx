
'use client';

interface QuickStatTileProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

export default function QuickStatTile({ title, value, icon, color }: QuickStatTileProps) {
  return (
    <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex items-center gap-2">
      <div className={`${color} w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0`}>
        <i className={`${icon} text-base text-white`}></i>
      </div>
      <div>
        <p className="text-xs text-gray-600">{title}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
