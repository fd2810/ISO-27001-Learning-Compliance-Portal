import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
} from 'lucide-react';
import { sampleRisks } from '../data/mockData';
import { SectionHeader, StatWidget } from '../components/PremiumUI';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

export default function RiskDashboardPage() {
  const stats = useMemo(() => {
    const critical = sampleRisks.filter(r => r.riskLevel === 'critical').length;
    const high = sampleRisks.filter(r => r.riskLevel === 'high').length;
    const medium = sampleRisks.filter(r => r.riskLevel === 'medium').length;
    const low = sampleRisks.filter(r => r.riskLevel === 'low').length;
    const mitigated = sampleRisks.filter(r => r.treatmentStatus === 'mitigated').length;
    const inProgress = sampleRisks.filter(r => r.treatmentStatus === 'in-progress').length;
    const pending = sampleRisks.filter(r => r.treatmentStatus === 'pending').length;

    return {
      total: sampleRisks.length,
      critical,
      high,
      medium,
      low,
      mitigated,
      inProgress,
      pending,
      averageRiskScore: 72,
      controlCoverage: 84,
    };
  }, []);

  const riskLevelData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: [stats.critical, stats.high, stats.medium, stats.low],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderWidth: 0,
        borderRadius: 4,
        spacing: 4,
      },
    ],
  };

  const categoryData = {
    labels: ['Access Control', 'Human Security', 'Supplier Mgmt', 'Technical', 'Physical'],
    datasets: [
      {
        label: 'Risks',
        data: [2, 1, 1, 2, 1],
        backgroundColor: [
          'rgba(56, 189, 248, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)',
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const treatmentData = {
    labels: ['Mitigated', 'In Progress', 'Pending', 'Accepted'],
    datasets: [
      {
        data: [
          sampleRisks.filter(r => r.treatmentStatus === 'mitigated').length,
          sampleRisks.filter(r => r.treatmentStatus === 'in-progress').length,
          sampleRisks.filter(r => r.treatmentStatus === 'pending').length,
          sampleRisks.filter(r => r.treatmentStatus === 'accepted').length,
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '65%',
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280', font: { size: 10 } },
        border: { display: false },
      },
      y: {
        grid: { color: 'rgba(107, 114, 128, 0.1)', drawBorder: false },
        ticks: { color: '#6B7280', stepSize: 1 },
        border: { display: false },
      },
    },
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
            <div className="p-2.5 rounded-xl bg-warning/20 border border-warning/20">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <span className="text-warning font-semibold">Risk Management</span>
          </div>
          <h1 className="text-heading text-white mb-2">
            Risk Dashboard
          </h1>
          <p className="text-neutral-400 text-lg">
            Visualize and manage information security risks across your organization
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          <StatWidget
            title="Total Risks"
            value={stats.total}
            change="-2"
            trend="down"
            icon={AlertTriangle}
            iconColor="danger"
            delay={0.1}
          />
          <StatWidget
            title="Mitigated"
            value={stats.mitigated}
            change="+3"
            trend="up"
            icon={CheckCircle2}
            iconColor="success"
            delay={0.2}
          />
          <StatWidget
            title="In Progress"
            value={stats.inProgress + stats.pending}
            subtitle="Pending treatment"
            icon={Clock}
            iconColor="warning"
            delay={0.3}
          />
          <StatWidget
            title="Risk Score"
            value={stats.averageRiskScore}
            change="-8"
            trend="down"
            icon={Target}
            iconColor="accent"
            subtitle="Target: &lt;50"
            delay={0.4}
          />
        </motion.div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Risk Levels Doughnut */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold text-white mb-4">Risk Levels</h3>
            <div className="h-48 relative">
              <Doughnut data={riskLevelData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{stats.total}</div>
                  <div className="text-xs text-neutral-500">Total</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                { label: 'Critical', value: stats.critical, color: 'bg-danger' },
                { label: 'High', value: stats.high, color: 'bg-warning' },
                { label: 'Medium', value: stats.medium, color: 'bg-yellow-500' },
                { label: 'Low', value: stats.low, color: 'bg-success' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-xs text-neutral-400">{item.label}</span>
                  <span className="text-xs text-neutral-300 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Treatment Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold text-white mb-4">Treatment Status</h3>
            <div className="h-48 relative">
              <Doughnut data={treatmentData} options={chartOptions} />
            </div>
            <div className="space-y-2 mt-4">
              {[
                { label: 'Mitigated', value: stats.mitigated, color: 'bg-success' },
                { label: 'In Progress', value: stats.inProgress, color: 'bg-accent' },
                { label: 'Pending', value: stats.pending, color: 'bg-warning' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-xs text-neutral-400">{item.label}</span>
                  </div>
                  <span className="text-xs text-neutral-300 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold text-white mb-4">Risk Categories</h3>
            <div className="h-48">
              <Bar data={categoryData} options={barOptions} />
            </div>
          </motion.div>
        </div>

        {/* Risk Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-10"
        >
          <SectionHeader
            title="Risk Matrix"
            subtitle="Visual representation of risks by likelihood and impact"
          />

          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-1 min-w-[500px]">
              {/* Header */}
              <div className="p-2" />
              <div className="col-span-6 grid grid-cols-6 text-center">
                <div className="col-span-6 text-xs text-neutral-500 pb-2">Likelihood →</div>
              </div>

              {/* New header row */}
              <div />
              {['1', '2', '3', '4', '5'].map((n) => (
                <div key={n} className="p-2 text-center text-xs text-neutral-500">{n}</div>
              ))}

              {/* Matrix Rows */}
              {[5, 4, 3, 2, 1].map((impact) => (
                <>
                  <div className="p-2 text-xs text-neutral-500 flex items-center">{impact}</div>
                  {[1, 2, 3, 4, 5].map((likelihood) => {
                    const risk = sampleRisks.filter(r => r.impact === impact && r.likelihood === likelihood).length;
                    const score = impact * likelihood;
                    const bgColor = score >= 16 ? 'bg-danger/40 hover:bg-danger/50' :
                      score >= 10 ? 'bg-warning/40 hover:bg-warning/50' :
                      score >= 5 ? 'bg-yellow-600/30 hover:bg-yellow-600/40' : 'bg-success/30 hover:bg-success/40';

                    return (
                      <motion.div
                        key={`${impact}-${likelihood}`}
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-lg ${bgColor} transition-colors cursor-pointer relative group`}
                      >
                        {risk > 0 && (
                          <span className="text-sm font-bold text-white">{risk}</span>
                        )}
                        {risk > 0 && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-white bg-neutral-900/90 px-2 py-1 rounded">
                              {risk} risk(s)
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-neutral-800">
            <span className="text-xs text-neutral-500">Impact →</span>
            <div className="flex items-center gap-4">
              {[
                { label: 'Critical', color: 'bg-danger/40' },
                { label: 'High', color: 'bg-warning/40' },
                { label: 'Medium', color: 'bg-yellow-600/30' },
                { label: 'Low', color: 'bg-success/30' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded ${item.color}`} />
                  <span className="text-xs text-neutral-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Risks List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <SectionHeader
            title="Active Risks"
            subtitle="Risks requiring attention and treatment"
            action={
              <span className="badge badge-warning">{sampleRisks.filter(r => r.treatmentStatus !== 'mitigated').length} active</span>
            }
          />

          <div className="space-y-3">
            {sampleRisks.filter(r => r.treatmentStatus !== 'mitigated').map((risk, index) => (
              <motion.div
                key={risk.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ x: 4 }}
                className="glass-card-hover p-5"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    risk.riskLevel === 'critical' ? 'bg-danger/20 text-danger' :
                    risk.riskLevel === 'high' ? 'bg-warning/20 text-warning' :
                    'bg-success/20 text-success'
                  }`}>
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white">{risk.title}</h4>
                      <span className={`badge ${
                        risk.riskLevel === 'critical' ? 'badge-danger' :
                        risk.riskLevel === 'high' ? 'badge-warning' :
                        'badge-success'
                      }`}>
                        {risk.riskLevel}
                      </span>
                      <span className={`badge ${
                        risk.treatmentStatus === 'in-progress' ? 'badge-info' :
                        risk.treatmentStatus === 'pending' ? 'badge-warning' :
                        'badge-neutral'
                      }`}>
                        {risk.treatmentStatus}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-400 mb-3">{risk.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                      <span>Category: <span className="text-neutral-300">{risk.category}</span></span>
                      <span>Owner: <span className="text-neutral-300">{risk.owner}</span></span>
                      <span>Review: <span className="text-neutral-300">{risk.reviewDate}</span></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
