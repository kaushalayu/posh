import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import RolesPage from './RolesPage';
import WorkflowConfigPage from './WorkflowConfigPage';
import AuditLogPage from './AuditLogPage';
import RetentionPage from './RetentionPage';
import { Shield, GitBranch, Clock, ScrollText } from 'lucide-react';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const tabs = [
  { id: 'roles', label: 'Roles & Permissions', icon: Shield },
  { id: 'workflow', label: 'Workflow Config', icon: GitBranch },
  { id: 'retention', label: 'Retention Rules', icon: Clock },
  { id: 'audit', label: 'Audit Log', icon: ScrollText },
];

const tabContent = {
  roles: RolesPage,
  workflow: WorkflowConfigPage,
  retention: RetentionPage,
  audit: AuditLogPage,
};

export default function AdminSettingsPage() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('roles');
  const ActiveContent = tabContent[activeTab];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.offWhite, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <div style={{ padding: isMobile ? '20px 16px' : '32px 40px 0' }}>
        <div style={{
          position: 'relative',
          background: `linear-gradient(135deg, ${COLORS.deepNavy} 0%, ${COLORS.navyLight} 100%)`,
          borderRadius: 16,
          padding: isMobile ? '28px 20px' : '36px 40px',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(${COLORS.hairline}11 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            opacity: 0.4,
          }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 12 : 20 }}>
            <div style={{
              width: isMobile ? 44 : 52, height: isMobile ? 44 : 52,
              borderRadius: 12,
              backgroundColor: `${COLORS.sageTeal}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Shield size={isMobile ? 22 : 26} color={COLORS.sageTeal} />
            </div>
            <div>
              <h1 style={{
                margin: 0, fontSize: isMobile ? 22 : 28, fontWeight: 700,
                color: '#FFFFFF', letterSpacing: '-0.02em',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}>
                Admin Settings
              </h1>
              <p style={{
                margin: '6px 0 0', fontSize: isMobile ? 13 : 14,
                color: '#8899AA', lineHeight: 1.5,
              }}>
                Configure system-wide settings, permissions, and compliance rules
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: isMobile ? '16px 16px 0' : '0 40px',
      }}>
        <div style={{
          display: 'flex',
          gap: isMobile ? 8 : 0,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          paddingBottom: 4,
          ...(isMobile ? {} : { backgroundColor: '#FFFFFF', borderRadius: '12px 12px 0 0' }),
          ...(isMobile ? {} : { borderBottom: `1px solid ${COLORS.hairline}` }),
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: isMobile ? '10px 16px' : '16px 24px',
                  fontSize: isMobile ? 12 : 13.5,
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: 'inherit',
                  color: isActive ? COLORS.sageTeal : COLORS.slateGrey,
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  letterSpacing: '0.01em',
                  transition: 'color 0.2s ease, background-color 0.2s ease',
                  ...(isMobile ? {
                    backgroundColor: isActive ? `${COLORS.sageTeal}12` : '#FFFFFF',
                    borderRadius: 100,
                    flexShrink: 0,
                    boxShadow: isActive ? `0 0 0 1.5px ${COLORS.sageTeal}44` : '0 1px 3px rgba(0,0,0,0.06)',
                  } : {
                    backgroundColor: isActive ? `${COLORS.offWhite}CC` : 'transparent',
                    borderBottom: 'none',
                  }),
                }}
              >
                <Icon size={isMobile ? 14 : 16} strokeWidth={isActive ? 2.2 : 1.8} />
                {isMobile ? tab.label.split(' ')[0] : tab.label}
                {!isMobile && isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    style={{
                      position: 'absolute', bottom: -1, left: 0, right: 0,
                      height: 3,
                      backgroundColor: COLORS.sageTeal,
                      borderRadius: '3px 3px 0 0',
                      boxShadow: `0 -2px 10px ${COLORS.sageTeal}55, 0 -1px 4px ${COLORS.sageTeal}33`,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {isMobile && isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    style={{
                      position: 'absolute', inset: 0,
                      borderRadius: 100,
                      border: `1.5px solid ${COLORS.sageTeal}55`,
                      boxShadow: `0 0 8px ${COLORS.sageTeal}22`,
                      pointerEvents: 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: isMobile ? '16px' : '0 40px 40px' }}>
        <div style={{
          ...(!isMobile ? {
            backgroundColor: '#FFFFFF',
            borderTop: `1px solid ${COLORS.hairline}`,
            borderRadius: '0 0 12px 12px',
            padding: '28px 32px',
            boxShadow: '0 1px 4px rgba(15,30,51,0.03)',
          } : {
            padding: 0,
          }),
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{ minHeight: 400 }}
            >
              <ActiveContent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
