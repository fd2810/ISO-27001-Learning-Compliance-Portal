import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';

interface StatWidgetProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
  delay?: number;
}

export function StatWidget({ title, value, change, trend = 'neutral', icon: Icon, iconColor = 'accent', subtitle, delay = 0 }: StatWidgetProps) {
  const colorMap: Record<string, string> = {
    accent: 'from-accent/20 to-accent/5 text-accent',
    success: 'from-success/20 to-success/5 text-success',
    warning: 'from-warning/20 to-warning/5 text-warning',
    danger: 'from-danger/20 to-danger/5 text-danger',
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-danger',
    neutral: 'text-neutral-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <div className="glass-card-hover p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorMap[iconColor]} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[iconColor]} border border-white/5`}>
              <Icon className="w-5 h-5" />
            </div>
            {change && (
              <div className={`flex items-center gap-1 text-sm font-medium ${trendColors[trend]}`}>
                {trend === 'up' && <ArrowUp className="w-3 h-3" />}
                {trend === 'down' && <ArrowDown className="w-3 h-3" />}
                <span>{change}</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-neutral-400">{title}</h3>
            <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
            {subtitle && (
              <p className="text-xs text-neutral-500">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ProgressWidgetProps {
  title: string;
  current: number;
  total: number;
  color?: 'accent' | 'success' | 'warning' | 'danger';
  showPercentage?: boolean;
  delay?: number;
}

export function ProgressWidget({ title, current, total, color = 'accent', showPercentage = true, delay = 0 }: ProgressWidgetProps) {
  const percentage = Math.round((current / total) * 100);
  const colorClasses = {
    accent: 'from-accent to-accent-glow',
    success: 'from-success to-success-glow',
    warning: 'from-warning to-yellow-400',
    danger: 'from-danger to-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-neutral-300">{title}</h3>
        {showPercentage && (
          <span className="text-sm font-semibold text-white">{percentage}%</span>
        )}
      </div>

      <div className="h-2 bg-neutral-800/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[color]}`}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-neutral-500">
        <span>{current} completed</span>
        <span>{total - current} remaining</span>
      </div>
    </motion.div>
  );
}

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  label: string;
  pulse?: boolean;
}

export function StatusBadge({ status, label, pulse = false }: StatusBadgeProps) {
  const statusStyles = {
    success: 'bg-success/15 text-success border-success/20',
    warning: 'bg-warning/15 text-warning border-warning/20',
    danger: 'bg-danger/15 text-danger border-danger/20',
    info: 'bg-accent/15 text-accent border-accent/20',
    neutral: 'bg-neutral-700/30 text-neutral-400 border-neutral-700/20',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusStyles[status]}`}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status === 'success' ? 'bg-success' : status === 'danger' ? 'bg-danger' : 'bg-accent'} opacity-75`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'success' ? 'bg-success' : status === 'danger' ? 'bg-danger' : 'bg-accent'}`} />
        </span>
      )}
      {label}
    </span>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  href?: string;
  delay?: number;
}

export function FeatureCard({ title, description, icon: Icon, color = 'accent', href, delay = 0 }: FeatureCardProps) {
  const colorStyles: Record<string, string> = {
    accent: 'group-hover:text-accent border-accent/20',
    success: 'group-hover:text-success border-success/20',
    warning: 'group-hover:text-warning border-warning/20',
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="glass-card-hover p-6 h-full group cursor-pointer"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${color}/20 to-${color}/5 border ${colorStyles[color]} flex items-center justify-center mb-4 transition-colors`}>
        <Icon className="w-6 h-6 text-neutral-400 group-hover:text-accent transition-colors" />
      </div>
      <h3 className="font-semibold text-white mb-2 group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}

interface ActivityItemProps {
  icon: LucideIcon;
  title: string;
  time: string;
  type?: 'success' | 'warning' | 'info';
}

export function ActivityItem({ icon: Icon, title, time, type = 'info' }: ActivityItemProps) {
  const typeStyles = {
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    info: 'bg-accent/20 text-accent',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-800/30 transition-colors group"
    >
      <div className={`w-8 h-8 rounded-lg ${typeStyles[type]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-neutral-200 group-hover:text-white transition-colors">{title}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{time}</p>
      </div>
    </motion.div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {subtitle && (
          <p className="text-neutral-400 mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
