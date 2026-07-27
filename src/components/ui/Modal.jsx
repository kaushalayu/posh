import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useIsMobile } from '../../hooks/useMediaQuery';

const sizeMap = { sm: 400, md: 560, lg: 720 };

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const isMobile = useIsMobile();
  const maxW = isMobile ? '95vw' : sizeMap[size] || sizeMap.md;

  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEsc]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          display: 'flex', alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: 'center', zIndex: 500, padding: isMobile ? 0 : 'var(--space-6)',
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          />

          {/* Content */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 10 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            style={{
              position: 'relative',
              width: maxW,
              maxHeight: isMobile ? '85vh' : '80vh',
              background: '#FFFFFF',
              borderRadius: isMobile ? '16px 16px 0 0' : '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: isMobile ? '16px 20px' : '20px 24px',
              borderBottom: '1px solid #D8D3C8',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-xl)',
                fontWeight: 600, color: '#0F1E33', margin: 0,
              }}>{title}</h2>
              <button onClick={onClose} style={{
                width: 32, height: 32, borderRadius: 'var(--radius-full)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none',
                color: '#5B6472', cursor: 'pointer',
                transition: 'background 120ms',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(216,211,200,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={{
              flex: 1, overflowY: 'auto',
              padding: isMobile ? '16px 20px' : '20px 24px',
            }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
