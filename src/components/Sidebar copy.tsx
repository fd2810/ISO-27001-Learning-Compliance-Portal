import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, BookOpen, FileText, Shield, ClipboardCheck, AlertTriangle,
  Briefcase, FileSearch, BarChart3, Info, ChevronLeft, ChevronRight,
  ShieldCheck, X, Users, Cpu
} from 'lucide-react';
import { navigationItems } from '../data/mockData';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Home, BookOpen, FileText, Shield, ClipboardCheck, AlertTriangle,
  Briefcase, FileSearch, BarChart3, Info, Users, Cpu
};

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <motion.aside
        initial={{ width: collapsed ? 72 : 280 }}
        animate={{ width: collapsed ? 72 : 280 }}
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
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 no-scrollbar">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl mb-1 transition-all ${
                  isActive 
                    ? 'bg-accent/10 text-accent border border-accent/30' 
                    : 'hover:bg-neutral-800 text-neutral-400 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={onCloseMobile}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-iso-bg z-50 lg:hidden flex flex-col"
            >
              {/* ... same mobile content as before ... */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}