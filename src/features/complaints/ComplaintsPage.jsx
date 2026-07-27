import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, SortAsc, FolderOpen, ArrowUpDown, CircleDot, Clock, CheckCircle2 } from 'lucide-react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import CaseCard from '../../components/ui/CaseCard';
import { cases } from '../../lib/mockData';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  sageTealLight: '#6FA094',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#E5E0D6',
  cardBg: '#FFFFFF',
};

const STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'Closed', 'Pending'];
const STAGE_OPTIONS = ['All', 'Complaint', 'Acknowledgement', 'Committee', 'Proceedings', 'Evidence', 'Report', 'Closed'];
const SORT_OPTIONS = ['Newest', 'Oldest', 'Priority'];

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

const STATUS_COLORS = {
  open: '#5B8A80',
  'in-progress': '#C08B2C',
  closed: '#5B6472',
  pending: '#8B7EC8',
};

export default function ComplaintsPage() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const filtered = useMemo(() => {
    let result = [...cases];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.complainant.toLowerCase().includes(q) ||
          (c.assignedTo && c.assignedTo.toLowerCase().includes(q))
      );
    }

    if (statusFilter !== 'All') {
      const sf = statusFilter.toLowerCase().replace(' ', '-');
      result = result.filter((c) => c.status === sf);
    }

    if (stageFilter !== 'All') {
      result = result.filter((c) => c.stage === stageFilter);
    }

    if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'Priority') {
      result.sort(
        (a, b) =>
          (PRIORITY_ORDER[a.priority] ?? 3) -
          (PRIORITY_ORDER[b.priority] ?? 3)
      );
    }

    return result;
  }, [search, statusFilter, stageFilter, sortBy]);

  const statusCounts = useMemo(() => {
    const counts = { open: 0, 'in-progress': 0, closed: 0 };
    cases.forEach((c) => {
      if (counts[c.status] !== undefined) counts[c.status]++;
    });
    return counts;
  }, []);

  const noiseStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.offWhite, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ padding: isMobile ? '12px 12px 0' : '20px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(135deg, #0F1E33 0%, #152E4A 40%, #1A3D52 70%, #1E4A50 100%)',
            borderRadius: 16,
            padding: isMobile ? '24px 20px' : '32px 36px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(15,30,51,0.25), 0 1px 3px rgba(15,30,51,0.15)',
          }}
        >
          <div style={{ ...noiseStyle, position: 'absolute', inset: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(91,138,128,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -30, left: '40%', width: 120, height: 120, borderRadius: '50%', background: 'rgba(192,139,44,0.06)', filter: 'blur(35px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 0 }}>
            <div>
              <h1 style={{
                margin: 0,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: isMobile ? 24 : 28,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>
                Complaints
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? 12 : 20,
                marginTop: 14,
                flexWrap: 'wrap',
              }}>
                {[
                  { label: 'Open', count: statusCounts.open, color: STATUS_COLORS.open },
                  { label: 'In Progress', count: statusCounts['in-progress'], color: STATUS_COLORS['in-progress'] },
                  { label: 'Closed', count: statusCounts.closed, color: STATUS_COLORS.closed },
                ].map((s) => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: s.color,
                      boxShadow: `0 0 6px ${s.color}55`,
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: '0.01em' }}>
                      {s.count} <span style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: isMobile ? '10px 20px' : '11px 24px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #5B8A80, #4A796F)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 2px 12px rgba(91,138,128,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center',
                transition: 'box-shadow 0.2s',
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              New Complaint
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          style={{
            marginTop: 16,
            background: COLORS.cardBg,
            borderRadius: 14,
            padding: isMobile ? '14px 14px' : '16px 24px',
            boxShadow: '0 1px 4px rgba(15,30,51,0.06), 0 0 0 1px rgba(15,30,51,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <div style={{
            flex: isMobile ? '1 1 100%' : '1 1 260px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '9px 14px',
            borderRadius: 10,
            border: `1.5px solid ${COLORS.hairline}`,
            background: COLORS.offWhite,
            width: isMobile ? '100%' : 'auto',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}>
            <Search size={15} style={{ color: COLORS.slateGrey, flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by ID, title, complainant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={(e) => { e.target.parentElement.style.borderColor = COLORS.sageTeal; e.target.parentElement.style.boxShadow = `0 0 0 3px ${COLORS.sageTeal}18`; }}
              onBlur={(e) => { e.target.parentElement.style.borderColor = COLORS.hairline; e.target.parentElement.style.boxShadow = 'none'; }}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: 13,
                color: COLORS.deepNavy,
                fontFamily: 'inherit',
                minWidth: 0,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, width: isMobile ? '100%' : 'auto', flexWrap: 'wrap' }}>
            {[
              { value: statusFilter, onChange: setStatusFilter, options: STATUS_OPTIONS, icon: <CircleDot size={13} />, label: 'Status' },
              { value: stageFilter, onChange: setStageFilter, options: STAGE_OPTIONS, icon: <Filter size={13} />, label: 'Stage' },
              { value: sortBy, onChange: setSortBy, options: SORT_OPTIONS, icon: <ArrowUpDown size={13} />, label: 'Sort' },
            ].map((sel) => (
              <div
                key={sel.label}
                style={{
                  position: 'relative',
                  flex: isMobile ? '1 1 calc(33% - 6px)' : 'none',
                  minWidth: isMobile ? 0 : 130,
                }}
              >
                <select
                  value={sel.value}
                  onChange={(e) => sel.onChange(e.target.value)}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    padding: '8px 30px 8px 32px',
                    borderRadius: 20,
                    border: `1.5px solid ${sel.value !== 'All' ? COLORS.sageTeal : COLORS.hairline}`,
                    background: sel.value !== 'All' ? `${COLORS.sageTeal}0D` : COLORS.offWhite,
                    fontSize: 12,
                    fontWeight: 500,
                    color: sel.value !== 'All' ? COLORS.sageTeal : COLORS.deepNavy,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    outline: 'none',
                    width: '100%',
                    transition: 'all 0.2s',
                  }}
                >
                  {sel.options.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: sel.value !== 'All' ? COLORS.sageTeal : COLORS.slateGrey, pointerEvents: 'none', display: 'flex' }}>
                  {sel.icon}
                </span>
                <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: sel.value !== 'All' ? COLORS.sageTeal : COLORS.slateGrey, pointerEvents: 'none', fontSize: 10 }}>
                  ▾
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 20,
            marginBottom: 4,
          }}
        >
          <span style={{ fontSize: 13, color: COLORS.slateGrey, fontWeight: 500 }}>
            Showing <span style={{ color: COLORS.deepNavy, fontWeight: 600 }}>{filtered.length}</span> of <span style={{ color: COLORS.deepNavy, fontWeight: 600 }}>{cases.length}</span> complaints
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${COLORS.hairline}, transparent)` }} />
        </motion.div>

        <div style={{ paddingBottom: 32 }}>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? 48 : 72,
                textAlign: 'center',
              }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${COLORS.hairline}66, ${COLORS.hairline}33)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  boxShadow: `0 4px 20px ${COLORS.hairline}44`,
                }}
              >
                <FolderOpen size={30} style={{ color: COLORS.slateGrey }} strokeWidth={1.5} />
              </motion.div>
              <div style={{ fontSize: 17, fontWeight: 600, color: COLORS.deepNavy, marginBottom: 6, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
                No complaints found
              </div>
              <div style={{ fontSize: 13, color: COLORS.slateGrey, lineHeight: 1.6, maxWidth: 320 }}>
                No results match your current filters. Try adjusting your search terms or changing the filter criteria above.
              </div>
            </motion.div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: isMobile ? 12 : 16,
            }}>
              <AnimatePresence mode="popLayout">
                {filtered.map((complaint, i) => (
                  <motion.div
                    key={complaint.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -8 }}
                    transition={{ duration: 0.35, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <CaseCard caseData={complaint} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
