import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Target,
  Lightbulb,
  Building2,
  Users,
  AlertOctagon,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { annexAControls } from '../data/mockData';

const categoryIcons = {
  organizational: Building2,
  people: Users,
  physical: Shield,
  technological: Shield,
};

export default function ControlDetailPage() {
  const { id } = useParams();
  const control = annexAControls.find((c) => c.id === id);
  const controlIndex = annexAControls.findIndex((c) => c.id === id);
  const prevControl = controlIndex > 0 ? annexAControls[controlIndex - 1] : null;
  const nextControl = controlIndex < annexAControls.length - 1 ? annexAControls[controlIndex + 1] : null;

  if (!control) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Control Not Found</h1>
          <p className="text-neutral-400 mb-4">The requested control could not be found.</p>
          <Link to="/annex-a" className="btn btn-primary">
            Back to Controls
          </Link>
        </div>
      </div>
    );
  }

  const CategoryIcon = categoryIcons[control.category] || Shield;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-neutral-500 mb-6"
        >
          <Link to="/annex-a" className="hover:text-accent transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Annex A Controls
          </Link>
          <span className="text-neutral-700">/</span>
          <span className="text-neutral-400">Control {control.number}</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center flex-shrink-0 shadow-glow-accent">
              <span className="font-bold text-white text-lg">{control.number}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`badge ${
                  control.category === 'organizational' ? 'badge-info' :
                  control.category === 'people' ? 'badge-success' :
                  control.category === 'physical' ? 'badge-warning' : 'badge-danger'
                }`}>
                  {control.category}
                </span>
                <span className={`badge ${
                  control.difficulty === 'beginner' ? 'badge-success' :
                  control.difficulty === 'intermediate' ? 'badge-warning' : 'badge-danger'
                }`}>
                  {control.difficulty}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{control.title}</h1>
            </div>
            <button className="btn btn-ghost p-2">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1">
              <CategoryIcon className="w-4 h-4" />
              {control.attributes.securityDomain}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {control.estimatedTime}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Objective */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-white">Control Objective</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">{control.objective}</p>
            </motion.section>

            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-neutral-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Description</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">{control.description}</p>
            </motion.section>

            {/* Implementation Guidance */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-success" />
                </div>
                <h2 className="text-xl font-semibold text-white">Implementation Guidance</h2>
              </div>
              <ul className="space-y-3">
                {control.implementationGuidance.map((guidance, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 text-success text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-neutral-300">{guidance}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Best Practices */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-white">Best Practices</h2>
              </div>
              <ul className="space-y-2">
                {control.bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span className="text-neutral-300">{practice}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Common Mistakes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 border-l-4 border-l-warning"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <h2 className="text-xl font-semibold text-white">Common Mistakes to Avoid</h2>
              </div>
              <ul className="space-y-2">
                {control.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-danger mt-1 flex-shrink-0" />
                    <span className="text-neutral-300">{mistake}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Business Example */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass-card p-6 border-l-4 border-l-accent"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-white">Business Example</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">{control.businessExample}</p>
            </motion.section>

            {/* Audit Checklist */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                  <AlertOctagon className="w-5 h-5 text-warning" />
                </div>
                <h2 className="text-xl font-semibold text-white">Audit Checklist</h2>
              </div>
              <div className="space-y-3">
                {control.auditChecklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.status === 'compliant'}
                      readOnly
                      className="mt-1 w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-accent focus:ring-accent"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-200">{item.question}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`badge ${
                          item.status === 'compliant' ? 'badge-success' :
                          item.status === 'non-conformity' ? 'badge-danger' :
                          item.status === 'partial' ? 'badge-warning' : 'badge-neutral'
                        }`}>
                          {item.status}
                        </span>
                        {item.evidence && (
                          <span className="text-xs text-neutral-500 truncate">{item.evidence}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Control Attributes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 sticky top-24"
            >
              <h3 className="font-semibold text-white mb-4">Control Attributes</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Control Type</p>
                  <span className="badge badge-info capitalize">{control.attributes.controlType}</span>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Security Domain</p>
                  <p className="text-sm text-neutral-200">{control.attributes.securityDomain}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Cybersecurity Concept</p>
                  <p className="text-sm text-neutral-200">{control.attributes.cybersecurityConcept}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Security Properties</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {control.attributes.securityProperties.map((prop, idx) => (
                      <span key={idx} className="badge badge-neutral text-xs">{prop}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Related Controls</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {control.relatedControls.map((c) => (
                      <Link
                        key={c}
                        to={`/annex-a/${c}`}
                        className="badge badge-info hover:bg-accent/30 transition-colors"
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Key Takeaways</p>
                  <ul className="mt-1 space-y-1">
                    {control.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation */}
              <div className="border-t border-neutral-800 mt-6 pt-6">
                <div className="flex items-center justify-between gap-2">
                  {prevControl ? (
                    <Link
                      to={`/annex-a/${prevControl.id}`}
                      className="btn btn-secondary text-xs flex-1 justify-center"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {prevControl.number}
                    </Link>
                  ) : (
                    <div className="btn btn-ghost text-xs flex-1 justify-center opacity-50 cursor-not-allowed">
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </div>
                  )}
                  {nextControl ? (
                    <Link
                      to={`/annex-a/${nextControl.id}`}
                      className="btn btn-secondary text-xs flex-1 justify-center"
                    >
                      {nextControl.number}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <div className="btn btn-ghost text-xs flex-1 justify-center opacity-50 cursor-not-allowed">
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
