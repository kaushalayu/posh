import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, FileCheck, AlertTriangle, Clock, BarChart3,
  TrendingUp, ArrowUpRight, Activity, Bell, Users,
  ChevronRight, Sparkles, Shield, CheckCircle2, Circle,
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import AgeingChart from './AgeingChart';
import TrainingDonut from './TrainingDonut';
import AlertsPanel from './AlertsPanel';
import { dashboardStats, ageingData, trainingCoverage, alerts } from '../../lib/mockData';
import { useIsMobile, useIsTablet } from '../../hooks/useMediaQuery';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardBase = {
  background: '#FFFFFF',
  border: '1px solid #D8D3C8',
  borderRadius: 12,
  transition: 'box-shadow 150ms ease, border-color 150ms ease',
};

const DEPT_DATA = [
  { label: 'Engineering', value: 6, max: 6, color: '#5B8A80' },
  { label: 'Finance', value: 4, max: 6, color: '#1E3A5F' },
  { label: 'HR', value: 3, max: 6, color: '#C08B2C' },
  { label: 'Marketing', value: 5, max: 6, color: '#5B6472' },
  { label: 'Operations', value: 4, max: 6, color: '#5B8A80' },
  { label: 'Legal', value: 2, max: 6, color: '#1E3A5F' },
];

const ACTIVITIES = [
  { text: 'New complaint filed by Employee A', time: '2 hours ago', color: '#5B8A80', icon: FileCheck },
  { text: 'Case POSH-2024-023 moved to Committee', time: '4 hours ago', color: '#1E3A5F', icon: Briefcase },
  { text: 'Hearing scheduled for POSH-2024-012', time: '6 hours ago', color: '#C08B2C', icon: Clock },
  { text: 'Report submitted for POSH-2024-019', time: 'Yesterday', color: '#5B6472', icon: TrendingUp },
  { text: 'IC Members assigned to POSH-2024-022', time: 'Yesterday', color: '#5B8A80', icon: Users },
];

const COMPLIANCE_SCORE = 78;
const CIRCLE_RADIUS = 70;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const STROKE_OFFSET = CIRCLE_CIRCUMFERENCE - (COMPLIANCE_SCORE / 100) * CIRCLE_CIRCUMFERENCE;

const COMPLIANCE_BREAKDOWN = [
  { label: 'Policy Adherence', value: 92, color: '#5B8A80', target: 100 },
  { label: 'Training Coverage', value: 82, color: '#1E3A5F', target: 100 },
  { label: 'Case Timeliness', value: 91, color: '#C08B2C', target: 100 },
  { label: 'Documentation', value: 68, color: '#5B6472', target: 100 },
];

function ComplianceWidget({ isMobile }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ boxShadow: '0 12px 36px rgba(15,30,51,0.1)' }}
      style={{
        ...cardBase,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header strip */}
      <div style={{
        background: 'linear-gradient(135deg, #0F1E33, #1E3A5F)',
        padding: isMobile ? '16px 20px' : '18px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(91,138,128,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Shield size={16} color="#5B8A80" />
          </div>
          <div>
            <div style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: isMobile ? 15 : 17,
              fontWeight: 700, color: '#FFFFFF',
            }}>
              Compliance Score
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
              Organization-wide POSH compliance health
            </div>
          </div>
        </div>
        <div style={{
          padding: '4px 12px', borderRadius: 20,
          background: COMPLIANCE_SCORE >= 80 ? 'rgba(74,222,128,0.15)' : 'rgba(192,139,44,0.15)',
          border: `1px solid ${COMPLIANCE_SCORE >= 80 ? 'rgba(74,222,128,0.3)' : 'rgba(192,139,44,0.3)'}`,
        }}>
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: COMPLIANCE_SCORE >= 80 ? '#4ADE80' : '#C08B2C',
          }}>
            {COMPLIANCE_SCORE >= 80 ? 'Good' : 'Needs Attention'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 0,
      }}>
        {/* Left: Circle */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: isMobile ? '24px 20px' : '32px 40px',
          flex: isMobile ? 'none' : '0 0 220px',
          borderRight: isMobile ? 'none' : '1px solid #E8E4DC',
          borderBottom: isMobile ? '1px solid #E8E4DC' : 'none',
        }}>
          <div style={{ position: 'relative', width: 150, height: 150 }}>
            <svg width={150} height={150} style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx={75} cy={75} r={CIRCLE_RADIUS}
                fill="none" stroke="#E8E4DC" strokeWidth={10}
              />
              <motion.circle
                cx={75} cy={75} r={CIRCLE_RADIUS}
                fill="none"
                stroke="url(#complianceGradient)"
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCLE_CIRCUMFERENCE }}
                animate={{ strokeDashoffset: STROKE_OFFSET }}
                transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              />
              <defs>
                <linearGradient id="complianceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5B8A80" />
                  <stop offset="50%" stopColor="#1E3A5F" />
                  <stop offset="100%" stopColor="#5B8A80" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 38, fontWeight: 700, color: '#0F1E33', lineHeight: 1,
                }}
              >
                {COMPLIANCE_SCORE}
              </motion.span>
              <span style={{ fontSize: 14, color: '#5B6472', fontWeight: 500 }}>%</span>
            </div>
          </div>
          <div style={{
            marginTop: 14, padding: '6px 14px', borderRadius: 20,
            background: '#5B8A8010', border: '1px solid #5B8A8020',
          }}>
            <span style={{ fontSize: 12, color: '#5B8A80', fontWeight: 600 }}>
              Overall Score
            </span>
          </div>
        </div>

        {/* Right: Breakdown bars */}
        <div style={{
          flex: 1, padding: isMobile ? '20px' : '24px 28px',
          display: 'flex', flexDirection: 'column', gap: 16,
          justifyContent: 'center',
        }}>
          {COMPLIANCE_BREAKDOWN.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.35 }}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 6,
              }}>
                <span style={{ fontSize: 13, color: '#0F1E33', fontWeight: 500 }}>
                  {item.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>
                    {item.value}%
                  </span>
                  {item.value >= 90 ? (
                    <CheckCircle2 size={14} color="#5B8A80" />
                  ) : item.value >= 75 ? (
                    <AlertTriangle size={14} color="#C08B2C" />
                  ) : (
                    <AlertTriangle size={14} color="#B83A3A" />
                  )}
                </div>
              </div>
              <div style={{
                height: 8, borderRadius: 4,
                background: '#F0EDE8', overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    height: '100%', borderRadius: 4,
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}CC)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ActivityFeed({ isMobile }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ boxShadow: '0 8px 24px rgba(15,30,51,0.1)' }}
      style={{
        ...cardBase,
        padding: isMobile ? 20 : '24px 28px',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 20,
      }}>
        <Activity size={18} color="#5B8A80" />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--weight-bold)',
          color: '#0F1E33',
        }}>
          Recent Activity
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          left: 9,
          top: 8,
          bottom: 8,
          width: 2,
          background: '#D8D3C8',
          borderRadius: 1,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ACTIVITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.35 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: '10px 0',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: `${a.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: a.color,
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: '#0F1E33',
                    margin: 0,
                    lineHeight: 1.4,
                  }}>
                    {a.text}
                  </p>
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    color: '#5B6472',
                    marginTop: 2,
                    display: 'block',
                  }}>
                    {a.time}
                  </span>
                </div>
                <Icon size={14} color="#D8D3C8" style={{ marginTop: 2, flexShrink: 0 }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function CaseDistribution({ isMobile }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ boxShadow: '0 8px 24px rgba(15,30,51,0.1)' }}
      style={{
        ...cardBase,
        padding: isMobile ? 20 : '24px 28px',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 20,
      }}>
        <BarChart3 size={18} color="#5B8A80" />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--weight-bold)',
          color: '#0F1E33',
        }}>
          Cases by Department
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DEPT_DATA.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.35 }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 4,
            }}>
              <span style={{
                fontSize: 'var(--text-sm)',
                color: '#0F1E33',
                fontWeight: 500,
              }}>
                {d.label}
              </span>
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: '#5B6472',
              }}>
                {d.value}
              </span>
            </div>
            <div style={{
              height: 8,
              borderRadius: 4,
              background: '#F7F5F0',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(d.value / d.max) * 100}%` }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  height: '100%',
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${d.color}, ${d.color}CC)`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [hoveredCard, setHoveredCard] = useState(null);

  const stats = useMemo(() => [
    {
      title: 'Open Cases', value: dashboardStats.openCases,
      icon: Briefcase, trend: 'up', trendValue: '+3 this week', color: 'teal',
      subtitle: 'Active investigations',
    },
    {
      title: 'Closed This Quarter', value: dashboardStats.closedThisQuarter,
      icon: FileCheck, trend: 'up', trendValue: '+12% vs last', color: 'navy',
      subtitle: 'Successfully resolved',
    },
    {
      title: 'Overdue Actions', value: dashboardStats.overdueActions,
      icon: AlertTriangle, trend: 'down', trendValue: '-2 from yesterday', color: 'amber',
      subtitle: 'Require immediate attention',
    },
    {
      title: 'Avg. Resolution Days', value: dashboardStats.avgResolutionDays,
      icon: Clock, trend: 'neutral', trendValue: '34 days avg', color: 'slate',
      subtitle: 'Across all cases',
    },
  ], []);

  const quickActions = [
    { label: 'New Complaint', icon: FileCheck, color: '#5B8A80', href: '/complaints/new' },
    { label: 'View Cases', icon: Briefcase, color: '#1E3A5F', href: '/cases' },
    { label: 'Action Items', icon: Activity, color: '#C08B2C', href: '/actions' },
    { label: 'Team Overview', icon: Users, color: '#5B6472', href: '/settings' },
  ];

  const cols = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* === PREMIUM HEADER === */}
      <motion.div variants={itemVariants} style={{ marginBottom: isMobile ? 20 : 28 }}>
        <div style={{
          background: 'linear-gradient(135deg, #0F1E33 0%, #1E3A5F 40%, #5B8A80 100%)',
          borderRadius: 12,
          padding: isMobile ? '24px 20px' : '32px 36px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 180, height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(91,138,128,0.15), transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: -30, left: -30,
            width: 120, height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)',
          }} />
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 'var(--space-4)', position: 'relative', zIndex: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.15 }}
                style={{
                  width: isMobile ? 44 : 52, height: isMobile ? 44 : 52,
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <BarChart3 size={isMobile ? 22 : 26} color="#FFFFFF" strokeWidth={2} />
              </motion.div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isMobile ? 'var(--text-2xl)' : 'var(--text-3xl)',
                    fontWeight: 'var(--weight-bold)',
                    color: '#FFFFFF',
                    lineHeight: 1.2, margin: 0,
                  }}>
                    Dashboard
                  </h1>
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles size={18} color="#C08B2C" />
                  </motion.div>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 'var(--text-sm)',
                  marginTop: 4,
                }}>
                  Welcome back, Admin — here's your compliance overview
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex', gap: 'var(--space-2)', padding: 4,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {['Today', 'Week', 'Month', 'Quarter'].map((period, i) => (
                <motion.button
                  key={period}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '6px 14px', borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)', fontWeight: i === 3 ? 600 : 500,
                    color: i === 3 ? '#0F1E33' : 'rgba(255,255,255,0.7)',
                    background: i === 3 ? '#FFFFFF' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 150ms ease',
                  }}
                >
                  {period}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* === KPI STRIP === */}
      <motion.div variants={itemVariants} style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: isMobile ? 'var(--space-3)' : 'var(--space-5)',
        marginBottom: 'var(--space-6)',
      }}>
        {stats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} delay={i * 100} />
        ))}
      </motion.div>

      {/* === COMPLIANCE SCORE === */}
      <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-6)' }}>
        <ComplianceWidget isMobile={isMobile} />
      </motion.div>

      {/* === QUICK ACTIONS === */}
      <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 'var(--space-3)',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--weight-bold)',
            color: '#0F1E33',
          }}>
            Quick Actions
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 'var(--space-3)',
        }}>
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.a
                key={action.label}
                href={action.href}
                whileHover={{
                  y: -2,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: isMobile ? '12px 14px' : '14px 18px',
                  background: '#FFFFFF',
                  border: '1px solid #D8D3C8',
                  borderLeft: `3px solid ${action.color}`,
                  borderRadius: 12,
                  cursor: 'pointer', textDecoration: 'none',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: `${action.color}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={18} color={action.color} strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: '#0F1E33',
                  }}>
                    {action.label}
                  </div>
                </div>
                <motion.div
                  animate={{ x: hoveredCard === i ? 3 : 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChevronRight size={14} color="#5B6472" />
                </motion.div>
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* === CHARTS ROW === */}
      <motion.div variants={itemVariants} style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
      }}>
        <div style={{ flex: isMobile ? 'none' : 2, minWidth: 0 }}>
          <AgeingChart data={ageingData} />
        </div>
        <div style={{
          flex: isMobile ? 'none' : 1,
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-5)', minWidth: 0,
        }}>
          <TrainingDonut covered={trainingCoverage.covered} total={trainingCoverage.total} />
          <AlertsPanel alerts={alerts} />
        </div>
      </motion.div>

      {/* === ACTIVITY + DISTRIBUTION ROW === */}
      <motion.div variants={itemVariants} style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
      }}>
        <div style={{ flex: isMobile ? 'none' : 1, minWidth: 0 }}>
          <ActivityFeed isMobile={isMobile} />
        </div>
        <div style={{ flex: isMobile ? 'none' : 1, minWidth: 0 }}>
          <CaseDistribution isMobile={isMobile} />
        </div>
      </motion.div>
    </motion.div>
  );
}
