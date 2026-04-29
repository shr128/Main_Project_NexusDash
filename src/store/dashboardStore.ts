import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DashboardState } from '@/types';

const generateMockAnalyticsData = () => [
  { id: '1', metric: 'Total Revenue', value: 2845000, change: 12.5, trend: 'up' as const, period: 'This Month' },
  { id: '2', metric: 'Active Users', value: 45892, change: 8.2, trend: 'up' as const, period: 'This Week' },
  { id: '3', metric: 'Conversion Rate', value: 3.24, change: -0.8, trend: 'down' as const, period: 'This Day' },
  { id: '4', metric: 'Avg. Session', value: 847, change: 5.1, trend: 'up' as const, period: 'This Hour' },
];

const generateMockChartData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 50000) + 80000,
      users: Math.floor(Math.random() * 2000) + 1000,
      sessions: Math.floor(Math.random() * 5000) + 3000,
      conversion: Math.floor(Math.random() * 200) + 200,
    });
  }
  return data;
};

const generateMockTransactions = () => [
  { id: 'TXN001', customer: 'Acme Corporation', amount: 24500, status: 'completed' as const, date: '2026-04-29', category: 'Enterprise' },
  { id: 'TXN002', customer: 'TechStart Inc', amount: 8900, status: 'pending' as const, date: '2026-04-29', category: 'Startup' },
  { id: 'TXN003', customer: 'Global Systems', amount: 45200, status: 'completed' as const, date: '2026-04-28', category: 'Enterprise' },
  { id: 'TXN004', customer: 'Innovate Labs', amount: 3200, status: 'failed' as const, date: '2026-04-28', category: 'SMB' },
  { id: 'TXN005', customer: 'DataFlow Co', amount: 15750, status: 'completed' as const, date: '2026-04-27', category: 'Mid-Market' },
  { id: 'TXN006', customer: 'CloudNine Ltd', amount: 9800, status: 'pending' as const, date: '2026-04-27', category: 'Startup' },
];

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      selectedPeriod: 'month',
      isSidebarOpen: true,
      notifications: [
        { id: '1', type: 'success', title: 'Revenue Milestone', message: 'Monthly revenue exceeded target by 15%', timestamp: new Date(), read: false },
        { id: '2', type: 'warning', title: 'Server Load', message: 'Server usage at 78% - consider scaling', timestamp: new Date(Date.now() - 3600000), read: false },
        { id: '3', type: 'info', title: 'New Feature', message: 'Analytics v2.0 is now available', timestamp: new Date(Date.now() - 7200000), read: true },
      ],
      user: {
        id: 'usr_001',
        name: 'Alexandra Chen',
        email: 'alex.chen@nexus.io',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra',
        role: 'admin',
      },
      analyticsData: generateMockAnalyticsData(),
      chartData: generateMockChartData(),
      transactions: generateMockTransactions(),
      
      setSelectedPeriod: (period) => set({ selectedPeriod: period }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        ),
      })),
      clearAllNotifications: () => set({
        notifications: [],
      }),
    }),
    {
      name: 'nexus-dashboard-storage',
      partialize: (state) => ({
        selectedPeriod: state.selectedPeriod,
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
);