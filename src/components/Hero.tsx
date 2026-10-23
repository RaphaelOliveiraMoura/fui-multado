'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import type { Leitura } from '@/lib/radar';
import { LIMITE_MAXIMO, VELOCIDADE_MAXIMA, VEREDITOS } from '@/lib/radar';

import styles from './Hero.module.css';
import { Logo } from './Logo';
import { NumeroArrastavel } from './NumeroArrastavel';
import { Placas } from './Placas';
import { Rastros } from './Rastros';
import { Veredito } from './Veredito';

type Props = {
  leitura: Leitura;
  aoMudarRadar: (n: number) => void;
  aoMudarLimite: (n: number) => void;
  palco: React.RefObject<HTMLDivElement | null>;
};

const CHAVE_DICA = 'fm:arrastou';

// Cada pedaço entra um depois do outro, como placas passando pela janela.
const entrada = {
  oculto: { opacity: 0, y: '0.35em', filter: 'blur(8px)' },
  visivel: (i: number) => ({
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { delay: 0.1 + i * 0.09, type: 'spring' as const, stiffness: 260, damping: 26 },
  }),
};

export function Hero({ leitura, aoMudarRadar, aoMudarLimite, palco }: Props) {
  const [mostrarDica, setMostrarDica] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CHAVE_DICA)) {
        const t = setTimeout(() => setMostrarDica(true), 1400);
        return () => clearTimeout(t);
      }
    } catch {
      // Sem storage (aba privada): a dica só não aparece.
    }
  }, []);

  function arrastou() {
    setMostrarDica(false);
    try {
      localStorage.setItem(CHAVE_DICA, '1');
    } catch {}
  }

  const v = VEREDITOS[leitura.categoria];

  return (
    <div className={styles.faixa}>
      <Rastros velocidade={leitura.medida} cor={v.cor} multado={leitura.multado} />
      <header className={`conteudo ${styles.topo}`}>
        <Logo />
        <nav aria-label="Principal" className={styles.nav}>
          <a href="#como">Como calculamos</a>
          <a href="#tabela">Tabela de multas</a>
          <a href="https://github.com/RaphaelOliveiraMoura/fui-multado">Código aberto</a>
        </nav>
      </header>

      <section id="topo" className={`conteudo ${styles.hero}`}>
        <div ref={palco} className={styles.palco}>
          <motion.span className="rotulo" style={{ color: 'var(--grafite)' }} variants={entrada} initial="oculto" animate="visivel" custom={0}>
            Completa a frase
          </motion.span>

          <h1 className={styles.frase}>
            <motion.span className={styles.pedaco} variants={entrada} initial="oculto" animate="visivel" custom={1}>
              Passei a{' '}
            </motion.span>
            <motion.span className={styles.pedaco} variants={entrada} initial="oculto" animate="visivel" custom={2}>
              <span className={styles.ancora}>
                <NumeroArrastavel
                  valor={leitura.medida}
                  aoMudar={aoMudarRadar}
                  min={0}
                  max={VELOCIDADE_MAXIMA}
                  rotulo="Velocidade que o radar marcou, em km/h"
                  variante="faixa"
                  aoArrastar={arrastou}
                />
                <AnimatePresence>
                  {mostrarDica && (
                    <motion.span
                      className={styles.dica}
                      aria-hidden="true"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                    >
                      <motion.span
                        animate={{ x: [-6, 6, -6] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        ← arraste →
                      </motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>{' '}
            </motion.span>
            <motion.span className={styles.pedaco} variants={entrada} initial="oculto" animate="visivel" custom={3}>
              km/h numa via de{' '}
            </motion.span>
            <motion.span className={styles.pedaco} variants={entrada} initial="oculto" animate="visivel" custom={4}>
              <NumeroArrastavel
                valor={leitura.limite}
                aoMudar={aoMudarLimite}
                min={1}
                max={LIMITE_MAXIMO}
                rotulo="Velocidade máxima da via, em km/h"
                variante="placa"
                passo={10}
              />
              .
            </motion.span>
          </h1>

          <Placas limite={leitura.limite} aoEscolher={aoMudarLimite} />

          <motion.div variants={entrada} initial="oculto" animate="visivel" custom={6}>
            <Veredito leitura={leitura} />
          </motion.div>

          <motion.a
            href="#resultado"
            className={styles.descer}
            variants={entrada}
            initial="oculto"
            animate="visivel"
            custom={7}
          >
            Ver os números
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </motion.a>
        </div>
      </section>
    </div>
  );
}
