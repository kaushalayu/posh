import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import StageStepper from '../../components/ui/StageStepper';
import TimelineTab from './TimelineTab';
import PartiesTab from './PartiesTab';
import { cases, stages } from '../../lib/mockData';
import { Clock, Users, FileText, Mail, Shield, Zap, Calendar, History } from 'lucide-react';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const TABS = [
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'parties', label: 'Parties', icon: Users },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'communications', label: 'Communications', icon: Mail },
  { id: 'evidence', label: 'Evidence', icon: Shield },
  { id: 'actions', label: 'Actions', icon: Zap },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'history', label: 'Status History', icon: History },
];

const mockCase = {
  id: 'POSH-2026-0042',
  title: 'Complaint of Sexual Harassment Against Senior Manager - Investigation Pending',
  stage: 'Investigation',
  stageIndex: 2,
  daysInStage: 12,
  priority: 'High',
  status: 'Open',
};

const PlaceholderTab = ({ label }) => (
  <div style={{ padding: 32, color: COLORS.slateGrey, textAlign: 'center', fontSize: 14 }}>
    {label} coming soon.
  </div>
);

const tabContentMap = {
  timeline: <TimelineTab />,
  parties: <PartiesTab />,
  documents: <PlaceholderTab label="Documents workspace" />,
  communications: <PlaceholderTab label="Communications log" />,
  evidence: <PlaceholderTab label="Evidence tracker" />,
  actions: <PlaceholderTab label="Action tracker" />,
  schedule: <PlaceholderTab label="Schedule view" />,
  history: <PlaceholderTab label="Status history" />,
};

export default function CaseWorkspacePage() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <div style={{ minHeight: '100vh', background: COLORS.offWhite, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: COLORS.deepNavy,
        borderBottom: `1px solid ${COLORS.navyLight}`,
        padding: isMobile ? '14px 16px 0' : '20px 32px 0',
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: isMobile ? 11 : 13,
          fontWeight: 600,
          color: COLORS.sageTeal,
          letterSpacing: '0.05em',
        }}>
          {mockCase.id}
        </div>
        <div style={{
          fontSize: isMobile ? 14 : 18,
          fontWeight: 600,
          color: '#FFFFFF',
          marginTop: 4,
          lineHeight: 1.3,
          maxWidth: 720,
        }}>
          {isMobile ? mockCase.title.slice(0, 60) + '...' : mockCase.title}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 6 : 12,
          marginTop: 8,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            background: `${COLORS.sageTeal}22`,
            color: COLORS.sageTeal,
            border: `1px solid ${COLORS.sageTeal}44`,
          }}>
            {mockCase.stage}
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 10px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 500,
            background: `${COLORS.amber}22`,
            color: COLORS.amber,
            border: `1px solid ${COLORS.amber}44`,
          }}>
            <Clock size={12} />
            {mockCase.daysInStage}d in stage
          </span>
          <span style={{
            padding: '4px 10px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            background: '#EF444422',
            color: '#EF4444',
            border: '1px solid #EF444444',
          }}>
            {mockCase.priority}
          </span>
        </div>
      </div>

      <div style={{ background: COLORS.deepNavy, padding: isMobile ? '0 16px' : '0 32px' }}>
        <StageStepper stages={stages} />
      </div>

      <div style={{
        display: 'flex',
        gap: 0,
        background: '#FFFFFF',
        borderBottom: `1px solid ${COLORS.hairline}`,
        padding: isMobile ? '0 12px' : '0 32px',
        overflowX: 'auto',
        position: 'sticky',
        top: isMobile ? 100 : 130,
        zIndex: 30,
        WebkitOverflowScrolling: 'touch',
      }}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: isMobile ? '12px 10px' : '14px 18px',
                fontSize: isMobile ? 11 : 13,
                fontWeight: 500,
                color: isActive ? COLORS.sageTeal : COLORS.slateGrey,
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${isActive ? COLORS.sageTeal : 'transparent'}`,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s, border-color 0.2s',
                fontFamily: 'inherit',
                position: 'relative',
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = COLORS.deepNavy; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = COLORS.slateGrey; }}
            >
              <Icon size={isMobile ? 14 : 16} />
              {isMobile ? tab.label.slice(0, 6) : tab.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: isMobile ? 16 : 24, maxWidth: 1200, margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {tabContentMap[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
