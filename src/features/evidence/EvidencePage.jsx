import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { evidenceItems } from '../../lib/mockData';
import StatusChip from '../../components/ui/StatusChip';
import { Plus, Search, Shield, ChevronDown, ChevronRight, Clock, Filter } from 'lucide-react';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const mockEvidence = [
  {
    id: 'EV-001', caseId: 'POSH-2026-0042', description: 'Email correspondence between complainant and respondent', source: 'Complainant', dateAdded: '2026-06-15', custodian: 'Investigation Committee', status: 'in-custody',
    chainOfCustody: [
      { date: '2026-06-15', from: 'Complainant', to: 'ICC Secretary', action: 'Submitted as evidence' },
      { date: '2026-06-16', from: 'ICC Secretary', to: 'Investigation Committee', action: 'Transferred for review' },
    ],
  },
  {
    id: 'EV-002', caseId: 'POSH-2026-0042', description: 'Chat logs from internal messaging platform', source: 'Complainant', dateAdded: '2026-06-18', custodian: 'Investigation Committee', status: 'in-custody',
    chainOfCustody: [
      { date: '2026-06-18', from: 'Complainant', to: 'ICC Secretary', action: 'Submitted as evidence' },
    ],
  },
  {
    id: 'EV-003', caseId: 'POSH-2026-0041', description: 'Written witness statement from Rohit Verma', source: 'Witness', dateAdded: '2026-06-20', custodian: 'ICC Secretary', status: 'in-custody',
    chainOfCustody: [
      { date: '2026-06-20', from: 'Rohit Verma', to: 'ICC Secretary', action: 'Notarized statement received' },
    ],
  },
  {
    id: 'EV-004', caseId: 'POSH-2026-0040', description: 'HR Policy document - Sexual Harassment Prevention Policy v3.2', source: 'HR Department', dateAdded: '2026-05-30', custodian: 'Investigation Committee', status: 'in-custody',
    chainOfCustody: [
      { date: '2026-05-30', from: 'HR Department', to: 'Investigation Committee', action: 'Referenced policy document' },
    ],
  },
  {
    id: 'EV-005', caseId: 'POSH-2026-0039', description: 'CCTV footage from office floor 3', source: 'Facilities', dateAdded: '2026-06-01', custodian: 'Legal Department', status: 'released',
    chainOfCustody: [
      { date: '2026-06-01', from: 'Facilities', to: 'Security Head', action: 'Captured and secured' },
      { date: '2026-06-03', from: 'Security Head', to: 'Legal Department', action: 'Transferred per legal request' },
    ],
  },
  {
    id: 'EV-006', caseId: 'POSH-2026-0038', description: 'Prior complaint filing documents (POSH-2025-0091)', source: 'ICC Records', dateAdded: '2026-07-02', custodian: 'ICC Secretary', status: 'in-custody',
    chainOfCustody: [
      { date: '2026-07-02', from: 'ICC Records', to: 'ICC Secretary', action: 'Retrieved from archive' },
    ],
  },
  {
    id: 'EV-007', caseId: 'POSH-2026-0037', description: 'Medical report - complainant stress assessment', source: 'Complainant', dateAdded: '2026-04-25', custodian: 'Archive', status: 'archived',
    chainOfCustody: [
      { date: '2026-04-25', from: 'Complainant', to: 'ICC Secretary', action: 'Submitted confidentially' },
      { date: '2026-05-20', from: 'Legal Department', to: 'Archive', action: 'Case closed - archived' },
    ],
  },
];

const FILTER_CASES = ['All Cases', ...new Set(mockEvidence.map((e) => e.caseId))];
const FILTER_STATUSES = ['All Status', 'in-custody', 'released', 'archived'];

const EvidenceBadge = ({ id }) => (
  <span style={{
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.sageTeal,
    background: `${COLORS.sageTeal}12`,
    border: `1px solid ${COLORS.sageTeal}25`,
    padding: '3px 10px',
    borderRadius: 20,
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap',
  }}>{id}</span>
);

export default function EvidencePage({ embedded }) {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState('');
  const [caseFilter, setCaseFilter] = useState('All Cases');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [expandedRow, setExpandedRow] = useState(null);

  const filtered = useMemo(() => {
    let result = [...mockEvidence];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((e) => e.id.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.caseId.toLowerCase().includes(q));
    }
    if (caseFilter !== 'All Cases') result = result.filter((e) => e.caseId === caseFilter);
    if (statusFilter !== 'All Status') result = result.filter((e) => e.status === statusFilter);
    return result;
  }, [search, caseFilter, statusFilter]);

  const filterBar = (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 12,
      border: `1px solid ${COLORS.hairline}`,
      padding: isMobile ? '12px 14px' : '14px 18px',
      marginBottom: 20,
      boxShadow: '0 1px 3px rgba(15,30,51,0.04)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <div style={{
          flex: isMobile ? '1 1 100%' : '1 1 220px',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 14px', borderRadius: 8,
          border: `1px solid ${COLORS.hairline}`, background: COLORS.offWhite, fontSize: 13,
          transition: 'border-color 0.2s',
        }}>
          <Search size={15} style={{ color: COLORS.slateGrey, flexShrink: 0 }} />
          <input
            type="text" placeholder="Search evidence by ID, description, or case..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 13, color: COLORS.deepNavy, fontFamily: 'inherit' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, width: isMobile ? '100%' : 'auto', flexWrap: 'wrap' }}>
          <select
            value={caseFilter} onChange={(e) => setCaseFilter(e.target.value)}
            style={{
              padding: '9px 14px', borderRadius: 8,
              border: `1px solid ${COLORS.hairline}`, background: '#FFFFFF',
              fontSize: 12, color: COLORS.deepNavy, fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
              flex: isMobile ? '1 1 calc(50% - 4px)' : 'none', minWidth: isMobile ? 0 : 130,
              transition: 'border-color 0.2s',
            }}
          >
            {FILTER_CASES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '9px 14px', borderRadius: 8,
              border: `1px solid ${COLORS.hairline}`, background: '#FFFFFF',
              fontSize: 12, color: COLORS.deepNavy, fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
              flex: isMobile ? '1 1 calc(50% - 4px)' : 'none', minWidth: isMobile ? 0 : 130,
              transition: 'border-color 0.2s',
            }}
          >
            {FILTER_STATUSES.map((s) => (
              <option key={s} value={s}>{s === 'All Status' ? 'All Status' : s.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderChainOfCustody = (item) => (
    <div style={{
      background: COLORS.offWhite, borderRadius: 10, padding: 16, marginTop: 4, marginBottom: 8,
      border: `1px solid ${COLORS.hairline}80`,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.deepNavy, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        <Clock size={13} style={{ color: COLORS.sageTeal }} />
        Chain of Custody
      </div>
      <div style={{ position: 'relative', paddingLeft: 20 }}>
        {item.chainOfCustody.map((entry, ci) => (
          <div key={ci} style={{
            position: 'relative',
            paddingBottom: ci < item.chainOfCustody.length - 1 ? 18 : 0,
            marginBottom: ci < item.chainOfCustody.length - 1 ? 0 : 0,
          }}>
            {ci < item.chainOfCustody.length - 1 && (
              <div style={{
                position: 'absolute', left: -15, top: 10, width: 1, height: 'calc(100% - 2px)',
                background: `linear-gradient(to bottom, ${COLORS.sageTeal}50, ${COLORS.sageTeal}20)`,
              }} />
            )}
            <div style={{
              position: 'absolute', left: -20, top: 3, width: 10, height: 10, borderRadius: '50%',
              background: ci === 0 ? COLORS.sageTeal : ci === item.chainOfCustody.length - 1 ? COLORS.amber : COLORS.slateGrey,
              border: `2px solid ${COLORS.offWhite}`,
              boxShadow: `0 0 0 1px ${ci === 0 ? COLORS.sageTeal : ci === item.chainOfCustody.length - 1 ? COLORS.amber : COLORS.slateGrey}30`,
            }} />
            <div style={{
              background: '#FFFFFF', borderRadius: 8, padding: '10px 14px',
              border: `1px solid ${COLORS.hairline}60`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.deepNavy }}>{entry.from} <span style={{ color: COLORS.sageTeal, fontWeight: 400 }}>&rarr;</span> {entry.to}</span>
                <span style={{ fontSize: 11, color: COLORS.slateGrey, whiteSpace: 'nowrap', fontWeight: 500 }}>{entry.date}</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.slateGrey, lineHeight: 1.5 }}>{entry.action}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20,
        flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: isMobile ? 16 : 18, fontWeight: 700, color: COLORS.deepNavy,
          letterSpacing: '-0.01em',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.sageTeal}, #4D7A72)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 8px ${COLORS.sageTeal}30`,
          }}>
            <Shield size={17} style={{ color: '#FFFFFF' }} />
          </div>
          Evidence & Chain of Custody
        </div>
        {!embedded && (
          <button
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(91,138,128,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(91,138,128,0.25)'; }}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600,
              color: '#FFFFFF', background: `linear-gradient(135deg, ${COLORS.sageTeal}, #4D7A72)`,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 2px 10px rgba(91,138,128,0.25)',
              width: isMobile ? '100%' : 'auto', justifyContent: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            <Plus size={15} />
            Add Evidence
          </button>
        )}
      </div>

      {filterBar}

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((item) => {
            const isExpanded = expandedRow === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: '#FFFFFF', borderRadius: 14,
                  border: `1px solid ${isExpanded ? COLORS.sageTeal : COLORS.hairline}`,
                  overflow: 'hidden',
                  boxShadow: isExpanded ? `0 4px 16px ${COLORS.sageTeal}12, 0 1px 4px rgba(15,30,51,0.06)` : '0 1px 4px rgba(15,30,51,0.05)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              >
                <button
                  onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                  style={{
                    width: '100%', padding: '16px 18px', background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <EvidenceBadge id={item.id} />
                    <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronRight size={16} style={{ color: COLORS.slateGrey }} />
                    </motion.div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.deepNavy, marginBottom: 10, lineHeight: 1.45 }}>{item.description}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: 12, color: COLORS.slateGrey }}>
                    <span style={{ fontWeight: 500 }}>{item.source}</span>
                    <span style={{ color: COLORS.hairline }}>|</span>
                    <span>{item.dateAdded}</span>
                    <span style={{ color: COLORS.hairline }}>|</span>
                    <StatusChip status={item.status} size="sm" />
                  </div>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 18px 14px 18px' }}>
                        {renderChainOfCustody(item)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div style={{
          background: '#FFFFFF', borderRadius: 14, border: `1px solid ${COLORS.hairline}`, overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(15,30,51,0.04)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Evidence #', 'Description', 'Source', 'Date Added', 'Custodian', 'Status', ''].map((h) => (
                  <th key={h} style={{
                    padding: '13px 16px', fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: COLORS.slateGrey, background: COLORS.offWhite,
                    borderBottom: `1px solid ${COLORS.hairline}`, textAlign: 'left', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isExpanded = expandedRow === item.id;
                return (
                  <motion.tr
                    key={item.id}
                    style={{
                      cursor: 'pointer',
                      background: isExpanded ? `${COLORS.sageTeal}08` : 'transparent',
                      transition: 'background 0.2s',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.background = `${COLORS.sageTeal}06`; }}
                    onMouseLeave={(e) => { if (!isExpanded) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '14px 16px', borderBottom: `1px solid ${COLORS.hairline}` }}>
                      <EvidenceBadge id={item.id} />
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}`, maxWidth: 280, lineHeight: 1.5 }}>{item.description}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}`, fontWeight: 500 }}>{item.source}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: COLORS.slateGrey, borderBottom: `1px solid ${COLORS.hairline}`, whiteSpace: 'nowrap', fontWeight: 500 }}>{item.dateAdded}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}`, fontWeight: 500 }}>{item.custodian}</td>
                    <td style={{ padding: '14px 16px', borderBottom: `1px solid ${COLORS.hairline}` }}>
                      <StatusChip status={item.status} size="sm" />
                    </td>
                    <td style={{ padding: '14px 16px', cursor: 'pointer', textAlign: 'center', borderBottom: `1px solid ${COLORS.hairline}` }}
                      onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                    >
                      <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-flex' }}>
                        <ChevronRight size={15} style={{ color: COLORS.slateGrey }} />
                      </motion.div>
                    </td>
                  </motion.tr>
                );
              })}
              {filtered.map((item) =>
                expandedRow === item.id ? (
                  <tr key={`${item.id}-chain`}>
                    <td colSpan={7} style={{ padding: '0 16px 14px 16px' }}>
                      {renderChainOfCustody(item)}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
