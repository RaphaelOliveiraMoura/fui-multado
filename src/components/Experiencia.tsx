'use client';

import { MotionConfig, useAnimate, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { LIMITE_MAXIMO, ler, VELOCIDADE_MAXIMA } from '@/lib/radar';
import { caminhoDoResultado } from '@/lib/site';

import { ComoCalculamos } from './ComoCalculamos';
import { Flash } from './Flash';
import { Hero } from './Hero';
import { ProgressoEstrada } from './ProgressoEstrada';
import { Resultado } from './Resultado';
import { Tabela } from './Tabela';

type Props = { radarInicial: number; limiteInicial: number };

/** Guarda os dois números da frase e reage quando a resposta vira multa. */
export function Experiencia({ radarInicial, limiteInicial }: Props) {
  const [radar, setRadar] = useState(radarInicial);
  const [limite, setLimite] = useState(limiteInicial);
  const [flashes, setFlashes] = useState(0);
  const [palco, animar] = useAnimate<HTMLDivElement>();
  const reduzir = useReducedMotion();
  const leitura = ler(radar, limite);
  const multadoAntes = useRef(leitura.multado);

  const mudarRadar = (n: number) => setRadar(Math.min(VELOCIDADE_MAXIMA, Math.max(0, n)));
  const mudarLimite = (n: number) => setLimite(Math.min(LIMITE_MAXIMO, Math.max(1, n)));

  // Cruzou a linha da multa: o radar dispara o flash e a frase treme.
  useEffect(() => {
    const virouMulta = leitura.multado && !multadoAntes.current;
    multadoAntes.current = leitura.multado;
    if (!virouMulta || reduzir) return;
    setFlashes((n) => n + 1);
    if (palco.current) animar(palco.current, { x: [0, -12, 10, -7, 4, 0] }, { duration: 0.45 });
    navigator.vibrate?.(70);
  }, [leitura.multado, reduzir, animar, palco]);

  // O endereço sempre aponta para o resultado da tela, pronto para mandar.
  useEffect(() => {
    const t = setTimeout(() => {
      window.history.replaceState(null, '', caminhoDoResultado(radar, limite) + window.location.hash);
    }, 350);
    return () => clearTimeout(t);
  }, [radar, limite]);

  return (
    <MotionConfig reducedMotion="user">
      <ProgressoEstrada />
      {flashes > 0 && <Flash key={flashes} />}
      <Hero leitura={leitura} aoMudarRadar={mudarRadar} aoMudarLimite={mudarLimite} palco={palco} />
      <main>
        <Resultado leitura={leitura} aoMudarRadar={mudarRadar} />
        <ComoCalculamos leitura={leitura} />
        <Tabela atual={leitura.categoria} />
      </main>
    </MotionConfig>
  );
}
