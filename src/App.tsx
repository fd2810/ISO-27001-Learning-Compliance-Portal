import { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import { PageLoader } from './components/Loaders';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const LearnPage = lazy(() => import('./pages/LearnPage'));
const ClausesPage = lazy(() => import('./pages/ClausesPage'));
const ControlsPage = lazy(() => import('./pages/ControlsPage'));
const ControlDetailPage = lazy(() => import('./pages/ControlDetailPage'));
const ChecklistPage = lazy(() => import('./pages/ChecklistPage'));
const RiskDashboardPage = lazy(() => import('./pages/RiskDashboardPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="min-h-[calc(100vh-8rem)]"
    >
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </motion.div>
  );
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-iso-bg">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.15, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 -left-40 w-72 h-72 bg-success/3 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.1, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-40 right-1/3 w-80 h-80 bg-accent-glow/3 rounded-full blur-3xl"
          />
        </div>

        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-cyber-grid animated-gradient">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                <Route path="/learn" element={<PageWrapper><LearnPage /></PageWrapper>} />
                <Route path="/clauses" element={<PageWrapper><ClausesPage /></PageWrapper>} />
                <Route path="/annex-a" element={<PageWrapper><ControlsPage /></PageWrapper>} />
                <Route path="/annex-a/:id" element={<PageWrapper><ControlDetailPage /></PageWrapper>} />
                <Route path="/checklist" element={<PageWrapper><ChecklistPage /></PageWrapper>} />
                <Route path="/risk" element={<PageWrapper><RiskDashboardPage /></PageWrapper>} />
                <Route path="/dashboard" element={<PageWrapper><DashboardPage /></PageWrapper>} />
                <Route path="/case-studies" element={<PageWrapper><CaseStudiesPage /></PageWrapper>} />
                <Route path="/docs" element={<PageWrapper><DocsPage /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
