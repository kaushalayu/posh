import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  AlertTriangle,
  Edit2,
  X,
  Save,
  Clock,
  Archive,
  Trash2,
  RotateCcw,
} from 'lucide-react';

const colors = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const defaultRules = [
  {
    id: 1,
    entityType: 'Complaints',
    retainFor: 7,
    actionOnExpiry: 'Archive',
    lastUpdated: '2025-11-15',
  },
  {
    id: 2,
    entityType: 'Documents',
    retainFor: 5,
    actionOnExpiry: 'Delete',
    lastUpdated: '2025-10-20',
  },
  {
    id: 3,
    entityType: 'Evidence',
    retainFor: 7,
    actionOnExpiry: 'Archive',
    lastUpdated: '2025-11-15',
  },
  {
    id: 4,
    entityType: 'Communications',
    retainFor: 3,
    actionOnExpiry: 'Delete',
    lastUpdated: '2025-09-01',
  },
  {
    id: 5,
    entityType: 'Audit Logs',
    retainFor: 10,
    actionOnExpiry: 'Archive',
    lastUpdated: '2025-12-01',
  },
];

const expiryActions = ['Delete', 'Archive', 'Anonymize'];

export default function RetentionPage() {
  const [rules, setRules] = useState(defaultRules);
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editForm, setEditForm] = useState({
    entityType: '',
    retainFor: 5,
    actionOnExpiry: 'Archive',
  });

  const startEdit = (rule) => {
    setEditingId(rule.id);
    setEditForm({
      entityType: rule.entityType,
      retainFor: rule.retainFor,
      actionOnExpiry: rule.actionOnExpiry,
    });
    setShowAdd(false);
  };

  const startAdd = () => {
    setShowAdd(true);
    setEditingId(null);
    setEditForm({ entityType: '', retainFor: 5, actionOnExpiry: 'Archive' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAdd(false);
  };

  const saveEdit = () => {
    if (editingId) {
      setRules((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                retainFor: editForm.retainFor,
                actionOnExpiry: editForm.actionOnExpiry,
                lastUpdated: new Date().toISOString().split('T')[0],
              }
            : r
        )
      );
    } else if (editForm.entityType.trim()) {
      setRules((prev) => [
        ...prev,
        {
          id: Date.now(),
          entityType: editForm.entityType.trim(),
          retainFor: editForm.retainFor,
          actionOnExpiry: editForm.actionOnExpiry,
          lastUpdated: new Date().toISOString().split('T')[0],
        },
      ]);
    }
    cancelEdit();
  };

  const actionIcon = (action) => {
    switch (action) {
      case 'Delete':
        return <Trash2 size={13} />;
      case 'Archive':
        return <Archive size={13} />;
      case 'Anonymize':
        return <RotateCcw size={13} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div>
          <h2 style={styles.pageTitle}>Retention Rules</h2>
          <p style={styles.pageDesc}>Configure data lifecycle and compliance retention policies</p>
        </div>
        <button style={styles.addBtn} onClick={startAdd}>
          <Plus size={16} />
          Add Rule
        </button>
      </div>

      <div style={styles.warningBanner}>
        <AlertTriangle size={16} color={colors.amber} style={{ flexShrink: 0 }} />
        <div>
          <strong style={{ color: colors.deepNavy }}>Compliance Notice</strong>
          <p style={styles.warningText}>
            Under the POSH Act 2013, organizations are required to retain complaint records
            and related documents for a minimum period. Modifying retention rules below the
            statutory minimum may result in non-compliance. Consult your legal team before
            making changes.
          </p>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Entity Type</th>
              <th style={styles.th}>Retain For</th>
              <th style={styles.th}>Action on Expiry</th>
              <th style={styles.th}>Last Updated</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, idx) => {
              const isEditing = editingId === rule.id;
              return (
                <motion.tr
                  key={rule.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.2 }}
                  style={styles.tr}
                  onMouseEnter={(e) => {
                    if (!isEditing) e.currentTarget.style.backgroundColor = '#F0EDE8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={styles.td}>
                    {isEditing ? (
                      <input
                        value={editForm.entityType}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, entityType: e.target.value }))
                        }
                        style={styles.inlineInput}
                        disabled={!!editingId}
                      />
                    ) : (
                      <span style={styles.entityName}>{rule.entityType}</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {isEditing ? (
                      <div style={styles.yearsInput}>
                        <input
                          type="number"
                          min={1}
                          max={30}
                          value={editForm.retainFor}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              retainFor: parseInt(e.target.value) || 1,
                            }))
                          }
                          style={styles.numberInput}
                        />
                        <span style={styles.yearsLabel}>years</span>
                      </div>
                    ) : (
                      <div style={styles.yearsDisplay}>
                        <Clock size={13} color={colors.sageTeal} />
                        <span>{rule.retainFor} years</span>
                      </div>
                    )}
                  </td>
                  <td style={styles.td}>
                    {isEditing ? (
                      <select
                        value={editForm.actionOnExpiry}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            actionOnExpiry: e.target.value,
                          }))
                        }
                        style={styles.select}
                      >
                        {expiryActions.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    ) : (
                      <span
                        style={{
                          ...styles.expiryBadge,
                          backgroundColor:
                            rule.actionOnExpiry === 'Delete'
                              ? 'rgba(91,100,114,0.1)'
                              : rule.actionOnExpiry === 'Archive'
                              ? 'rgba(91,138,128,0.1)'
                              : 'rgba(192,139,44,0.1)',
                          color:
                            rule.actionOnExpiry === 'Delete'
                              ? colors.slateGrey
                              : rule.actionOnExpiry === 'Archive'
                              ? colors.sageTeal
                              : colors.amber,
                        }}
                      >
                        {actionIcon(rule.actionOnExpiry)}
                        {rule.actionOnExpiry}
                      </span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.dateText}>{rule.lastUpdated}</span>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    {isEditing ? (
                      <div style={styles.editActions}>
                        <button style={styles.saveBtnSmall} onClick={saveEdit}>
                          <Save size={13} />
                        </button>
                        <button style={styles.cancelBtnSmall} onClick={cancelEdit}>
                          <X size={13} />
                        </button>
                      </div>
                    ) : (
                      <button style={styles.editBtn} onClick={() => startEdit(rule)}>
                        <Edit2 size={13} />
                        Edit
                      </button>
                    )}
                  </td>
                </motion.tr>
              );
            })}

            <AnimatePresence>
              {showAdd && (
                <motion.tr
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={styles.tr}
                >
                  <td style={styles.td}>
                    <input
                      value={editForm.entityType}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, entityType: e.target.value }))
                      }
                      style={styles.inlineInput}
                      placeholder="Entity type name"
                      autoFocus
                    />
                  </td>
                  <td style={styles.td}>
                    <div style={styles.yearsInput}>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={editForm.retainFor}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            retainFor: parseInt(e.target.value) || 1,
                          }))
                        }
                        style={styles.numberInput}
                      />
                      <span style={styles.yearsLabel}>years</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <select
                      value={editForm.actionOnExpiry}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          actionOnExpiry: e.target.value,
                        }))
                      }
                      style={styles.select}
                    >
                      {expiryActions.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.dateText}>—</span>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    <div style={styles.editActions}>
                      <button style={styles.saveBtnSmall} onClick={saveEdit}>
                        <Save size={13} />
                      </button>
                      <button style={styles.cancelBtnSmall} onClick={cancelEdit}>
                        <X size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {},
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.deepNavy,
    margin: 0,
  },
  pageDesc: {
    fontSize: 13,
    color: colors.slateGrey,
    margin: '4px 0 0',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 18px',
    backgroundColor: colors.sageTeal,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
  },
  warningBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '14px 18px',
    backgroundColor: 'rgba(192,139,44,0.06)',
    border: `1px solid rgba(192,139,44,0.2)`,
    borderRadius: 10,
    marginBottom: 20,
  },
  warningText: {
    fontSize: 12,
    color: colors.navyLight,
    margin: '4px 0 0',
    lineHeight: 1.6,
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    border: `1px solid ${colors.hairline}`,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(15,30,51,0.04)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: 11,
    fontWeight: 600,
    color: colors.slateGrey,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    backgroundColor: '#FAFAF7',
    borderBottom: `1px solid ${colors.hairline}`,
  },
  tr: {
    transition: 'background-color 0.12s ease',
  },
  td: {
    padding: '14px 16px',
    fontSize: 13,
    color: colors.deepNavy,
    borderBottom: `1px solid ${colors.hairline}`,
    verticalAlign: 'middle',
  },
  entityName: {
    fontWeight: 500,
  },
  yearsDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    fontWeight: 500,
    color: colors.deepNavy,
  },
  yearsInput: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  yearsLabel: {
    fontSize: 12,
    color: colors.slateGrey,
  },
  expiryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '4px 10px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 500,
  },
  dateText: {
    fontSize: 12,
    color: colors.slateGrey,
  },
  editBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: 500,
    color: colors.sageTeal,
    backgroundColor: 'rgba(91,138,128,0.08)',
    border: `1px solid rgba(91,138,128,0.2)`,
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  editActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 6,
  },
  saveBtnSmall: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 6,
    border: 'none',
    backgroundColor: colors.sageTeal,
    color: '#FFFFFF',
    cursor: 'pointer',
  },
  cancelBtnSmall: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 6,
    border: `1px solid ${colors.hairline}`,
    backgroundColor: '#FFFFFF',
    color: colors.slateGrey,
    cursor: 'pointer',
  },
  inlineInput: {
    fontSize: 13,
    padding: '6px 10px',
    borderRadius: 6,
    border: `1px solid ${colors.sageTeal}`,
    color: colors.deepNavy,
    backgroundColor: '#FFFFFF',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  numberInput: {
    fontSize: 13,
    padding: '6px 10px',
    borderRadius: 6,
    border: `1px solid ${colors.sageTeal}`,
    color: colors.deepNavy,
    backgroundColor: '#FFFFFF',
    outline: 'none',
    width: 60,
  },
  select: {
    fontSize: 12,
    padding: '6px 10px',
    borderRadius: 6,
    border: `1px solid ${colors.sageTeal}`,
    color: colors.deepNavy,
    backgroundColor: '#FFFFFF',
    outline: 'none',
    cursor: 'pointer',
  },
};
