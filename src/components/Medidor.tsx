'use client';

import { motion } from 'motion/react';
import { useRef } from 'react';

import type { Leitura } from '@/lib/radar';
import { faixas, VEREDITOS } from '@/lib/radar';

import styles from './Medidor.module.css';

/**
 * A régua da gravidade em velocidade medida. Também é um controle: arrastar ou
 * clicar nela muda o que o radar marcou.
 */
export function Medidor({ leitura, aoMudar }: { leitura: Leitura; aoMudar: (n: number) => void }) {
  const trilho = useRef<HTMLDivElement>(null);
  const { faixas: lista, teto } = faixas(leitura.limite);
  const posicao = Math.min(100, (leitura.medida / teto) * 100);

  function valorNoPonto(clientX: number) {
    const r = trilho.current!.getBoundingClientRect();
    const fracao = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    aoMudar(Math.round(fracao * teto));
  }

  function aoTeclar(e: React.KeyboardEvent) {
    const passo = e.shiftKey ? 10 : 1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') aoMudar(Math.min(teto, leitura.medida + passo));
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') aoMudar(Math.max(0, leitura.medida - passo));
    else if (e.key === 'Home') aoMudar(0);
    else if (e.key === 'End') aoMudar(teto);
    else return;
    e.preventDefault();
  }

  return (
    <div className={styles.medidor}>
      <span className="rotulo">Onde você caiu numa via de {leitura.limite} km/h · arraste a régua</span>
      <div
        ref={trilho}
        className={styles.trilho}
        role="slider"
        tabIndex={0}
        aria-label="Velocidade que o radar marcou"
        aria-valuemin={0}
        aria-valuemax={teto}
        aria-valuenow={leitura.medida}
        aria-valuetext={`${leitura.medida} km/h, ${VEREDITOS[leitura.categoria].nome}`}
        onKeyDown={aoTeclar}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          valorNoPonto(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) valorNoPonto(e.clientX);
        }}
      >
        <motion.div
          className={styles.marcador}
          animate={{ left: `${posicao}%` }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        >
          <span className={styles.bolha}>{leitura.medida}</span>
          <span className={styles.haste} />
        </motion.div>
        <div className={styles.barras}>
          {lista.map((f) => (
            <motion.div
              key={f.categoria}
              className={styles.barra}
              initial={false}
              animate={{
                flexBasis: `${((f.ate - f.de) / teto) * 100}%`,
                opacity: f.categoria === leitura.categoria ? 1 : 0.3,
                scaleY: f.categoria === leitura.categoria ? 1.5 : 1,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              style={{ backgroundColor: VEREDITOS[f.categoria].cor }}
            />
          ))}
        </div>
      </div>
      <ul className={styles.legenda}>
        {lista.map((f) => (
          <li key={f.categoria} data-ativa={f.categoria === leitura.categoria}>
            <span className={styles.ponto} style={{ backgroundColor: VEREDITOS[f.categoria].cor }} />
            {VEREDITOS[f.categoria].nome}
            <span className={styles.faixa}>{f.rotulo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
