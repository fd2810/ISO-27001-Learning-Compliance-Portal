import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Shield,
  Search,
  Filter,
  Users,
  Building2,
  Cpu,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { annexAControls } from '../data/mockData';
import type { ControlCategory } from '../types';

const categories: { id: ControlCategory; label: string; count: number; icon: React.ElementType; color: string }[] = [
  { id: 'organizational', label: 'Organizational', count: 37, icon: Building2, color: 'accent' },
  { id: 'people', label: 'People', count: 8, icon: Users, color: 'success' },
  { id: 'physical', label: 'Physical', count: 14, icon: Shield, color: 'warning' },
  { id: 'technological', label: 'Technological', count: 34, icon: Cpu, color: 'danger' },
];

const colorClasses: Record<string, string> = {
  accent: 'bg-accent/20 text-accent border-accent/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  danger: 'bg-danger/20 text-danger border-danger/30',
};

export default function ControlsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<ControlCategory | 'all'>(
    (searchParams.get('cat') as ControlCategory) || 'all'
  );

  const filteredControls = useMemo(() => {
    return annexAControls.filter((control) => {
      const matchesSearch =
        searchQuery === '' ||
        control.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        control.number.includes(searchQuery) ||
        control.objective.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || control.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (category: ControlCategory | 'all') => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">Annex A</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Security Controls Library
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Browse a sample of {annexAControls.length} Annex A controls from ISO/IEC 27001:2022 (93 controls total in the full standard).
            Each control includes detailed implementation guidance, audit checklists, best practices, and real-world examples.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by control number, title, or objective..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-11"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-500" />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value as ControlCategory | 'all')}
              className="input w-auto"
            >
              <option value="all">All Categories</option>
              <option value="organizational">Organizational</option>
              <option value="people">People</option>
              <option value="physical">Physical</option>
              <option value="technological">Technological</option>
            </select>
          </div>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(isActive ? 'all' : cat.id)}
                aria-label={`Filter by ${cat.label} category`}
                aria-pressed={isActive}
                className={`glass-card p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-accent ${
                  isActive
                    ? 'border-accent bg-accent/10'
                    : 'hover:bg-neutral-800/80'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg ${colorClasses[cat.color]} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-white">{cat.label}</h3>
                <p className="text-xs text-neutral-500 mt-1">{cat.count} controls</p>
              </button>
            );
          })}
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral-500">
            Showing {filteredControls.length} of {annexAControls.length} sample controls
          </p>
        </div>

        {/* Controls Grid */}
        <div className="grid gap-4">
          {filteredControls.map((control, index) => (
            <motion.div
              key={control.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/annex-a/${control.id}`}>
                <div className="glass-card-hover p-5 group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <span className="font-bold text-accent text-sm">{control.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-white text-lg group-hover:text-accent transition-colors">
                            {control.title}
                          </h3>
                          <p className="text-sm text-neutral-500 mt-1">
                            Clause {control.clause} • {control.attributes.securityDomain}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`badge ${
                            control.difficulty === 'beginner' ? 'badge-success' :
                            control.difficulty === 'intermediate' ? 'badge-warning' : 'badge-danger'
                          }`}>
                            {control.difficulty}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <Clock className="w-3 h-3" />
                            {control.estimatedTime}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-400 mt-3 line-clamp-2">{control.objective}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        <span className={`badge ${colorClasses[categories.find(c => c.id === control.category)?.color || 'accent']}`}>
                          {control.category}
                        </span>
                        <span className="badge badge-neutral">{control.attributes.controlType}</span>
                        <div className="flex items-center gap-1 ml-auto text-xs text-accent">
                          View details
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredControls.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-400 mb-2">No controls found</h3>
            <p className="text-sm text-neutral-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
