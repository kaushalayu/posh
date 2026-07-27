import { motion } from 'framer-motion';
import StatusChip from './StatusChip';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { User, UserCheck, Calendar } from 'lucide-react';

export default function CaseCard({ caseData, onClick }) {
  const { id, title, complainant, status, stage, createdAt, assignedTo, priority } = caseData;
  const isMobile = useIsMobile();

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 10px 28px rgba(0,0,0,0.1)', borderColor: '#5B8A80' }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onClick={onClick}
      style={{
        background: '#fff',
        border: '1px solid #D8D3C8',
        borderLeft: `4px solid ${priority === 'high' ? '#C08B2C' : '#5B8A80'}`,
        borderRadius: 12,
        padding: isMobile ? '14px 16px' : '18px 22px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: isMobile ? 12 : 13,
          fontWeight: 700, color: '#5B8A80',
          letterSpacing: '0.02em',
        }}>{id}</span>
        <StatusChip status={status} size="sm" />
      </div>

      <div style={{
        fontSize: isMobile ? 14 : 15, fontWeight: 700, color: '#0F1E33',
        marginBottom: 10, lineHeight: 1.3,
      }}>{title}</div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: isMobile ? 4 : 14, fontSize: 12, color: '#5B6472' }}>
        {complainant && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <User size={12} /> {complainant}
          </span>
        )}
        {assignedTo && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <UserCheck size={12} /> {assignedTo}
          </span>
        )}
        {createdAt && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={12} /> {createdAt}
          </span>
        )}
      </div>

      {stage && (
        <div style={{
          marginTop: 10, padding: '4px 10px',
          background: 'rgba(91,138,128,0.06)',
          borderRadius: 'var(--radius-full)',
          display: 'inline-flex', fontSize: 11, fontWeight: 600,
          color: '#5B8A80',
        }}>{stage}</div>
      )}
    </motion.div>
  );
}
