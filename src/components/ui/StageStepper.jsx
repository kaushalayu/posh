import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const defaultStages = [
  'Complaint',
  'Acknowledgement',
  'Committee',
  'Proceedings',
  'Evidence',
  'Report',
  'Management',
  'Closure',
  'Archive',
];

const colors = {
  completed: { bg: '#5B8A80', border: '#5B8A80', text: '#5B8A80' },
  current: { bg: '#5B8A80', border: '#5B8A80', text: '#0F1E33' },
  future: { bg: 'transparent', border: '#5B6472', text: '#5B6472' },
};

export default function StageStepper({ stages, currentStage = 0 }) {
  const items = stages && stages.length
    ? stages.map((s, i) => ({
        name: typeof s === 'string' ? s : s.name,
        status: typeof s === 'string'
          ? i < currentStage
            ? 'completed'
            : i === currentStage
            ? 'current'
            : 'future'
          : s.status,
      }))
    : defaultStages.map((name, i) => ({
        name,
        status: i < currentStage ? 'completed' : i === currentStage ? 'current' : 'future',
      }));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        overflowX: 'auto',
        padding: '8px 0',
        gap: 0,
      }}
    >
      {items.map((stage, idx) => {
        const c = colors[stage.status];
        const isLast = idx === items.length - 1;

        return (
          <React.Fragment key={stage.name + idx}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 72,
                flex: '0 0 auto',
              }}
            >
              <div style={{ position: 'relative', width: 28, height: 28 }}>
                <motion.div
                  animate={
                    stage.status === 'current'
                      ? { boxShadow: ['0 0 0 0 rgba(91,138,128,0.4)', '0 0 0 8px rgba(91,138,128,0)', '0 0 0 0 rgba(91,138,128,0.4)'] }
                      : {}
                  }
                  transition={stage.status === 'current' ? { duration: 2, repeat: Infinity } : {}}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    border: `2px solid ${c.border}`,
                    background: c.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stage.status === 'completed' && <Check size={14} color="#fff" strokeWidth={2.5} />}
                  {stage.status === 'current' && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                  )}
                </motion.div>
              </div>

              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  fontWeight: stage.status === 'current' ? 700 : 500,
                  color: c.text,
                  textAlign: 'center',
                  lineHeight: 1.3,
                  maxWidth: 76,
                }}
              >
                {stage.name}
              </div>
            </div>

            {!isLast && (
              <div
                style={{
                  height: 2,
                  background: stage.status === 'completed' ? '#5B8A80' : '#D8D3C8',
                  flex: '1 1 0',
                  minWidth: 20,
                  marginTop: 13,
                  borderRadius: 1,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
