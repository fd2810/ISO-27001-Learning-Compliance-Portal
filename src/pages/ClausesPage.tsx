import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText,
  Building2,
  Users,
  Settings,
  Target,
  BarChart3,
  RefreshCw,
  Shield,
} from 'lucide-react';
import { isoClauses } from '../data/mockData';

const clauseIcons = {
  context: Building2,
  leadership: Users,
  planning: Target,
  support: Settings,
  operation: FileText,
  performance: BarChart3,
  improvement: RefreshCw,
};

const clauseColors = {
  context: 'accent',
  leadership: 'success',
  planning: 'warning',
  support: 'danger',
  operation: 'accent',
  performance: 'success',
  improvement: 'warning',
};

const colorClasses: Record<string, string> = {
  accent: 'bg-accent/20 text-accent border-accent/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  danger: 'bg-danger/20 text-danger border-danger/30',
};

export default function ClausesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">Framework</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ISO 27001 Clauses (4-10)
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Understand the mandatory requirements of ISO/IEC 27001:2022. These clauses define
            the structure and requirements for an Information Security Management System.
          </p>
        </motion.div>

        {/* PDCA Cycle Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">The PDCA Cycle in ISMS</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { phase: 'Plan', clauses: '4, 5, 6', description: 'Establish context, leadership, and planning', color: 'accent' },
              { phase: 'Do', clauses: '7, 8', description: 'Implement support and operational controls', color: 'success' },
              { phase: 'Check', clauses: '9', description: 'Monitor, measure, and evaluate performance', color: 'warning' },
              { phase: 'Act', clauses: '10', description: 'Continuously improve the ISMS', color: 'danger' },
            ].map((item) => (
              <div key={item.phase} className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700 hover:border-accent/30 transition-colors">
                <div className={`w-10 h-10 rounded-lg ${colorClasses[item.color]} flex items-center justify-center mb-3`}>
                  <span className="font-bold text-sm">{item.phase.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-white mb-1">{item.phase}</h3>
                <p className="text-xs text-neutral-500 mb-2">Clauses {item.clauses}</p>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Clauses List */}
        <div className="space-y-6">
          {isoClauses.map((clause, index) => {
            const Icon = clauseIcons[clause.category];
            const color = clauseColors[clause.category];
            return (
              <motion.div
                key={clause.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="glass-card overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${colorClasses[color]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-accent font-medium">Clause {clause.number}</span>
                        <span className="badge badge-neutral capitalize">{clause.category}</span>
                      </div>
                      <h2 className="text-xl font-semibold text-white mb-3">{clause.title}</h2>
                      <p className="text-neutral-400 leading-relaxed mb-4">{clause.content}</p>

                      {/* Requirements */}
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-neutral-300 mb-2">Key Requirements:</h3>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {clause.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-neutral-400">
                              <Shield className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Guidance */}
                      <div className="p-4 rounded-lg bg-neutral-800/30 border border-neutral-700">
                        <h3 className="text-sm font-medium text-neutral-300 mb-2">Implementation Guidance:</h3>
                        <p className="text-sm text-neutral-400">{clause.guidance}</p>
                      </div>

                      {/* Related Controls */}
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-neutral-300 mb-2">Related Annex A Controls:</h3>
                        <div className="flex flex-wrap gap-1">
                          {clause.relatedAnnexAControls.map((control) => (
                            <Link
                              key={control}
                              to={`/annex-a/${control}`}
                              className="badge badge-info hover:bg-accent/30 transition-colors"
                            >
                              {control}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
