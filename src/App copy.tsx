import { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import { PageLoader } from './components/Loaders';

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

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-iso-bg">
        {/* Sticky Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:ml-72">
          {/* Fixed Header */}
          <Header
            onMenuClick={() => setMobileMenuOpen(true)}
            sidebarCollapsed={sidebarCollapsed}
          />

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-auto pt-16 p-6 lg:p-8 bg-cyber-grid">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/clauses" element={<ClausesPage />} />
                <Route path="/annex-a" element={<ControlsPage />} />
                <Route path="/annex-a/:id" element={<ControlDetailPage />} />
                <Route path="/checklist" element={<ChecklistPage />} />
                <Route path="/risk" element={<RiskDashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}