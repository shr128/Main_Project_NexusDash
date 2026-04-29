import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/pages/Dashboard';
import { useDashboardStore } from '@/store/dashboardStore';

function App() {
  const { isSidebarOpen } = useDashboardStore();

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar />
      
      <div 
        className="transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? 260 : 80 }}
      >
        <Header />
        
        <main className="min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    key="dashboard"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard />
                  </motion.div>
                }
              />
              <Route 
                path="/analytics" 
                element={
                  <motion.div
                    key="analytics"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="glass-card p-12 text-center">
                      <h2 className="text-2xl font-bold text-dark-text mb-4">Analytics</h2>
                      <p className="text-dark-muted">Advanced analytics coming soon...</p>
                    </div>
                  </motion.div>
                }
              />
              <Route 
                path="/users" 
                element={
                  <motion.div
                    key="users"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="glass-card p-12 text-center">
                      <h2 className="text-2xl font-bold text-dark-text mb-4">Users</h2>
                      <p className="text-dark-muted">User management coming soon...</p>
                    </div>
                  </motion.div>
                }
              />
              <Route 
                path="/transactions" 
                element={
                  <motion.div
                    key="transactions"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="glass-card p-12 text-center">
                      <h2 className="text-2xl font-bold text-dark-text mb-4">Transactions</h2>
                      <p className="text-dark-muted">Transaction history coming soon...</p>
                    </div>
                  </motion.div>
                }
              />
              <Route 
                path="/reports" 
                element={
                  <motion.div
                    key="reports"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="glass-card p-12 text-center">
                      <h2 className="text-2xl font-bold text-dark-text mb-4">Reports</h2>
                      <p className="text-dark-muted">Reports generation coming soon...</p>
                    </div>
                  </motion.div>
                }
              />
              <Route 
                path="/notifications" 
                element={
                  <motion.div
                    key="notifications"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="glass-card p-12 text-center">
                      <h2 className="text-2xl font-bold text-dark-text mb-4">Notifications</h2>
                      <p className="text-dark-muted">All notifications displayed in header</p>
                    </div>
                  </motion.div>
                }
              />
              <Route 
                path="/settings" 
                element={
                  <motion.div
                    key="settings"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="glass-card p-12 text-center">
                      <h2 className="text-2xl font-bold text-dark-text mb-4">Settings</h2>
                      <p className="text-dark-muted">Settings panel coming soon...</p>
                    </div>
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;