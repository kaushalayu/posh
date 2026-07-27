import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { workflowStages } from '../../lib/mockData';
import { Save, ArrowRight, Bell, Clock, Users, AlertCircle, ChevronRight } from 'lucide-react';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const roles = ['Employee', 'HR SPOC', 'POSH Admin', 'IC Member', 'External Member', 'Legal', 'Management', 'Super Admin'];

const notificationTemplates = [
  'complaint_received', 'acknowledgement_sent', 'committee_formed', 'proceedings_started',
  'evidence_requested', 'report_submitted', 'management_review', 'case_closed', 'case_archived',
];

const defaultStages = workflowStages.map((s, i) => ({
  id: i + 1,
  name: s.name,
  transitions: s.allowedTransitions,
  requiredRole: s.requiredRole,
  slaDays: s.slaDays,
  notificationTemplate: s.notificationTemplate,
}));

export default function WorkflowConfigPage() {
  const isMobile = useIsMobile();
  const [stages, setStages] = useState(defaultStages);
  const [editingId, setEditingId] = useState(null);

  const updateStage = (id, field, value) => {
    setStages((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const toggleTransition = (stageId, targetName) => {
    setStages((prev) =>
      prev.map((s) => {
        if (s.id !== stageId) return s;
        const has = s.transitions.includes(targetName);
        return { ...s, transitions: has ? s.transitions.filter((t) => t !== targetName) : [...s.transitions, targetName] };
      })
    );
  };

  const stageCardWidth = isMobile ? '100%' : 200;

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 24, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0,
      }}>
        <div>
          <h2 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 600, color: COLORS.deepNavy, margin: 0 }}>Workflow Configuration</h2>
          <p style={{ fontSize: 13, color: COLORS.slateGrey, margin: '4px 0 0' }}>
            Configure case lifecycle stages, transitions, SLAs, and notifications
          </p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 18px', backgroundColor: COLORS.sageTeal,
          color: '#FFFFFF', border: 'none', borderRadius: 8,
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
          width: isMobile ? '100%' : 'auto', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(91,138,128,0.3)',
        }}>
          <Save size={15} /> Save Changes
        </button>
      </div>

      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 0,
        overflowX: 'auto', paddingBottom: 16,
        flexDirection: isMobile ? 'column' : 'row',
        WebkitOverflowScrolling: 'touch',
      }}>
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(15,30,51,0.1)' }}
              style={{
                width: stageCardWidth,
                minWidth: isMobile ? '100%' : 200,
                backgroundColor: '#FFFFFF', borderRadius: 12,
                border: `1px solid ${COLORS.hairline}`,
                overflow: 'hidden', transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.sageTeal; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.hairline; }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 14px 10px', borderBottom: `1px solid ${COLORS.hairline}`,
                backgroundColor: '#FAFAF7',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 6,
                  backgroundColor: COLORS.sageTeal, color: '#FFFFFF',
                  fontSize: 11, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{idx + 1}</div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: COLORS.deepNavy, margin: 0 }}>{stage.name}</h4>
              </div>

              {editingId === stage.id ? (
                <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 600, color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <Users size={12} /> Allowed Transitions
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {stages.filter((s) => s.name !== stage.name).map((s) => {
                        const active = stage.transitions.includes(s.name);
                        return (
                          <button
                            key={s.name}
                            onClick={() => toggleTransition(stage.id, s.name)}
                            style={{
                              fontSize: 10, padding: '3px 6px', borderRadius: 4,
                              border: `1px solid ${active ? COLORS.sageTeal : COLORS.hairline}`,
                              cursor: 'pointer', fontWeight: 500,
                              backgroundColor: active ? 'rgba(91,138,128,0.15)' : COLORS.offWhite,
                              color: active ? COLORS.sageTeal : COLORS.slateGrey,
                            }}
                          >{s.name}</button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexDirection: isMobile ? 'column' : 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                      <label style={{ fontSize: 10, fontWeight: 600, color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Required Role</label>
                      <select
                        value={stage.requiredRole}
                        onChange={(e) => updateStage(stage.id, 'requiredRole', e.target.value)}
                        style={{ fontSize: 11, padding: '5px 8px', borderRadius: 6, border: `1px solid ${COLORS.hairline}`, color: COLORS.deepNavy, backgroundColor: '#FFFFFF', outline: 'none' }}
                      >
                        {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 70 }}>
                      <label style={{ fontSize: 10, fontWeight: 600, color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.05em' }}><Clock size={12} /> SLA (Days)</label>
                      <input
                        type="number" min={0} value={stage.slaDays}
                        onChange={(e) => updateStage(stage.id, 'slaDays', parseInt(e.target.value) || 0)}
                        style={{ fontSize: 11, padding: '5px 8px', borderRadius: 6, border: `1px solid ${COLORS.hairline}`, color: COLORS.deepNavy, backgroundColor: '#FFFFFF', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 600, color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.05em' }}><Bell size={12} /> Notification Template</label>
                    <select
                      value={stage.notificationTemplate}
                      onChange={(e) => updateStage(stage.id, 'notificationTemplate', e.target.value)}
                      style={{ fontSize: 11, padding: '5px 8px', borderRadius: 6, border: `1px solid ${COLORS.hairline}`, color: COLORS.deepNavy, backgroundColor: '#FFFFFF', outline: 'none' }}
                    >
                      {notificationTemplates.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <button
                    style={{ padding: '5px 10px', fontSize: 11, fontWeight: 500, color: '#FFFFFF', backgroundColor: COLORS.sageTeal, border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => setEditingId(null)}
                  >Done</button>
                </div>
              ) : (
                <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Transitions</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {stage.transitions.length > 0 ? (
                        stage.transitions.map((t) => (
                          <span key={t} style={{ fontSize: 10, padding: '2px 6px', backgroundColor: COLORS.offWhite, color: COLORS.navyLight, borderRadius: 4, border: `1px solid ${COLORS.hairline}`, fontWeight: 500 }}>{t}</span>
                        ))
                      ) : (
                        <span style={{ fontSize: 10, padding: '2px 6px', backgroundColor: 'rgba(91,100,114,0.1)', color: COLORS.slateGrey, borderRadius: 4, fontWeight: 500, fontStyle: 'italic' }}>Terminal</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Required Role</span>
                    <span style={{ fontSize: 12, color: COLORS.deepNavy, fontWeight: 500 }}>{stage.requiredRole}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SLA</span>
                    <span style={{ fontSize: 12, color: COLORS.deepNavy, fontWeight: 500 }}>{stage.slaDays > 0 ? `${stage.slaDays} days` : 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notification</span>
                    <span style={{ fontSize: 12, color: COLORS.deepNavy, fontWeight: 500 }}>{stage.notificationTemplate}</span>
                  </div>
                  <button
                    style={{ marginTop: 4, padding: '6px 10px', fontSize: 11, fontWeight: 500, color: COLORS.sageTeal, backgroundColor: 'rgba(91,138,128,0.08)', border: `1px solid rgba(91,138,128,0.2)`, borderRadius: 6, cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => setEditingId(stage.id)}
                  >Edit Stage</button>
                </div>
              )}
            </motion.div>

            {idx < stages.length - 1 && (
              <div style={{
                display: 'flex', alignItems: 'center',
                padding: isMobile ? '8px 0' : '0 4px',
                flexShrink: 0,
                marginTop: isMobile ? 0 : 30,
                transform: isMobile ? 'rotate(90deg)' : 'none',
              }}>
                <div style={{ width: 20, height: 1, backgroundColor: COLORS.sageTeal, opacity: 0.4 }} />
                <ChevronRight size={16} color={COLORS.sageTeal} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 18px', backgroundColor: 'rgba(192,139,44,0.08)',
        border: `1px solid rgba(192,139,44,0.25)`, borderRadius: 10,
        fontSize: 12, color: COLORS.navyLight, marginTop: 24, lineHeight: 1.5,
      }}>
        <AlertCircle size={16} color={COLORS.amber} />
        <span>Changes to workflow stages will affect all new cases. Existing cases will continue with their current configuration.</span>
      </div>
    </div>
  );
}
