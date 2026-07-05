import { motion } from 'framer-motion';
import {
  Info,
  ExternalLink,
  BookOpen,
  Shield,
  GraduationCap,
  Briefcase,
  FileText,
  Github,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      {/* Narrow reading width for text-heavy content */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">About</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About ISO Shield
          </h1>
          <p className="text-xl text-neutral-400">
            A free educational platform for learning ISO/IEC 27001:2022
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          {/* Educational Disclaimer */}
          <div className="glass-card p-6 border-l-4 border-l-warning">
            <h2 className="font-semibold text-warning mb-2">Educational Disclaimer</h2>
            <p className="text-neutral-400 text-sm">
              ISO Shield is an independent educational resource and is not affiliated with, endorsed by,
              or connected to the International Organization for Standardization (ISO) or the International
              Electrotechnical Commission (IEC). ISO/IEC 27001 is a copyrighted standard available for
              purchase from ISO (<a href="https://www.iso.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light">www.iso.org</a>).
            </p>
          </div>

          {/* Mission */}
          <div className="glass-card p-6">
            <h2 className="font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              ISO Shield aims to democratize information security education by providing free, accessible,
              and comprehensive learning resources for ISO/IEC 27001:2022. We believe that understanding
              information security management should not be limited to those with large budgets.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              Our platform provides structured learning paths, detailed control guidance, practical examples,
              and interactive tools to help organizations and individuals understand and implement
              information security management systems.
            </p>
          </div>

          {/* Features */}
          <div className="glass-card p-6">
            <h2 className="font-semibold text-white mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: 'Interactive Learning', description: 'Structured modules covering ISMS fundamentals to advanced concepts' },
                { icon: Shield, title: 'Annex A Controls', description: 'Detailed guidance for all 93 security controls' },
                { icon: GraduationCap, title: 'Case Studies', description: 'Real-world implementation examples from various industries' },
                { icon: Briefcase, title: 'Risk Assessment', description: 'Visual tools for understanding and managing security risks' },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-800/30">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{feature.title}</h3>
                      <p className="text-sm text-neutral-400">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technology */}
          <div className="glass-card p-6">
            <h2 className="font-semibold text-white mb-4">Built With</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Chart.js'].map((tech) => (
                <span key={tech} className="badge badge-neutral">{tech}</span>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div className="glass-card p-6">
            <h2 className="font-semibold text-white mb-4">Official Resources</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.iso.org/standard/27001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-400 hover:text-accent transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  ISO/IEC 27001:2022 Official Standard
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.iso.org/standard/27002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-400 hover:text-accent transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  ISO/IEC 27002:2022 Controls Reference
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-400 hover:text-accent transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* License */}
          <div className="glass-card p-6">
            <h2 className="font-semibold text-white mb-4">License</h2>
            <p className="text-neutral-400 text-sm">
              This project is provided for educational purposes. The content is created based on publicly
              available information about ISO/IEC 27001. For official certification and audit purposes,
              always refer to the official ISO standards and engage accredited certification bodies.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
