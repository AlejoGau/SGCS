import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
  /** Total duration in ms before auto-dismiss (default 3800) */
  duration?: number;
}

/* ------------------------------------------------------------------ */
/* Floating particle background                                        */
/* ------------------------------------------------------------------ */
const Particle: React.FC<{ delay: number; size: number; x: number; y: number }> = ({
  delay,
  size,
  x,
  y,
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: `radial-gradient(circle, rgba(249,115,22,${0.15 + Math.random() * 0.25}) 0%, transparent 70%)`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0.4, 0.8, 0],
      scale: [0, 1.2, 0.8, 1, 0.6],
      y: [0, -30, -10, -50],
    }}
    transition={{
      duration: 3.5,
      delay,
      ease: 'easeInOut',
    }}
  />
);

/* ------------------------------------------------------------------ */
/* Scanning line (top-to-bottom security scan effect)                   */
/* ------------------------------------------------------------------ */
const ScanLine: React.FC = () => (
  <motion.div
    className="absolute left-0 right-0 h-[2px] z-20"
    style={{
      background:
        'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.0) 10%, rgba(249,115,22,0.6) 50%, rgba(249,115,22,0.0) 90%, transparent 100%)',
      boxShadow: '0 0 20px 4px rgba(249,115,22,0.3)',
    }}
    initial={{ top: '0%', opacity: 0 }}
    animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
    transition={{ duration: 2.0, delay: 0.4, ease: 'easeInOut' }}
  />
);

/* ------------------------------------------------------------------ */
/* Concentric ring pulse                                               */
/* ------------------------------------------------------------------ */
const PulseRing: React.FC<{ delay: number; size: number }> = ({ delay, size }) => (
  <motion.div
    className="absolute rounded-full border border-orange-500/30"
    style={{
      width: size,
      height: size,
      top: '50%',
      left: '50%',
      marginTop: -size / 2,
      marginLeft: -size / 2,
    }}
    initial={{ opacity: 0, scale: 0.4 }}
    animate={{ opacity: [0, 0.6, 0], scale: [0.4, 1.3, 1.8] }}
    transition={{ duration: 2.4, delay, ease: 'easeOut' }}
  />
);

/* ------------------------------------------------------------------ */
/* Main Splash Screen                                                  */
/* ------------------------------------------------------------------ */
export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  duration = 3800,
}) => {
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, dismiss]);

  // Generate particles once
  const particles = React.useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        delay: Math.random() * 1.5,
        size: 4 + Math.random() * 10,
        x: Math.random() * 100,
        y: Math.random() * 100,
      })),
    [],
  );

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center select-none overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at center, #1a1a1f 0%, #09090b 100%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* ---- Ambient background ---- */}
          {/* Large blurred orb */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              marginTop: -300,
              marginLeft: -300,
              filter: 'blur(80px)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Particles */}
          {particles.map((p) => (
            <Particle key={p.id} {...p} />
          ))}

          {/* Scan line */}
          <ScanLine />

          {/* Pulse rings */}
          <PulseRing delay={0.6} size={200} />
          <PulseRing delay={1.0} size={320} />
          <PulseRing delay={1.4} size={440} />

          {/* ---- Centre content ---- */}
          <div className="relative z-30 flex flex-col items-center">
            {/* Logo container */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent, rgba(249,115,22,0.4), transparent, rgba(249,115,22,0.2), transparent)',
                  filter: 'blur(6px)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner glow */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{
                  boxShadow: '0 0 60px 15px rgba(249,115,22,0.25), inset 0 0 30px rgba(249,115,22,0.1)',
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Logo image */}
              <motion.img
                src="/softguard-logo.jpg"
                alt="Softguard"
                className="relative z-10 w-28 h-28 rounded-full object-cover"
                style={{
                  boxShadow:
                    '0 0 40px rgba(249,115,22,0.3), 0 0 80px rgba(249,115,22,0.15), inset 0 0 20px rgba(0,0,0,0.5)',
                }}
                initial={{ filter: 'brightness(0.3)' }}
                animate={{ filter: 'brightness(1.1)' }}
                transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="mt-8 flex items-center gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-3xl font-bold tracking-tight text-white">
                SOFT
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-orange-500">
                GUARD
              </span>
              <span className="text-2xl font-black tracking-tight text-orange-500 ml-1.5 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-lg">
                2.0
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="mt-2 text-xs uppercase tracking-[0.35em] text-zinc-500 font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              CloudSecurity Suite
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="mt-8 w-48 h-[3px] rounded-full overflow-hidden bg-zinc-800/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(249,115,22,0.8), rgba(251,146,60,1), rgba(249,115,22,0.8))',
                  boxShadow: '0 0 12px rgba(249,115,22,0.6)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: (duration - 1600) / 1000,
                  delay: 1.6,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Version tag */}
            <motion.span
              className="mt-4 text-[10px] uppercase tracking-widest text-zinc-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
            >
              Cargando plataforma…
            </motion.span>
          </div>

          {/* ---- Vignette overlay ---- */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
