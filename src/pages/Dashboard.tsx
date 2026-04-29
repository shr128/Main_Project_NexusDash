import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Clock } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { StatCard } from '@/components/StatCard';
import { RevenueChart } from '@/components/RevenueChart';
import { TransactionsTable } from '@/components/TransactionsTable';
import { formatCompactNumber, formatCurrency } from '@/utils';

export function Dashboard() {
  const { analyticsData } = useDashboardStore();

  const statIcons = {
    'Total Revenue': DollarSign,
    'Active Users': Users,
    'Conversion Rate': TrendingUp,
    'Avg. Session': Clock,
  };

  const statTrends = {
    'Total Revenue': 'up' as const,
    'Active Users': 'up' as const,
    'Conversion Rate': 'down' as const,
    'Avg. Session': 'up' as const,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-dark-text mb-2">Dashboard</h1>
        <p className="text-dark-muted">Welcome back! Here's what's happening with your business.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((stat, index) => (
          <StatCard
            key={stat.id}
            title={stat.metric}
            value={stat.metric === 'Total Revenue' 
              ? formatCurrency(stat.value) 
              : stat.metric === 'Conversion Rate'
                ? `${stat.value}%`
                : formatCompactNumber(stat.value)}
            change={stat.change}
            icon={statIcons[stat.metric as keyof typeof statIcons]}
            trend={statTrends[stat.metric as keyof typeof statTrends]}
            delay={index + 1}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-dark-text mb-6">Quick Insights</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-emerald/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent-emerald" />
                </div>
                <div>
                  <p className="text-dark-muted text-sm">Growth Rate</p>
                  <p className="text-dark-text font-semibold">+24.5%</p>
                </div>
              </div>
              <span className="text-accent-emerald text-sm font-medium">↑ 3.2%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent-cyan" />
                </div>
                <div>
                  <p className="text-dark-muted text-sm">New Users</p>
                  <p className="text-dark-text font-semibold">1,247</p>
                </div>
              </div>
              <span className="text-accent-emerald text-sm font-medium">↑ 12.8%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-violet/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-accent-violet" />
                </div>
                <div>
                  <p className="text-dark-muted text-sm">Avg. Order</p>
                  <p className="text-dark-text font-semibold">₹12,450</p>
                </div>
              </div>
              <span className="text-accent-rose text-sm font-medium">↓ 2.1%</span>
            </div>

            <div className="pt-4 border-t border-dark-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-dark-muted text-sm">Monthly Target</span>
                <span className="text-dark-text font-medium">78%</span>
              </div>
              <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-cyan rounded-full"
                />
              </div>
              <p className="text-dark-muted text-xs mt-2">₹22,20,000 of ₹28,45,000</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transactions Table */}
      <TransactionsTable />
    </div>
  );
}