import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Briefcase, Calendar, FolderOpen,
  Shield, CheckSquare, BarChart3, Eye, Settings,
  ChevronLeft, ChevronRight, Scale, LogOut, Search,
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    label: 'MAIN',
    items: [
      { to: '/dashboard',   icon: LayoutDashboard, label: 'Dashboard', badge: null },
      { to: '/complaints',  icon: FileText,        label: 'Complaints', badge: 3 },
      { to: '/cases',       icon: Briefcase,       label: 'Case Workspace', badge: null },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { to: '/proceedings', icon: Calendar,    label: 'Proceedings', badge: 1 },
      { to: '/documents',   icon: FolderOpen,  label: 'Documents', badge: null },
      { to: '/evidence',    icon: Shield,      label: 'Evidence', badge: null },
      { to: '/actions',     icon: CheckSquare,  label: 'Action Tracker', badge: 5 },
    ],
  },
  {
    label: 'ADMIN',
    items: [
      { to: '/reports',  icon: BarChart3, label: 'Reports & Exports', badge: null },
      { to: '/audit',    icon: Eye,       label: 'Audit Log', badge: null },
      { to: '/settings', icon: Settings,  label: 'Settings', badge: null },
    ],
  },
];

function NavItem({ item, collapsed }) {
  const [hovered, setHovered] = useState(false);

  return (
    <NavLink
      to={item.to}
      end={item.to === '/dashboard'}
      style={({ isActive }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: collapsed ? '0 11px' : '0 14px',
        height: 40,
        color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
        textDecoration: 'none',
        fontSize: 13,
        fontWeight: isActive ? 600 : 500,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        cursor: 'pointer',
        border: 'none',
        background: isActive
          ? 'linear-gradient(90deg, rgba(91,138,128,0.18) 0%, rgba(91,138,128,0.04) 100%)'
          : 'transparent',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 10,
        margin: collapsed ? '1px 6px' : '1px 10px',
        transition: 'all 180ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {({ isActive }) => (
        <>
          <AnimatePresence>
            {isActive && (
              <motion.div
                key="accent"
                style={{
                  position: 'absolute',
                  left: collapsed ? 'calc(50% - 14px)' : 0,
                  top: 8, bottom: 8,
                  width: 3,
                  borderRadius: '0 3px 3px 0',
                  background: 'linear-gradient(180deg, #5B8A80, #4D7A70)',
                  boxShadow: '0 0 8px rgba(91,138,128,0.4)',
                }}
                layoutId="sidebarAccent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}
          </AnimatePresence>

          <motion.div
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(91, 138, 128, 0.07)',
              borderRadius: 10, zIndex: 0,
            }}
            animate={{ opacity: hovered && !isActive ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          />

          <item.icon
            style={{
              width: 18, height: 18, flexShrink: 0,
              zIndex: 1, position: 'relative',
              color: isActive ? '#5B8A80' : undefined,
            }}
            strokeWidth={isActive ? 2.2 : 1.6}
          />

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                style={{ zIndex: 1, position: 'relative', flex: 1 }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>

          {!collapsed && item.badge && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                minWidth: 20, height: 20,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #C08B2C, #A87725)',
                color: '#FFFFFF',
                fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 6px',
                boxShadow: '0 2px 6px rgba(192,139,44,0.4)',
              }}
            >
              {item.badge}
            </motion.span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ collapsed = false, onToggleCollapse, isMobile }) {
  const sidebarWidth = isMobile ? 260 : collapsed ? 68 : 272;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: '100vh',
      width: sidebarWidth,
      background: 'linear-gradient(180deg, #0B1624 0%, #0F1E33 35%, #0D1A2D 100%)',
      display: 'flex', flexDirection: 'column',
      zIndex: isMobile ? 400 : 200,
      overflow: 'hidden',
      transition: isMobile ? 'none' : 'width 250ms cubic-bezier(0, 0, 0.2, 1)',
    }}>
      {/* Subtle texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 15% 0%, rgba(91,138,128,0.08) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 100%, rgba(30,58,95,0.06) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Brand / Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: collapsed ? '0 16px' : '0 20px',
        height: 64,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0, overflow: 'hidden', whiteSpace: 'nowrap',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: 12, position: 'relative',
      }}>
        {/* Logo */}
        <div style={{
          width: 38, height: 38, borderRadius: 11,
          background: 'linear-gradient(135deg, #5B8A80, #1E3A5F)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(91,138,128,0.35)',
          flexShrink: 0, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -10, left: -10, width: 36, height: 36,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25), transparent)',
            borderRadius: '50%', transform: 'rotate(45deg)',
          }} />
          <Scale size={18} color="#FFFFFF" strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
        </div>

        <AnimatePresence mode="wait">
          {(!collapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden', flex: 1 }}
            >
              <div style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 20, fontWeight: 700, color: '#FFFFFF',
                letterSpacing: '0.05em', lineHeight: 1,
              }}>
                POSH
              </div>
              <div style={{
                fontSize: 10, color: 'rgba(255,255,255,0.35)',
                fontWeight: 600, letterSpacing: '0.14em',
                textTransform: 'uppercase', marginTop: 3,
              }}>
                COMPLIANCE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search bar (expanded only) */}
      {!collapsed && !isMobile && (
        <div style={{ padding: '12px 14px 4px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 9,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <Search size={14} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
              Search...
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sidebar-nav" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 0', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {NAV_SECTIONS.map((section, si) => (
          <div key={section.label} style={{ marginBottom: si < NAV_SECTIONS.length - 1 ? 6 : 0 }}>
            {!collapsed && (
              <div style={{
                padding: '10px 24px 6px',
                fontSize: 10, fontWeight: 700,
                color: 'rgba(255,255,255,0.22)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                {section.label}
              </div>
            )}
            {collapsed && si > 0 && (
              <div style={{
                height: 1, margin: '6px 12px',
                background: 'rgba(255,255,255,0.06)',
              }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {section.items.map((item) => (
                <NavItem key={item.to} item={item} collapsed={collapsed && !isMobile} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div style={{
        padding: collapsed ? '12px 8px' : '10px 14px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0, position: 'relative',
      }}>
        <motion.div
          whileHover={{ background: 'rgba(255,255,255,0.06)' }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px',
            borderRadius: 12,
            cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'background 150ms',
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #5B8A80, #1E3A5F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FFFFFF', fontSize: 12, fontWeight: 700,
            flexShrink: 0, position: 'relative',
          }}>
            SK
            <div style={{
              position: 'absolute', bottom: -1, right: -1,
              width: 11, height: 11, borderRadius: 6,
              background: '#4ADE80', border: '2px solid #0F1E33',
            }} />
          </div>

          <AnimatePresence mode="wait">
            {(!collapsed || isMobile) && (
              <motion.div
                key="user"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}
              >
                <div style={{
                  color: '#FFFFFF', fontSize: 13, fontWeight: 600,
                  lineHeight: 1.2, whiteSpace: 'nowrap',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  Saanya Kapoor
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                  <span style={{
                    padding: '2px 7px', borderRadius: 6,
                    background: 'linear-gradient(135deg, rgba(192,139,44,0.2), rgba(192,139,44,0.08))',
                    color: '#C08B2C', fontSize: 9, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    Admin
                  </span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>•</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Online</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!collapsed && !isMobile && (
            <motion.button
              whileHover={{ background: 'rgba(255,255,255,0.1)' }}
              style={{
                width: 28, height: 28, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none',
                color: 'rgba(255,255,255,0.35)', cursor: 'pointer',
                flexShrink: 0,
              }}
              title="Sign out"
            >
              <LogOut size={14} />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Collapse toggle removed */}
    </div>
  );
}
