import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  X,
  Shield,
  FileText,
  Info,
  Menu,
} from 'lucide-react';
import { recentActivity, annexAControls, isoClauses } from '../data/mockData';

interface HeaderProps {
  onMenuClick?: () => void;
  scrolled?: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'control' | 'clause';
  path: string;
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

export default function Header({ onMenuClick, scrolled }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();

  // Build search index from controls and clauses
  const searchIndex = useMemo<SearchResult[]>(() => {
    const controls: SearchResult[] = annexAControls.map(c => ({
      id: c.id,
      title: `${c.number}: ${c.title}`,
      description: c.description.substring(0, 80) + '...',
      type: 'control' as const,
      path: `/annex-a`,
    }));
    const clauses: SearchResult[] = isoClauses.map(c => ({
      id: c.id,
      title: `Clause ${c.number}: ${c.title}`,
      description: c.content.substring(0, 80) + '...',
      type: 'clause' as const,
      path: `/clauses`,
    }));
    return [...controls, ...clauses];
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return searchIndex.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    ).slice(0, 6);
  }, [searchQuery, searchIndex]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSelect = (result: SearchResult) => {
    navigate(result.path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  // Get first 3 activities for notifications
  const notifications = recentActivity.slice(0, 3);

  const notificationIcons = {
    success: CheckCircle2,
    warning: AlertTriangle,
    info: Info,
    danger: AlertTriangle,
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full border-b border-neutral-800 bg-iso-bg/80 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/20' : ''
        }`}
      >
        <div className="flex h-16 items-center px-4 lg:px-6">
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-accent transition-colors" />
              <input
                type="text"
                placeholder="Search controls, clauses, policies..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                onKeyDown={handleSearchKeyDown}
                className="input pl-11 pr-10 h-10 bg-neutral-900/50 border-neutral-800 focus:bg-neutral-800/80"
                aria-label="Search controls and clauses"
                aria-expanded={showSearchResults}
                aria-controls="search-results"
                role="combobox"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    id="search-results"
                    className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden"
                    role="listbox"
                  >
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSearchSelect(result)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-800/50 transition-colors text-left"
                        role="option"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                          {result.type === 'control' ? (
                            <Shield className="w-4 h-4 text-accent" />
                          ) : (
                            <FileText className="w-4 h-4 text-accent" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-200 truncate">{result.title}</p>
                          <p className="text-xs text-neutral-500 truncate">{result.description}</p>
                        </div>
                        <span className="text-xs text-neutral-600 uppercase">{result.type}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 ml-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                aria-label="Notifications"
                aria-expanded={showNotifications}
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-iso-bg" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 glass-card overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-neutral-800 bg-neutral-800/30">
                      <h3 className="font-semibold text-neutral-100">Recent Activity</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((activity) => {
                        const Icon = notificationIcons[activity.type] || Info;
                        const iconColors = {
                          success: 'bg-success/10 text-success',
                          warning: 'bg-warning/10 text-warning',
                          info: 'bg-accent/10 text-accent',
                          danger: 'bg-danger/10 text-danger',
                        };
                        return (
                          <div
                            key={activity.id}
                            className="px-4 py-3 hover:bg-neutral-800/50 transition-colors border-b border-neutral-800/50 last:border-b-0"
                          >
                            <div className="flex gap-3">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${iconColors[activity.type]} flex items-center justify-center`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-sm text-neutral-200">{activity.action}</p>
                                <p className="text-xs text-neutral-500 mt-1">{activity.user} - {activity.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="px-4 py-2 border-t border-neutral-800 bg-neutral-800/30">
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-sm text-accent hover:text-accent-light font-medium transition-colors"
                      >
                        View all activity
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-neutral-800 transition-colors"
                aria-label="Profile menu"
                aria-expanded={showProfileMenu}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-glow">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-neutral-200">Admin User</p>
                  <p className="text-xs text-neutral-400">Lead Auditor</p>
                </div>
                <ChevronDown className="hidden md:block w-4 h-4 text-neutral-400" />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 glass-card overflow-hidden"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          showToast('Profile settings coming soon');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800/50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          showToast('Settings coming soon');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800/50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <div className="border-t border-neutral-800 my-1" />
                      <button
                        onClick={() => {
                          showToast('Signed out successfully');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
