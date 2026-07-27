import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const STAGE_COLORS = {
  acknowledged: { main: '#5B8A80', light: '#5B8A8022' },
  committee: { main: '#0F1E33', light: '#0F1E3322' },
  proceedings: { main: '#C08B2C', light: '#C08B2C22' },
  evidence: { main: '#5B6472', light: '#5B647222' },
  report: { main: '#1E3A5F', light: '#1E3A5F22' },
};

const STAGE_SUMMARY = [
  { key: 'acknowledged', label: 'Acknowledgement', color: '#5B8A80', trend: 'up', change: '+2' },
  { key: 'committee', label: 'Committee', color: '#0F1E33', trend: 'down', change: '-1' },
  { key: 'proceedings', label: 'Proceedings', color: '#C08B2C', trend: 'up', change: '+3' },
  { key: 'evidence', label: 'Evidence', color: '#5B6472', trend: 'neutral', change: '0' },
  { key: 'report', label: 'Report', color: '#1E3A5F', trend: 'up', change: '+2' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      style={{
        background: '#FFFFFF',
        border: '1px solid #D8D3C8',
        borderRadius: 14,
        padding: '16px 20px',
        boxShadow: '0 16px 40px rgba(15,30,51,0.18), 0 2px 8px rgba(15,30,51,0.06)',
        minWidth: 180,
      }}
    >
      <div style={{
        fontWeight: 700, color: '#0F1E33', marginBottom: 10,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: 14,
        borderBottom: '1px solid #E8E4DC', paddingBottom: 8,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>{label}</span>
        <span style={{
          fontSize: 11, fontWeight: 600, color: '#5B8A80',
          background: '#5B8A8015', padding: '2px 8px', borderRadius: 6,
        }}>
          {total} total
        </span>
      </div>
      {payload.map((entry, i) => (
        <div key={entry.name} style={{
          fontSize: 12, color: '#0F1E33', margin: '5px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
          textTransform: 'capitalize',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 10, height: 10, borderRadius: 3,
              background: entry.color, flexShrink: 0,
            }} />
            <span style={{ color: '#5B6472', fontWeight: 500 }}>{entry.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
              {entry.value}
            </span>
            <span style={{
              fontSize: 10, color: '#5B6472',
              background: '#F7F5F0', padding: '1px 5px', borderRadius: 4,
            }}>
              {total > 0 ? Math.round((entry.value / total) * 100) : 0}%
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const CustomLegend = ({ payload }) => (
  <div style={{
    display: 'flex', flexWrap: 'wrap', gap: '6px 16px',
    justifyContent: 'center', paddingTop: 12,
  }}>
    {payload.map((entry) => (
      <div key={entry.value} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, color: '#5B6472', fontWeight: 500,
        textTransform: 'capitalize',
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: 2,
          background: entry.color, flexShrink: 0,
        }} />
        {entry.value}
      </div>
    ))}
  </div>
);

export default function AgeingChart({ data }) {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  const totalCases = data.reduce((sum, d) => sum + d.acknowledged + d.committee + d.proceedings + d.evidence + d.report, 0);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered
          ? '0 16px 40px rgba(15,30,51,0.12), 0 2px 8px rgba(15,30,51,0.04)'
          : '0 1px 4px rgba(15,30,51,0.04)',
      }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        padding: isMobile ? '20px 16px' : '24px 28px',
        border: '1px solid #D8D3C8',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #5B8A80, #0F1E33 50%, #C08B2C)',
      }} />

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 20, marginTop: 4, flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #5B8A8018, #0F1E3318)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp size={16} color="#5B8A80" />
            </div>
            <h3 style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: isMobile ? 16 : 18,
              fontWeight: 700, color: '#0F1E33', margin: 0,
            }}>
              Case Ageing by Stage
            </h3>
          </div>
          <p style={{ fontSize: 12, color: '#5B6472', margin: 0, paddingLeft: 40 }}>
            Monthly distribution across workflow stages
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 12px', borderRadius: 8,
          background: '#5B8A8012', border: '1px solid #5B8A8025',
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#5B8A80' }}>
            {totalCases} cases tracked
          </span>
        </div>
      </div>

      {/* Stage summary chips */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto',
        paddingBottom: 4, WebkitOverflowScrolling: 'touch',
      }}>
        {STAGE_SUMMARY.map((stage, i) => (
          <motion.div
            key={stage.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', borderRadius: 8,
              background: `${stage.color}08`,
              border: `1px solid ${stage.color}20`,
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
          >
            <div style={{
              width: 8, height: 8, borderRadius: 2,
              background: stage.color, flexShrink: 0,
            }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#0F1E33' }}>
              {stage.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {stage.trend === 'up' && <ArrowUpRight size={10} color="#5B8A80" />}
              {stage.trend === 'down' && <ArrowDownRight size={10} color="#B83A3A" />}
              {stage.trend === 'neutral' && <Minus size={10} color="#5B6472" />}
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: stage.trend === 'up' ? '#5B8A80' : stage.trend === 'down' ? '#B83A3A' : '#5B6472',
              }}>
                {stage.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={isMobile ? 240 : 320}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 12, left: -10, bottom: 4 }}
          barCategoryGap="18%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E8E4DC"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{
              fontSize: isMobile ? 11 : 12,
              fill: '#5B6472',
              fontWeight: 500,
            }}
            axisLine={{ stroke: '#D8D3C8' }}
            tickLine={false}
            dy={4}
          />
          <YAxis
            tick={{
              fontSize: isMobile ? 11 : 12,
              fill: '#5B6472',
            }}
            axisLine={false}
            tickLine={false}
            dx={-4}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              fill: 'rgba(91,138,128,0.04)',
              radius: 6,
            }}
          />
          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="acknowledged"
            stackId="stages"
            fill={STAGE_COLORS.acknowledged.main}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="committee"
            stackId="stages"
            fill={STAGE_COLORS.committee.main}
          />
          <Bar
            dataKey="proceedings"
            stackId="stages"
            fill={STAGE_COLORS.proceedings.main}
          />
          <Bar
            dataKey="evidence"
            stackId="stages"
            fill={STAGE_COLORS.evidence.main}
          />
          <Bar
            dataKey="report"
            stackId="stages"
            fill={STAGE_COLORS.report.main}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
