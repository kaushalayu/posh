import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  Search,
  Download,
  FileText,
  FileImage,
  FileArchive,
  File,
  Clock,
  Shield,
  GitBranch,
  ChevronDown,
  ChevronUp,
  Upload,
} from "lucide-react";

const COLORS = {
  deepNavy: "#0F1E33",
  navyLight: "#1E3A5F",
  sageTeal: "#5B8A80",
  amber: "#C08B2C",
  slateGrey: "#5B6472",
  offWhite: "#F7F5F0",
  hairline: "#D8D3C8",
};

function getFileIcon(filename) {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif"].includes(ext)) return FileImage;
  if (["zip", "rar", "7z"].includes(ext)) return FileArchive;
  if (["pdf", "doc", "docx"].includes(ext)) return FileText;
  return File;
}

function getFileColor(filename) {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (["pdf"].includes(ext)) return "#EF4444";
  if (["doc", "docx"].includes(ext)) return "#3B82F6";
  if (["jpg", "jpeg", "png"].includes(ext)) return "#8B5CF6";
  if (["zip", "rar"].includes(ext)) return COLORS.amber;
  return COLORS.slateGrey;
}

const ACCESS_CONFIG = {
  "All Members": { color: COLORS.sageTeal, bg: `${COLORS.sageTeal}18` },
  "Admin Only": { color: COLORS.amber, bg: `${COLORS.amber}18` },
  "Legal & Admin": { color: COLORS.navyLight, bg: `${COLORS.navyLight}18` },
  "IC Members": { color: "#3D8B5E", bg: "#3D8B5E18" },
};

const mockDocuments = [
  {
    id: "DOC-001",
    caseId: "POSH-2026-0042",
    filename: "Complaint_Form_Signed.pdf",
    description: "Original signed complaint form submitted by complainant",
    category: "Complaint",
    uploadedBy: "System",
    uploadedAt: "2026-06-15",
    size: "245 KB",
    version: 1,
    access: "IC Members",
    versions: [
      { v: 1, uploadedBy: "System", uploadedAt: "2026-06-15", notes: "Initial submission" },
    ],
  },
  {
    id: "DOC-002",
    caseId: "POSH-2026-0042",
    filename: "Acknowledgement_Letter.pdf",
    description: "Formal acknowledgement letter sent to complainant",
    category: "Communication",
    uploadedBy: "HR SPOC",
    uploadedAt: "2026-06-17",
    size: "128 KB",
    version: 2,
    access: "All Members",
    versions: [
      { v: 1, uploadedBy: "HR SPOC", uploadedAt: "2026-06-16", notes: "First draft" },
      { v: 2, uploadedBy: "Priya Sharma", uploadedAt: "2026-06-17", notes: "Updated with case reference number" },
    ],
  },
  {
    id: "DOC-003",
    caseId: "POSH-2026-0042",
    filename: "IC_Committee_Constitution.pdf",
    description: "Formal order constituting the Internal Committee for this case",
    category: "Order",
    uploadedBy: "POSH Admin",
    uploadedAt: "2026-06-20",
    size: "180 KB",
    version: 1,
    access: "All Members",
    versions: [
      { v: 1, uploadedBy: "POSH Admin", uploadedAt: "2026-06-20", notes: "Signed by CHRO" },
    ],
  },
  {
    id: "DOC-004",
    caseId: "POSH-2026-0041",
    filename: "Witness_Statement_RV.pdf",
    description: "Signed and notarized witness statement from Rohit Verma",
    category: "Evidence",
    uploadedBy: "ICC Secretary",
    uploadedAt: "2026-06-22",
    size: "512 KB",
    version: 3,
    access: "IC Members",
    versions: [
      { v: 1, uploadedBy: "ICC Secretary", uploadedAt: "2026-06-20", notes: "Initial draft" },
      { v: 2, uploadedBy: "Rohit Verma", uploadedAt: "2026-06-21", notes: "Corrections by witness" },
      { v: 3, uploadedBy: "ICC Secretary", uploadedAt: "2026-06-22", notes: "Final notarized version" },
    ],
  },
  {
    id: "DOC-005",
    caseId: "POSH-2026-0040",
    filename: "Investigation_Report_Draft_v3.docx",
    description: "Working draft of investigation report — under review",
    category: "Report",
    uploadedBy: "Priya Sharma",
    uploadedAt: "2026-07-05",
    size: "890 KB",
    version: 3,
    access: "Admin Only",
    versions: [
      { v: 1, uploadedBy: "Anita Desai", uploadedAt: "2026-06-28", notes: "Initial draft" },
      { v: 2, uploadedBy: "Priya Sharma", uploadedAt: "2026-07-02", notes: "Incorporated committee feedback" },
      { v: 3, uploadedBy: "Priya Sharma", uploadedAt: "2026-07-05", notes: "Final review draft" },
    ],
  },
  {
    id: "DOC-006",
    caseId: "POSH-2026-0039",
    filename: "Evidence_CCTV_Clips.zip",
    description: "CCTV footage extracts from 3rd floor, 28 May 2026",
    category: "Evidence",
    uploadedBy: "Legal Department",
    uploadedAt: "2026-06-03",
    size: "18.4 MB",
    version: 1,
    access: "Legal & Admin",
    versions: [
      { v: 1, uploadedBy: "Legal Department", uploadedAt: "2026-06-03", notes: "Original clips from security system" },
    ],
  },
  {
    id: "DOC-007",
    caseId: "POSH-2026-0038",
    filename: "Conflict_Declaration_Form.pdf",
    description: "Conflict of interest declaration by IC member Anita Desai",
    category: "Compliance",
    uploadedBy: "Anita Desai",
    uploadedAt: "2026-07-03",
    size: "95 KB",
    version: 1,
    access: "Admin Only",
    versions: [
      { v: 1, uploadedBy: "Anita Desai", uploadedAt: "2026-07-03", notes: "Signed declaration — no conflict" },
    ],
  },
  {
    id: "DOC-008",
    caseId: "POSH-2026-0042",
    filename: "Hearing_Notice_HRG001.pdf",
    description: "Official notice for first hearing issued to both parties",
    category: "Communication",
    uploadedBy: "ICC Secretary",
    uploadedAt: "2026-07-20",
    size: "142 KB",
    version: 1,
    access: "All Members",
    versions: [
      { v: 1, uploadedBy: "ICC Secretary", uploadedAt: "2026-07-20", notes: "Issued with 7 days notice" },
    ],
  },
];

const CASE_OPTIONS = ["All Cases", ...new Set(mockDocuments.map((d) => d.caseId))];
const CATEGORY_OPTIONS = ["All Categories", ...new Set(mockDocuments.map((d) => d.category))];

function DocumentRow({ doc, index }) {
  const [expanded, setExpanded] = useState(false);
  const FileIcon = getFileIcon(doc.filename);
  const fileColor = getFileColor(doc.filename);
  const accessCfg = ACCESS_CONFIG[doc.access] || { color: COLORS.slateGrey, bg: `${COLORS.slateGrey}18` };

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.3 }}
        style={{ cursor: "pointer" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.sageTeal}06`; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = expanded ? `${COLORS.sageTeal}04` : "transparent"; }}
      >
        <td style={{ padding: "10px 16px", borderBottom: `1px solid #EDEAE4` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: `${fileColor}14`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${fileColor}20`,
            }}>
              <FileIcon size={17} style={{ color: fileColor }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.deepNavy, lineHeight: 1.3 }}>{doc.filename}</div>
              <div style={{ fontSize: 11, color: COLORS.slateGrey, marginTop: 2, lineHeight: 1.3 }}>{doc.description}</div>
            </div>
          </div>
        </td>
        <td style={{ padding: "10px 16px", borderBottom: `1px solid #EDEAE4` }}>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: COLORS.offWhite, color: COLORS.deepNavy, letterSpacing: "0.01em" }}>
            {doc.category}
          </span>
        </td>
        <td style={{ padding: "10px 16px", fontSize: 12, color: COLORS.sageTeal, fontWeight: 600, borderBottom: `1px solid #EDEAE4` }}>
          {doc.caseId}
        </td>
        <td style={{ padding: "10px 16px", fontSize: 12, color: COLORS.deepNavy, fontWeight: 500, borderBottom: `1px solid #EDEAE4` }}>
          {doc.uploadedBy}
        </td>
        <td style={{ padding: "10px 16px", fontSize: 12, color: COLORS.slateGrey, whiteSpace: "nowrap", borderBottom: `1px solid #EDEAE4` }}>
          {doc.uploadedAt}
        </td>
        <td style={{ padding: "10px 16px", fontSize: 12, color: COLORS.slateGrey, fontWeight: 500, borderBottom: `1px solid #EDEAE4` }}>
          {doc.size}
        </td>
        <td style={{ padding: "10px 16px", borderBottom: `1px solid #EDEAE4` }}>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6,
            color: accessCfg.color, background: accessCfg.bg,
          }}>
            {doc.access}
          </span>
        </td>
        <td style={{ padding: "10px 16px", borderBottom: `1px solid #EDEAE4` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
              style={{
                display: "flex", alignItems: "center", gap: 5, padding: "5px 12px",
                borderRadius: 8, fontSize: 11, fontWeight: 600,
                color: COLORS.sageTeal, background: `${COLORS.sageTeal}0D`,
                border: `1px solid ${COLORS.sageTeal}28`, cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              <GitBranch size={12} />
              v{doc.version}
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={10} />
              </motion.span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30,
                borderRadius: 8, fontSize: 11,
                color: COLORS.slateGrey, background: COLORS.offWhite,
                border: `1px solid ${COLORS.hairline}`, cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Download size={12} />
            </motion.button>
          </div>
        </td>
      </motion.tr>

      <AnimatePresence>
        {expanded && (
          <tr key={`${doc.id}-versions`}>
            <td colSpan={8} style={{ padding: 0, borderBottom: `1px solid #EDEAE4` }}>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div style={{
                  padding: "16px 20px 20px 68px",
                  background: `linear-gradient(135deg, ${COLORS.sageTeal}06, ${COLORS.sageTeal}03)`,
                  borderLeft: `3px solid ${COLORS.sageTeal}`,
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.08em", color: COLORS.slateGrey, marginBottom: 14,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <Clock size={11} />
                    Version History
                  </div>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      position: "absolute", left: 11, top: 8, bottom: 8,
                      width: 2, background: `${COLORS.sageTeal}25`, borderRadius: 2,
                    }} />
                    {doc.versions.map((v, vi) => (
                      <div key={v.v} style={{
                        display: "flex", alignItems: "flex-start", gap: 14,
                        padding: "8px 0", position: "relative", paddingLeft: 4,
                      }}>
                        <div style={{
                          width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                          background: vi === doc.versions.length - 1 ? COLORS.sageTeal : `${COLORS.sageTeal}25`,
                          border: vi === doc.versions.length - 1 ? `2px solid ${COLORS.sageTeal}30` : `2px solid ${COLORS.sageTeal}40`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          zIndex: 1, marginTop: 1,
                        }}>
                          {vi === doc.versions.length - 1 && (
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FFF" }} />
                          )}
                        </div>
                        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                          <span style={{
                            fontWeight: 700, color: COLORS.sageTeal, fontSize: 11,
                            background: `${COLORS.sageTeal}14`, padding: "2px 8px", borderRadius: 6,
                          }}>v{v.v}</span>
                          <span style={{ color: COLORS.deepNavy, fontWeight: 600, fontSize: 12, minWidth: 110 }}>{v.uploadedBy}</span>
                          <span style={{ color: COLORS.slateGrey, fontSize: 11, minWidth: 85 }}>{v.uploadedAt}</span>
                          <span style={{ color: COLORS.slateGrey, fontSize: 12, flex: 1 }}>{v.notes}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              display: "flex", alignItems: "center", gap: 4,
                              fontSize: 11, fontWeight: 500, color: COLORS.sageTeal,
                              background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
                            }}
                          >
                            <Download size={11} /> Download
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileDocumentCard({ doc, index }) {
  const [expanded, setExpanded] = useState(false);
  const FileIcon = getFileIcon(doc.filename);
  const fileColor = getFileColor(doc.filename);
  const accessCfg = ACCESS_CONFIG[doc.access] || { color: COLORS.slateGrey, bg: `${COLORS.slateGrey}18` };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      style={{
        background: "#FFFFFF", borderRadius: 14,
        border: `1px solid ${COLORS.hairline}`,
        padding: "16px 18px", marginBottom: 10,
        boxShadow: "0 1px 3px rgba(15,30,51,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 11, flexShrink: 0,
          background: `${fileColor}14`,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${fileColor}20`,
        }}>
          <FileIcon size={19} style={{ color: fileColor }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.deepNavy, lineHeight: 1.3, marginBottom: 3 }}>{doc.filename}</div>
          <div style={{ fontSize: 12, color: COLORS.slateGrey, lineHeight: 1.4 }}>{doc.description}</div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: COLORS.offWhite, color: COLORS.deepNavy }}>
          {doc.category}
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.sageTeal, padding: "3px 8px", borderRadius: 6, background: `${COLORS.sageTeal}0D` }}>
          {doc.caseId}
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, color: accessCfg.color, background: accessCfg.bg }}>
          {doc.access}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${COLORS.hairline}`, paddingTop: 10 }}>
        <div style={{ fontSize: 11, color: COLORS.slateGrey }}>
          <span style={{ fontWeight: 600, color: COLORS.deepNavy }}>{doc.uploadedBy}</span> · {doc.uploadedAt} · {doc.size}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setExpanded(!expanded)}
            style={{
              display: "flex", alignItems: "center", gap: 4, padding: "5px 10px",
              borderRadius: 8, fontSize: 11, fontWeight: 600,
              color: COLORS.sageTeal, background: `${COLORS.sageTeal}0D`,
              border: `1px solid ${COLORS.sageTeal}28`, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            <GitBranch size={11} />
            v{doc.version}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={10} />
            </motion.span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.93 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28,
              borderRadius: 8, color: COLORS.slateGrey, background: COLORS.offWhite,
              border: `1px solid ${COLORS.hairline}`, cursor: "pointer",
            }}
          >
            <Download size={12} />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              marginTop: 12, paddingTop: 12,
              borderTop: `1px solid ${COLORS.hairline}`,
              background: `linear-gradient(135deg, ${COLORS.sageTeal}06, ${COLORS.sageTeal}03)`,
              borderRadius: 10, padding: "12px 14px",
              borderLeft: `3px solid ${COLORS.sageTeal}`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: COLORS.slateGrey, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={10} />
                Version History
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: `${COLORS.sageTeal}25`, borderRadius: 2 }} />
                {doc.versions.map((v, vi) => (
                  <div key={v.v} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0", position: "relative", paddingLeft: 2 }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: "50%", flexShrink: 0,
                      background: vi === doc.versions.length - 1 ? COLORS.sageTeal : `${COLORS.sageTeal}25`,
                      border: `2px solid ${COLORS.sageTeal}40`, zIndex: 1, marginTop: 3,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, color: COLORS.sageTeal, fontSize: 10, background: `${COLORS.sageTeal}14`, padding: "1px 6px", borderRadius: 5 }}>v{v.v}</span>
                        <span style={{ color: COLORS.deepNavy, fontWeight: 600, fontSize: 11 }}>{v.uploadedBy}</span>
                        <span style={{ color: COLORS.slateGrey, fontSize: 10 }}>{v.uploadedAt}</span>
                      </div>
                      <div style={{ color: COLORS.slateGrey, fontSize: 11, marginTop: 2 }}>{v.notes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [caseFilter, setCaseFilter] = useState("All Cases");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = useMemo(() => {
    let result = [...mockDocuments];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.filename.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.caseId.toLowerCase().includes(q)
      );
    }
    if (caseFilter !== "All Cases") result = result.filter((d) => d.caseId === caseFilter);
    if (categoryFilter !== "All Categories") result = result.filter((d) => d.category === categoryFilter);
    return result;
  }, [search, caseFilter, categoryFilter]);

  const stats = [
    { label: "Total Documents", value: mockDocuments.length, color: COLORS.deepNavy, accent: COLORS.deepNavy },
    { label: "Total Size", value: "23.1 MB", color: COLORS.sageTeal, accent: COLORS.sageTeal },
    { label: "Cases Covered", value: new Set(mockDocuments.map(d => d.caseId)).size, color: COLORS.navyLight, accent: COLORS.navyLight },
    { label: "Versioned Files", value: mockDocuments.filter(d => d.version > 1).length, color: COLORS.amber, accent: COLORS.amber },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", maxWidth: 1400, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `linear-gradient(135deg, ${COLORS.deepNavy} 0%, ${COLORS.navyLight} 100%)`,
          borderRadius: 16,
          padding: isMobile ? "22px 20px" : "28px 32px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          boxShadow: "0 4px 20px rgba(15,30,51,0.18)",
        }}
      >
        <div>
          <div style={{
            fontSize: isMobile ? 19 : 23, fontWeight: 700, color: "#FFFFFF",
            display: "flex", alignItems: "center", gap: 11, marginBottom: 5,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `${COLORS.sageTeal}28`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <FolderOpen size={20} style={{ color: COLORS.sageTeal }} />
            </div>
            Document Repository
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", paddingLeft: 49 }}>
            Secure storage with version control and access logging
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 4px 16px rgba(91,138,128,0.35)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "11px 22px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            color: "#FFFFFF",
            background: `linear-gradient(135deg, ${COLORS.sageTeal}, ${COLORS.sageTeal}DD)`,
            border: "none", cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 10px rgba(91,138,128,0.25)",
            transition: "all 0.2s",
          }}
        >
          <Upload size={15} />
          Upload Document
        </motion.button>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
            style={{
              background: "#FFFFFF", borderRadius: 12, padding: isMobile ? "14px 14px" : "16px 20px",
              border: `1px solid ${COLORS.hairline}`,
              borderTop: `3px solid ${s.accent}`,
              boxShadow: "0 1px 4px rgba(15,30,51,0.04)",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: COLORS.slateGrey, marginBottom: 6 }}>
              {s.label}
            </div>
            <div style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "11px 18px", borderRadius: 10,
          background: `${COLORS.sageTeal}0A`,
          border: `1px solid ${COLORS.sageTeal}1A`,
          marginBottom: 20,
        }}
      >
        <div style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: `${COLORS.sageTeal}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Shield size={14} style={{ color: COLORS.sageTeal }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.deepNavy, lineHeight: 1.4 }}>
          All documents are <span style={{ fontWeight: 700, color: COLORS.sageTeal }}>encrypted at rest</span>. Downloads are watermarked and access-logged.
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        style={{
          display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap",
          background: "#FFFFFF", borderRadius: 12, padding: "12px 16px",
          border: `1px solid ${COLORS.hairline}`,
          boxShadow: "0 1px 4px rgba(15,30,51,0.04)",
          alignItems: "center",
        }}
      >
        <div style={{
          flex: "1 1 220px", display: "flex", alignItems: "center", gap: 8,
          padding: "9px 14px", borderRadius: 8, border: `1px solid ${COLORS.hairline}`, background: COLORS.offWhite,
        }}>
          <Search size={14} style={{ color: COLORS.slateGrey, flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 13, color: COLORS.deepNavy, fontFamily: "inherit" }}
          />
        </div>
        {[
          { value: caseFilter, onChange: setCaseFilter, options: CASE_OPTIONS },
          { value: categoryFilter, onChange: setCategoryFilter, options: CATEGORY_OPTIONS },
        ].map(({ value, onChange, options }, i) => (
          <select
            key={i} value={value} onChange={(e) => onChange(e.target.value)}
            style={{
              padding: "9px 14px", borderRadius: 8, border: `1px solid ${COLORS.hairline}`,
              background: COLORS.offWhite, fontSize: 13, color: COLORS.deepNavy,
              fontFamily: "inherit", outline: "none", cursor: "pointer", minWidth: 140,
              transition: "border-color 0.2s",
            }}
          >
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        <div style={{ fontSize: 12, color: COLORS.slateGrey, marginLeft: "auto", fontWeight: 500 }}>
          <span style={{ color: COLORS.deepNavy, fontWeight: 700 }}>{filtered.length}</span> document{filtered.length !== 1 ? "s" : ""}
        </div>
      </motion.div>

      {isMobile ? (
        <div>
          {filtered.map((doc, i) => (
            <MobileDocumentCard key={doc.id} doc={doc} index={i} />
          ))}
          {filtered.length === 0 && (
            <div style={{
              background: "#FFFFFF", borderRadius: 14, padding: 48,
              border: `1px solid ${COLORS.hairline}`, textAlign: "center", color: COLORS.slateGrey,
            }}>
              <FolderOpen size={32} style={{ marginBottom: 10, display: "block", margin: "0 auto 10px", opacity: 0.5 }} />
              No documents found
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          style={{
            background: "#FFFFFF", borderRadius: 14,
            border: `1px solid ${COLORS.hairline}`,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(15,30,51,0.05)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Document", "Category", "Case", "Uploaded By", "Date", "Size", "Access", "Actions"].map((h) => (
                  <th key={h} style={{
                    padding: "14px 16px", fontSize: 10, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    color: COLORS.slateGrey, background: COLORS.offWhite,
                    borderBottom: `2px solid ${COLORS.hairline}`, textAlign: "left", whiteSpace: "nowrap",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc, i) => (
                <DocumentRow key={doc.id} doc={doc} index={i} />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: 56, textAlign: "center", color: COLORS.slateGrey }}>
                    <FolderOpen size={32} style={{ marginBottom: 10, display: "block", margin: "0 auto 10px", opacity: 0.5 }} />
                    No documents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
