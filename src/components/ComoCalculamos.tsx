'use client';

import { motion } from 'motion/react';

import type { Leitura } from '@/lib/radar';
import { VEREDITOS } from '@/lib/radar';

import styles from './ComoCalculamos.module.css';
import { NumeroAnimado } from './NumeroAnimado';

const cartao = {
  oculto: { opacity: 0, y: 40, rotate: -1.5 },
  visivel: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: i * 0.12, type: 'spring' as const, stiffness: 160, damping: 20 },
  }),
};

/** Os três passos do cálculo, com os números que a pessoa acabou de digitar. */
export function ComoCalculamos({ leitura }: { leitura: Leitura }) {
  const v = VEREDITOS[leitura.categoria];

  return (
    <section id="como" className={`conteudo ${styles.secao}`} aria-labelledby="como-titulo">
      <motion.div
        className={styles.cabeca}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <span className="rotulo" style={{ color: 'var(--faixa)' }}>
          Como calculamos
        </span>
        <h2 id="como-titulo" className={styles.titulo}>
          Três passos, nenhum segredo
        </h2>
      </motion.div>

      <ol className={styles.passos}>
        <motion.li className={styles.passo} variants={cartao} initial="oculto" whileInView="visivel" viewport={{ once: true, amount: 0.4 }} custom={0}>
          <span className={styles.numero}>01</span>
          <h3 className={styles.nome}>O radar mede</h3>
          <p className={styles.conta}>
            <NumeroAnimado valor={leitura.medida} /> <small>km/h</small>
          </p>
          <p className={styles.texto}>O equipamento registra a velocidade do carro. É esse número que aparece no painel e na notificação.</p>
        </motion.li>

        <motion.li className={styles.passo} variants={cartao} initial="oculto" whileInView="visivel" viewport={{ once: true, amount: 0.4 }} custom={1}>
          <span className={styles.numero}>02</span>
          <h3 className={styles.nome}>A lei desconta a margem de erro</h3>
          <p className={styles.conta}>
            <span className={styles.menos}>− {leitura.tolerancia}</span> = <NumeroAnimado valor={leitura.considerada} />
          </p>
          <p className={styles.texto}>
            Até 107 km/h medidos, tira 7 km/h. Acima disso, tira 7%. O que sobra é a velocidade considerada (Resolução CONTRAN nº 798/2020).
          </p>
        </motion.li>

        <motion.li className={styles.passo} variants={cartao} initial="oculto" whileInView="visivel" viewport={{ once: true, amount: 0.4 }} custom={2}>
          <span className={styles.numero}>03</span>
          <h3 className={styles.nome}>Compara com a placa</h3>
          <p className={styles.conta}>
            <span className={styles.placa} aria-label={`Placa de ${leitura.limite} km/h`}>
              {leitura.limite}
            </span>
            <motion.span
              key={leitura.categoria}
              className={styles.selo}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, backgroundColor: v.cor, color: v.tinta }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              {v.nome}
            </motion.span>
          </p>
          <p className={styles.texto}>Se a considerada passou do limite, o tamanho do excesso define a gravidade, pelo artigo 218 do CTB.</p>
        </motion.li>
      </ol>
    </section>
  );
}
