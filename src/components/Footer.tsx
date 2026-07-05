import { Link } from 'react-router-dom';
import { ShieldCheck, Github, FileText, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-iso-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-glow">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">ISO Shield</h3>
                <p className="text-xs text-neutral-500">Compliance Portal</p>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mb-4 leading-relaxed">
              An educational platform for learning ISO/IEC 27001 and managing information security compliance.
            </p>
            <p className="text-xs text-neutral-600">
              Version 1.0.0 | Built with React + Tailwind
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-neutral-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Learn ISO 27001', path: '/learn' },
                { label: 'Annex A Controls', path: '/annex-a' },
                { label: 'Compliance Checklist', path: '/checklist' },
                { label: 'Risk Assessment', path: '/risk' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-neutral-200 mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: 'Documentation', path: '/docs' },
                { label: 'Case Studies', path: '/case-studies' },
                { label: 'Clauses (4-10)', path: '/clauses' },
                { label: 'Dashboard', path: '/dashboard' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="font-semibold text-neutral-200 mb-4">External</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-accent transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.iso.org/standard/27001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-accent transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  ISO Official Site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 text-center md:text-left">
            © {new Date().getFullYear()} ISO Shield. Educational purpose only. Not affiliated with ISO.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              About
            </Link>
            <span className="text-neutral-700">|</span>
            <Link to="/docs" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Documentation
            </Link>
            <span className="text-neutral-700">|</span>
            <span className="text-xs text-neutral-500">
              Educational Disclaimer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
