import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

const typeConfig = {
  warning: {
    border: '#C08B2C',
    bg: 'rgba(192,139,44,0.08)',
    Icon: AlertTriangle,
    iconColor: '#C08B2C',
  },
  info: {
    border: '#5B8A80',
    bg: 'rgba(91,138,128,0.08)',
    Icon: Info,
    iconColor: '#5B8A80',
  },
  success: {
    border: '#5B8A80',
    bg: 'rgba(91,138,128,0.06)',
    Icon: CheckCircle,
    iconColor: '#5B8A80',
  },
};

export default function AlertBanner({ message, type = 'info', onDismiss, timestamp }) {
  const [visible, setVisible] = useState(true);
  const cfg = typeConfig[type] || typeConfig.info;
  const { Icon, border, bg, iconColor } = cfg;

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss?.(), 200);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            padding: '14px 16px',
            borderLeft: `4px solid ${border}`,
            background: bg,
            borderRadius: 8,
          }}
        >
          <Icon size={18} color={iconColor} style={{ marginTop: 1, flexShrink: 0 }} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, color: '#0F1E33', fontWeight: 500 }}>{message}</div>
            {timestamp && (
              <div style={{ fontSize: 12, color: '#5B6472', marginTop: 4 }}>{timestamp}</div>
            )}
          </div>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              color: '#5B6472',
              flexShrink: 0,
              lineHeight: 0,
            }}
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
