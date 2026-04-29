import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
  className?: string;
}

const trendColors = {
  up: 'text-accent-emerald',
  down: 'text-accent-rose',
  neutral: 'text-dark-muted',
};

const trendBgColors = {
  up: 'bg-accent-emerald/10',
  down: 'bg-accent-rose/10',
  neutral: 'bg-dark-muted/10',
};

export function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = 'neutral',
  delay = 0,
  className 
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={cn('stat-card group', className)}
    >
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-dark-muted text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-dark-text tracking-tight">{value}</h3>
          {change !== undefined && (
            <div className={cn('flex items-center gap-1 mt-2 text-sm font-medium', trendColors[trend])}>
              <Icon className="w-4 h-4" />
              <span>{change > 0 ? '+' : ''}{change.toFixed(1)}%</span>
              <span className="text-dark-muted ml-1">vs last period</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl transition-all duration-300 group-hover:scale-110', trendBgColors[trend])}>
          <Icon className={cn('w-6 h-6', trendColors[trend])} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500/0 via-primary-500/50 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}