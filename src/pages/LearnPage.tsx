import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Shield,
  Target,
  Award,
  RefreshCw,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Clock,
  Globe,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { learningModules } from '../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const topics = [
  {
    title: 'What is ISO/IEC 27001?',
    description: 'Understanding the international standard for information security management systems.',
    icon: Shield,
    color: 'accent',
    content: 'ISO/IEC 27001:2022 is the world\'s best-known and most widely used information security management standard. It provides a framework for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS). The standard helps organizations protect their information assets and ensure the confidentiality, integrity, and availability of data.',
  },
  {
    title: 'Benefits of Certification',
    description: 'Why organizations pursue ISO 27001 certification.',
    icon: Award,
    color: 'success',
    content: 'ISO 27001 certification demonstrates your commitment to information security. Benefits include: enhanced stakeholder confidence, competitive advantage in tenders, compliance with legal and regulatory requirements, reduced risk of data breaches, improved operational efficiency, and a systematic approach to managing sensitive information. Certified organizations often see reduced insurance premiums and increased ability to recover from security incidents.',
  },
  {
    title: 'Understanding ISMS',
    description: 'The Information Security Management System explained.',
    icon: Lock,
    color: 'warning',
    content: 'An ISMS is a systematic approach to managing sensitive company information through risk management processes. It encompasses people, processes, and IT systems. The ISMS is designed to identify, manage, and reduce information security risks to an acceptable level. It follows the Plan-Do-Check-Act (PDCA) cycle for continuous improvement.',
  },
  {
    title: 'PDCA Cycle',
    description: 'The Plan-Do-Check-Act methodology for continuous improvement.',
    icon: RefreshCw,
    color: 'accent',
    content: 'The PDCA cycle is the foundation of ISMS implementation: PLAN - Establish ISMS context, scope, policy, and risk assessment. DO - Implement security controls, procedures, and processes. CHECK - Monitor, measure, audit, and review performance. ACT - Take corrective actions and improve based on findings. This iterative process ensures continuous improvement of the information security posture.',
  },
  {
    title: 'Certification Process',
    description: 'Steps to achieve ISO 27001 certification.',
    icon: CheckCircle2,
    color: 'success',
    content: 'The certification process involves: 1) Gap Analysis to identify current state vs requirements, 2) ISMS Implementation including policies, procedures, and controls, 3) Internal Audit to verify compliance, 4) Management Review to demonstrate commitment, 5) Stage 1 Audit (documentation review) by certification body, 6) Stage 2 Audit (implementation verification), 7) Certification and ongoing surveillance audits.',
  },
  {
    title: 'Risk Management',
    description: 'Core principles of information security risk management.',
    icon: BarChart3,
    color: 'danger',
    content: 'Risk management is central to ISO 27001. It involves identifying assets, threats, and vulnerabilities; analyzing likelihood and impact; evaluating risk levels; and selecting appropriate treatments. The standard requires a risk assessment process appropriate to your organization\'s context. Annex A provides controls to treat identified risks, and organizations select controls based on their risk assessment results.',
  },
];

const colorMap: Record<string, string> = {
  accent: 'bg-accent/20 text-accent',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  danger: 'bg-danger/20 text-danger',
};

const stats = [
  { value: '50,000+', label: 'Certified Organizations', icon: Globe },
  { value: '160+', label: 'Countries Adopted', icon: Globe },
  { value: '93', label: 'Annex A Controls', icon: Shield },
  { value: '7', label: 'Main Clauses', icon: BookOpen },
];

export default function LearnPage() {
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
            <BookOpen className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">Learning Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Learn ISO/IEC 27001
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Master information security management through comprehensive learning materials,
            practical examples, and structured learning paths.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass-card p-5 text-center">
                <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Topics Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Core Concepts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-card-hover p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${colorMap[topic.color]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-2">{topic.title}</h3>
                      <p className="text-sm text-neutral-400 mb-3">{topic.description}</p>
                      <p className="text-sm text-neutral-300 leading-relaxed">{topic.content}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Learning Modules */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Learning Modules</h2>
            <span className="text-neutral-500">4 modules available</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningModules.map((module, index) => {
              const icons: Record<string, React.ElementType> = {
                BookOpen,
                RefreshCw,
                AlertTriangle,
                Shield,
              };
              const Icon = icons[module.icon] || BookOpen;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card-hover p-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{module.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <Clock className="w-3 h-3" />
                        {module.duration}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{module.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-neutral-500">{module.lessons.length} lessons</span>
                    <span className="text-neutral-700">•</span>
                    <span className="text-xs text-neutral-500">{module.progress}% complete</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-bar-fill ${
                        module.progress === 100 ? 'bg-success' : 'bg-accent'
                      }`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                  <button className="btn btn-primary w-full mt-4 text-xs">
                    {module.progress === 100 ? 'Review Module' : module.progress > 0 ? 'Continue Learning' : 'Start Module'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Implementation Timeline */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Typical Implementation Timeline</h2>
          <div className="glass-card p-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-700 transform md:-translate-x-1/2" />

              {[
                { phase: 'Phase 1: Scoping', duration: '2-4 weeks', tasks: ['Define ISMS scope', 'Identify stakeholders', 'Gap analysis'] },
                { phase: 'Phase 2: Design', duration: '4-8 weeks', tasks: ['Risk assessment', 'Control selection', 'Policy development'] },
                { phase: 'Phase 3: Implement', duration: '12-16 weeks', tasks: ['Control deployment', 'Staff training', 'Process integration'] },
                { phase: 'Phase 4: Certify', duration: '4-6 weeks', tasks: ['Internal audit', 'Management review', 'External audit'] },
              ].map((item, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-12 md:mr-auto md:text-right' : 'md:pr-12 md:ml-auto'}`}>
                    <div className="glass-card p-4 md:ml-0">
                      <h3 className="font-semibold text-accent mb-1">{item.phase}</h3>
                      <p className="text-sm text-neutral-400 mb-3">{item.duration}</p>
                      <ul className="space-y-1">
                        {item.tasks.map((task, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-center gap-2 md:justify-end">
                            <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-accent border-4 border-iso-bg flex items-center justify-center transform md:-translate-x-1/2 -translate-y-1/2 top-6">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Links */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Link to="/clauses" className="glass-card-hover p-6 group">
            <BookOpen className="w-8 h-8 text-accent mb-4" />
            <h3 className="font-semibold text-white mb-2 group-hover:text-accent transition-colors">
              Explore Clauses
            </h3>
            <p className="text-sm text-neutral-400">
              Deep dive into clauses 4-10 of ISO 27001:2022 and their requirements.
            </p>
            <ArrowRight className="w-4 h-4 text-accent mt-4 group-hover:translate-x-2 transition-transform" />
          </Link>

          <Link to="/annex-a" className="glass-card-hover p-6 group">
            <Shield className="w-8 h-8 text-success mb-4" />
            <h3 className="font-semibold text-white mb-2 group-hover:text-success transition-colors">
              Annex A Controls
            </h3>
            <p className="text-sm text-neutral-400">
              Browse all 93 controls with implementation guidance and examples.
            </p>
            <ArrowRight className="w-4 h-4 text-success mt-4 group-hover:translate-x-2 transition-transform" />
          </Link>

          <Link to="/checklist" className="glass-card-hover p-6 group">
            <Target className="w-8 h-8 text-warning mb-4" />
            <h3 className="font-semibold text-white mb-2 group-hover:text-warning transition-colors">
              Practice Checklist
            </h3>
            <p className="text-sm text-neutral-400">
              Test your knowledge with interactive audit checklists.
            </p>
            <ArrowRight className="w-4 h-4 text-warning mt-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
