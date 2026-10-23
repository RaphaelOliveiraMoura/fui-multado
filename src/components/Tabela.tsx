'use client';

import { motion } from 'motion/react';

import type { Categoria } from '@/lib/radar';
import { VEREDITOS } from '@/lib/radar';

import styles from './Tabela.module.css';

const LINHAS: { categoria: Categoria; faixa: string }[] = [
  { categoria: 'media', faixa: 'até 20%' },
  { categoria: 'grave', faixa: 'de 20% a 50%' },
  { categoria: 'gravissima', faixa: 'acima de 50%' },
];

export function Tabela({ atual }: { atual: Categoria }) {
  return (
    <section id="tabela" className={`conteudo ${styles.secao}`} aria-labelledby="tabela-titulo">
      <motion.h2
        id="tabela-titulo"
        className={styles.titulo}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        Tabela de multas por velocidade
      </motion.h2>
      <div className={styles.rolagem}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th scope="col">Acima do limite</th>
              <th scope="col">Infração</th>
              <th scope="col">Multa</th>
              <th scope="col">Pontos</th>
              <th scope="col">Além disso</th>
            </tr>
          </thead>
          <tbody>
            {LINHAS.map((linha, i) => {
              const v = VEREDITOS[linha.categoria];
              const ativa = linha.categoria === atual;
              return (
                <motion.tr
                  key={linha.categoria}
                  data-ativa={ativa}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{ ['--cor' as string]: v.cor, ['--tinta' as string]: v.tinta }}
                >
                  <td className={styles.mono} data-rotulo="Acima do limite">{linha.faixa}</td>
                  <td className={styles.celulaInfracao}>
                    <span className={styles.infracao}>
                      <span className={styles.ponto} />
                      {v.nome}
                      {ativa && <span className={styles.voce}>você</span>}
                    </span>
                  </td>
                  <td data-rotulo="Multa">{v.multa!.valor}</td>
                  <td data-rotulo="Pontos">{v.multa!.pontos}</td>
                  <td className={v.multa!.extra ? styles.extra : styles.vazio} data-rotulo="Além disso">
                    {v.multa!.extra ?? '—'}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={styles.nota}>Valores do art. 218 do CTB. A gravíssima por velocidade é multiplicada por 3.</p>
    </section>
  );
}
