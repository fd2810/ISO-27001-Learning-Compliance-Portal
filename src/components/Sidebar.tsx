import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  FileText,
  Shield,
  ClipboardCheck,
  AlertTriangle,
  Briefcase,
  FileSearch,
  BarChart3,
  Info,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
  Building2,
  Users,
  Cpu,
} from 'lucide-react';
import { navigationItems } from '../data/mockData';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Home,
  BookOpen,
  FileText,
  Shield,
  ClipboardCheck,
  AlertTriangle,
  Briefcase,
  FileSearch,
  BarChart3,
  Info,
  Building2,
  Users,
  Cpu,
};

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const location = useLocation();

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <motion.aside
        initial={{ width: collapsed ? 72 : 280 }}
        animate={{ width: collapsed ? 72 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col fixed top-0 left-0 h-screen bg-iso-bg border-r border-neutral-800 z-50 overflow-hidden"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-neutral-800">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            {!collapsed && <div className="font-bold text-xl text-white">ISO Shield</div>}
          </Link>

          <button
            onClick={onToggleCollapse}
            className="ml-auto p-2 hover:bg-neutral-800 rounded-lg"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-neutral-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 no-scrollbar">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all ${
                  isActive
                    ? 'bg-accent/10 text-accent border border-accent/30'
                    : 'hover:bg-neutral-800 text-neutral-400 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-neutral-800">
          {!collapsed ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800/50">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-neutral-400">Systems Operational</span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={onCloseMobile}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-iso-bg border-r border-neutral-800 z-50 lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800">
                <Link to="/" onClick={onCloseMobile} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-xl text-white">ISO Shield</div>
                    <div className="text-xs text-neutral-500">Compliance Portal</div>
                  </div>
                </Link>
                <button
                  onClick={onCloseMobile}
                  className="p-2 hover:bg-neutral-800 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                {navigationItems.map((item) => {
                  const Icon = iconMap[item.icon] || Home;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={onCloseMobile}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all ${
                        isActive
                          ? 'bg-accent/10 text-accent border border-accent/30'
                          : 'hover:bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="px-4 py-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800/50">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-neutral-400">Systems Operational</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
