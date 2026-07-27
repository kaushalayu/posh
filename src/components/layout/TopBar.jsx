import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, LogOut, User, X, Menu } from 'lucide-react';

const ROUTE_TITLES = {
  '/dashboard':     'Dashboard',
  '/complaints':    'Complaints',
  '/cases':         'Case Workspace',
  '/proceedings':   'Proceedings',
  '/documents':     'Documents',
  '/evidence':      'Evidence',
  '/actions':       'Action Tracker',
  '/reports':       'Reports & Exports',
  '/audit':         'Audit Log',
  '/settings':      'Settings',
};

function getRouteTitle(pathname) {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const key = '/' + segments[0];
    if (ROUTE_TITLES[key]) return ROUTE_TITLES[key];
  }
  return 'Dashboard';
}

export default function TopBar({ onMenuToggle, isMobile, sidebarWidth = 0 }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount] = useState(5);
  const dropdownRef = useRef(null);
  const [bellPulse, setBellPulse] = useState(true);

  const pageTitle = getRouteTitle(location.pathname);

  useEffect(() => {
    const t = setTimeout(() => setBellPulse(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: isMobile ? 0 : sidebarWidth,
      right: 0,
      height: 'var(--topbar-height)',
      background: 'rgba(247, 245, 240, 0.92)',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 var(--space-4)' : '0 var(--space-6)',
      zIndex: 300,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      transition: 'left var(--duration-slow) var(--ease-out)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        {isMobile && (
          <button
            onClick={onMenuToggle}
            aria-label="Toggle menu"
            style={{
              width: 36, height: 36,
              borderRadius: 'var(--radius-lg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              transition: 'background var(--duration-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(216,211,200,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.h1
            key={location.pathname}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-xl)',
              fontWeight: 'var(--weight-semibold)',
              color: 'var(--color-primary)',
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {pageTitle}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 'var(--space-2)' : 'var(--space-4)' }}>
        {/* Search - hidden on small mobile */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{
            position: 'absolute',
            left: 11,
            color: 'var(--color-secondary-text)',
            pointerEvents: 'none',
            display: 'flex',
          }}>
            <Search size={14} strokeWidth={2} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: isMobile ? 120 : 220,
              height: 34,
              padding: '0 var(--space-3) 0 36px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: searchFocused ? '#5B8A80' : 'var(--color-border)',
              background: searchFocused ? 'rgba(91,138,128,0.04)' : 'rgba(216,211,200,0.2)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-primary)',
              outline: 'none',
              boxShadow: searchFocused ? '0 0 0 3px rgba(91,138,128,0.12)' : 'none',
              transition: 'all var(--duration-fast) var(--ease-default)',
            }}
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              style={{
                position: 'absolute', right: 8,
                background: 'none', border: 'none',
                color: 'var(--color-secondary-text)',
                cursor: 'pointer', display: 'flex', padding: 2,
                borderRadius: 'var(--radius-full)',
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Notifications */}
        <button
          style={{
            position: 'relative',
            background: 'none', border: 'none',
            color: 'var(--color-secondary-text)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 34, height: 34,
            borderRadius: 'var(--radius-full)',
            transition: 'background var(--duration-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(216,211,200,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          aria-label={`Notifications (${notificationCount})`}
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <motion.span
              style={{
                position: 'absolute', top: 2, right: 2,
                width: 18, height: 18,
                borderRadius: 'var(--radius-full)',
                background: '#C08B2C', color: '#FFFFFF',
                fontSize: 10, fontWeight: 'var(--weight-bold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1, border: '2px solid #F7F5F0',
              }}
              animate={bellPulse ? { scale: [1, 1.15, 1] } : {}}
              transition={bellPulse ? { duration: 0.6, repeat: Infinity, repeatDelay: 1.2 } : {}}
            >
              {notificationCount}
            </motion.span>
          )}
        </button>

        {/* User dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
              background: 'none',
              border: '1px solid transparent',
              borderRadius: 'var(--radius-lg)',
              padding: '4px 8px 4px 4px',
              cursor: 'pointer',
              transition: 'all var(--duration-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'rgba(216,211,200,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.background = 'none';
            }}
          >
            <div style={{
              width: 30, height: 30,
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, #5B8A80, #1E3A5F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF', fontSize: 11, fontWeight: 'var(--weight-bold)',
              flexShrink: 0,
            }}>SK</div>
            {!isMobile && (
              <>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--color-primary)',
                }}>Saanya</span>
                <ChevronDown
                  size={14}
                  style={{
                    color: 'var(--color-secondary-text)',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform var(--duration-fast)',
                  }}
                />
              </>
            )}
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: 'calc(var(--topbar-height) + 4px)',
                  right: 0,
                  minWidth: 180,
                  background: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: 'var(--space-1)',
                  zIndex: 500,
                  overflow: 'hidden',
                }}
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    padding: 'var(--space-2) var(--space-3)',
                    fontSize: 'var(--text-sm)', color: 'var(--color-primary)',
                    background: 'none', border: 'none', width: '100%',
                    textAlign: 'left', borderRadius: 'var(--radius-md)',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    transition: 'background var(--duration-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(216,211,200,0.25)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  <User size={15} />
                  My Profile
                </button>
                <div style={{ height: 1, background: 'var(--color-border)', margin: 'var(--space-1) 0' }} />
                <button
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    padding: 'var(--space-2) var(--space-3)',
                    fontSize: 'var(--text-sm)', color: '#B83A3A',
                    background: 'none', border: 'none', width: '100%',
                    textAlign: 'left', borderRadius: 'var(--radius-md)',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    transition: 'background var(--duration-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(184,58,58,0.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
