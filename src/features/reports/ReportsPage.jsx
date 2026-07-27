import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { recentReports } from '../../lib/mockData';
import { FileText, Download, Calendar, Filter, BarChart3, ShieldCheck, GraduationCap, FileSpreadsheet, Clock } from 'lucide-react';

const COLORS = {
  deepNavy: '#0F1E33',
  navyLight: '#1E3A5F',
  sageTeal: '#5B8A80',
  amber: '#C08B2C',
  slateGrey: '#5B6472',
  offWhite: '#F7F5F0',
  hairline: '#D8D3C8',
};

const REPORT_TYPES = [
  { id: 'case-summary', label: 'Case Summary', description: 'Detailed summary of a specific case', icon: FileText },
  { id: 'monthly', label: 'Monthly Report', description: 'Overview of all complaints for a month', icon: BarChart3 },
  { id: 'compliance', label: 'Compliance Report', description: 'POSH Act compliance status', icon: ShieldCheck },
  { id: 'training', label: 'Training Report', description: 'POSHE training completion rates', icon: GraduationCap },
];

const FORMAT_OPTIONS = [
  { id: 'excel', label: 'Excel (.xlsx)', icon: FileSpreadsheet },
  { id: 'pdf', label: 'PDF (.pdf)', icon: FileText },
];

const mockRecentReports = [
  { id: 'RPT-001', name: 'Monthly Report - June 2026', type: 'Monthly Report', format: 'PDF', generatedBy: 'Priya Sharma', generatedDate: '2026-07-02', size: '1.2 MB' },
  { id: 'RPT-002', name: 'Compliance Report - Q2 2026', type: 'Compliance Report', format: 'Excel', generatedBy: 'Rajesh Kumar', generatedDate: '2026-06-30', size: '856 KB' },
  { id: 'RPT-003', name: 'Case Summary - POSH-2026-0042', type: 'Case Summary', format: 'PDF', generatedBy: 'ICC Secretary', generatedDate: '2026-07-20', size: '2.1 MB' },
  { id: 'RPT-004', name: 'Training Report - H1 2026', type: 'Training Report', format: 'PDF', generatedBy: 'HR Department', generatedDate: '2026-06-30', size: '3.4 MB' },
  { id: 'RPT-005', name: 'Monthly Report - May 2026', type: 'Monthly Report', format: 'Excel', generatedBy: 'Priya Sharma', generatedDate: '2026-06-03', size: '978 KB' },
];

export default function ReportsPage() {
  const isMobile = useIsMobile();
  const [selectedType, setSelectedType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!selectedType) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  const fieldInput = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: `1.5px solid ${COLORS.hairline}`,
    background: '#FFFFFF',
    fontSize: 14,
    color: COLORS.deepNavy,
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.offWhite, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.deepNavy} 0%, ${COLORS.navyLight} 60%, ${COLORS.sageTeal}30 100%)`,
        padding: isMobile ? '24px 16px' : '32px 40px',
        borderRadius: '0 0 20px 20px',
        boxShadow: '0 4px 20px rgba(15,30,51,0.25)',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius: 14,
              background: 'rgba(91,138,128,0.2)', border: `1px solid rgba(91,138,128,0.35)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}>
              <FileText size={isMobile ? 20 : 24} style={{ color: COLORS.sageTeal }} />
            </div>
            <div>
              <div style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Reports & Exports</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>Generate, download, and manage your reports</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: isMobile ? '20px 16px' : '32px 40px' }}>
        <div style={{
          background: '#FFFFFF', borderRadius: 16,
          border: `1px solid ${COLORS.hairline}`,
          padding: isMobile ? 20 : 32, marginBottom: 32,
          boxShadow: '0 1px 3px rgba(15,30,51,0.04), 0 6px 24px rgba(15,30,51,0.03)',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.deepNavy, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: `${COLORS.sageTeal}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BarChart3 size={15} style={{ color: COLORS.sageTeal }} />
            </div>
            Export Builder
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? 10 : 14, marginBottom: 28,
          }}>
            {REPORT_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = selectedType === type.id;
              return (
                <motion.div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: isMobile ? '14px 10px' : '20px 16px', borderRadius: 12,
                    border: `2px solid ${isActive ? COLORS.sageTeal : '#E8E5DE'}`,
                    cursor: 'pointer', textAlign: 'center',
                    background: isActive ? `linear-gradient(145deg, ${COLORS.sageTeal}0A, ${COLORS.sageTeal}15)` : '#FFFFFF',
                    boxShadow: isActive ? `0 0 0 3px ${COLORS.sageTeal}18, 0 2px 8px ${COLORS.sageTeal}15` : '0 1px 3px rgba(15,30,51,0.04)',
                    transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
                  }}
                >
                  <div style={{
                    width: isMobile ? 36 : 42, height: isMobile ? 36 : 42, borderRadius: 10,
                    background: isActive ? `${COLORS.sageTeal}15` : `${COLORS.slateGrey}08`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 10px',
                    transition: 'background 0.25s',
                  }}>
                    <Icon size={isMobile ? 18 : 20} style={{ color: isActive ? COLORS.sageTeal : COLORS.slateGrey, transition: 'color 0.25s' }} />
                  </div>
                  <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 600, color: isActive ? COLORS.deepNavy : COLORS.slateGrey, marginBottom: 3, transition: 'color 0.2s' }}>{type.label}</div>
                  {!isMobile && <div style={{ fontSize: 11, color: COLORS.slateGrey, lineHeight: 1.4, opacity: 0.75 }}>{type.description}</div>}
                </motion.div>
              );
            })}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 16, marginBottom: 28,
          }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: COLORS.deepNavy, marginBottom: 8, letterSpacing: '0.02em' }}>Date From</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: COLORS.slateGrey, opacity: 0.5, pointerEvents: 'none' }} />
                <input
                  type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                  style={{ ...fieldInput, paddingLeft: 38 }}
                  onFocus={(e) => { e.target.style.borderColor = COLORS.sageTeal; e.target.style.boxShadow = `0 0 0 3px ${COLORS.sageTeal}15`; }}
                  onBlur={(e) => { e.target.style.borderColor = COLORS.hairline; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: COLORS.deepNavy, marginBottom: 8, letterSpacing: '0.02em' }}>Date To</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: COLORS.slateGrey, opacity: 0.5, pointerEvents: 'none' }} />
                <input
                  type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                  style={{ ...fieldInput, paddingLeft: 38 }}
                  onFocus={(e) => { e.target.style.borderColor = COLORS.sageTeal; e.target.style.boxShadow = `0 0 0 3px ${COLORS.sageTeal}15`; }}
                  onBlur={(e) => { e.target.style.borderColor = COLORS.hairline; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: COLORS.deepNavy, marginBottom: 8, letterSpacing: '0.02em' }}>Format</label>
            <div style={{ display: 'flex', gap: 14 }}>
              {FORMAT_OPTIONS.map((fmt) => {
                const Icon = fmt.icon;
                const isActive = selectedFormat === fmt.id;
                return (
                  <motion.button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      padding: '14px 20px', borderRadius: 12,
                      border: `2px solid ${isActive ? COLORS.sageTeal : '#E8E5DE'}`,
                      cursor: 'pointer', fontSize: 14, fontWeight: isActive ? 600 : 500,
                      color: isActive ? COLORS.sageTeal : COLORS.deepNavy,
                      background: isActive ? `${COLORS.sageTeal}0C` : '#FFFFFF',
                      fontFamily: 'inherit', transition: 'all 0.25s',
                      boxShadow: isActive ? `0 0 0 3px ${COLORS.sageTeal}15` : '0 1px 3px rgba(15,30,51,0.04)',
                    }}
                  >
                    <Icon size={18} />{fmt.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.button
            onClick={handleGenerate}
            disabled={!selectedType || isGenerating}
            whileHover={selectedType && !isGenerating ? { y: -2, boxShadow: '0 6px 20px rgba(91,138,128,0.4)' } : {}}
            whileTap={selectedType && !isGenerating ? { scale: 0.98 } : {}}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: isMobile ? '13px 24px' : '14px 32px', borderRadius: 12,
              fontSize: 14, fontWeight: 600, color: '#FFFFFF',
              background: 'linear-gradient(135deg, #5B8A80 0%, #4A7D73 50%, #3D6E64 100%)',
              border: 'none', cursor: !selectedType || isGenerating ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', opacity: !selectedType || isGenerating ? 0.45 : 1,
              boxShadow: '0 3px 12px rgba(91,138,128,0.3)',
              transition: 'opacity 0.25s',
              width: isMobile ? '100%' : 'auto', justifyContent: 'center',
            }}
          >
            <Download size={16} />
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </motion.button>
        </div>

        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.deepNavy, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: `${COLORS.slateGrey}10`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Clock size={15} style={{ color: COLORS.slateGrey }} />
            </div>
            Recent Reports
          </div>

          {isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {mockRecentReports.map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    background: '#FFFFFF', borderRadius: 14,
                    border: `1px solid ${COLORS.hairline}`, padding: 18,
                    boxShadow: '0 1px 3px rgba(15,30,51,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.deepNavy, flex: 1, lineHeight: 1.4 }}>{report.name}</div>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 8,
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
                      color: report.format === 'PDF' ? '#DC2626' : COLORS.sageTeal,
                      background: report.format === 'PDF' ? '#DC262610' : `${COLORS.sageTeal}12`,
                      border: `1px solid ${report.format === 'PDF' ? '#DC262620' : `${COLORS.sageTeal}25`}`,
                      marginLeft: 8, flexShrink: 0,
                    }}>
                      {report.format}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.slateGrey, marginBottom: 12, lineHeight: 1.5 }}>
                    {report.type} · {report.generatedDate} · {report.size}
                  </div>
                  <button
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                      color: COLORS.sageTeal, background: `${COLORS.sageTeal}0D`,
                      border: `1px solid ${COLORS.sageTeal}28`, cursor: 'pointer',
                      fontFamily: 'inherit', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.sageTeal}1A`; e.currentTarget.style.borderColor = `${COLORS.sageTeal}45`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${COLORS.sageTeal}0D`; e.currentTarget.style.borderColor = `${COLORS.sageTeal}28`; }}
                  >
                    <Download size={13} /> Download
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{
              background: '#FFFFFF', borderRadius: 16,
              border: `1px solid ${COLORS.hairline}`, overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(15,30,51,0.04), 0 6px 24px rgba(15,30,51,0.03)',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Report Name', 'Type', 'Format', 'Generated By', 'Date', 'Size', 'Action'].map((h) => (
                      <th key={h} style={{
                        padding: '14px 20px', fontSize: 11, fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        color: COLORS.slateGrey, background: `${COLORS.offWhite}CC`,
                        borderBottom: `1.5px solid ${COLORS.hairline}`, textAlign: 'left', whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockRecentReports.map((report, i) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      style={{
                        cursor: 'pointer',
                        background: i % 2 === 1 ? `${COLORS.offWhite}55` : '#FFFFFF',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.sageTeal}06`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 1 ? `${COLORS.offWhite}55` : '#FFFFFF'; }}
                    >
                      <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}80` }}>{report.name}</td>
                      <td style={{ padding: '14px 20px', fontSize: 13, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}80` }}>{report.type}</td>
                      <td style={{ padding: '14px 20px', borderBottom: `1px solid ${COLORS.hairline}80` }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 8,
                          fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
                          color: report.format === 'PDF' ? '#DC2626' : COLORS.sageTeal,
                          background: report.format === 'PDF' ? '#DC262610' : `${COLORS.sageTeal}12`,
                          border: `1px solid ${report.format === 'PDF' ? '#DC262620' : `${COLORS.sageTeal}25`}`,
                        }}>{report.format}</span>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: 13, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}80` }}>{report.generatedBy}</td>
                      <td style={{ padding: '14px 20px', fontSize: 13, color: COLORS.deepNavy, borderBottom: `1px solid ${COLORS.hairline}80`, whiteSpace: 'nowrap' }}>{report.generatedDate}</td>
                      <td style={{ padding: '14px 20px', fontSize: 12, color: COLORS.slateGrey, borderBottom: `1px solid ${COLORS.hairline}80` }}>{report.size}</td>
                      <td style={{ padding: '14px 20px', borderBottom: `1px solid ${COLORS.hairline}80` }}>
                        <button
                          style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                            color: COLORS.sageTeal, background: `${COLORS.sageTeal}0D`,
                            border: `1px solid ${COLORS.sageTeal}28`, cursor: 'pointer',
                            fontFamily: 'inherit', transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.sageTeal}1A`; e.currentTarget.style.borderColor = `${COLORS.sageTeal}45`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = `${COLORS.sageTeal}0D`; e.currentTarget.style.borderColor = `${COLORS.sageTeal}28`; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                          <Download size={13} /> Download
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: -30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -30, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              position: 'fixed', top: 24, left: '50%',
              background: `linear-gradient(135deg, ${COLORS.deepNavy}, ${COLORS.navyLight})`,
              color: '#FFFFFF',
              padding: '14px 24px', borderRadius: 14, fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 32px rgba(15,30,51,0.35), 0 0 0 1px rgba(91,138,128,0.2)',
              zIndex: 100,
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'rgba(91,138,128,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <BarChart3 size={14} style={{ color: COLORS.sageTeal }} />
              </motion.div>
            </div>
            Generating report...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
