export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'analyst' | 'viewer';
}

export interface AnalyticsData {
  id: string;
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  period: string;
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  users: number;
  sessions: number;
  conversion: number;
}

export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  category: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface DashboardState {
  selectedPeriod: 'day' | 'week' | 'month' | 'year';
  isSidebarOpen: boolean;
  notifications: Notification[];
  user: User | null;
  analyticsData: AnalyticsData[];
  chartData: ChartDataPoint[];
  transactions: Transaction[];
  setSelectedPeriod: (period: 'day' | 'week' | 'month' | 'year') => void;
  toggleSidebar: () => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
}