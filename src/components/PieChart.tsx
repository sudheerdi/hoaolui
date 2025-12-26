
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Maintenance', value: 45000 },
  { name: 'Utilities', value: 28000 },
  { name: 'Security', value: 18000 },
  { name: 'Events', value: 12000 },
  { name: 'Other', value: 22000 },
];

const COLORS = ['#14b8a6', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function BudgetPieChart() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Budget Distribution</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
