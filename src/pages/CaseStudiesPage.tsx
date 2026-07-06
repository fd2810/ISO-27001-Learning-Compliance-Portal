import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { caseStudies } from '../data/mockData';

const industryColors: Record<string, string> = {
  'Financial Services': 'accent',
  'Healthcare': 'success',
  'Technology': 'warning',
};

const colorClasses: Record<string, string> = {
  accent: 'bg-accent/20 text-accent border-accent/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">Real Examples</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Case Studies
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Learn from real-world ISO 27001 implementations across different industries.
            Each case study demonstrates practical approaches to achieving certification.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${colorClasses[industryColors[study.industry] || 'accent']} flex items-center justify-center flex-shrink-0`}>
                      <Building className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`badge ${colorClasses[industryColors[study.industry] || 'accent']}`}>
                          {study.industry}
                        </span>
                        <span className="text-xs text-neutral-500">{study.duration}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">{study.title}</h2>
                      <p className="text-sm text-neutral-500">{study.company}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left */}
                  <div className="space-y-6">
                    {/* Challenge */}
                    <div>
                      <h3 className="text-sm font-semibold text-warning mb-2 uppercase tracking-wider">The Challenge</h3>
                      <p className="text-neutral-400">{study.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h3 className="text-sm font-semibold text-accent mb-2 uppercase tracking-wider">The Solution</h3>
                      <p className="text-neutral-400">{study.solution}</p>
                    </div>
                  </div>

                  {/* Right */}
                  <div>
                    {/* Results */}
                    <div>
                      <h3 className="text-sm font-semibold text-success mb-3 uppercase tracking-wider">Key Results</h3>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-neutral-300">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Controls Implemented */}
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-neutral-300 mb-3">Controls Implemented</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.controlsImplemented.map((control) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
