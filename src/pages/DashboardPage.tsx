import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  BarChart3,
  Target,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { platformStats, recentActivity, learningModules } from '../data/mockData';
import { StatWidget, ProgressWidget, ActivityItem, SectionHeader } from '../components/PremiumUI';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  const controlStats = {
    total: 93,
    completed: platformStats.completedControls,
    partial: 28,
    pending: 93 - platformStats.completedControls - 28,
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-accent/20 border border-accent/20">
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <span className="text-accent font-semibold">Dashboard Overview</span>
          </div>
          <h1 className="text-heading text-white mb-2">
            Compliance Dashboard
          </h1>
          <p className="text-neutral-400 text-lg">
            Track your ISO 27001 compliance progress and security posture in real time
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
        >
          <StatWidget
            title="Controls Verified"
            value={`${platformStats.completedControls}/${platformStats.totalControls}`}
            change="+12"
            trend="up"
            icon={Shield}
            iconColor="accent"
            subtitle="85% completion"
            delay={0.1}
          />
          <StatWidget
            title="Compliance Rate"
            value={`${platformStats.compliancePercentage}%`}
            change="+5%"
            trend="up"
            icon={CheckCircle2}
            iconColor="success"
            subtitle="Target: 90%"
            delay={0.2}
          />
          <StatWidget
            title="Active Risks"
            value={platformStats.activeRisks}
            change="-3"
            trend="down"
            icon={AlertTriangle}
            iconColor="warning"
            subtitle="4 critical"
            delay={0.3}
          />
          <StatWidget
            title="Risk Score"
            value={platformStats.riskScore}
            change="-8"
            trend="down"
            icon={Target}
            iconColor="danger"
            subtitle="Target: &lt;50"
            delay={0.4}
          />
        </motion.div>

        {/* Progress Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Control Progress */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-4"
          >
            <SectionHeader
              title="Control Implementation Status"
              subtitle="Progress across all 93 Annex A controls"
              action={
                <Link to="/annex-a" className="text-sm text-accent hover:text-accent-light flex items-center gap-1">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              }
            />

            <div className="grid md:grid-cols-3 gap-4">
              <ProgressWidget
                title="Compliant"
                current={controlStats.completed}
                total={controlStats.total}
                color="success"
                delay={0.1}
              />
              <ProgressWidget
                title="Partial Implementation"
                current={controlStats.partial}
                total={controlStats.total}
                color="warning"
                delay={0.2}
              />
              <ProgressWidget
                title="Pending"
                current={controlStats.pending}
                total={controlStats.total}
                color="accent"
                delay={0.3}
              />
            </div>

            {/* Security Domains */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6"
            >
              <h3 className="font-semibold text-white mb-5">Security Domain Coverage</h3>
              <div className="space-y-4">
                {[
                  { name: 'Organizational', coverage: 85, controls: 37 },
                  { name: 'People', coverage: 92, controls: 8 },
                  { name: 'Physical', coverage: 78, controls: 14 },
                  { name: 'Technological', coverage: 88, controls: 34 },
                  { name: 'Access Control', coverage: 95, controls: 21 },
                ].map((domain, index) => (
                  <motion.div
                    key={domain.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-32 text-sm text-neutral-300">{domain.name}</span>
                    <div className="flex-1 h-2 bg-neutral-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${domain.coverage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full rounded-full ${
                          domain.coverage >= 90 ? 'bg-gradient-to-r from-success to-success-glow' :
                          domain.coverage >= 75 ? 'bg-gradient-to-r from-accent to-accent-glow' :
                          'bg-gradient-to-r from-warning to-yellow-400'
                        }`}
                      />
                    </div>
                    <span className={`w-12 text-right text-sm font-semibold ${
                      domain.coverage >= 90 ? 'text-success' :
                      domain.coverage >= 75 ? 'text-accent' : 'text-warning'
                    }`}>
                      {domain.coverage}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Learning Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionHeader
              title="Learning Progress"
              action={<Link to="/learn" className="text-xs text-accent hover:text-accent-light">View all</Link>}
            />

            <div className="space-y-3">
              {learningModules.slice(0, 4).map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <Link to="/learn" className="block">
                    <div className="glass-card-hover p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        module.progress === 100 ? 'bg-success/20 text-success' :
                        module.progress > 50 ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'
                      }`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">{module.title}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                module.progress === 100 ? 'bg-success' : 'bg-accent'
                              }`}
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-neutral-500">{module.progress}%</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-600" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions & Activity */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SectionHeader title="Quick Actions" />

            <div className="space-y-3">
              <Link to="/checklist" className="block">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="glass-card-hover p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Start Control Review</h4>
                    <p className="text-sm text-neutral-400">Begin assessing controls</p>
                  </div>
                </motion.div>
              </Link>

              <Link to="/risk" className="block">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="glass-card-hover p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">View Non-Conformities</h4>
                    <p className="text-sm text-neutral-400">4 items need attention</p>
                  </div>
                </motion.div>
              </Link>

              <Link to="/learn" className="block">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="glass-card-hover p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Continue Learning</h4>
                    <p className="text-sm text-neutral-400">Module in progress</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2"
          >
            <SectionHeader
              title="Recent Activity"
              action={<span className="text-xs text-neutral-500">Last 7 days</span>}
            />

            <div className="glass-card p-4">
              <div className="grid md:grid-cols-2 gap-x-4">
                {recentActivity.slice(0, 6).map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    icon={activity.type === 'success' ? CheckCircle2 : activity.type === 'warning' ? AlertTriangle : Clock}
                    title={activity.action}
                    time={activity.timestamp}
                    type={activity.type as 'success' | 'warning' | 'info'}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
