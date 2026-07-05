import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Shield,
  ClipboardCheck,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import Hero from '../components/Hero';
import { features, recentActivity, learningModules, annexAControls } from '../data/mockData';
import { StaggerContainer, StaggerItem } from '../components/PageTransition';

const featureIcons: Record<string, React.ElementType> = {
  GraduationCap,
  Shield,
  ClipboardCheck,
  AlertTriangle,
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-iso-bg via-neutral-900/20 to-iso-bg" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-success/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
              Comprehensive Platform
            </span>
            <h2 className="text-heading text-white mb-4">
              Everything You Need for ISO 27001
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              A comprehensive platform covering all aspects of information security management,
              from learning fundamentals to practical implementation.
            </p>
          </motion.div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = featureIcons[feature.icon] || Shield;
              return (
                <StaggerItem key={feature.id}>
                  <Link to={feature.path}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass-card-hover p-6 h-full group"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-semibold text-white mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
                    </motion.div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24 bg-gradient-to-b from-transparent via-neutral-900/30 to-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Learning Progress */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Learning Paths</h2>
                    <p className="text-sm text-neutral-500">Structured courses for all levels</p>
                  </div>
                  <Link to="/learn" className="text-sm text-accent hover:text-accent-light flex items-center gap-1 group">
                    View all
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {learningModules.slice(0, 3).map((module, index) => {
                    const icons: Record<string, React.ElementType> = { BookOpen, RefreshCw, AlertTriangle, Shield };
                    const Icon = icons[module.icon] || BookOpen;
                    return (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Link to="/learn">
                          <div className="glass-card-hover p-5 group">
                            <div className="flex items-start gap-5">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                module.progress === 100 ? 'bg-success/20 text-success' :
                                module.progress > 50 ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'
                              }`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-semibold text-white group-hover:text-accent transition-colors">{module.title}</h3>
                                  <span className="text-sm text-neutral-400">{module.duration}</span>
                                </div>
                                <p className="text-sm text-neutral-400 mb-3 line-clamp-1">{module.description}</p>
                                <div className="flex items-center gap-3">
                                  <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${module.progress}%` }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 1, delay: 0.2 }}
                                      className={`h-full rounded-full ${
                                        module.progress === 100 ? 'bg-gradient-to-r from-success to-success-glow' :
                                        'bg-gradient-to-r from-accent to-accent-glow'
                                      }`}
                                    />
                                  </div>
                                  <span className="text-xs font-medium text-neutral-300">{module.progress}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Recent Activity</h2>
                    <p className="text-sm text-neutral-500">Team updates</p>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="space-y-1">
                    {recentActivity.slice(0, 5).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-neutral-800/30 transition-colors group"
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          activity.type === 'success' ? 'bg-success' :
                          activity.type === 'warning' ? 'bg-warning' :
                          'bg-accent'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-neutral-200 group-hover:text-white transition-colors">{activity.action}</p>
                          <p className="text-xs text-neutral-500">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Controls */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-xs font-medium mb-4">
              Security Controls
            </span>
            <h2 className="text-heading text-white mb-4">
              Popular Annex A Controls
            </h2>
            <p className="section-subtitle">
              Explore the most frequently referenced controls in ISO 27001 implementations
            </p>
          </motion.div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {annexAControls.slice(0, 5).map((control) => (
              <StaggerItem key={control.id}>
                <Link to={`/annex-a/${control.id}`}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="glass-card-hover p-5 group h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center flex-shrink-0 border border-neutral-700 group-hover:border-accent/30 group-hover:bg-accent/10 transition-all">
                        <span className="font-bold text-accent text-sm">{control.number}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-accent transition-colors mb-2 line-clamp-1">
                          {control.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`badge ${
                            control.difficulty === 'beginner' ? 'badge-success' :
                            control.difficulty === 'intermediate' ? 'badge-warning' : 'badge-danger'
                          }`}>
                            {control.difficulty}
                          </span>
                          <span className="text-xs text-neutral-500">{control.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/annex-a" className="btn btn-primary gap-2 group">
              View All 93 Controls
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-24 bg-gradient-to-b from-transparent via-neutral-900/30 to-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-3">Get Started Today</h2>
            <p className="text-neutral-400">Jump into any section to begin your compliance journey</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Link to="/learn" className="block">
                <div className="glass-card-hover p-6 border-l-4 border-l-accent group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-accent/20 border border-accent/20 group-hover:bg-accent/30 transition-colors">
                      <BookOpen className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-accent transition-colors">Learn ISO 27001</h3>
                      <p className="text-xs text-neutral-500">Structured modules</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400">
                    Master the fundamentals of ISMS with structured learning paths and practical examples.
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-sm text-accent group-hover:gap-2 transition-all">
                    Start Learning
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link to="/checklist" className="block">
                <div className="glass-card-hover p-6 border-l-4 border-l-success group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-success/20 border border-success/20 group-hover:bg-success/30 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-success transition-colors">Prepare for Audit</h3>
                      <p className="text-xs text-neutral-500">Interactive checklists</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400">
                    Use our comprehensive checklist to ensure you're ready for certification.
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-sm text-success group-hover:gap-2 transition-all">
                    Open Checklist
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link to="/dashboard" className="block">
                <div className="glass-card-hover p-6 border-l-4 border-l-warning group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-warning/20 border border-warning/20 group-hover:bg-warning/30 transition-colors">
                      <TrendingUp className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-warning transition-colors">Track Progress</h3>
                      <p className="text-xs text-neutral-500">Dashboard overview</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400">
                    Monitor your compliance status and identify gaps with the interactive dashboard.
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-sm text-warning group-hover:gap-2 transition-all">
                    View Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
