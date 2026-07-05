import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MinusCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  Download,
  BarChart3,
  RotateCcw,
} from 'lucide-react';
import { annexAControls } from '../data/mockData';
import type { ComplianceStatus } from '../types';

const STATUS_STORAGE_KEY = 'iso-shield-item-statuses';
const EVIDENCE_STORAGE_KEY = 'iso-shield-item-evidence';

const statusConfig: Record<ComplianceStatus, { label: string; icon: React.ElementType; className: string }> = {
  compliant: { label: 'Compliant', icon: CheckCircle2, className: 'badge-success' },
  'non-conformity': { label: 'Non-Conformity', icon: XCircle, className: 'badge-danger' },
  partial: { label: 'Partial', icon: AlertTriangle, className: 'badge-warning' },
  na: { label: 'N/A', icon: MinusCircle, className: 'badge-neutral' },
  pending: { label: 'Pending', icon: Clock, className: 'badge-info' },
};

// Helper function to calculate control stats (not a hook)
function getControlStats(control: typeof annexAControls[0], itemStatuses: Record<string, ComplianceStatus>) {
  let compliant = 0;
  control.auditChecklist.forEach(item => {
    if (itemStatuses[item.id] === 'compliant') compliant++;
  });
  return { total: control.auditChecklist.length, compliant };
}

// Get default values from mock data
function getDefaultStatuses(): Record<string, ComplianceStatus> {
  const statuses: Record<string, ComplianceStatus> = {};
  annexAControls.forEach(control => {
    control.auditChecklist.forEach(item => {
      statuses[item.id] = item.status;
    });
  });
  return statuses;
}

function getDefaultEvidence(): Record<string, string> {
  const evidence: Record<string, string> = {};
  annexAControls.forEach(control => {
    control.auditChecklist.forEach(item => {
      evidence[item.id] = item.evidence || '';
    });
  });
  return evidence;
}

export default function ChecklistPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ComplianceStatus | 'all'>('all');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(annexAControls.slice(0, 2).map(c => c.id)));
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  const [itemStatuses, setItemStatuses] = useState<Record<string, ComplianceStatus>>(() => {
    try {
      const stored = localStorage.getItem(STATUS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore parse errors
    }
    return getDefaultStatuses();
  });

  const [itemEvidence, setItemEvidence] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(EVIDENCE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore parse errors
    }
    return getDefaultEvidence();
  });

  // Persist to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(itemStatuses));
  }, [itemStatuses]);

  useEffect(() => {
    localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(itemEvidence));
  }, [itemEvidence]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultStatuses();
    const evidenceDefaults = getDefaultEvidence();
    setItemStatuses(defaults);
    setItemEvidence(evidenceDefaults);
  }, []);

  const stats = useMemo(() => {
    let total = 0;
    let compliant = 0;
    let pending = 0;
    let nonConformities = 0;
    let partial = 0;

    Object.values(itemStatuses).forEach(status => {
      total++;
      if (status === 'compliant') compliant++;
      if (status === 'pending') pending++;
      if (status === 'non-conformity') nonConformities++;
      if (status === 'partial') partial++;
    });

    return { total, compliant, pending, nonConformities, partial, completionPercent: total > 0 ? Math.round((compliant / total) * 100) : 0 };
  }, [itemStatuses]);

  const filteredControls = useMemo(() => {
    return annexAControls.filter(control => {
      const matchesSearch = searchQuery === '' ||
        control.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        control.number.includes(searchQuery);

      const matchesFilter = filterStatus === 'all' ||
        control.auditChecklist.some(item => itemStatuses[item.id] === filterStatus);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus, itemStatuses]);

  // Precompute control stats as a Map for O(1) lookup
  const controlStatsMap = useMemo(() => {
    const map = new Map<string, { total: number; compliant: number }>();
    annexAControls.forEach(control => {
      map.set(control.id, getControlStats(control, itemStatuses));
    });
    return map;
  }, [itemStatuses]);

  const toggleSection = useCallback((id: string) => {
    setExpandedSections(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) newExpanded.delete(id);
      else newExpanded.add(id);
      return newExpanded;
    });
  }, []);

  const toggleItem = useCallback((id: string) => {
    setExpandedItems(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) newExpanded.delete(id);
      else newExpanded.add(id);
      return newExpanded;
    });
  }, []);

  const updateStatus = useCallback((itemId: string, status: ComplianceStatus) => {
    setItemStatuses(prev => ({ ...prev, [itemId]: status }));
  }, []);

  const updateEvidence = useCallback((itemId: string, evidence: string) => {
    setItemEvidence(prev => ({ ...prev, [itemId]: evidence }));
  }, []);

  const exportReport = useCallback(() => {
    const data: Array<{ id: string; question: string; status: string; evidence: string }> = [];
    annexAControls.forEach(control => {
      control.auditChecklist.forEach(item => {
        data.push({
          id: item.id,
          question: item.question,
          status: itemStatuses[item.id] || item.status,
          evidence: itemEvidence[item.id] || '',
        });
      });
    });

    const csvContent = [
      ['ID', 'Question', 'Status', 'Evidence'].join(','),
      ...data.map(row =>
        [
          row.id,
          `"${row.question.replace(/"/g, '""')}"`,
          row.status,
          `"${row.evidence.replace(/"/g, '""')}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `iso27001-checklist-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [itemStatuses, itemEvidence]);

  // Keyboard handler for section headers
  const handleSectionKeyDown = useCallback((e: React.KeyboardEvent, controlId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSection(controlId);
    }
  }, [toggleSection]);

  // Keyboard handler for checklist items
  const handleItemKeyDown = useCallback((e: React.KeyboardEvent, itemId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(itemId);
    }
  }, [toggleItem]);

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
            <ClipboardCheck className="w-6 h-6 text-success" />
            <span className="text-success font-medium">Compliance</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Audit Checklist
              </h1>
              <p className="text-xl text-neutral-400">
                Interactive checklist for ISO 27001 certification audit preparation
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportReport}
                className="btn btn-secondary gap-2"
                aria-label="Export checklist as CSV"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button
                onClick={resetToDefaults}
                className="btn btn-ghost gap-2"
                aria-label="Reset checklist to default values"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-accent" />
              <span className="text-xs text-neutral-400">Progress</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.completionPercent}%</div>
            <div className="progress-bar mt-2">
              <div className="progress-bar-fill bg-success" style={{ width: `${stats.completionPercent}%` }} />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-xs text-neutral-400">Compliant</span>
            </div>
            <div className="text-2xl font-bold text-success">{stats.compliant}</div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-xs text-neutral-400">Pending</span>
            </div>
            <div className="text-2xl font-bold text-accent">{stats.pending}</div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-xs text-neutral-400">Partial</span>
            </div>
            <div className="text-2xl font-bold text-warning">{stats.partial}</div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-danger" />
              <span className="text-xs text-neutral-400">Non-Conformity</span>
            </div>
            <div className="text-2xl font-bold text-danger">{stats.nonConformities}</div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search controls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-11"
              aria-label="Search controls"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ComplianceStatus | 'all')}
              className="input w-auto"
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="compliant">Compliant</option>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="non-conformity">Non-Conformity</option>
            </select>
          </div>
        </motion.div>

        {/* Controls List */}
        <div className="space-y-4">
          {filteredControls.map((control, index) => {
            const isExpanded = expandedSections.has(control.id);
            const controlStats = controlStatsMap.get(control.id) || { total: 0, compliant: 0 };

            return (
              <motion.div
                key={control.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card overflow-hidden"
              >
                {/* Section Header */}
                <div
                  onClick={() => toggleSection(control.id)}
                  onKeyDown={(e) => handleSectionKeyDown(e, control.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`section-${control.id}`}
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-neutral-800/30 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset"
                >
                  <button
                    className="text-neutral-400"
                    aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                    tabIndex={-1}
                  >
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-accent text-sm">{control.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{control.title}</h3>
                    <p className="text-xs text-neutral-400">{control.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{controlStats.compliant}/{controlStats.total}</p>
                      <p className="text-xs text-neutral-400">complete</p>
                    </div>
                    <div className="w-16 progress-bar">
                      <div
                        className="progress-bar-fill bg-success"
                        style={{ width: `${controlStats.total > 0 ? (controlStats.compliant / controlStats.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Checklist Items */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-neutral-800"
                  >
                    {control.auditChecklist.map((item) => {
                      const isItemExpanded = expandedItems.has(item.id);
                      const status = itemStatuses[item.id];
                      const evidence = itemEvidence[item.id] || '';
                      const StatusIcon = statusConfig[status].icon;

                      return (
                        <div key={item.id} className="border-b border-neutral-800/50 last:border-b-0">
                          <div
                            onClick={() => toggleItem(item.id)}
                            onKeyDown={(e) => handleItemKeyDown(e, item.id)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={isItemExpanded}
                            aria-controls={`item-${item.id}`}
                            className="flex items-center gap-4 p-4 hover:bg-neutral-800/30 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset"
                          >
                            <button className="text-neutral-600" tabIndex={-1}>
                              {isItemExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                            <input
                              type="checkbox"
                              checked={status === 'compliant'}
                              onChange={() => updateStatus(item.id, status === 'compliant' ? 'pending' : 'compliant')}
                              onClick={(e) => e.stopPropagation()}
                              className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-success focus:ring-success"
                              aria-label={`Mark "${item.question.substring(0, 40)}" as compliant`}
                            />
                            <div className="flex-1">
                              <p className="text-sm text-neutral-200">{item.question}</p>
                              <p className="text-xs text-neutral-400">ID: {item.id}</p>
                            </div>
                            <span className={`badge ${statusConfig[status].className}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig[status].label}
                            </span>
                          </div>

                          {isItemExpanded && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              id={`item-${item.id}`}
                              className="bg-neutral-800/20 p-4 pl-14 animate-fade-in"
                            >
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor={`status-${item.id}`} className="block text-xs text-neutral-400 mb-1">Status</label>
                                  <select
                                    id={`status-${item.id}`}
                                    value={status}
                                    onChange={(e) => updateStatus(item.id, e.target.value as ComplianceStatus)}
                                    className="input text-sm"
                                  >
                                    <option value="pending">Pending Review</option>
                                    <option value="compliant">Compliant</option>
                                    <option value="partial">Partial Implementation</option>
                                    <option value="non-conformity">Non-Conformity</option>
                                    <option value="na">Not Applicable</option>
                                  </select>
                                </div>
                                <div>
                                  <label htmlFor={`evidence-${item.id}`} className="block text-xs text-neutral-400 mb-1">Evidence</label>
                                  <input
                                    id={`evidence-${item.id}`}
                                    type="text"
                                    placeholder="Enter evidence reference..."
                                    className="input text-sm"
                                    value={evidence}
                                    onChange={(e) => updateEvidence(item.id, e.target.value)}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filteredControls.length === 0 && (
          <div className="text-center py-12">
            <ClipboardCheck className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-400 mb-2">No controls found</h3>
            <p className="text-sm text-neutral-500">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
