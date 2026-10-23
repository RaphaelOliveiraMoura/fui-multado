'use client';

import { motion } from 'motion/react';

import styles from './Placas.module.css';

const LIMITES = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

export function Placas({ limite, aoEscolher }: { limite: number; aoEscolher: (n: number) => void }) {
  return (
    <div className={styles.linha} role="group" aria-label="Limites comuns">
      <span className="rotulo" style={{ color: 'var(--grafite)' }}>
        ou toca na placa
      </span>
      <div className={styles.placas}>
        {LIMITES.map((v, i) => {
          const ativa = v === limite;
          return (
            <motion.button
              key={v}
              type="button"
              className={styles.placa}
              data-ativa={ativa}
              aria-pressed={ativa}
              aria-label={`Via de ${v} km/h`}
              onClick={() => aoEscolher(v)}
              initial={{ opacity: 0, y: 16, rotate: -20 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.55 + i * 0.035, type: 'spring', stiffness: 380, damping: 22 }}
              whileHover={{ y: -4, rotate: -6 }}
              whileTap={{ scale: 0.88 }}
            >
              {ativa && (
                <motion.span
                  layoutId="placa-ativa"
                  className={styles.anel}
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
              <span className={styles.numero}>{v}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
