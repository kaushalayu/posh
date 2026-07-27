import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Plus,
  Search,
  Clock,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Circle,
} from "lucide-react";

const COLORS = {
  deepNavy: "#0F1E33",
  navyLight: "#1E3A5F",
  sageTeal: "#5B8A80",
  amber: "#C08B2C",
  slateGrey: "#5B6472",
  offWhite: "#F7F5F0",
  hairline: "#E5E1DA",
  navyGradient: "linear-gradient(135deg, #0F1E33 0%, #1A3050 50%, #1E3A5F 100%)",
  tealGradient: "linear-gradient(135deg, #5B8A80 0%, #4D7A72 100%)",
  amberGradient: "linear-gradient(135deg, #C08B2C 0%, #A8792A 100%)",
  cardShadow: "0 1px 3px rgba(15,30,51,0.04), 0 4px 12px rgba(15,30,51,0.03)",
  cardShadowHover: "0 2px 8px rgba(15,30,51,0.06), 0 8px 24px rgba(15,30,51,0.05)",
  statShadow: "0 1px 2px rgba(15,30,51,0.03), 0 2px 8px rgba(15,30,51,0.02)",
};

const STATUS_CONFIG = {
  scheduled: {
    label: "Scheduled",
    color: COLORS.sageTeal,
    bg: `${COLORS.sageTeal}18`,
    glow: `0 0 8px ${COLORS.sageTeal}30`,
    icon: Circle,
  },
  completed: {
    label: "Completed",
    color: "#3D8B5E",
    bg: "#3D8B5E18",
    glow: "0 0 8px #3D8B5E30",
    icon: CheckCircle2,
  },
  adjourned: {
    label: "Adjourned",
    color: COLORS.amber,
    bg: `${COLORS.amber}18`,
    glow: `0 0 8px ${COLORS.amber}30`,
    icon: AlertCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "#B83A3A",
    bg: "#B83A3A18",
    glow: "0 0 8px #B83A3A30",
    icon: AlertCircle,
  },
};

const TYPE_CONFIG = {
  "Initial Hearing": { color: COLORS.navyLight, bg: `${COLORS.navyLight}18` },
  "Witness Examination": { color: COLORS.sageTeal, bg: `${COLORS.sageTeal}18` },
  "Cross Examination": { color: COLORS.amber, bg: `${COLORS.amber}18` },
  "Final Hearing": { color: "#3D8B5E", bg: "#3D8B5E18" },
  "Deliberation": { color: COLORS.slateGrey, bg: `${COLORS.slateGrey}18` },
};

const mockProceedings = [
  {
    id: "HRG-001",
    caseId: "POSH-2026-0042",
    title: "Initial Hearing — Complainant Statement",
    type: "Initial Hearing",
    date: "2026-07-28",
    time: "10:00 AM",
    duration: "2 hours",
    venue: "Conference Room B, Floor 3",
    status: "scheduled",
    attendees: ["Priya Sharma (Chair)", "Rajesh Kumar (Member)", "Anita Desai (Member)", "Complainant"],
    agenda: "Record complainant's preliminary statement and establish case timeline.",
    minutes: null,
  },
  {
    id: "HRG-002",
    caseId: "POSH-2026-0042",
    title: "Respondent Statement Recording",
    type: "Initial Hearing",
    date: "2026-08-04",
    time: "11:00 AM",
    duration: "2 hours",
    venue: "Conference Room B, Floor 3",
    status: "scheduled",
    attendees: ["Priya Sharma (Chair)", "Rajesh Kumar (Member)", "Anita Desai (Member)", "Respondent"],
    agenda: "Record respondent's response to the complaint allegations.",
    minutes: null,
  },
  {
    id: "HRG-003",
    caseId: "POSH-2026-0041",
    title: "Witness Examination — Rohit Verma",
    type: "Witness Examination",
    date: "2026-07-22",
    time: "02:00 PM",
    duration: "1.5 hours",
    venue: "Legal Department, Floor 5",
    status: "completed",
    attendees: ["Priya Sharma (Chair)", "Anita Desai (Member)", "Rohit Verma (Witness)"],
    agenda: "Examine first witness regarding the incident on 08 June 2026.",
    minutes: "Witness confirmed observing the incident at approximately 3PM. Full transcript recorded and signed. Next hearing: Cross-examination of respondent.",
  },
  {
    id: "HRG-004",
    caseId: "POSH-2026-0040",
    title: "Cross Examination — Respondent",
    type: "Cross Examination",
    date: "2026-07-18",
    time: "03:00 PM",
    duration: "2 hours",
    venue: "Virtual — MS Teams",
    status: "completed",
    attendees: ["Vikram Mehta (Chair)", "Priya Sharma (Member)", "Respondent", "Respondent's Representative"],
    agenda: "Cross-examine respondent on witness testimonies received.",
    minutes: "Respondent denied all charges. Key contradictions identified in timeline. Committee to review CCTV evidence before final hearing.",
  },
  {
    id: "HRG-005",
    caseId: "POSH-2026-0039",
    title: "Final Hearing — Closing Arguments",
    type: "Final Hearing",
    date: "2026-07-15",
    time: "10:00 AM",
    duration: "3 hours",
    venue: "Board Room, Floor 7",
    status: "adjourned",
    attendees: ["Priya Sharma (Chair)", "Rajesh Kumar (Member)", "Anita Desai (Member)", "All Parties"],
    agenda: "Hear final arguments from both parties before deliberation.",
    minutes: "Hearing adjourned due to complainant's absence. Rescheduled for 2026-08-01. Notice issued to both parties.",
  },
  {
    id: "HRG-006",
    caseId: "POSH-2026-0038",
    title: "Preliminary Inquiry Meeting",
    type: "Initial Hearing",
    date: "2026-07-10",
    time: "09:30 AM",
    duration: "1 hour",
    venue: "HR Department, Floor 2",
    status: "completed",
    attendees: ["Rajesh Kumar (Chair)", "HR SPOC", "Complainant"],
    agenda: "Assess nature and severity of retaliation complaint.",
    minutes: "Complainant provided written account of retaliatory actions. Committee will convene formal hearing within 7 days.",
  },
  {
    id: "HRG-007",
    caseId: "POSH-2026-0035",
    title: "Deliberation Session",
    type: "Deliberation",
    date: "2026-08-10",
    time: "02:00 PM",
    duration: "2 hours",
    venue: "Conference Room A, Floor 3",
    status: "scheduled",
    attendees: ["Investigation Committee (Closed Session)"],
    agenda: "Internal deliberation — no parties present. Review all evidence and finalize findings.",
    minutes: null,
  },
];

const CASE_OPTIONS = ["All Cases", ...new Set(mockProceedings.map((p) => p.caseId))];
const STATUS_OPTIONS = ["All Status", ...Object.keys(STATUS_CONFIG)];
const TYPE_OPTIONS = ["All Types", ...Object.keys(TYPE_CONFIG)];

function ProceedingCard({ proceeding, index }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[proceeding.status];
  const typeCfg = TYPE_CONFIG[proceeding.type] || { color: COLORS.slateGrey, bg: `${COLORS.slateGrey}18` };
  const StatusIcon = statusCfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.05 }}
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        border: `1px solid ${COLORS.hairline}`,
        overflow: "hidden",
        marginBottom: 14,
        boxShadow: expanded ? COLORS.cardShadowHover : COLORS.cardShadow,
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        style={{ padding: "18px 22px", cursor: "pointer" }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 600,
                color: COLORS.sageTeal,
                background: `${COLORS.sageTeal}10`,
                padding: "2px 8px",
                borderRadius: 6,
              }}>
                {proceeding.id}
              </span>
              <span style={{ fontSize: 11, color: COLORS.hairline }}>|</span>
              <span style={{
                fontSize: 11,
                color: COLORS.slateGrey,
                fontWeight: 500,
              }}>
                {proceeding.caseId}
              </span>
            </div>

            <div style={{
              fontSize: 15,
              fontWeight: 600,
              color: COLORS.deepNavy,
              lineHeight: 1.4,
              marginBottom: 12,
            }}>
              {proceeding.title}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 8,
                color: typeCfg.color,
                background: typeCfg.bg,
              }}>
                {proceeding.type}
              </span>

              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 8,
                color: statusCfg.color,
                background: statusCfg.bg,
                boxShadow: statusCfg.glow,
              }}>
                <StatusIcon size={10} />
                {statusCfg.label}
              </span>

              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                color: COLORS.slateGrey,
              }}>
                <Calendar size={12} />
                {proceeding.date} · {proceeding.time}
              </span>

              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                color: COLORS.slateGrey,
              }}>
                <Clock size={12} />
                {proceeding.duration}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, paddingTop: 4 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              color: COLORS.slateGrey,
              background: COLORS.offWhite,
              padding: "5px 10px",
              borderRadius: 8,
            }}>
              <MapPin size={11} />
              <span style={{ maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {proceeding.venue}
              </span>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 8, background: expanded ? `${COLORS.sageTeal}12` : "transparent" }}
            >
              <ChevronDown size={16} style={{ color: expanded ? COLORS.sageTeal : COLORS.slateGrey }} />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ borderTop: `1px solid ${COLORS.hairline}`, margin: "0 22px" }} />
            <div style={{ padding: "20px 22px 22px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: COLORS.slateGrey,
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}>
                  <Users size={12} />
                  Attendees
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {proceeding.attendees.map((a, i) => (
                    <div key={i} style={{
                      fontSize: 13,
                      color: COLORS.deepNavy,
                      padding: "8px 0",
                      borderBottom: i < proceeding.attendees.length - 1 ? `1px solid ${COLORS.offWhite}` : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <div style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: COLORS.sageTeal,
                        flexShrink: 0,
                        opacity: 0.5,
                      }} />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: COLORS.slateGrey,
                  marginBottom: 10,
                }}>
                  Agenda
                </div>
                <div style={{
                  fontSize: 13,
                  color: COLORS.deepNavy,
                  lineHeight: 1.7,
                  marginBottom: proceeding.minutes ? 20 : 0,
                }}>
                  {proceeding.agenda}
                </div>

                {proceeding.minutes && (
                  <>
                    <div style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: COLORS.slateGrey,
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <FileText size={12} />
                      Minutes
                    </div>
                    <div style={{
                      fontSize: 13,
                      color: COLORS.slateGrey,
                      lineHeight: 1.7,
                      padding: "14px 16px",
                      background: COLORS.offWhite,
                      borderRadius: 10,
                      borderLeft: `3px solid ${COLORS.sageTeal}`,
                      fontStyle: "italic",
                    }}>
                      {proceeding.minutes}
                    </div>
                  </>
                )}

                {!proceeding.minutes && proceeding.status === "scheduled" && (
                  <button style={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    color: COLORS.sageTeal,
                    background: `${COLORS.sageTeal}10`,
                    border: `1px solid ${COLORS.sageTeal}33`,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s ease",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.sageTeal}20`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${COLORS.sageTeal}10`; }}
                  >
                    <FileText size={13} />
                    Add Minutes
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProceedingsPage() {
  const [search, setSearch] = useState("");
  const [caseFilter, setCaseFilter] = useState("All Cases");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [view, setView] = useState("list");

  const filtered = useMemo(() => {
    let result = [...mockProceedings];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.caseId.toLowerCase().includes(q)
      );
    }
    if (caseFilter !== "All Cases") result = result.filter((p) => p.caseId === caseFilter);
    if (statusFilter !== "All Status") result = result.filter((p) => p.status === statusFilter);
    if (typeFilter !== "All Types") result = result.filter((p) => p.type === typeFilter);
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
    return result;
  }, [search, caseFilter, statusFilter, typeFilter]);

  const upcoming = filtered.filter((p) => p.status === "scheduled");
  const past = filtered.filter((p) => p.status !== "scheduled");

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        background: COLORS.navyGradient,
        borderRadius: 16,
        padding: "28px 32px",
        marginBottom: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 24px rgba(15,30,51,0.15), 0 1px 4px rgba(15,30,51,0.1)",
      }}>
        <div>
          <div style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 6,
          }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}>
              <Calendar size={20} style={{ color: "#FFFFFF" }} />
            </div>
            Proceedings
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", paddingLeft: 50 }}>
            Hearing schedule, attendance records, and minutes
          </div>
        </div>
        <button style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "11px 22px",
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 600,
          color: "#FFFFFF",
          background: COLORS.tealGradient,
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: "0 2px 8px rgba(91,138,128,0.3), 0 1px 2px rgba(91,138,128,0.2)",
          transition: "all 0.25s ease",
          letterSpacing: "0.01em",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(91,138,128,0.4), 0 2px 4px rgba(91,138,128,0.25)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(91,138,128,0.3), 0 1px 2px rgba(91,138,128,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <Plus size={15} />
          Schedule Hearing
        </button>
      </div>

      {/* Stats strip */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14,
        marginBottom: 28,
      }}>
        {[
          { label: "Total Hearings", value: mockProceedings.length, color: COLORS.deepNavy, border: COLORS.deepNavy },
          { label: "Scheduled", value: mockProceedings.filter(p => p.status === "scheduled").length, color: COLORS.sageTeal, border: COLORS.sageTeal },
          { label: "Completed", value: mockProceedings.filter(p => p.status === "completed").length, color: "#3D8B5E", border: "#3D8B5E" },
          { label: "Adjourned", value: mockProceedings.filter(p => p.status === "adjourned").length, color: COLORS.amber, border: COLORS.amber },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "#FFFFFF",
            borderRadius: 12,
            padding: "18px 20px",
            border: `1px solid ${COLORS.hairline}`,
            borderLeft: `3px solid ${stat.border}`,
            boxShadow: COLORS.statShadow,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: COLORS.slateGrey, marginBottom: 8 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: 12,
        border: `1px solid ${COLORS.hairline}`,
        padding: "14px 18px",
        marginBottom: 28,
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: COLORS.statShadow,
        flexWrap: "wrap",
      }}>
        <div style={{
          flex: "1 1 220px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 14px",
          borderRadius: 8,
          border: `1px solid ${COLORS.hairline}`,
          background: COLORS.offWhite,
        }}>
          <Search size={14} style={{ color: COLORS.slateGrey, flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search hearings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, border: "none", background: "none", outline: "none",
              fontSize: 13, color: COLORS.deepNavy, fontFamily: "inherit",
            }}
          />
        </div>
        {[
          { value: caseFilter, onChange: setCaseFilter, options: CASE_OPTIONS, prefix: "Case:" },
          { value: statusFilter, onChange: setStatusFilter, options: STATUS_OPTIONS, prefix: "Status:" },
          { value: typeFilter, onChange: setTypeFilter, options: TYPE_OPTIONS, prefix: "Type:" },
        ].map(({ value, onChange, options, prefix }, i) => (
          <select
            key={i}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              padding: "9px 14px",
              borderRadius: 8,
              border: `1px solid ${COLORS.hairline}`,
              background: value === options[0] ? COLORS.offWhite : "#FFFFFF",
              fontSize: 13,
              color: value === options[0] ? COLORS.slateGrey : COLORS.deepNavy,
              fontFamily: "inherit",
              outline: "none",
              cursor: "pointer",
              minWidth: 140,
              fontWeight: value === options[0] ? 500 : 600,
              transition: "all 0.2s ease",
            }}
          >
            {options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        ))}
        <div style={{
          fontSize: 12,
          color: COLORS.slateGrey,
          marginLeft: "auto",
          fontWeight: 500,
          background: COLORS.offWhite,
          padding: "6px 12px",
          borderRadius: 8,
        }}>
          {filtered.length} hearing{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: COLORS.sageTeal,
              boxShadow: `0 0 6px ${COLORS.sageTeal}50`,
            }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.deepNavy }}>
              Upcoming Hearings
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              background: `${COLORS.sageTeal}18`,
              color: COLORS.sageTeal,
            }}>
              {upcoming.length}
            </span>
          </div>
          {upcoming.map((p, i) => <ProceedingCard key={p.id} proceeding={p} index={i} />)}
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: COLORS.slateGrey,
              opacity: 0.6,
            }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.deepNavy }}>
              Past Hearings
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              background: `${COLORS.slateGrey}18`,
              color: COLORS.slateGrey,
            }}>
              {past.length}
            </span>
          </div>
          {past.map((p, i) => <ProceedingCard key={p.id} proceeding={p} index={i} />)}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "72px 32px",
          textAlign: "center",
          background: "#FFFFFF",
          borderRadius: 16,
          border: `1px solid ${COLORS.hairline}`,
          boxShadow: COLORS.cardShadow,
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: COLORS.offWhite,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
          }}>
            <Calendar size={34} style={{ color: COLORS.hairline }} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.deepNavy, marginBottom: 6 }}>
            No hearings found
          </div>
          <div style={{ fontSize: 13, color: COLORS.slateGrey, maxWidth: 320, lineHeight: 1.6 }}>
            There are no proceedings matching your current filters. Try adjusting your search criteria.
          </div>
        </div>
      )}
    </div>
  );
}