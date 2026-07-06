import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { navigationItems } from '../data/mockData';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
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
};

export default function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ width: collapsed ? 72 : 280 }}
      animate={{ width: collapsed ? 72 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col h-screen bg-iso-bg border-r border-neutral-800 relative z-20"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-neutral-800">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-glow shadow-glow"
          >
            <ShieldCheck className="w-5 h-5 text-white" />
          </motion.div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1"
            >
              <h1 className="font-bold text-lg text-white">ISO Shield</h1>
              <p className="text-xs text-neutral-500">Compliance Portal</p>
            </motion.div>
          )}
        </Link>
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-neutral-800 transition-colors ml-auto"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-neutral-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden no-scrollbar">
        <div className="px-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-accent/15 text-accent border border-accent/20'
                    : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-accent' : 'text-neutral-500 group-hover:text-neutral-400'}`} />
                {!collapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="badge badge-info text-xs px-2 py-0.5 ml-auto">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-neutral-800">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800/50">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-neutral-400">Systems Operational</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
        )}
      </div>
    </motion.aside>
  );
}
