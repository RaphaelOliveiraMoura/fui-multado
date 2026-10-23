'use client';

import { motion, useScroll, useSpring } from 'motion/react';

/** A faixa da pista no topo da tela vai se pintando conforme a página rola. */
export function ProgressoEstrada() {
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 5,
        zIndex: 40,
        transformOrigin: 'left center',
        scaleX: escala,
        backgroundImage: 'repeating-linear-gradient(90deg, #FFC629 0 28px, transparent 28px 44px)',
      }}
    />
  );
}
