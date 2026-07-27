import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Fingerprint,
  KeyRound,
  ChevronLeft,
} from "lucide-react";

const COLORS = {
  deepNavy: "#0F1E33",
  navyLight: "#1E3A5F",
  sageTeal: "#5B8A80",
  amber: "#C08B2C",
  slateGrey: "#5B6472",
  offWhite: "#F7F5F0",
  hairline: "#E2DDD5",
};

const DEMO_USERS = [
  { role: "POSH Admin", email: "admin@company.com", badge: "Admin", icon: ShieldCheck },
  { role: "HR SPOC", email: "hr@company.com", badge: "HR", icon: Fingerprint },
  { role: "Management", email: "mgmt@company.com", badge: "Mgmt", icon: KeyRound },
  { role: "IC Member", email: "ic@company.com", badge: "IC", icon: Shield },
];

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  duration: Math.random() * 8 + 10,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.25 + 0.08,
}));

const inputBaseStyle = {
  width: "100%",
  padding: "13px 14px 13px 42px",
  borderRadius: 10,
  border: "1.5px solid #E2DDD5",
  fontSize: 14,
  color: "#0F1E33",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  outline: "none",
  boxSizing: "border-box",
  background: "#FFFFFF",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
};

const inputFocusProps = {
  onFocus: (e) => {
    e.target.style.borderColor = "#5B8A80";
    e.target.style.boxShadow = "0 0 0 3px rgba(91,138,128,0.12)";
  },
  onBlur: (e) => {
    e.target.style.borderColor = "#E2DDD5";
    e.target.style.boxShadow = "none";
  },
};

function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(91,138,128,0.5)",
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.6, p.opacity * 1.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GridPattern() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.04,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }}
    />
  );
}

function NoiseOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.035,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

function MfaDigitBoxes({ code, onChange, length = 6 }) {
  const inputRef = useRef(null);
  const digits = code.split("").concat(Array(length - code.length).fill(""));

  return (
    <div
      style={{ position: "relative", cursor: "text" }}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoFocus
        value={code}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "").slice(0, length);
          onChange(v);
        }}
        maxLength={length}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          width: "100%",
          height: "100%",
          cursor: "text",
          zIndex: 2,
        }}
      />
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {digits.map((d, i) => (
          <motion.div
            key={i}
            animate={
              i === code.length
                ? { borderColor: "#5B8A80", scale: 1.05 }
                : { borderColor: d ? "#5B8A80" : "#E2DDD5", scale: 1 }
            }
            transition={{ duration: 0.15 }}
            style={{
              width: 52,
              height: 62,
              borderRadius: 12,
              border: "2px solid",
              borderColor: d ? "#5B8A80" : "#E2DDD5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
              color: "#0F1E33",
              background: d ? "rgba(91,138,128,0.04)" : "#FAFAF8",
              boxShadow: d ? "0 0 0 3px rgba(91,138,128,0.1)" : "none",
              transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
            }}
          >
            {d && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {d}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LoadingSpinner({ size = 20 }) {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "2.5px solid rgba(91,138,128,0.2)",
          borderTopColor: "#FFFFFF",
          borderRightColor: "rgba(91,138,128,0.6)",
        }}
      />
    </motion.div>
  );
}

export default function LoginPage({ onLogin }) {
  const [step, setStep] = useState("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("mfa");
    }, 1200);
  };

  const handleMfaSubmit = (e) => {
    e.preventDefault();
    if (mfaCode.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin();
    }, 1200);
  };

  const handleDemoLogin = useCallback(
    (user) => {
      setSelectedRole(user);
      setEmail(user.email);
      setPassword("Demo@1234");
      setError("");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep("mfa");
      }, 900);
    },
    []
  );

  const buttonGradient =
    "linear-gradient(135deg, #5B8A80 0%, #4A7570 50%, #3D6460 100%)";
  const buttonDisabledGradient =
    "linear-gradient(135deg, rgba(91,138,128,0.4) 0%, rgba(91,138,128,0.3) 100%)";

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: COLORS.deepNavy,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @media (max-width: 899px) {
          .posh-login-split { flex-direction: column !important; }
          .posh-login-hero { display: none !important; }
          .posh-login-hero-mobile { display: flex !important; }
          .posh-login-card-wrapper { padding: 0 !important; }
        }
        @media (min-width: 900px) {
          .posh-login-hero-mobile { display: none !important; }
        }
      `}</style>

      <div className="posh-login-split" style={{ display: "flex", flex: 1, minHeight: "100vh" }}>
        <div
          className="posh-login-hero"
          style={{
            display: "flex",
            flex: "0 0 44%",
            maxWidth: 560,
            background: `linear-gradient(165deg, ${COLORS.deepNavy} 0%, ${COLORS.navyLight} 60%, #1a3352 100%)`,
            position: "relative",
            overflow: "hidden",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 60,
          }}
        >
          <GridPattern />
          <NoiseOverlay />
          <Particles />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 30,
              background: "rgba(91,138,128,0.08)",
              border: "1.5px solid rgba(91,138,128,0.2)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 36,
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield size={52} style={{ color: COLORS.sageTeal, strokeWidth: 1.5 }} />
            </motion.div>
            <div
              style={{
                position: "absolute",
                inset: -1,
                borderRadius: 30,
                background: "linear-gradient(135deg, rgba(91,138,128,0.15), transparent 60%)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ textAlign: "center", position: "relative", zIndex: 1 }}
          >
            <div
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 42,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.06em",
                marginBottom: 6,
                lineHeight: 1.1,
              }}
            >
              POSH
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.02em",
                lineHeight: 1.5,
                maxWidth: 280,
              }}
            >
              Prevention of Sexual Harassment
              <br />
              Case Management
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: "flex",
              gap: 24,
              marginTop: 56,
              position: "relative",
              zIndex: 1,
            }}
          >
            {[
              "SOC 2 Compliant",
              "256-bit Encryption",
              "POSH Act 2013",
            ].map((badge) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 10.5,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: COLORS.sageTeal,
                    opacity: 0.6,
                    flexShrink: 0,
                  }}
                />
                {badge}
              </div>
            ))}
          </motion.div>

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 200,
              background: "linear-gradient(to top, rgba(15,30,51,0.6), transparent)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          className="posh-login-hero-mobile"
          style={{
            display: "none",
            background: `linear-gradient(135deg, ${COLORS.deepNavy} 0%, ${COLORS.navyLight} 100%)`,
            padding: "32px 24px 28px",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <GridPattern />
          <NoiseOverlay />
          <Particles />
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(91,138,128,0.1)",
              border: "1.5px solid rgba(91,138,128,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Shield size={28} style={{ color: COLORS.sageTeal, strokeWidth: 1.5 }} />
          </motion.div>
          <div
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "0.06em",
              position: "relative",
              zIndex: 1,
            }}
          >
            POSH
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              position: "relative",
              zIndex: 1,
              marginTop: 2,
            }}
          >
            Case Management Platform
          </div>
        </div>

        <div
          className="posh-login-card-wrapper"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            background: COLORS.offWhite,
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: "100%",
              maxWidth: 420,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "none",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 28,
              }}
              className="posh-login-hero-mobile"
            />

            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "36px 32px 32px",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06), 0 24px 60px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <AnimatePresence mode="wait">
                {step === "credentials" ? (
                  <motion.div
                    key="credentials"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <h2
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: 22,
                        fontWeight: 700,
                        color: COLORS.deepNavy,
                        marginBottom: 4,
                        lineHeight: 1.2,
                      }}
                    >
                      Welcome back
                    </h2>
                    <p
                      style={{
                        fontSize: 13.5,
                        color: COLORS.slateGrey,
                        marginBottom: 28,
                        lineHeight: 1.5,
                      }}
                    >
                      Sign in to access the POSH platform
                    </p>

                    <form onSubmit={handleCredentialsSubmit}>
                      <div style={{ marginBottom: 18 }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: COLORS.deepNavy,
                            marginBottom: 7,
                            letterSpacing: "0.01em",
                          }}
                        >
                          Work Email
                        </label>
                        <div style={{ position: "relative" }}>
                          <Mail
                            size={16}
                            style={{
                              position: "absolute",
                              left: 13,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: COLORS.slateGrey,
                              opacity: 0.6,
                            }}
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            style={inputBaseStyle}
                            {...inputFocusProps}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: COLORS.deepNavy,
                            marginBottom: 7,
                            letterSpacing: "0.01em",
                          }}
                        >
                          Password
                        </label>
                        <div style={{ position: "relative" }}>
                          <Lock
                            size={16}
                            style={{
                              position: "absolute",
                              left: 13,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: COLORS.slateGrey,
                              opacity: 0.6,
                            }}
                          />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={{
                              ...inputBaseStyle,
                              paddingRight: 44,
                            }}
                            {...inputFocusProps}
                          />
                          <motion.button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                              position: "absolute",
                              right: 10,
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 5,
                              color: COLORS.slateGrey,
                              opacity: 0.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.opacity = "0.8")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.opacity = "0.5")
                            }
                          >
                            <AnimatePresence mode="wait">
                              {showPassword ? (
                                <motion.div
                                  key="eyeoff"
                                  initial={{ rotate: -90, opacity: 0 }}
                                  animate={{ rotate: 0, opacity: 1 }}
                                  exit={{ rotate: 90, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <EyeOff size={16} />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="eye"
                                  initial={{ rotate: 90, opacity: 0 }}
                                  animate={{ rotate: 0, opacity: 1 }}
                                  exit={{ rotate: -90, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Eye size={16} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </div>
                      </div>

                      <div style={{ minHeight: 20, marginBottom: 8 }}>
                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -6, height: 0 }}
                              style={{
                                fontSize: 12.5,
                                color: "#B83A3A",
                                padding: "9px 13px",
                                borderRadius: 8,
                                background: "rgba(184,58,58,0.05)",
                                border: "1px solid rgba(184,58,58,0.12)",
                                lineHeight: 1.4,
                              }}
                            >
                              {error}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { y: -1, boxShadow: "0 6px 24px rgba(91,138,128,0.35)" } : {}}
                        whileTap={!loading ? { scale: 0.985 } : {}}
                        style={{
                          width: "100%",
                          padding: "13px 20px",
                          borderRadius: 10,
                          fontSize: 14.5,
                          fontWeight: 600,
                          color: "#FFFFFF",
                          background: loading ? buttonDisabledGradient : buttonGradient,
                          border: "none",
                          cursor: loading ? "not-allowed" : "pointer",
                          fontFamily: "'Inter', sans-serif",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          boxShadow: "0 2px 8px rgba(91,138,128,0.2)",
                          transition: "background 0.3s ease",
                        }}
                      >
                        {loading ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            Continue
                            <ArrowRight size={16} strokeWidth={2.5} />
                          </>
                        )}
                      </motion.button>
                    </form>

                    <div
                      style={{
                        marginTop: 28,
                        paddingTop: 22,
                        borderTop: "1px solid #EEEAE4",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: COLORS.slateGrey,
                          textAlign: "center",
                          marginBottom: 14,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          opacity: 0.6,
                        }}
                      >
                        Quick Demo Access
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {DEMO_USERS.map((u) => {
                          const Icon = u.icon;
                          const isActive = selectedRole?.role === u.role;
                          return (
                            <motion.button
                              key={u.role}
                              onClick={() => handleDemoLogin(u)}
                              whileHover={{
                                y: -2,
                                boxShadow: "0 4px 16px rgba(91,138,128,0.12)",
                              }}
                              whileTap={{ scale: 0.97 }}
                              style={{
                                padding: "11px 12px",
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 500,
                                color: isActive ? COLORS.sageTeal : COLORS.deepNavy,
                                background: isActive
                                  ? "rgba(91,138,128,0.06)"
                                  : "#FDFCFA",
                                border: `1.5px solid ${
                                  isActive ? COLORS.sageTeal : "#EEEAE4"
                                }`,
                                cursor: "pointer",
                                fontFamily: "'Inter', sans-serif",
                                textAlign: "left",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                transition: "border-color 0.2s, background 0.2s, color 0.2s",
                              }}
                            >
                              <div
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 8,
                                  background: isActive
                                    ? "rgba(91,138,128,0.12)"
                                    : "rgba(91,138,128,0.06)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <Icon
                                  size={14}
                                  style={{ color: isActive ? COLORS.sageTeal : COLORS.slateGrey }}
                                />
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 12,
                                    lineHeight: 1.2,
                                    marginBottom: 1,
                                  }}
                                >
                                  {u.role}
                                </div>
                                <div
                                  style={{
                                    fontSize: 10.5,
                                    color: COLORS.slateGrey,
                                    opacity: 0.7,
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {u.email}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mfa"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background:
                          "linear-gradient(135deg, rgba(91,138,128,0.1), rgba(91,138,128,0.05))",
                        margin: "0 auto 20px",
                        border: "1px solid rgba(91,138,128,0.15)",
                      }}
                    >
                      <Shield size={26} style={{ color: COLORS.sageTeal, strokeWidth: 1.5 }} />
                    </div>

                    <h2
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: 22,
                        fontWeight: 700,
                        color: COLORS.deepNavy,
                        marginBottom: 6,
                        textAlign: "center",
                        lineHeight: 1.2,
                      }}
                    >
                      Two-Factor Authentication
                    </h2>
                    <p
                      style={{
                        fontSize: 13.5,
                        color: COLORS.slateGrey,
                        marginBottom: 30,
                        textAlign: "center",
                        lineHeight: 1.5,
                      }}
                    >
                      Enter the 6-digit code from your authenticator app
                    </p>

                    <form onSubmit={handleMfaSubmit}>
                      <div style={{ marginBottom: 28 }}>
                        <MfaDigitBoxes code={mfaCode} onChange={(v) => { setMfaCode(v); setError(""); }} />
                      </div>

                      <div style={{ minHeight: 20, marginBottom: 4 }}>
                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -6, height: 0 }}
                              style={{
                                fontSize: 12.5,
                                color: "#B83A3A",
                                padding: "9px 13px",
                                borderRadius: 8,
                                background: "rgba(184,58,58,0.05)",
                                border: "1px solid rgba(184,58,58,0.12)",
                                lineHeight: 1.4,
                              }}
                            >
                              {error}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading || mfaCode.length !== 6}
                        whileHover={
                          !(loading || mfaCode.length !== 6)
                            ? { y: -1, boxShadow: "0 6px 24px rgba(91,138,128,0.35)" }
                            : {}
                        }
                        whileTap={
                          !(loading || mfaCode.length !== 6) ? { scale: 0.985 } : {}
                        }
                        style={{
                          width: "100%",
                          padding: "13px 20px",
                          borderRadius: 10,
                          fontSize: 14.5,
                          fontWeight: 600,
                          color: "#FFFFFF",
                          background:
                            loading || mfaCode.length !== 6
                              ? buttonDisabledGradient
                              : buttonGradient,
                          border: "none",
                          cursor:
                            loading || mfaCode.length !== 6 ? "not-allowed" : "pointer",
                          fontFamily: "'Inter', sans-serif",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          boxShadow:
                            loading || mfaCode.length !== 6
                              ? "none"
                              : "0 2px 8px rgba(91,138,128,0.2)",
                          transition: "background 0.3s ease, box-shadow 0.3s ease",
                          marginTop: 8,
                        }}
                      >
                        {loading ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            <CheckCircle2 size={16} strokeWidth={2.5} />
                            Verify & Sign In
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => {
                          setStep("credentials");
                          setMfaCode("");
                          setError("");
                        }}
                        whileHover={{ backgroundColor: "#F7F5F0" }}
                        style={{
                          width: "100%",
                          marginTop: 10,
                          padding: "11px",
                          borderRadius: 10,
                          fontSize: 13,
                          fontWeight: 500,
                          color: COLORS.slateGrey,
                          background: "transparent",
                          border: "1.5px solid #EEEAE4",
                          cursor: "pointer",
                          fontFamily: "'Inter', sans-serif",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          transition: "background 0.2s",
                        }}
                      >
                        <ChevronLeft size={14} />
                        Back to Sign In
                      </motion.button>
                    </form>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        marginTop: 22,
                        padding: "11px 16px",
                        borderRadius: 10,
                        background: "rgba(192,139,44,0.06)",
                        border: "1px solid rgba(192,139,44,0.15)",
                        fontSize: 12.5,
                        color: COLORS.slateGrey,
                        textAlign: "center",
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ fontWeight: 600, color: COLORS.amber }}>Demo:</span>{" "}
                      enter any 6 digits to proceed
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                textAlign: "center",
                marginTop: 24,
                fontSize: 11,
                color: COLORS.slateGrey,
                opacity: 0.4,
                lineHeight: 1.6,
              }}
            >
              All access is logged &bull; Confidential system &bull; Authorised
              personnel only
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
