'use client';

import { AnimatePresence, motion } from 'motion/react';

import type { Leitura } from '@/lib/radar';
import { VEREDITOS } from '@/lib/radar';

import { Compartilhar } from './Compartilhar';
import { Medidor } from './Medidor';
import { NumeroAnimado } from './NumeroAnimado';
import styles from './Resultado.module.css';

type Fato = { rotulo: string; numero?: number; texto?: string; sufixo?: string };

function fatos(l: Leitura): Fato[] {
  const multa = VEREDITOS[l.categoria].multa;
  if (multa) {
    return [
      { rotulo: 'Multa', texto: multa.valor },
      { rotulo: 'Pontos na CNH', numero: multa.pontos },
      { rotulo: 'Acima do limite', numero: l.percentual, sufixo: '%' },
    ];
  }
  return [
    { rotulo: 'Medida', numero: l.medida, sufixo: ' km/h' },
    { rotulo: 'Considerada', numero: l.considerada, sufixo: ' km/h' },
    { rotulo: 'Folga até a multa', numero: l.folga, sufixo: ' km/h' },
  ];
}

export function Resultado({ leitura, aoMudarRadar }: { leitura: Leitura; aoMudarRadar: (n: number) => void }) {
  const v = VEREDITOS[leitura.categoria];

  return (
    <section id="resultado" className={`conteudo ${styles.secao}`} aria-labelledby="resultado-titulo">
      <motion.div
        className={styles.cartao}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <motion.div
          className={styles.banda}
          animate={{ backgroundColor: v.cor, color: v.tinta }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <motion.span layout className={styles.selo} style={{ borderColor: 'currentColor' }}>
            {v.selo}
          </motion.span>
          <div className={styles.janela}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.h2
                id="resultado-titulo"
                key={leitura.categoria}
                className={styles.titulo}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {v.titulo}
              </motion.h2>
            </AnimatePresence>
          </div>
          <p className={styles.detalhe}>{leitura.detalhe}</p>
        </motion.div>

        <div className={styles.corpo}>
          <dl className={styles.fatos}>
            {fatos(leitura).map((f, i) => (
              <motion.div
                key={f.rotulo}
                className={styles.fato}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <dt className="rotulo">{f.rotulo}</dt>
                <dd className={styles.valor}>
                  {f.numero !== undefined ? <NumeroAnimado valor={f.numero} sufixo={f.sufixo} /> : f.texto}
                </dd>
              </motion.div>
            ))}
          </dl>

          <Medidor leitura={leitura} aoMudar={aoMudarRadar} />

          <div className={styles.acoes}>
            <Compartilhar leitura={leitura} />
            <a href="#como" className={styles.secundario}>
              Entender o cálculo
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
