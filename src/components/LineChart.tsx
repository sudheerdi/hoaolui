
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', payments: 12500 },
  { month: 'Feb', payments: 15200 },
  { month: 'Mar', payments: 11800 },
  { month: 'Apr', payments: 16400 },
  { month: 'May', payments: 14200 },
  { month: 'Jun', payments: 18500 },
  { month: 'Jul', payments: 16800 },
  { month: 'Aug', payments: 19200 },
  { month: 'Sep', payments: 17500 },
  { month: 'Oct', payments: 20100 },
  { month: 'Nov', payments: 18900 },
  { month: 'Dec', payments: 22300 },
];

export default function PaymentLineChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payment Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Payments']}
              labelStyle={{ color: '#111827' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="payments" 
              stroke="#1C7D7E" 
              strokeWidth={3}
              dot={{ fill: '#1C7D7E', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#F59E0B' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
