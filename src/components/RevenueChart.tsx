import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useDashboardStore } from '@/store/dashboardStore';
import { formatCompactNumber, formatCurrency } from '@/utils';

type ChartType = 'area' | 'bar';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-xl p-4 shadow-xl">
        <p className="text-dark-muted text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-dark-text text-sm font-medium">
              {entry.name}: {entry.name === 'revenue' 
                ? formatCurrency(entry.value) 
                : formatCompactNumber(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  const { chartData, selectedPeriod, setSelectedPeriod } = useDashboardStore();
  const [chartType, setChartType] = useState<ChartType>('area');

  const periods = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ] as const;

  const filteredData = chartData.slice(-7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-dark-text">Revenue Overview</h3>
          <p className="text-dark-muted text-sm">Track your revenue performance</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-dark-bg rounded-lg p-1">
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                chartType === 'area' 
                  ? 'bg-primary-500/20 text-primary-400' 
                  : 'text-dark-muted hover:text-dark-text'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                chartType === 'bar' 
                  ? 'bg-primary-500/20 text-primary-400' 
                  : 'text-dark-muted hover:text-dark-text'
              }`}
            >
              Bar
            </button>
          </div>

          {/* Period Selector */}
          <div className="flex items-center bg-dark-bg rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  selectedPeriod === period.value 
                    ? 'bg-primary-500/20 text-primary-400' 
                    : 'text-dark-muted hover:text-dark-text'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
              <XAxis 
                dataKey="date" 
                stroke="#71717a"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="#71717a"
                fontSize={12}
                tickFormatter={(value) => formatCompactNumber(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0ea5e9"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                name="revenue"
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#a78bfa"
                strokeWidth={2}
                fill="url(#usersGradient)"
                name="users"
              />
            </AreaChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
              <XAxis 
                dataKey="date" 
                stroke="#71717a"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="#71717a"
                fontSize={12}
                tickFormatter={(value) => formatCompactNumber(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="revenue" />
              <Bar dataKey="users" fill="#a78bfa" radius={[4, 4, 0, 0]} name="users" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}