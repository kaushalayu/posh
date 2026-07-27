import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, X, Bell } from 'lucide-react';
import { useIsMobile } from '../../hooks/useMediaQuery';

const typeConfig = {
  warning: { color: '#C08B2C', bg: 'rgba(192,139,44,0.08)', Icon: AlertTriangle, border: '#C08B2C' },
  info:    { color: '#5B8A80', bg: 'rgba(91,138,128,0.08)', Icon: Info, border: '#5B8A80' },
  success: { color: '#3D8B5E', bg: 'rgba(61,139,94,0.08)', Icon: CheckCircle, border: '#3D8B5E' },
};

export default function AlertsPanel({ alerts: initialAlerts }) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [hoveredAlert, setHoveredAlert] = useState(null);
  const isMobile = useIsMobile();

  const handleDismiss = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));
  const visibleAlerts = alerts.filter((a) => !a.dismissed).slice(0, 5);

  return (
    <motion.div
      animate={{
        boxShadow: hoveredAlert !== null
          ? '0 12px 32px rgba(15,30,51,0.1)'
          : '0 1px 3px rgba(15,30,51,0.04)',
      }}
      transition={{ duration: 0.2 }}
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: isMobile ? '18px' : '24px',
        border: '1px solid #D8D3C8',
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #C08B2C, #C08B2C)',
        borderRadius: '16px 16px 0 0',
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Bell size={18} color="#C08B2C" />
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-xl)',
            fontWeight: 600, color: '#0F1E33',
          }}>
            Recent Alerts
          </h3>
        </div>
        {visibleAlerts.length > 0 && (
          <span style={{
            padding: '2px 8px', borderRadius: 'var(--radius-full)',
            background: 'rgba(192,139,44,0.12)',
            color: '#C08B2C', fontSize: 11, fontWeight: 700,
          }}>
            {visibleAlerts.length}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: isMobile ? 200 : 260, overflowY: 'auto' }}>
        <AnimatePresence>
          {visibleAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center', padding: '30px 20px',
                color: '#5B6472', fontSize: 'var(--text-sm)',
              }}
            >
              <CheckCircle size={32} color="#5B8A80" style={{ marginBottom: 8, opacity: 0.5 }} />
              <div>All clear! No pending alerts.</div>
            </motion.div>
          ) : (
            visibleAlerts.map((alert, i) => {
              const config = typeConfig[alert.type] || typeConfig.info;
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0, padding: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onMouseEnter={() => setHoveredAlert(alert.id)}
                  onMouseLeave={() => setHoveredAlert(null)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '10px 12px', borderRadius: '10px',
                    borderLeft: `3px solid ${config.border}`,
                    background: hoveredAlert === alert.id ? config.bg : 'rgba(247,245,240,0.4)',
                    cursor: 'default',
                    transition: 'background 150ms',
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: 8,
                    background: config.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 1,
                  }}>
                    <config.Icon size={13} color={config.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 'var(--text-sm)', color: '#0F1E33',
                      lineHeight: 1.4, wordBreak: 'break-word',
                      fontWeight: 500,
                    }}>{alert.message}</p>
                    <span style={{
                      fontSize: 'var(--text-xs)', color: '#5B6472',
                      marginTop: '3px', display: 'block', opacity: 0.7,
                    }}>{alert.timestamp}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDismiss(alert.id)}
                    style={{
                      color: '#5B6472', padding: 3, borderRadius: 6, flexShrink: 0,
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <X size={13} />
                  </motion.button>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
