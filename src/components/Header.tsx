import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Sun, Command } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useClickOutside, useMediaQuery } from '@/hooks';
import { cn, formatRelativeTime } from '@/utils';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { notifications, markNotificationRead, user } = useDashboardStore();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(notificationRef, () => setIsNotificationsOpen(false));
  useClickOutside(searchRef, () => setIsSearchOpen(false));

  const unreadCount = notifications.filter(n => !n.read).length;

  const notificationIcons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️',
  };

  return (
    <header className="h-20 px-6 flex items-center justify-between border-b border-dark-border bg-dark-card/50 backdrop-blur-xl sticky top-0 z-40">
      {/* Search */}
      <div ref={searchRef} className="relative">
        <div className={cn(
          'flex items-center gap-2 bg-dark-bg border border-dark-border rounded-xl transition-all duration-300',
          isSearchOpen ? 'w-80' : 'w-64'
        )}>
          <Search className="w-5 h-5 text-dark-muted ml-3" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="flex-1 bg-transparent text-dark-text placeholder:text-dark-muted py-3 pr-3 focus:outline-none"
          />
          {!isMobile && (
            <div className="flex items-center gap-1 pr-3 text-dark-muted">
              <Command className="w-3 h-3" />
              <span className="text-xs">K</span>
            </div>
          )}
        </div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {isSearchOpen && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-2 w-full bg-dark-card border border-dark-border rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-4 text-center text-dark-muted text-sm">
                No results found for "{searchQuery}"
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button className="p-2 rounded-xl hover:bg-dark-border transition-colors">
          <Sun className="w-5 h-5 text-dark-muted" />
        </button>

        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl hover:bg-dark-border transition-colors relative"
          >
            <Bell className="w-5 h-5 text-dark-muted" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent-rose text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-80 bg-dark-card border border-dark-border rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-4 border-b border-dark-border">
                  <h3 className="font-semibold text-dark-text">Notifications</h3>
                  <p className="text-sm text-dark-muted">{unreadCount} unread</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-dark-muted">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markNotificationRead(notification.id)}
                        className={cn(
                          'p-4 border-b border-dark-border cursor-pointer transition-colors hover:bg-dark-border/30',
                          !notification.read && 'bg-primary-500/5'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg">{notificationIcons[notification.type]}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-dark-text text-sm">{notification.title}</p>
                            <p className="text-dark-muted text-xs mt-1">{notification.message}</p>
                            <p className="text-dark-muted text-xs mt-2">
                              {formatRelativeTime(notification.timestamp)}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Avatar */}
        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-dark-border">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full border-2 border-dark-border"
            />
          </div>
        )}
      </div>
    </header>
  );
}