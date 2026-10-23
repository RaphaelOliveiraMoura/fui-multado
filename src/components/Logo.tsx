'use client';

import { motion } from 'motion/react';

import styles from './Logo.module.css';

// Três traços de rastro atrás do nome em itálico: a pergunta em alta velocidade.
// Animados por largura (e não por scaleX): num Android real o scaleX ficou em 0.
const TRACOS = [16, 10, 13];

export function Logo({ tom = 'escuro' }: { tom?: 'escuro' | 'claro' }) {
  return (
    <motion.a
      href="#topo"
      className={styles.logo}
      data-tom={tom}
      initial="parado"
      animate="parado"
      whileHover="correndo"
      aria-label="Fui multado? Voltar ao topo"
    >
      <span className={styles.rastro} aria-hidden="true">
        {TRACOS.map((largura, i) => (
          <motion.span
            key={i}
            className={styles.traco}
            initial={{ width: 0 }}
            variants={{
              parado: { width: largura, transition: { delay: 0.15 + i * 0.08, type: 'spring', bounce: 0.3 } },
              correndo: { width: [largura, largura + 8, largura], transition: { duration: 0.5, delay: i * 0.05 } },
            }}
          />
        ))}
      </span>
      <motion.span
        className={styles.nome}
        variants={{ parado: { x: 0 }, correndo: { x: 4 } }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        fui multado?
      </motion.span>
    </motion.a>
  );
}
