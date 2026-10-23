'use client';

import { AnimatePresence, motion } from 'motion/react';

import type { Leitura } from '@/lib/radar';
import { VEREDITOS } from '@/lib/radar';

import styles from './Veredito.module.css';

export function Veredito({ leitura }: { leitura: Leitura }) {
  const v = VEREDITOS[leitura.categoria];

  return (
    <div className={styles.linha} aria-live="polite">
      <span className={styles.pergunta}>Fui multado?</span>
      <motion.span
        layout
        className={styles.resposta}
        animate={{ backgroundColor: v.cor, color: v.tinta }}
        transition={{ layout: { type: 'spring', stiffness: 420, damping: 30 }, duration: 0.35 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={v.resposta}
            className={styles.texto}
            // Multa entra como carimbo: grande, torta, e assenta.
            initial={leitura.multado ? { scale: 1.8, rotate: -10, opacity: 0 } : { y: '110%', opacity: 0 }}
            animate={{ scale: 1, rotate: 0, y: '0%', opacity: 1 }}
            exit={{ y: '-110%', opacity: 0, transition: { duration: 0.18 } }}
            transition={{ type: 'spring', stiffness: 460, damping: 24 }}
          >
            {v.resposta}
          </motion.span>
        </AnimatePresence>
      </motion.span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={leitura.categoria}
          className={styles.resumo}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.22 }}
        >
          {leitura.resumo}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
