import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Award } from 'lucide-react';

const COLORS = ['#5B8A80', '#E8E4DC'];

export default function TrainingDonut({ covered, total }) {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const percentage = Math.round((covered / total) * 100);
  const data = [
    { name: 'Covered', value: covered },
    { name: 'Pending', value: total - covered },
  ];

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered
          ? '0 12px 32px rgba(15,30,51,0.1)'
          : '0 1px 3px rgba(15,30,51,0.04)',
      }}
      transition={{ duration: 0.2 }}
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: isMobile ? '18px' : '24px',
        border: '1px solid #D8D3C8',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #5B8A80, #5B8A80)',
        borderRadius: '16px 16px 0 0',
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
        marginBottom: '14px',
      }}>
        <Award size={18} color="#C08B2C" />
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-xl)',
          fontWeight: 600, color: '#0F1E33', textAlign: 'left',
        }}>
          Training Coverage
        </h3>
      </div>

      <div style={{ position: 'relative', width: '100%', height: isMobile ? 150 : 190 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data} cx="50%" cy="50%"
              innerRadius={isMobile ? 45 : 60}
              outerRadius={isMobile ? 65 : 85}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center percentage */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <span style={{
              fontSize: isMobile ? 'var(--text-xl)' : 'var(--text-3xl)',
              fontWeight: 800, color: '#5B8A80',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
              display: 'block',
            }}>
              {percentage}%
            </span>
          </motion.div>
        </div>
      </div>

      <div style={{
        marginTop: '12px', padding: '8px 14px',
        background: 'rgba(91,138,128,0.06)',
        borderRadius: 'var(--radius-full)',
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#5B8A80',
        }} />
        <span style={{ color: '#5B6472', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
          {covered} of {total} employees trained
        </span>
      </div>
    </motion.div>
  );
}
