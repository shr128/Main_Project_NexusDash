import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import { formatCurrency, formatDate } from '@/utils';
import { cn } from '@/utils';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

const statusStyles = {
  completed: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20',
  pending: 'bg-accent-amber/10 text-accent-amber border-accent-amber/20',
  failed: 'bg-accent-rose/10 text-accent-rose border-accent-rose/20',
};

export function TransactionsTable() {
  const { transactions } = useDashboardStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-dark-text">Recent Transactions</h3>
          <p className="text-dark-muted text-sm">Latest customer transactions</p>
        </div>
        <button className="btn-secondary text-sm">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-3 px-4 text-dark-muted font-medium text-sm">Transaction</th>
              <th className="text-left py-3 px-4 text-dark-muted font-medium text-sm">Customer</th>
              <th className="text-left py-3 px-4 text-dark-muted font-medium text-sm">Category</th>
              <th className="text-left py-3 px-4 text-dark-muted font-medium text-sm">Date</th>
              <th className="text-left py-3 px-4 text-dark-muted font-medium text-sm">Amount</th>
              <th className="text-left py-3 px-4 text-dark-muted font-medium text-sm">Status</th>
              <th className="text-right py-3 px-4 text-dark-muted font-medium text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-dark-border/50 hover:bg-dark-border/20 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center',
                      transaction.amount > 20000 ? 'bg-primary-500/10' : 'bg-dark-border'
                    )}>
                      {transaction.amount > 20000 ? (
                        <ArrowUpRight className="w-5 h-5 text-primary-400" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-dark-muted" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-dark-text">{transaction.id}</p>
                      <p className="text-dark-muted text-xs">Online</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium text-dark-text">{transaction.customer}</p>
                </td>
                <td className="py-4 px-4">
                  <span className="text-dark-muted text-sm">{transaction.category}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-dark-muted text-sm">{formatDate(transaction.date)}</span>
                </td>
                <td className="py-4 px-4">
                  <p className="font-semibold text-dark-text">{formatCurrency(transaction.amount)}</p>
                </td>
                <td className="py-4 px-4">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium border',
                    statusStyles[transaction.status]
                  )}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="p-2 hover:bg-dark-border rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-dark-muted" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}