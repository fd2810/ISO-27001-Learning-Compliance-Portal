import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  User,
  CheckCircle2,
  X,
  Menu,
} from 'lucide-react';
import { recentActivity } from '../data/mockData';

interface HeaderProps {
  onMenuClick?: () => void;
}

// Toast component
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50 glass-card px-4 py-3 flex items-center gap-3"
    >
      <CheckCircle2 className="w-5 h-5 text-success" />
      <span className="text-sm text-neutral-200">{message}</span>
      <button onClick={onClose} className="ml-2 text-neutral-500 hover:text-neutral-300">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

let toastId = 0;
function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>([]);

  const showToast = (message: string) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, showToast, removeToast };
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // Could close search here if needed
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = recentActivity.slice(0, 3);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 lg:left-72 bg-iso-bg border-b border-neutral-800 z-50">
        <div className="h-16 px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 mr-2 rounded-xl text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl" ref={searchRef}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search controls, clauses, policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-11 pr-10 h-10 bg-neutral-900/50 border-neutral-800 focus:bg-neutral-800/80 w-full"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 ml-4">
            {/* Notifications */}
            <button
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-iso-bg" />
              )}
            </button>

            {/* Profile */}
            <button
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-neutral-800 transition-colors"
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-neutral-200">Admin User</p>
                <p className="text-xs text-neutral-400">Lead Auditor</p>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Toast notifications */}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </>
  );
}
