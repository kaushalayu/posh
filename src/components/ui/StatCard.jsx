import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useIsMobile } from '../../hooks/useMediaQuery';

const colorMap = {
  teal:   { bg: 'rgba(91,138,128,0.1)', fg: '#5B8A80', gradient: 'linear-gradient(135deg, #5B8A80, #4D7A70)', glow: 'rgba(91,138,128,0.15)' },
  amber:  { bg: 'rgba(192,139,44,0.1)', fg: '#C08B2C', gradient: 'linear-gradient(135deg, #C08B2C, #A87725)', glow: 'rgba(192,139,44,0.15)' },
  navy:   { bg: 'rgba(15,30,51,0.1)', fg: '#0F1E33', gradient: 'linear-gradient(135deg, #0F1E33, #1E3A5F)', glow: 'rgba(15,30,51,0.15)' },
  slate:  { bg: 'rgba(91,100,114,0.1)', fg: '#5B6472', gradient: 'linear-gradient(135deg, #5B6472, #4A5260)', glow: 'rgba(91,100,114,0.15)' },
};

const trendConfig = {
  up:      { Icon: TrendingUp, color: '#5B8A80', bg: 'rgba(91,138,128,0.08)' },
  down:    { Icon: TrendingDown, color: '#C08B2C', bg: 'rgba(192,139,44,0.08)' },
  neutral: { Icon: Minus, color: '#5B6472', bg: 'rgba(91,100,114,0.08)' },
};

export default function StatCard({ title, value, icon: Icon, trend, trendValue, color = 'teal', subtitle }) {
  const isMobile = useIsMobile();
  const [display, setDisplay] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const numeric = typeof value === 'number' ? value : parseInt(value, 10);
  const isNum = !isNaN(numeric);
  const palette = colorMap[color] || colorMap.teal;

  useEffect(() => {
    if (!isNum) return;
    const duration = 1800;
    let raf;
    const ts = performance.now();
    const animate = (now) => {
      const elapsed = now - ts;
      const progress = Math.min(elapsed / duration, 1);
      // Premium easing - smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(eased * numeric));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [numeric, isNum]);

  const TrendIcon = trend ? trendConfig[trend]?.Icon : null;
  const trendColor = trend ? trendConfig[trend]?.color : undefined;
  const trendBg = trend ? trendConfig[trend]?.bg : undefined;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -4 : 0,
        boxShadow: isHovered
          ? `0 20px 40px ${palette.glow}, 0 4px 12px rgba(0,0,0,0.06)`
          : '0 2px 8px rgba(0,0,0,0.06)',
      }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: isMobile ? '18px' : '24px',
        position: 'relative',
        cursor: 'default',
        borderLeft: `4px solid ${palette.fg}`,
        overflow: 'hidden',
      }}
    >
      {/* Top-right gradient decoration */}
      <motion.div
        animate={{ opacity: isHovered ? 0.08 : 0.03, scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: -30, right: -30,
          width: 120, height: 120,
          background: palette.gradient,
          borderRadius: '50%',
          filter: 'blur(20px)',
        }}
      />

      {/* Icon + Trend Row */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: isMobile ? 14 : 18,
      }}>
        <motion.div
          animate={{
            scale: isHovered ? 1.08 : 1,
            rotate: isHovered ? 3 : 0,
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: isMobile ? 42 : 48, height: isMobile ? 42 : 48,
            borderRadius: 14,
            background: palette.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Icon glow ring on hover */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', inset: -3,
              borderRadius: 17,
              border: `2px solid ${palette.fg}20`,
            }}
          />
          {Icon && <Icon size={isMobile ? 20 : 24} color={palette.fg} strokeWidth={1.8} />}
        </motion.div>

        {TrendIcon && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: trendBg,
            }}
          >
            <TrendIcon size={12} color={trendColor} />
            <span style={{
              fontSize: 11, fontWeight: 600, color: trendColor,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {trendValue}
            </span>
          </motion.div>
        )}
      </div>

      {/* Title */}
      <div style={{
        fontSize: isMobile ? 11 : 12,
        color: '#5B6472',
        fontWeight: 600,
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {title}
      </div>

      {/* Value */}
      <div style={{
        fontSize: isMobile ? 28 : 36,
        fontWeight: 800,
        color: '#0F1E33',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.02em',
      }}>
        {isNum ? display.toLocaleString() : value}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div style={{
          fontSize: 11, color: '#5B6472',
          marginTop: 6, opacity: 0.7,
        }}>
          {subtitle}
        </div>
      )}

      {/* Bottom shimmer line on hover */}
      <motion.div
        animate={{
          scaleX: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2,
          background: palette.gradient,
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  );
}
