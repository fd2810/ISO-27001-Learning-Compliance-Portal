import { motion } from 'framer-motion';
import { ArrowRight, Shield, BookOpen, ClipboardCheck, BarChart3, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { quickStats } from '../data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Shield,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Layers: Shield,
  Briefcase: Shield,
};

const floatingCards = [
  { icon: Shield, label: 'Annex A Controls', value: '93', color: 'accent', position: { top: '50%', left: '50%' }, delay: 0 },
  { icon: BookOpen, label: 'Learning Progress', value: '65%', color: 'success', position: { top: '8%', left: '10%' }, delay: 0.5 },
  { icon: ClipboardCheck, label: 'Audit Readiness', value: '76%', color: 'accent-glow', position: { top: '12%', right: '8%' }, delay: 1 },
  { icon: BarChart3, label: 'Active Risks', value: '12', color: 'warning', position: { bottom: '20%', left: '4%' }, delay: 1.5 },
  { icon: Server, label: 'Risk Score', value: '72', color: 'danger', position: { bottom: '16%', right: '8%' }, delay: 2 },
];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-50" />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.15, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-success/15 via-accent/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Grid Lines Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-iso-bg/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-iso-bg/50 via-transparent to-iso-bg/30" />

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="relative">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-success/10 border border-accent/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-sm font-medium text-accent">ISO/IEC 27001:2022 Learning Platform</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display font-extrabold leading-tight mb-6"
            >
              Master{' '}
              <span className="relative inline-block">
                <span className="text-gradient">Information Security</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-glow to-accent rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
              <br />
              <span className="text-white">Management</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-neutral-300 mb-10 leading-relaxed max-w-xl"
            >
              Learn ISO/IEC 27001 through interactive documentation, implementation guidance,
              Annex A controls, audit checklists, and real-world cybersecurity scenarios.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/learn" className="btn btn-primary gap-2 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start Learning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/annex-a" className="btn btn-secondary gap-2">
                <Shield className="w-4 h-4" />
                Explore Controls
              </Link>
              <Link to="/dashboard" className="btn btn-ghost gap-2 text-neutral-400">
                <BarChart3 className="w-4 h-4" />
                View Dashboard
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {quickStats.map((stat, index) => {
                const Icon = iconMap[stat.icon] || Shield;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="glass-card-hover p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-accent group-hover:text-accent-light transition-colors" />
                        <span className="text-xs text-neutral-500">{stat.description}</span>
                      </div>
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-neutral-400 mt-1">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Content - Premium Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative h-[550px]">
              {/* Central Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

              {/* Floating Cards */}
              {floatingCards.map((card, index) => {
                const Icon = card.icon;
                const colorStyles: Record<string, string> = {
                  accent: 'from-accent/20 to-accent/5 border-accent/20',
                  'accent-glow': 'from-accent-glow/20 to-accent-glow/5 border-accent-glow/20',
                  success: 'from-success/20 to-success/5 border-success/20',
                  warning: 'from-warning/20 to-warning/5 border-warning/20',
                  danger: 'from-danger/20 to-danger/5 border-danger/20',
                };
                const textColors: Record<string, string> = {
                  accent: 'text-accent',
                  'accent-glow': 'text-accent-glow',
                  success: 'text-success',
                  warning: 'text-warning',
                  danger: 'text-danger',
                };

                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: [0, -10 - index * 2, 0],
                      x: [0, index % 2 === 0 ? 5 : -5, 0],
                    }}
                    transition={{
                      y: { duration: 4 + index, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
                      x: { duration: 5 + index, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
                      opacity: { duration: 0.5, delay: index * 0.1 },
                    }}
                    className={`absolute ${Object.entries(card.position).map(([k, v]) => `${k}: ${v}`).join('; ')} transform -translate-x-1/2 -translate-y-1/2`.replace('transform ', '')}
                    style={Object.fromEntries(Object.entries(card.position).map(([k, v]) => [k, v]))}
                  >
                    <div className={`glass-card p-5 w-44 border ${colorStyles[card.color]}`}
                      style={{
                        transform: `${index === 0 ? 'translate(-50%, -50%) scale(1.1)' : 'translate(0, 0)'}`,
                        boxShadow: index === 0 ? '0 0 40px rgba(56, 189, 248, 0.2)' : undefined,
                      }}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorStyles[card.color]} flex items-center justify-center mb-3`}>
                        <Icon className={`w-5 h-5 ${textColors[card.color]}`} />
                      </div>
                      <div className="text-xs text-neutral-400 mb-1">{card.label}</div>
                      <div className={`text-2xl font-bold ${textColors[card.color]}`}>{card.value}</div>
                      {index === 0 && (
                        <>
                          <div className="mt-3 h-1.5 bg-neutral-800/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: '0%' }}
                              animate={{ width: '84%' }}
                              transition={{ duration: 1.5, delay: 1 }}
                              className={`h-full rounded-full bg-gradient-to-r ${colorStyles[card.color]}`}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-neutral-500 mt-2">
                            <span>84% Complete</span>
                            <span className="text-success">78 verified</span>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Decorative Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-neutral-700/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-dashed border-neutral-800/20"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
