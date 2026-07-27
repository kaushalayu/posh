import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Plus, X, ChevronRight, Users, Edit2, ShieldCheck } from 'lucide-react';
import { roles as rolesData } from '../../lib/mockData';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const allPermissions = [
  'View Cases', 'Create Cases', 'Edit Cases', 'Delete Cases',
  'Manage Users', 'Manage Roles', 'View Reports', 'Manage Committees',
  'Manage Evidence', 'Approve Actions', 'View Audit Log', 'Manage Settings',
  'Send Notifications', 'Export Data', 'Manage Retention',
];

const roles = rolesData || [
  { id: 1, name: 'Employee', permissions: ['View Cases', 'Create Cases'], userCount: 342 },
  { id: 2, name: 'HR SPOC', permissions: ['View Cases', 'Create Cases', 'Edit Cases', 'View Reports'], userCount: 24 },
  { id: 3, name: 'POSH Admin', permissions: ['View Cases', 'Create Cases', 'Edit Cases', 'Manage Users', 'Manage Committees', 'View Reports'], userCount: 8 },
  { id: 4, name: 'IC Member', permissions: ['View Cases', 'View Reports', 'Manage Evidence', 'Approve Actions'], userCount: 15 },
  { id: 5, name: 'External Member', permissions: ['View Cases', 'View Reports', 'Manage Evidence'], userCount: 6 },
  { id: 6, name: 'Legal', permissions: ['View Cases', 'Edit Cases', 'View Reports', 'View Audit Log', 'Export Data'], userCount: 5 },
  { id: 7, name: 'Management', permissions: ['View Cases', 'View Reports', 'Approve Actions', 'Manage Settings'], userCount: 12 },
  { id: 8, name: 'Super Admin', permissions: allPermissions, userCount: 2 },
];

export default function RolesPage() {
  const isMobile = useIsMobile();
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedPermissions, setEditedPermissions] = useState([]);

  const openRoleModal = (role) => {
    setSelectedRole(role);
    setEditedPermissions([...role.permissions]);
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setSelectedRole(null); };

  const togglePermission = (perm) => {
    setEditedPermissions((prev) => prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]);
  };

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 20, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0,
      }}>
        <div>
          <h2 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 600, color: COLORS.deepNavy, margin: 0 }}>Roles & Permissions</h2>
          <p style={{ fontSize: 13, color: COLORS.slateGrey, margin: '4px 0 0' }}>Manage role-based access control across the platform</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 18px', backgroundColor: COLORS.sageTeal,
          color: '#FFFFFF', border: 'none', borderRadius: 8,
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
          transition: 'background-color 0.15s', letterSpacing: '0.01em',
          width: isMobile ? '100%' : 'auto', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(91,138,128,0.3)',
        }}>
          <Plus size={16} /> Add Role
        </button>
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {roles.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.25 }}
              style={{
                backgroundColor: '#FFFFFF', borderRadius: 10,
                border: `1px solid ${COLORS.hairline}`, padding: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    backgroundColor: COLORS.offWhite,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {role.name === 'Super Admin' ? <ShieldCheck size={16} color={COLORS.amber} /> :
                     role.name.includes('Admin') ? <ShieldCheck size={16} color={COLORS.sageTeal} /> :
                     <Users size={16} color={COLORS.slateGrey} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, color: COLORS.deepNavy, fontSize: 14 }}>{role.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.slateGrey }}>{role.userCount} users</div>
                  </div>
                </div>
                <button
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '6px 12px', fontSize: 12, fontWeight: 500,
                    color: COLORS.sageTeal, backgroundColor: 'rgba(91,138,128,0.08)',
                    border: `1px solid rgba(91,138,128,0.2)`, borderRadius: 6, cursor: 'pointer',
                  }}
                  onClick={() => openRoleModal(role)}
                >
                  View <ChevronRight size={14} />
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {role.permissions.slice(0, 3).map((p) => (
                  <span key={p} style={{
                    display: 'inline-block', padding: '3px 8px', fontSize: 11, fontWeight: 500,
                    backgroundColor: COLORS.offWhite, color: COLORS.navyLight,
                    borderRadius: 4, border: `1px solid ${COLORS.hairline}`, whiteSpace: 'nowrap',
                  }}>{p}</span>
                ))}
                {role.permissions.length > 3 && (
                  <span style={{
                    display: 'inline-block', padding: '3px 8px', fontSize: 11, fontWeight: 500,
                    backgroundColor: 'rgba(91,138,128,0.1)', color: COLORS.sageTeal,
                    borderRadius: 4, whiteSpace: 'nowrap',
                  }}>+{role.permissions.length - 3} more</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 12,
          border: `1px solid ${COLORS.hairline}`, overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(15,30,51,0.04)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Role Name', 'Permissions', 'Users', 'Actions'].map((h) => (
                  <th key={h} style={{
                    textAlign: h === 'Actions' ? 'center' : 'left',
                    padding: '12px 16px', fontSize: 11, fontWeight: 600,
                    color: COLORS.slateGrey, textTransform: 'uppercase', letterSpacing: '0.06em',
                    backgroundColor: '#FAFAF7', borderBottom: `1px solid ${COLORS.hairline}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role, idx) => (
                <motion.tr
                  key={role.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                  style={{ transition: 'background-color 0.12s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F0EDE8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ padding: '14px 16px', fontSize: 13, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}`, verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        backgroundColor: COLORS.offWhite,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {role.name === 'Super Admin' ? <ShieldCheck size={16} color={COLORS.amber} /> :
                         role.name.includes('Admin') ? <ShieldCheck size={16} color={COLORS.sageTeal} /> :
                         <Users size={16} color={COLORS.slateGrey} />}
                      </div>
                      <span style={{ fontWeight: 500 }}>{role.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}`, verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {role.permissions.slice(0, 3).map((p) => (
                        <span key={p} style={{
                          display: 'inline-block', padding: '3px 8px', fontSize: 11, fontWeight: 500,
                          backgroundColor: COLORS.offWhite, color: COLORS.navyLight,
                          borderRadius: 4, border: `1px solid ${COLORS.hairline}`, whiteSpace: 'nowrap',
                        }}>{p}</span>
                      ))}
                      {role.permissions.length > 3 && (
                        <span style={{
                          display: 'inline-block', padding: '3px 8px', fontSize: 11, fontWeight: 500,
                          backgroundColor: 'rgba(91,138,128,0.1)', color: COLORS.sageTeal,
                          borderRadius: 4, whiteSpace: 'nowrap',
                        }}>+{role.permissions.length - 3} more</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}`, verticalAlign: 'middle' }}>
                    <span style={{ fontWeight: 500, color: COLORS.navyLight }}>{role.userCount}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}`, verticalAlign: 'middle', textAlign: 'center' }}>
                    <button
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '6px 12px', fontSize: 12, fontWeight: 500,
                        color: COLORS.sageTeal, backgroundColor: 'rgba(91,138,128,0.08)',
                        border: `1px solid rgba(91,138,128,0.2)`, borderRadius: 6,
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                      onClick={() => openRoleModal(role)}
                    >
                      View Matrix <ChevronRight size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {modalOpen && selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(15,30,51,0.5)',
              display: 'flex', alignItems: isMobile ? 'flex-end' : 'center',
              justifyContent: 'center', zIndex: 1000,
              backdropFilter: 'blur(4px)', padding: isMobile ? 0 : 20,
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: isMobile ? '16px 16px 0 0' : 16,
                width: isMobile ? '100%' : 580,
                maxHeight: isMobile ? '85vh' : '80vh',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                boxShadow: '0 20px 60px rgba(15,30,51,0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                padding: isMobile ? '20px 16px 16px' : '24px 24px 16px',
                borderBottom: `1px solid ${COLORS.hairline}`,
              }}>
                <div>
                  <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, color: COLORS.deepNavy, margin: 0 }}>{selectedRole.name} — Permission Matrix</h3>
                  <p style={{ fontSize: 12, color: COLORS.slateGrey, margin: '4px 0 0' }}>
                    {editedPermissions.length} of {allPermissions.length} permissions active.
                  </p>
                </div>
                <button
                  style={{
                    background: 'none', border: 'none', color: COLORS.slateGrey,
                    cursor: 'pointer', padding: 4, borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  onClick={closeModal}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ padding: isMobile ? '12px 16px' : '16px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {allPermissions.map((perm) => {
                  const isEnabled = editedPermissions.includes(perm);
                  return (
                    <div
                      key={perm}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
                        transition: 'background-color 0.12s',
                        backgroundColor: isEnabled ? 'rgba(91,138,128,0.08)' : 'rgba(91,100,114,0.04)',
                        border: `1px solid ${COLORS.hairline}`,
                      }}
                      onClick={() => togglePermission(perm)}
                    >
                      <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.deepNavy }}>{perm}</span>
                      <div
                        style={{
                          width: 40, height: 22, borderRadius: 11,
                          display: 'flex', alignItems: 'center', padding: '0 3px',
                          transition: 'background-color 0.2s', flexShrink: 0,
                          backgroundColor: isEnabled ? COLORS.sageTeal : COLORS.hairline,
                          justifyContent: isEnabled ? 'flex-end' : 'flex-start',
                        }}
                      >
                        <motion.div
                          layout
                          style={{
                            width: 16, height: 16, borderRadius: 8,
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                          }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                display: 'flex', justifyContent: 'flex-end', gap: 10,
                padding: isMobile ? '12px 16px' : '16px 24px',
                borderTop: `1px solid ${COLORS.hairline}`, backgroundColor: '#FAFAF7',
              }}>
                <button style={{
                  padding: '8px 16px', fontSize: 13, fontWeight: 500,
                  color: COLORS.slateGrey, backgroundColor: '#FFFFFF',
                  border: `1px solid ${COLORS.hairline}`, borderRadius: 8, cursor: 'pointer',
                }} onClick={closeModal}>Cancel</button>
                <button style={{
                  padding: '8px 18px', fontSize: 13, fontWeight: 500,
                  color: '#FFFFFF', backgroundColor: COLORS.sageTeal,
                  border: 'none', borderRadius: 8, cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(91,138,128,0.3)',
                }}>Save Changes</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
