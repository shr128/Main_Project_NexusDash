import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Wallet,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/utils';
import { useDashboardStore } from '@/store/dashboardStore';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/users', icon: Users, label: 'Users' },
  { path: '/transactions', icon: Wallet, label: 'Transactions' },
  { path: '/reports', icon: TrendingUp, label: 'Reports' },
];

const bottomNavItems = [
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, user } = useDashboardStore();

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 },
  };

  return (
    <motion.aside
      initial={false}
      animate={isSidebarOpen ? 'expanded' : 'collapsed'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-dark-card/80 backdrop-blur-xl border-r border-dark-border z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-violet flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">N</span>
        </div>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <h1 className="text-xl font-bold gradient-text whitespace-nowrap">Nexus</h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 w-6 h-6 bg-dark-card border border-dark-border rounded-full flex items-center justify-center hover:bg-dark-border transition-colors"
      >
        {isSidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-dark-muted" />
        ) : (
          <ChevronRight className="w-4 h-4 text-dark-muted" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                'hover:bg-dark-border/50',
                isActive 
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' 
                  : 'text-dark-muted hover:text-dark-text'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-dark-border space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                'hover:bg-dark-border/50',
                isActive 
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' 
                  : 'text-dark-muted hover:text-dark-text'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}

        {/* User Profile */}
        {user && (
          <div className={cn(
            'flex items-center gap-3 px-3 py-3 mt-4 rounded-xl',
            'bg-dark-border/30 border border-dark-border'
          )}>
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-9 h-9 rounded-full flex-shrink-0"
            />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-medium text-dark-text whitespace-nowrap">{user.name}</p>
                  <p className="text-xs text-dark-muted whitespace-nowrap">{user.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.aside>
  );
}