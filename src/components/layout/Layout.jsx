import { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = { duration: 0.25, ease: [0, 0, 0.2, 1] };

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const sidebarWidth = isMobile ? 0 : collapsed ? 68 : 272;

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(false);
      document.body.style.overflow = mobileOpen ? 'hidden' : '';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, mobileOpen]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', fontFamily: 'var(--font-body)' }}>
      {/* Mobile overlay backdrop */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobile}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 399,
              backdropFilter: 'blur(2px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {isMobile ? (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-sidebar"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
              style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 400, width: 260 }}
            >
              <Sidebar collapsed={false} onToggleCollapse={closeMobile} isMobile />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 200, width: sidebarWidth }}>
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>
      )}

      {/* Main area */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: isMobile ? 0 : sidebarWidth,
        transition: 'margin-left var(--duration-slow) var(--ease-out)',
      }}>
        <div style={{ position: 'fixed', top: 0, right: 0, left: isMobile ? 0 : 0, zIndex: 300 }}>
          <TopBar
            onMenuToggle={() => setMobileOpen(!mobileOpen)}
            isMobile={isMobile}
            sidebarWidth={isMobile ? 0 : sidebarWidth}
          />
        </div>

        <div style={{
          flex: 1,
          padding: isMobile ? 'var(--space-4)' : 'var(--space-6)',
          paddingTop: isMobile ? 'calc(var(--topbar-height) + var(--space-4))' : 'calc(var(--topbar-height) + var(--space-6))',
        }}>
          <div style={{ maxWidth: 'var(--content-max-width)', margin: '0 auto', width: '100%' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
