'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  approved: number;
  pending: number;
  rejected: number;
}

interface ApprovalRequestsChartProps {
  data: ChartData;
}

export default function ApprovalRequestsChart({ data }: ApprovalRequestsChartProps) {
  const chartData = [
    {
      name: 'Approved',
      count: data.approved,
      fill: '#10B981'
    },
    {
      name: 'Pending', 
      count: data.pending,
      fill: '#F59E0B'
    },
    {
      name: 'Rejected',
      count: data.rejected,
      fill: '#EF4444'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            radius={[4, 4, 0, 0]}
            fill="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}