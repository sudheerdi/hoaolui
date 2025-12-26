
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';

const data = [
  { name: 'Maintenance', value: 35, color: '#63A16C' },
  { name: 'Utilities', value: 25, color: '#8BC34A' },
  { name: 'Security', value: 20, color: '#4CAF50' },
  { name: 'Landscaping', value: 12, color: '#81C784' },
  { name: 'Others', value: 8, color: '#A5D6A7' },
];

const years = ['2024', '2023', '2022'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function BudgetChart() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('Dec');

  const totalBudget = 120000;
  const spent = 78000;
  const remaining = totalBudget - spent;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-[500px] border border-gray-100">
      <h3 className="text-xl font-bold text-black mb-4">Budget Overview</h3>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">Budget Distribution</h3>
        <div className="flex space-x-2">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer pr-8"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer pr-8"
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="w-1/2 relative">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Budget']}
                  labelStyle={{ color: '#111827' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-xs font-bold text-gray-900">Budget</div>
              <div className="text-sm font-bold text-gray-900">$120,000</div>
            </div>
          </div>
        </div>
        
        <div className="w-1/2 pl-4">
          <div className="space-y-4 mb-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-gray-900">Total Budget:</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">{formatCurrency(totalBudget)}</span>
                <div className="flex items-center text-green-600">
                  <i className="ri-arrow-up-line text-sm"></i>
                  <span className="text-xs font-medium">5.2%</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-gray-900">Spent:</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-red-600">{formatCurrency(spent)}</span>
                <div className="flex items-center text-red-600">
                  <i className="ri-arrow-up-line text-sm"></i>
                  <span className="text-xs font-medium">12.8%</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-gray-900">Remaining:</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-600">{formatCurrency(remaining)}</span>
                <div className="flex items-center text-green-600">
                  <i className="ri-arrow-down-line text-sm"></i>
                  <span className="text-xs font-medium">8.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}