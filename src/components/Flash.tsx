'use client';

import { motion } from 'motion/react';

/** O flash do radar: a tela inteira acende e apaga. Remontar com outra key dispara de novo. */
export function Flash() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0.92 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 70% 20%, #ffffff 0%, #ffffff 40%, #fff7d6 100%)',
      }}
    />
  );
}
