'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';

import styles from './NumeroArrastavel.module.css';

type Props = {
  valor: number;
  aoMudar: (n: number) => void;
  min: number;
  max: number;
  rotulo: string;
  variante: 'faixa' | 'placa';
  /** Pixels de arrasto por km/h. */
  passo?: number;
  aoArrastar?: () => void;
};

/**
 * Campo numérico dentro do título. Fora de foco mostra os dígitos rolando como
 * um hodômetro e aceita arrasto horizontal; com foco vira um campo comum.
 */
export function NumeroArrastavel({ valor, aoMudar, min, max, rotulo, variante, passo = 6, aoArrastar }: Props) {
  const campo = useRef<HTMLInputElement>(null);
  const arrasto = useRef<{ x: number; inicial: number; moveu: boolean } | null>(null);
  const [focado, setFocado] = useState(false);
  const [rascunho, setRascunho] = useState(String(valor));
  const [arrastando, setArrastando] = useState(false);
  const [anterior, setAnterior] = useState(valor);
  const [direcao, setDirecao] = useState(1);

  // Sobe quando o número cresce, desce quando diminui, como um hodômetro.
  if (valor !== anterior) {
    setDirecao(valor > anterior ? 1 : -1);
    setAnterior(valor);
  }

  const limitar = (n: number) => Math.min(max, Math.max(min, n));

  function aoDigitar(texto: string) {
    const digitos = texto.replace(/\D/g, '').slice(0, 3);
    setRascunho(digitos);
    if (digitos !== '') aoMudar(limitar(Number.parseInt(digitos, 10)));
  }

  function aoTeclar(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault();
    const n = limitar(valor + (e.key === 'ArrowUp' ? 1 : -1) * (e.shiftKey ? 10 : 1));
    aoMudar(n);
    setRascunho(String(n));
  }

  function aoPressionar(e: React.PointerEvent<HTMLSpanElement>) {
    if (focado || e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    arrasto.current = { x: e.clientX, inicial: valor, moveu: false };
  }

  function aoMover(e: React.PointerEvent<HTMLSpanElement>) {
    const a = arrasto.current;
    if (!a) return;
    const dx = e.clientX - a.x;
    if (!a.moveu && Math.abs(dx) < 4) return;
    if (!a.moveu) {
      a.moveu = true;
      setArrastando(true);
      aoArrastar?.();
    }
    aoMudar(limitar(a.inicial + Math.round(dx / passo)));
  }

  function aoSoltar() {
    const a = arrasto.current;
    arrasto.current = null;
    setArrastando(false);
    // Um toque sem arrasto abre o campo para digitar.
    if (a && !a.moveu) {
      campo.current?.focus();
      campo.current?.select();
    }
  }

  const digitos = String(valor).split('');

  return (
    <span
      className={styles.caixa}
      data-variante={variante}
      data-focado={focado}
      data-arrastando={arrastando}
      onPointerDown={aoPressionar}
      onPointerMove={aoMover}
      onPointerUp={aoSoltar}
      onPointerCancel={aoSoltar}
    >
      <span className={styles.digitos} aria-hidden="true">
        {digitos.map((d, i) => {
          // Chave pela posição a partir da direita: as unidades rolam sozinhas.
          const posicao = digitos.length - i;
          return (
            <span key={posicao} className={styles.celula}>
              <AnimatePresence initial={false} custom={direcao} mode="popLayout">
                <motion.span
                  key={d}
                  className={styles.digito}
                  custom={direcao}
                  variants={{
                    entra: (dir: number) => ({ y: `${dir * 70}%`, opacity: 0, filter: 'blur(4px)' }),
                    fica: { y: '0%', opacity: 1, filter: 'blur(0px)' },
                    sai: (dir: number) => ({ y: `${dir * -70}%`, opacity: 0, filter: 'blur(4px)' }),
                  }}
                  initial="entra"
                  animate="fica"
                  exit="sai"
                  transition={{ type: 'spring', stiffness: 520, damping: 34, mass: 0.6 }}
                >
                  {d}
                </motion.span>
              </AnimatePresence>
            </span>
          );
        })}
      </span>
      <input
        ref={campo}
        className={styles.campo}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        aria-label={rotulo}
        value={focado ? rascunho : String(valor)}
        onFocus={() => {
          setRascunho(String(valor));
          setFocado(true);
        }}
        onBlur={() => setFocado(false)}
        onChange={(e) => aoDigitar(e.target.value)}
        onKeyDown={aoTeclar}
      />
    </span>
  );
}
