import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Gavel,
  AlertCircle,
  CheckCircle2,
  Clock,
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

const EVENT_TYPE_CONFIG = {
  filing: { color: COLORS.sageTeal, label: "Filing", icon: FileText },
  acknowledgement: {
    color: COLORS.deepNavy,
    label: "Acknowledgement",
    icon: CheckCircle2,
  },
  committee: { color: COLORS.amber, label: "Committee", icon: Users },
  hearing: { color: COLORS.slateGrey, label: "Hearing", icon: Gavel },
  document: { color: COLORS.navyLight, label: "Document", icon: FileText },
  alert: { color: "#EF4444", label: "Alert", icon: AlertCircle },
};

const timelineEvents = [
  {
    id: 1,
    type: "filing",
    timestamp: "2026-06-15T09:30:00",
    title: "Complaint Filed",
    description:
      "Formal complaint of sexual harassment submitted by complainant against respondent. Case registered under POSH Act, 2013. Initial documentation includes written statement, supporting emails, and witness list.",
    actor: "Complainant (via Online Portal)",
  },
  {
    id: 2,
    type: "acknowledgement",
    timestamp: "2026-06-15T14:15:00",
    title: "Complaint Acknowledged",
    description:
      "ICC Chairperson acknowledged receipt of complaint within 3 working days as mandated. Acknowledgement letter sent to complainant with case reference number and expected timeline.",
    actor: "Priya Sharma, ICC Chairperson",
  },
  {
    id: 3,
    type: "document",
    timestamp: "2026-06-18T10:00:00",
    title: "Supporting Documents Uploaded",
    description:
      "Additional evidence submitted: email screenshots, chat logs, and two character witness statements. All documents catalogued in evidence management system.",
    actor: "Complainant",
  },
  {
    id: 4,
    type: "committee",
    timestamp: "2026-06-22T11:00:00",
    title: "ICC Preliminary Meeting",
    description:
      "Internal Committee convened for preliminary review. Quorum of 3 members present. Decision to proceed with formal investigation and appoint external investigator.",
    actor: "ICC Members",
  },
  {
    id: 5,
    type: "alert",
    timestamp: "2026-06-25T16:00:00",
    title: "Interim Measure: No-Contact Directive",
    description:
      "Interim protection order issued prohibiting respondent from direct or indirect contact with complainant. Both parties informed in writing.",
    actor: "ICC Chairperson",
  },
  {
    id: 6,
    type: "document",
    timestamp: "2026-06-28T09:45:00",
    title: "Respondent's Reply Received",
    description:
      "Respondent submitted formal written reply denying all allegations. Counter-arguments and three supporting witness names provided.",
    actor: "Respondent (via Legal Counsel)",
  },
  {
    id: 7,
    type: "committee",
    timestamp: "2026-07-02T10:30:00",
    title: "Investigation Committee Formed",
    description:
      "Three-member investigation committee constituted: one internal ICC member and two external members with legal expertise. Terms of reference finalized.",
    actor: "ICC Chairperson",
  },
  {
    id: 8,
    type: "hearing",
    timestamp: "2026-07-10T14:00:00",
    title: "Complainant Deposition Scheduled",
    description:
      "Formal deposition session scheduled for complainant. Video conference facility arranged. Court reporter appointed for official transcription.",
    actor: "Investigation Committee",
  },
  {
    id: 9,
    type: "document",
    timestamp: "2026-07-14T11:15:00",
    title: "HR Policy Documents Referenced",
    description:
      "Relevant sections of Sexual Harassment Policy (Section 4.2, 4.3) and Code of Conduct (Clause 12) formally entered into investigation record.",
    actor: "Investigation Committee",
  },
  {
    id: 10,
    type: "hearing",
    timestamp: "2026-07-20T15:00:00",
    title: "Witness Interview Completed",
    description:
      "First witness interview conducted. Witness corroborated complainant's account regarding specific incidents on May 28 and June 2. Statement signed and notarized.",
    actor: "Investigation Committee",
  },
];

function formatTimestamp(ts) {
  const date = new Date(ts);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(ts) {
  const date = new Date(ts);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function TimelineEvent({ event, index }) {
  const [expanded, setExpanded] = useState(false);
  const config = EVENT_TYPE_CONFIG[event.type] || EVENT_TYPE_CONFIG.document;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
      style={{
        display: "flex",
        gap: 16,
        position: "relative",
        paddingBottom: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 32,
          position: "relative",
        }}
      >
        {index < timelineEvents.length - 1 && (
          <div
            style={{
              position: "absolute",
              top: 28,
              width: 2,
              height: "calc(100% + 0px)",
              background: COLORS.hairline,
            }}
          />
        )}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: `${config.color}18`,
            border: `2px solid ${config.color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            flexShrink: 0,
          }}
        >
          <Icon size={13} style={{ color: config.color }} />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          background: "#FFFFFF",
          borderRadius: 10,
          border: `1px solid ${COLORS.hairline}`,
          overflow: "hidden",
          transition: "box-shadow 0.2s",
          boxShadow: expanded
            ? "0 2px 12px rgba(15,30,51,0.08)"
            : "0 1px 3px rgba(15,30,51,0.04)",
        }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "14px 18px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "inherit",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: config.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {config.label}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: COLORS.slateGrey,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Clock size={11} />
                {formatTimestamp(event.timestamp)} &middot;{" "}
                {formatTime(event.timestamp)}
              </span>
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.deepNavy,
              }}
            >
              {event.title}
            </div>
          </div>
          {expanded ? (
            <ChevronUp
              size={16}
              style={{ color: COLORS.slateGrey, marginTop: 4, flexShrink: 0 }}
            />
          ) : (
            <ChevronDown
              size={16}
              style={{ color: COLORS.slateGrey, marginTop: 4, flexShrink: 0 }}
            />
          )}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  padding: "0 18px 16px",
                  borderTop: `1px solid ${COLORS.hairline}`,
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: COLORS.deepNavy,
                    margin: "12px 0 8px",
                  }}
                >
                  {event.description}
                </p>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.slateGrey,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Users size={12} />
                  <span style={{ fontWeight: 500 }}>Actor:</span>{" "}
                  {event.actor}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const styles = {
  container: {},
  header: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.deepNavy,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  count: {
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.slateGrey,
    background: `${COLORS.hairline}88`,
    padding: "2px 8px",
    borderRadius: 10,
  },
};

export default function TimelineTab() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Clock size={18} style={{ color: COLORS.sageTeal }} />
        Case Timeline
        <span style={styles.count}>{timelineEvents.length} events</span>
      </div>
      {timelineEvents.map((event, i) => (
        <TimelineEvent key={event.id} event={event} index={i} />
      ))}
    </div>
  );
}
