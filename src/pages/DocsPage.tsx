import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Shield,
  FileText,
  AlertTriangle,
  ClipboardCheck,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

const documentationSections = [
  {
    title: 'Getting Started',
    description: 'Introduction to ISO Shield and ISO/IEC 27001 fundamentals',
    icon: BookOpen,
    color: 'accent',
    links: [
      { label: 'What is ISO 27001?', path: '/learn' },
      { label: 'Understanding the ISMS', path: '/learn' },
      { label: 'Certification Process', path: '/learn' },
    ],
  },
  {
    title: 'Clauses 4-10',
    description: 'Main body requirements of ISO/IEC 27001:2022',
    icon: FileText,
    color: 'success',
    links: [
      { label: 'Clause 4: Context of the Organization', path: '/clauses' },
      { label: 'Clause 5: Leadership', path: '/clauses' },
      { label: 'Clause 6: Planning', path: '/clauses' },
      { label: 'Clause 7: Support', path: '/clauses' },
      { label: 'All Clauses Overview', path: '/clauses' },
    ],
  },
  {
    title: 'Annex A Controls',
    description: 'Reference implementation for information security controls',
    icon: Shield,
    color: 'warning',
    links: [
      { label: 'Control Overview', path: '/annex-a' },
      { label: 'Organizational Controls (5.1-5.37)', path: '/annex-a' },
      { label: 'People Controls (6.1-6.8)', path: '/annex-a' },
      { label: 'Physical Controls (7.1-7.14)', path: '/annex-a' },
      { label: 'Technological Controls (8.1-8.34)', path: '/annex-a' },
    ],
  },
  {
    title: 'Risk Assessment',
    description: 'Risk management framework and methodology',
    icon: AlertTriangle,
    color: 'danger',
    links: [
      { label: 'Risk Dashboard', path: '/risk' },
      { label: 'Risk Assessment Process', path: '/learn' },
      { label: 'Treatment Options', path: '/risk' },
    ],
  },
  {
    title: 'Compliance Checklist',
    description: 'Audit preparation and evidence collection',
    icon: ClipboardCheck,
    color: 'accent',
    links: [
      { label: 'Interactive Checklist', path: '/checklist' },
      { label: 'Export Reports', path: '/checklist' },
      { label: 'Status Tracking', path: '/checklist' },
    ],
  },
];

const colorMap: Record<string, string> = {
  accent: 'bg-accent/20 text-accent',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  danger: 'bg-danger/20 text-danger',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Documentation
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Comprehensive guides and references for implementing ISO/IEC 27001:2022
            in your organization.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Main Clauses', value: '7' },
            { label: 'Annex A Controls', value: '93' },
            { label: 'Control Categories', value: '4' },
            { label: 'Learning Modules', value: '4' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Documentation Sections */}
        <div className="space-y-6">
          {documentationSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="glass-card p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colorMap[section.color]} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-1">{section.title}</h2>
                    <p className="text-sm text-neutral-400">{section.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 pl-16">
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      className="flex items-center gap-2 text-sm text-neutral-300 hover:text-accent transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-accent transition-colors" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* External Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-card p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">External Resources</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://www.iso.org/standard/27001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors group"
            >
              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-accent transition-colors" />
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                ISO/IEC 27001 Official Standard
              </span>
            </a>
            <a
              href="https://www.iso.org/standard/82875.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors group"
            >
              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-accent transition-colors" />
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                ISO/IEC 27002:2022 Guidelines
              </span>
            </a>
            <a
              href="https://www.iso.org/standard/80780.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors group"
            >
              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-accent transition-colors" />
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                ISO 42001 AI Management
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
