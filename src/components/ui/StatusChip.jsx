import { useIsMobile } from '../../hooks/useMediaQuery';

const STATUS_STYLES = {
  open:        { bg: 'rgba(192,139,44,0.12)', color: '#8B6514', dot: '#C08B2C', label: 'Open' },
  pending:     { bg: 'rgba(192,139,44,0.12)', color: '#8B6514', dot: '#C08B2C', label: 'Pending' },
  'in-progress': { bg: 'rgba(91,138,128,0.12)', color: '#3D6B63', dot: '#5B8A80', label: 'In Progress' },
  active:      { bg: 'rgba(91,138,128,0.12)', color: '#3D6B63', dot: '#5B8A80', label: 'Active' },
  closed:      { bg: 'rgba(91,100,114,0.12)', color: '#3E4450', dot: '#5B6472', label: 'Closed' },
  resolved:    { bg: 'rgba(91,100,114,0.12)', color: '#3E4450', dot: '#5B6472', label: 'Resolved' },
  overdue:     { bg: 'rgba(155,44,44,0.12)', color: '#7A2020', dot: '#9B2C2C', label: 'Overdue' },
  'in-custody': { bg: 'rgba(91,138,128,0.12)', color: '#3D6B63', dot: '#5B8A80', label: 'In Custody' },
  released:    { bg: 'rgba(192,139,44,0.12)', color: '#8B6514', dot: '#C08B2C', label: 'Released' },
  archived:    { bg: 'rgba(91,100,114,0.12)', color: '#3E4450', dot: '#5B6472', label: 'Archived' },
};

export default function StatusChip({ status, size = 'md' }) {
  const isMobile = useIsMobile();
  const style = STATUS_STYLES[status] || STATUS_STYLES.open;
  const isSm = size === 'sm' || isMobile;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: isSm ? '2px 8px' : '3px 12px',
      borderRadius: 'var(--radius-full)',
      background: style.bg,
      color: style.color,
      fontSize: isSm ? 11 : 12,
      fontWeight: 600,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      lineHeight: 1.6,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: style.dot,
        flexShrink: 0,
        animation: status === 'overdue' ? 'pulse 2s ease-in-out infinite' : 'none',
      }} />
      {style.label}
    </span>
  );
}
