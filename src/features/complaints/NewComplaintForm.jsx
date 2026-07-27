import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Check, ChevronLeft, ChevronRight, Upload, X, FileText, AlertTriangle, Send, Save } from 'lucide-react';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const STEPS = [
  { id: 1, label: 'Nature of Complaint' },
  { id: 2, label: 'Parties Involved' },
  { id: 3, label: 'Document Upload' },
  { id: 4, label: 'Review & Submit' },
];

const CATEGORIES = [
  'Sexual Harassment',
  'Discrimination',
  'Bullying',
  'Retaliation',
  'Hostile Work Environment',
  'Other',
];

const RELATIONSHIPS = [
  'Direct Report',
  'Manager',
  'Peer',
  'Cross-Department',
  'Senior Leadership',
  'External Vendor',
  'Other',
];

const initialFormData = {
  category: '',
  description: '',
  incidentDate: '',
  location: '',
  complainantName: '',
  complainantEmail: '',
  respondentName: '',
  respondentEmail: '',
  respondentDesignation: '',
  respondentDepartment: '',
  relationship: '',
  files: [],
};

export default function NewComplaintForm() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialFormData);
  const [showToast, setShowToast] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleFileDrop = useCallback(
    (e) => {
      e.preventDefault();
      const fileId = Date.now();
      setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));
      updateField('files', [...form.files, { name: 'evidence_document.pdf', size: '2.4 MB', id: fileId }]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30 + 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress((prev) => {
              const next = { ...prev };
              delete next[fileId];
              return next;
            });
          }, 500);
        }
        setUploadProgress((prev) => ({ ...prev, [fileId]: Math.min(progress, 100) }));
      }, 400);
    },
    [form.files, updateField]
  );

  const removeFile = useCallback(
    (id) => {
      updateField(
        'files',
        form.files.filter((f) => f.id !== id)
      );
    },
    [form.files, updateField]
  );

  const handleSubmit = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const fieldInput = {
    width: '100%',
    padding: isMobile ? '11px 14px' : '10px 14px',
    borderRadius: 8,
    border: `1px solid ${COLORS.hairline}`,
    background: '#FFFFFF',
    fontSize: 13,
    color: COLORS.deepNavy,
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.deepNavy,
    marginBottom: 6,
  };

  const sectionLabel = {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: COLORS.slateGrey,
    marginBottom: 6,
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.offWhite, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{
        background: COLORS.deepNavy,
        padding: isMobile ? '18px 16px' : '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: '#FFFFFF' }}>
          New Complaint
        </div>
        <div style={{ fontSize: 12, color: COLORS.slateGrey }}>
          Step {step} of {STEPS.length}
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px 16px 16px' : '28px 32px 20px',
        background: '#FFFFFF',
        borderBottom: `1px solid ${COLORS.hairline}`,
        gap: isMobile ? 4 : 0,
        overflowX: 'auto',
      }}>
        {STEPS.map((s, i) => {
          const isCompleted = step > s.id;
          const isCurrent = step === s.id;
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                  animate={isCurrent ? { boxShadow: ['0 0 0 0 rgba(91,138,128,0.4)', '0 0 0 8px rgba(91,138,128,0)', '0 0 0 0 rgba(91,138,128,0.4)'] } : {}}
                  transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
                  style={{
                    width: isMobile ? 30 : 36,
                    height: isMobile ? 30 : 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? 12 : 14,
                    fontWeight: 600,
                    background: isCompleted || isCurrent ? COLORS.sageTeal : `${COLORS.hairline}88`,
                    color: isCompleted || isCurrent ? '#FFFFFF' : COLORS.slateGrey,
                    border: isCurrent ? `2px solid ${COLORS.sageTeal}` : '2px solid transparent',
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? <Check size={isMobile ? 14 : 16} /> : s.id}
                </motion.div>
                <div style={{
                  fontSize: isMobile ? 9 : 11,
                  fontWeight: isCurrent ? 600 : 500,
                  textAlign: 'center',
                  marginTop: 6,
                  maxWidth: isMobile ? 60 : 80,
                  color: isCurrent || isCompleted ? COLORS.deepNavy : COLORS.slateGrey,
                  lineHeight: 1.3,
                }}>
                  {isMobile ? s.label.split(' ').slice(0, 2).join(' ') : s.label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  height: 2,
                  width: isMobile ? 24 : 60,
                  background: isCompleted ? COLORS.sageTeal : COLORS.hairline,
                  flexShrink: 0,
                  margin: '0 2px',
                  marginTop: isMobile ? -14 : -16,
                }} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: isMobile ? '24px 16px 120px' : '32px 24px 120px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {step === 1 && (
              <div>
                <div style={sectionLabel}>Complaint Details</div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    style={{ ...fieldInput, cursor: 'pointer' }}
                  >
                    <option value="">Select category...</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Description of Complaint *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    style={{ ...fieldInput, resize: 'vertical', minHeight: 120, lineHeight: 1.6 }}
                    placeholder="Provide a detailed description..."
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Date of Incident</label>
                    <input
                      type="date"
                      value={form.incidentDate}
                      onChange={(e) => updateField('incidentDate', e.target.value)}
                      style={fieldInput}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Location</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      style={fieldInput}
                      placeholder="Office, Floor, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={sectionLabel}>Complainant Information</div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Name (Optional at draft)</label>
                  <input type="text" value={form.complainantName} onChange={(e) => updateField('complainantName', e.target.value)} style={fieldInput} placeholder="Full name" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Email</label>
                    <input type="email" value={form.complainantEmail} onChange={(e) => updateField('complainantEmail', e.target.value)} style={fieldInput} placeholder="email@company.com" />
                  </div>
                </div>

                <div style={{ ...sectionLabel, marginTop: 28 }}>Respondent Information</div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Name *</label>
                  <input type="text" value={form.respondentName} onChange={(e) => updateField('respondentName', e.target.value)} style={fieldInput} placeholder="Full name" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Designation</label>
                    <input type="text" value={form.respondentDesignation} onChange={(e) => updateField('respondentDesignation', e.target.value)} style={fieldInput} placeholder="Job title" />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Department</label>
                    <input type="text" value={form.respondentDepartment} onChange={(e) => updateField('respondentDepartment', e.target.value)} style={fieldInput} placeholder="Department name" />
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Relationship to Complainant</label>
                  <select
                    value={form.relationship}
                    onChange={(e) => updateField('relationship', e.target.value)}
                    style={{ ...fieldInput, cursor: 'pointer' }}
                  >
                    <option value="">Select relationship...</option>
                    {RELATIONSHIPS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div style={sectionLabel}>Upload Supporting Documents</div>
                <div
                  style={{
                    border: `2px dashed ${COLORS.hairline}`,
                    borderRadius: 10,
                    padding: isMobile ? '24px 16px' : '32px 24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onClick={handleFileDrop}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.sageTeal; e.currentTarget.style.background = `${COLORS.sageTeal}08`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.hairline; e.currentTarget.style.background = '#FFFFFF'; }}
                >
                  <Upload size={28} style={{ color: COLORS.sageTeal, marginBottom: 8 }} />
                  <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600, color: COLORS.deepNavy, marginBottom: 4 }}>
                    Click to upload or drag and drop
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.slateGrey }}>PDF, DOC, JPG, PNG up to 10MB each</div>
                </div>

                <div style={{ marginTop: 20 }}>
                  {form.files.map((file) => (
                    <div key={file.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: COLORS.offWhite,
                      border: `1px solid ${COLORS.hairline}`,
                      marginBottom: 8,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                        <FileText size={16} style={{ color: COLORS.sageTeal, flexShrink: 0 }} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.deepNavy, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                          <div style={{ fontSize: 11, color: COLORS.slateGrey }}>{file.size}</div>
                        </div>
                      </div>
                      {uploadProgress[file.id] !== undefined && (
                        <div style={{ flex: 1, maxWidth: 120, marginLeft: 16 }}>
                          <div style={{ width: '100%', height: 4, borderRadius: 2, background: COLORS.hairline, overflow: 'hidden' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${uploadProgress[file.id]}%` }}
                              transition={{ duration: 0.3 }}
                              style={{ height: '100%', background: COLORS.sageTeal, borderRadius: 2 }}
                            />
                          </div>
                        </div>
                      )}
                      <button onClick={(e) => { e.stopPropagation(); removeFile(file.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginLeft: 8 }}>
                        <X size={14} style={{ color: COLORS.slateGrey }} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  marginTop: 20,
                  padding: '12px 14px',
                  borderRadius: 8,
                  background: `${COLORS.amber}10`,
                  border: `1px solid ${COLORS.amber}33`,
                }}>
                  <AlertTriangle size={16} style={{ color: COLORS.amber, flexShrink: 0, marginTop: 1 }} />
                  <div style={{ fontSize: 12, color: COLORS.slateGrey, lineHeight: 1.5 }}>
                    All uploaded documents are treated as strictly confidential and stored with encrypted chain-of-custody tracking.
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <div style={sectionLabel}>Review Your Submission</div>
                {[
                  { label: 'Category', value: form.category },
                  { label: 'Description', value: form.description },
                  { label: 'Incident Date & Location', value: `${form.incidentDate || '—'} ${form.location ? `at ${form.location}` : ''}` },
                  { label: 'Respondent', value: `${form.respondentName || '—'}${form.respondentDesignation ? `, ${form.respondentDesignation}` : ''}${form.respondentDepartment ? ` — ${form.respondentDepartment}` : ''}` },
                  { label: 'Relationship', value: form.relationship },
                  { label: 'Uploaded Documents', value: form.files.length > 0 ? `${form.files.length} file(s) attached` : 'No documents uploaded' },
                ].map((item) => (
                  <div key={item.label} style={{
                    background: '#FFFFFF',
                    borderRadius: 10,
                    border: `1px solid ${COLORS.hairline}`,
                    padding: 20,
                    marginBottom: 12,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: COLORS.slateGrey, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: COLORS.deepNavy, lineHeight: 1.5 }}>{item.value || '—'}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#FFFFFF',
        borderTop: `1px solid ${COLORS.hairline}`,
        padding: isMobile ? '12px 16px' : '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
      }}>
        <button
          style={{
            padding: isMobile ? '9px 14px' : '10px 22px',
            borderRadius: 8,
            fontSize: isMobile ? 12 : 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            background: 'none',
            color: COLORS.amber,
            border: `1px solid ${COLORS.amber}`,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.amber}10`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
        >
          <Save size={15} />
          {isMobile ? 'Draft' : 'Save as Draft'}
        </button>
        <div style={{ display: 'flex', gap: 10 }}>
          {step > 1 && (
            <button
              onClick={prevStep}
              style={{
                padding: isMobile ? '9px 14px' : '10px 22px',
                borderRadius: 8,
                fontSize: isMobile ? 12 : 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: 'none',
                color: COLORS.slateGrey,
                border: `1px solid ${COLORS.hairline}`,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.hairline}44`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
            >
              <ChevronLeft size={15} />
              {isMobile ? 'Back' : 'Previous'}
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={nextStep}
              style={{
                padding: isMobile ? '9px 14px' : '10px 22px',
                borderRadius: 8,
                fontSize: isMobile ? 12 : 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: COLORS.sageTeal,
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#4D7A72'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.sageTeal; }}
            >
              Next
              <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{
                padding: isMobile ? '9px 14px' : '10px 22px',
                borderRadius: 8,
                fontSize: isMobile ? 12 : 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: 'linear-gradient(135deg, #5B8A80, #4D7A72)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'box-shadow 0.2s',
                boxShadow: '0 2px 8px rgba(91,138,128,0.3)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(91,138,128,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(91,138,128,0.3)'; }}
            >
              <Send size={15} />
              Submit
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 24,
              right: isMobile ? 16 : 24,
              left: isMobile ? 16 : 'auto',
              background: COLORS.sageTeal,
              color: '#FFFFFF',
              padding: '14px 20px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 20px rgba(91,138,128,0.3)',
              zIndex: 100,
            }}
          >
            <Check size={18} />
            Complaint submitted successfully.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
