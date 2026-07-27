import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { actionItems } from '../../lib/mockData';
import { Plus, LayoutGrid, List, Flag, User, Calendar, AlertTriangle, Zap, Search, Link2, CheckCircle2, Clock, MoreHorizontal, Filter } from 'lucide-react';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const COLUMNS = [
  { id: 'to-do', label: 'To Do', color: COLORS.slateGrey, icon: Clock },
  { id: 'in-progress', label: 'In Progress', color: COLORS.sageTeal, icon: Zap },
  { id: 'overdue', label: 'Overdue', color: '#EF4444', icon: AlertTriangle },
  { id: 'done', label: 'Done', color: COLORS.navyLight, icon: CheckCircle2 },
];

const PRIORITY_CONFIG = {
  high: { color: COLORS.amber, label: 'High' },
  medium: { color: COLORS.sageTeal, label: 'Medium' },
  low: { color: COLORS.slateGrey, label: 'Low' },
};

function getInitials(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function KanbanCard({ action, index }) {
  const isMobile = useIsMobile();
  const priCfg = PRIORITY_CONFIG[action.priority] || PRIORITY_CONFIG.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(15,30,51,0.1)' }}
      style={{
        background: '#FFFFFF',
        borderRadius: 8,
        border: `1px solid ${COLORS.hairline}`,
        padding: isMobile ? 12 : 14,
        marginBottom: 10,
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 600, color: COLORS.deepNavy, lineHeight: 1.4, flex: 1 }}>
          {action.title}
        </div>
        <MoreHorizontal size={14} style={{ color: COLORS.slateGrey, flexShrink: 0, marginLeft: 8 }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: COLORS.sageTeal,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 700, color: '#FFFFFF',
          }}>
            {getInitials(action.owner)}
          </div>
          <span style={{ fontSize: 11, color: COLORS.slateGrey, fontWeight: 500 }}>
            {action.owner.length > 14 ? action.owner.slice(0, 14) + '...' : action.owner}
          </span>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 10, paddingTop: 8, borderTop: `1px solid ${COLORS.hairline}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: COLORS.slateGrey }}>
          <Calendar size={11} />
          {action.dueDate}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Flag size={10} style={{ color: priCfg.color }} />
          <span style={{ fontSize: 10, fontWeight: 600, color: priCfg.color }}>{priCfg.label}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: 11, color: COLORS.sageTeal, fontWeight: 500 }}>
        <Link2 size={10} />
        {action.caseId}
      </div>
    </motion.div>
  );
}

function KanbanView({ actions }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, WebkitOverflowScrolling: 'touch' }}>
        {COLUMNS.map((col) => {
          const colActions = actions.filter((a) => a.status === col.id);
          const Icon = col.icon;
          return (
            <div key={col.id} style={{ minWidth: 260, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Icon size={14} style={{ color: col.color }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.deepNavy }}>{col.label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.slateGrey, background: `${COLORS.hairline}88`, padding: '1px 7px', borderRadius: 8 }}>
                  {colActions.length}
                </span>
              </div>
              <div style={{ background: `${COLORS.offWhite}aa`, borderRadius: 10, padding: 8, minHeight: 120, border: `1px solid ${COLORS.hairline}` }}>
                {colActions.map((a, i) => (
                  <KanbanCard key={a.id} action={a} index={i} />
                ))}
                {colActions.length === 0 && (
                  <div style={{ fontSize: 12, color: COLORS.slateGrey, textAlign: 'center', padding: 24 }}>No items</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, alignItems: 'start' }}>
      {COLUMNS.map((col) => {
        const colActions = actions.filter((a) => a.status === col.id);
        const Icon = col.icon;
        return (
          <motion.div key={col.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Icon size={14} style={{ color: col.color }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.deepNavy }}>{col.label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.slateGrey, background: `${COLORS.hairline}88`, padding: '1px 7px', borderRadius: 8 }}>
                {colActions.length}
              </span>
            </div>
            <div style={{ background: `${COLORS.offWhite}aa`, borderRadius: 10, padding: 8, minHeight: 120, border: `1px solid ${COLORS.hairline}` }}>
              {colActions.map((a, i) => (
                <KanbanCard key={a.id} action={a} index={i} />
              ))}
              {colActions.length === 0 && (
                <div style={{ fontSize: 12, color: COLORS.slateGrey, textAlign: 'center', padding: 24 }}>No items</div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ListView({ actions }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {actions.map((action, idx) => {
          const priCfg = PRIORITY_CONFIG[action.priority] || PRIORITY_CONFIG.medium;
          const colCfg = COLUMNS.find((c) => c.id === action.status);
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              style={{
                background: '#FFFFFF',
                borderRadius: 10,
                border: `1px solid ${COLORS.hairline}`,
                padding: 14,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.deepNavy, flex: 1, lineHeight: 1.4 }}>{action.title}</div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 8,
                  fontSize: 11, fontWeight: 600, color: colCfg.color, background: `${colCfg.color}15`, marginLeft: 8, flexShrink: 0,
                }}>
                  {colCfg.label}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: COLORS.slateGrey, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <User size={11} /> {action.owner}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={11} /> {action.dueDate}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Flag size={10} style={{ color: priCfg.color }} />
                  <span style={{ color: priCfg.color, fontWeight: 600 }}>{priCfg.label}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: COLORS.sageTeal }}>
                  <Link2 size={10} /> {action.caseId}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <table style={{
      width: '100%', borderCollapse: 'separate', borderSpacing: 0,
      background: '#FFFFFF', borderRadius: 10, overflow: 'hidden', border: `1px solid ${COLORS.hairline}`,
    }}>
      <thead>
        <tr>
          {['Task', 'Status', 'Priority', 'Owner', 'Due Date', 'Case'].map((h) => (
            <th key={h} style={{
              padding: '12px 16px', fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              color: COLORS.slateGrey, background: COLORS.offWhite,
              borderBottom: `1px solid ${COLORS.hairline}`, textAlign: 'left', whiteSpace: 'nowrap',
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {actions.map((action) => {
          const priCfg = PRIORITY_CONFIG[action.priority] || PRIORITY_CONFIG.medium;
          const colCfg = COLUMNS.find((c) => c.id === action.status);
          return (
            <motion.tr
              key={action.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.offWhite; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}` }}>{action.title}</td>
              <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: colCfg.color, borderBottom: `1px solid ${COLORS.hairline}` }}>{colCfg.label}</td>
              <td style={{ padding: '12px 16px', borderBottom: `1px solid ${COLORS.hairline}` }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: priCfg.color }}>
                  <Flag size={10} /> {priCfg.label}
                </span>
              </td>
              <td style={{ padding: '12px 16px', fontSize: 12, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: COLORS.sageTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#FFFFFF' }}>
                    {getInitials(action.owner)}
                  </div>
                  {action.owner}
                </div>
              </td>
              <td style={{ padding: '12px 16px', fontSize: 12, color: action.status === 'overdue' ? '#EF4444' : COLORS.deepNavy, fontWeight: action.status === 'overdue' ? 600 : 400, borderBottom: `1px solid ${COLORS.hairline}`, whiteSpace: 'nowrap' }}>{action.dueDate}</td>
              <td style={{ padding: '12px 16px', fontSize: 12, color: COLORS.sageTeal, fontWeight: 500, borderBottom: `1px solid ${COLORS.hairline}` }}>{action.caseId}</td>
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  );
}

const CASE_OPTIONS = ['All Cases', ...new Set(actionItems.map((a) => a.caseId))];
const PRIORITY_OPTIONS = ['All Priority', 'High', 'Medium', 'Low'];
const STATUS_OPTIONS = ['All Status', 'To Do', 'In Progress', 'Overdue', 'Done'];
const STATUS_VALUE_MAP = { 'To Do': 'to-do', 'In Progress': 'in-progress', 'Overdue': 'overdue', 'Done': 'done' };

export default function ActionTrackerPage() {
  const isMobile = useIsMobile();
  const [view, setView] = useState('kanban');
  const [search, setSearch] = useState('');
  const [caseFilter, setCaseFilter] = useState('All Cases');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filtered = useMemo(() => {
    let result = [...actionItems];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.caseId.toLowerCase().includes(q) || a.owner.toLowerCase().includes(q)
      );
    }
    if (caseFilter !== 'All Cases') result = result.filter((a) => a.caseId === caseFilter);
    if (priorityFilter !== 'All Priority') result = result.filter((a) => a.priority === priorityFilter);
    if (statusFilter !== 'All Status') result = result.filter((a) => a.status === STATUS_VALUE_MAP[statusFilter]);
    return result;
  }, [search, caseFilter, priorityFilter, statusFilter]);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 20, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0,
      }}>
        <div style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: COLORS.deepNavy, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={18} style={{ color: COLORS.sageTeal }} />
          Action Tracker
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
          <div style={{ display: 'flex', border: `1px solid ${COLORS.hairline}`, borderRadius: 8, overflow: 'hidden', flex: isMobile ? 1 : 'none' }}>
            {[
              { id: 'kanban', icon: LayoutGrid, label: 'Kanban' },
              { id: 'list', icon: List, label: 'List' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: isMobile ? '7px 10px' : '7px 14px',
                  fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', flex: isMobile ? 1 : 'none', justifyContent: 'center',
                  background: view === id ? COLORS.sageTeal : '#FFFFFF',
                  color: view === id ? '#FFFFFF' : COLORS.slateGrey,
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={14} />{label}
              </button>
            ))}
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: isMobile ? '7px 12px' : '8px 16px', borderRadius: 8,
            fontSize: 13, fontWeight: 600, color: '#FFFFFF',
            background: 'linear-gradient(135deg, #5B8A80, #4D7A72)',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(91,138,128,0.3)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Plus size={15} />
            {isMobile ? 'Add' : 'Add Action'}
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <div style={{
          flex: isMobile ? '1 1 100%' : '1 1 200px',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderRadius: 8,
          border: `1px solid ${COLORS.hairline}`, background: '#FFFFFF', fontSize: 13,
        }}>
          <Search size={14} style={{ color: COLORS.slateGrey }} />
          <input
            type="text" placeholder="Search actions..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 13, color: COLORS.deepNavy, fontFamily: 'inherit' }}
          />
        </div>
        {[{ value: caseFilter, onChange: setCaseFilter, options: CASE_OPTIONS },
          { value: priorityFilter, onChange: setPriorityFilter, options: PRIORITY_OPTIONS },
          { value: statusFilter, onChange: setStatusFilter, options: STATUS_OPTIONS },
        ].map((sel) => (
          <select
            key={sel.options[0]}
            value={sel.value}
            onChange={(e) => sel.onChange(e.target.value)}
            style={{
              padding: '8px 12px', borderRadius: 8,
              border: `1px solid ${COLORS.hairline}`, background: '#FFFFFF',
              fontSize: 12, color: COLORS.deepNavy, fontFamily: 'inherit',
              outline: 'none', cursor: 'pointer',
              flex: isMobile ? '1 1 calc(33% - 6px)' : 'none', minWidth: isMobile ? 0 : 'auto',
            }}
          >
            {sel.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'kanban' ? (
            <KanbanView actions={filtered} />
          ) : (
            <ListView actions={filtered} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
