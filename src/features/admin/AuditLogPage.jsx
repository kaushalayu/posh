import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Download, Filter, ChevronLeft, ChevronRight, Search, RefreshCw } from 'lucide-react';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const actionColors = {
  create: { bg: 'rgba(91,138,128,0.1)', text: COLORS.sageTeal },
  Created: { bg: 'rgba(91,138,128,0.1)', text: COLORS.sageTeal },
  update: { bg: 'rgba(192,139,44,0.1)', text: COLORS.amber },
  Updated: { bg: 'rgba(192,139,44,0.1)', text: COLORS.amber },
  delete: { bg: 'rgba(91,100,114,0.1)', text: COLORS.slateGrey },
  Deleted: { bg: 'rgba(91,100,114,0.1)', text: COLORS.slateGrey },
  escalate: { bg: 'rgba(155,44,44,0.1)', text: '#9B2C2C' },
  Escalated: { bg: 'rgba(155,44,44,0.1)', text: '#9B2C2C' },
};

const actors = ['All', 'Priya Sharma', 'Rajesh Kumar', 'Anita Desai', 'Vikram Mehta', 'System', 'Admin'];
const actionList = ['All', 'Created', 'Updated', 'Deleted', 'Escalated'];
const entities = ['All', 'Complaint', 'Case', 'Document', 'Evidence', 'Hearing', 'Action'];

const mockLogs = Array.from({ length: 48 }, (_, i) => {
  const action = actionList[(i % (actionList.length - 1)) + 1];
  const entity = entities[(i % (entities.length - 1)) + 1];
  const actor = actors[(i % (actors.length - 1)) + 1];
  const ips = ['192.168.1.10', '192.168.1.15', '192.168.1.22', '192.168.1.30', '192.168.1.5'];

  const date = new Date();
  date.setHours(date.getHours() - i * 3);
  date.setMinutes(Math.floor(Math.random() * 60));

  return {
    id: i + 1,
    timestamp: date.toISOString(),
    actor,
    action,
    entity,
    entityId: `${entity.substring(0, 3).toUpperCase()}-${String(1000 + i).padStart(4, '0')}`,
    ip: ips[i % ips.length],
  };
});

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function AuditLogPage() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [filterActor, setFilterActor] = useState('All');
  const [filterAction, setFilterAction] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = isMobile ? 8 : 12;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredLogs = useMemo(() => {
    return mockLogs.filter((log) => {
      if (filterActor !== 'All' && log.actor !== filterActor) return false;
      if (filterAction !== 'All' && log.action !== filterAction) return false;
      return true;
    });
  }, [filterActor, filterAction]);

  const totalPages = Math.ceil(filteredLogs.length / perPage);
  const pagedLogs = filteredLogs.slice((page - 1) * perPage, page * perPage);

  const filterBar = (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: isMobile ? '10px 12px' : '12px 16px',
      backgroundColor: '#FFFFFF', borderRadius: 10,
      border: `1px solid ${COLORS.hairline}`, marginBottom: 16,
      flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: isMobile ? '100%' : 'auto', flexWrap: 'wrap' }}>
        <Filter size={14} color={COLORS.slateGrey} />
        <select
          value={filterActor} onChange={(e) => { setFilterActor(e.target.value); setPage(1); }}
          style={{
            fontSize: 12, padding: '7px 10px', borderRadius: 6,
            border: `1px solid ${COLORS.hairline}`, color: COLORS.deepNavy,
            backgroundColor: '#FFFFFF', outline: 'none', cursor: 'pointer',
            flex: isMobile ? '1' : 'none', minWidth: isMobile ? 0 : 120,
          }}
        >
          {actors.map((a) => <option key={a} value={a}>{a === 'All' ? 'All Actors' : a}</option>)}
        </select>
        <select
          value={filterAction} onChange={(e) => { setFilterAction(e.target.value); setPage(1); }}
          style={{
            fontSize: 12, padding: '7px 10px', borderRadius: 6,
            border: `1px solid ${COLORS.hairline}`, color: COLORS.deepNavy,
            backgroundColor: '#FFFFFF', outline: 'none', cursor: 'pointer',
            flex: isMobile ? '1' : 'none', minWidth: isMobile ? 0 : 120,
          }}
        >
          {actionList.map((a) => <option key={a} value={a}>{a === 'All' ? 'All Actions' : a}</option>)}
        </select>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 20, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0,
      }}>
        <div>
          <h2 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 600, color: COLORS.deepNavy, margin: 0 }}>Audit Log</h2>
          <p style={{ fontSize: 13, color: COLORS.slateGrey, margin: '4px 0 0' }}>Track all system activities and changes</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 18px', backgroundColor: COLORS.navyLight,
          color: '#FFFFFF', border: 'none', borderRadius: 8,
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
          width: isMobile ? '100%' : 'auto', justifyContent: 'center',
        }}>
          <Download size={15} /> Export
        </button>
      </div>

      {filterBar}

      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: 12,
        border: `1px solid ${COLORS.hairline}`, overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(15,30,51,0.04)',
      }}>
        {loading ? (
          <div style={{ padding: '8px 0' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', borderBottom: `1px solid ${COLORS.hairline}` }}
              >
                <div style={{ height: 14, borderRadius: 4, backgroundColor: COLORS.hairline, width: 140 }} />
                <div style={{ height: 14, borderRadius: 4, backgroundColor: COLORS.hairline, width: 100 }} />
                <div style={{ height: 14, borderRadius: 4, backgroundColor: COLORS.hairline, width: 80 }} />
              </motion.div>
            ))}
          </div>
        ) : isMobile ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {pagedLogs.map((log, idx) => {
                const ac = actionColors[log.action] || actionColors.Updated;
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.2 }}
                    style={{
                      padding: '14px 16px',
                      borderBottom: `1px solid ${COLORS.hairline}`,
                      transition: 'background-color 0.12s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontWeight: 500, fontSize: 13, color: COLORS.deepNavy }}>{log.actor}</span>
                      <span style={{
                        display: 'inline-block', padding: '3px 10px', borderRadius: 12,
                        fontSize: 11, fontWeight: 600, textTransform: 'capitalize',
                        backgroundColor: ac.bg, color: ac.text,
                      }}>{log.action}</span>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.slateGrey, marginBottom: 4 }}>
                      {log.entity} | <code style={{ fontSize: 11, fontFamily: "'SF Mono', 'Fira Code', monospace", color: COLORS.navyLight, backgroundColor: COLORS.offWhite, padding: '1px 4px', borderRadius: 3 }}>{log.entityId}</code>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: COLORS.slateGrey }}>
                      <span>{formatDate(log.timestamp)}</span>
                      <span style={{ fontFamily: "'SF Mono', 'Fira Code', monospace" }}>{log.ip}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Timestamp', 'Actor', 'Action', 'Entity', 'Entity ID', 'IP Address'].map((h) => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 600,
                      color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.06em',
                      backgroundColor: '#FAFAF7', borderBottom: `1px solid ${COLORS.hairline}`,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {pagedLogs.map((log, idx) => {
                    const ac = actionColors[log.action] || actionColors.Updated;
                    return (
                      <motion.tr
                        key={log.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03, duration: 0.2 }}
                        style={{ transition: 'background-color 0.12s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F0EDE8'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        <td style={{ padding: '11px 16px', fontSize: 12, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}` }}>
                          <span style={{ color: COLORS.slateGrey, fontVariantNumeric: 'tabular-nums' }}>{formatDate(log.timestamp)}</span>
                        </td>
                        <td style={{ padding: '11px 16px', fontSize: 12, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}`, fontWeight: 500 }}>{log.actor}</td>
                        <td style={{ padding: '11px 16px', borderBottom: `1px solid ${COLORS.hairline}` }}>
                          <span style={{
                            display: 'inline-block', padding: '3px 10px', borderRadius: 12,
                            fontSize: 11, fontWeight: 600, textTransform: 'capitalize',
                            backgroundColor: ac.bg, color: ac.text,
                          }}>{log.action}</span>
                        </td>
                        <td style={{ padding: '11px 16px', fontSize: 12, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}` }}>{log.entity}</td>
                        <td style={{ padding: '11px 16px', fontSize: 12, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}` }}>
                          <code style={{ fontSize: 11, fontFamily: "'SF Mono', 'Fira Code', monospace", color: COLORS.navyLight, backgroundColor: COLORS.offWhite, padding: '2px 6px', borderRadius: 4 }}>{log.entityId}</code>
                        </td>
                        <td style={{ padding: '11px 16px', fontSize: 12, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}` }}>
                          <span style={{ fontSize: 12, fontFamily: "'SF Mono', 'Fira Code', monospace", color: COLORS.slateGrey }}>{log.ip}</span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
                {pagedLogs.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: 40, textAlign: 'center', fontSize: 13, color: COLORS.slateGrey }}>
                      No audit log entries match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 16px', borderTop: `1px solid ${COLORS.hairline}`,
        }}>
          <span style={{ fontSize: 12, color: COLORS.slateGrey }}>
            Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filteredLogs.length)} of {filteredLogs.length}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 30, height: 30, borderRadius: 6,
                border: `1px solid ${COLORS.hairline}`, background: 'none',
                cursor: 'pointer', color: COLORS.slateGrey, opacity: page <= 1 ? 0.4 : 1,
              }}
              disabled={page <= 1} onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 30, height: 30, borderRadius: 6, border: 'none',
                    fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    backgroundColor: pageNum === page ? COLORS.sageTeal : 'transparent',
                    color: pageNum === page ? '#FFFFFF' : COLORS.slateGrey,
                  }}
                >{pageNum}</button>
              );
            })}
            <button
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 30, height: 30, borderRadius: 6,
                border: `1px solid ${COLORS.hairline}`, background: 'none',
                cursor: 'pointer', color: COLORS.slateGrey, opacity: page >= totalPages ? 0.4 : 1,
              }}
              disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
