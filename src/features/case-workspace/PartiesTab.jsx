import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Users, ShieldAlert } from "lucide-react";

const COLORS = {
  deepNavy: "#0F1E33",
  navyLight: "#1E3A5F",
  sageTeal: "#5B8A80",
  amber: "#C08B2C",
  slateGrey: "#5B6472",
  offWhite: "#F7F5F0",
  hairline: "#D8D3C8",
};

const mockParties = {
  complainant: [
    {
      id: "C001",
      name: "Ananya Mehta",
      maskedName: "A******* M***",
      role: "Complainant",
      designation: "Senior Analyst, Data Science",
      department: "Analytics",
      contact: "ananya.mehta@company.com",
      maskedContact: "a*******@***.com",
      phone: "+91-98765-43210",
      maskedPhone: "+91-****-***210",
      dateJoined: "2023-03-15",
    },
  ],
  respondent: [
    {
      id: "R001",
      name: "Vikram Deshmukh",
      maskedName: "V******* D******",
      role: "Respondent",
      designation: "Senior Manager, Engineering",
      department: "Engineering",
      contact: "vikram.deshmukh@company.com",
      maskedContact: "v*******@***.com",
      phone: "+91-98765-12345",
      maskedPhone: "+91-****-***345",
      dateJoined: "2020-01-10",
    },
  ],
  witnesses: [
    {
      id: "W001",
      name: "Rohit Verma",
      maskedName: "R**** V***",
      role: "Witness (Complainant's)",
      designation: "Team Lead, Analytics",
      department: "Analytics",
      contact: "rohit.verma@company.com",
      maskedContact: "r****@***.com",
      phone: "+91-98765-67890",
      maskedPhone: "+91-****-***890",
    },
    {
      id: "W002",
      name: "Deepika Nair",
      maskedName: "D***** N**",
      role: "Witness (Complainant's)",
      designation: "HR Business Partner",
      department: "Human Resources",
      contact: "deepika.nair@company.com",
      maskedContact: "d*****@***.com",
      phone: "+91-98765-11111",
      maskedPhone: "+91-****-***111",
    },
    {
      id: "W003",
      name: "Arjun Reddy",
      maskedName: "A***** R****",
      role: "Witness (Respondent's)",
      designation: "Engineering Manager",
      department: "Engineering",
      contact: "arjun.reddy@company.com",
      maskedContact: "a*****@***.com",
      phone: "+91-98765-22222",
      maskedPhone: "+91-****-***222",
    },
  ],
};

function maskString(str) {
  if (!str) return str;
  const parts = str.split("@");
  if (parts.length === 2) {
    return parts[0][0] + "*******@" + parts[1];
  }
  return str[0] + "*".repeat(Math.max(0, str.length - 2));
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          width: 40,
          height: 22,
          borderRadius: 11,
          background: checked ? COLORS.sageTeal : COLORS.hairline,
          position: "relative",
          transition: "background 0.25s",
        }}
      >
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#FFFFFF",
            position: "absolute",
            top: 2,
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        />
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: COLORS.deepNavy,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {checked ? (
          <Eye size={14} style={{ color: COLORS.sageTeal }} />
        ) : (
          <EyeOff size={14} style={{ color: COLORS.slateGrey }} />
        )}
        {label}
      </span>
    </button>
  );
}

function PartyCard({ party, masked, borderColor, index, typeIcon }) {
  const Icon = typeIcon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      style={{
        background: "#FFFFFF",
        borderRadius: 10,
        border: `1px solid ${COLORS.hairline}`,
        borderLeft: `4px solid ${borderColor}`,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: `${borderColor}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={15} style={{ color: borderColor }} />
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: borderColor,
              }}
            >
              {party.role}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: COLORS.deepNavy,
                fontFamily: masked
                  ? "'JetBrains Mono', 'Fira Code', monospace"
                  : "inherit",
              }}
            >
              {masked ? party.maskedName : party.name}
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: COLORS.slateGrey,
            background: `${COLORS.hairline}88`,
            padding: "2px 8px",
            borderRadius: 8,
          }}
        >
          {party.id}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 16px",
          fontSize: 12,
          color: COLORS.slateGrey,
          borderTop: `1px solid ${COLORS.hairline}`,
          paddingTop: 12,
        }}
      >
        <div>
          <span style={{ fontWeight: 600, color: COLORS.deepNavy }}>
            Designation:
          </span>{" "}
          {party.designation}
        </div>
        <div>
          <span style={{ fontWeight: 600, color: COLORS.deepNavy }}>
            Department:
          </span>{" "}
          {party.department}
        </div>
        <div>
          <span style={{ fontWeight: 600, color: COLORS.deepNavy }}>
            Email:
          </span>{" "}
          <span
            style={{
              fontFamily: masked
                ? "'JetBrains Mono', 'Fira Code', monospace"
                : "inherit",
            }}
          >
            {masked ? party.maskedContact : party.contact}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: 600, color: COLORS.deepNavy }}>
            Phone:
          </span>{" "}
          <span
            style={{
              fontFamily: masked
                ? "'JetBrains Mono', 'Fira Code', monospace"
                : "inherit",
            }}
          >
            {masked ? party.maskedPhone : party.phone}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const styles = {
  container: {},
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.deepNavy,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: COLORS.slateGrey,
    marginBottom: 10,
    marginTop: 24,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: 16,
  },
  singleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: 16,
    maxWidth: 420,
  },
};

export default function PartiesTab() {
  const [masked, setMasked] = useState(true);

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div style={styles.title}>
          <Users size={18} style={{ color: COLORS.sageTeal }} />
          Parties Involved
        </div>
        <Toggle
          checked={masked}
          onChange={setMasked}
          label={masked ? "Identity Masked" : "Identity Visible"}
        />
      </div>

      <div style={styles.sectionLabel}>Complainant</div>
      <div style={styles.singleGrid}>
        {mockParties.complainant.map((p, i) => (
          <PartyCard
            key={p.id}
            party={p}
            masked={masked}
            borderColor={COLORS.sageTeal}
            index={i}
            typeIcon={ShieldAlert}
          />
        ))}
      </div>

      <div style={styles.sectionLabel}>Respondent</div>
      <div style={styles.singleGrid}>
        {mockParties.respondent.map((p, i) => (
          <PartyCard
            key={p.id}
            party={p}
            masked={masked}
            borderColor={COLORS.amber}
            index={i}
            typeIcon={ShieldAlert}
          />
        ))}
      </div>

      <div style={styles.sectionLabel}>Witnesses</div>
      <div style={styles.grid}>
        {mockParties.witnesses.map((p, i) => (
          <PartyCard
            key={p.id}
            party={p}
            masked={masked}
            borderColor={COLORS.slateGrey}
            index={i}
            typeIcon={User}
          />
        ))}
      </div>
    </div>
  );
}
