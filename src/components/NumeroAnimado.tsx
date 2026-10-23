'use client';

import { motion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

/** Número que corre até o valor novo em vez de trocar de uma vez. */
export function NumeroAnimado({ valor, sufixo = '' }: { valor: number; sufixo?: string }) {
  const mola = useSpring(valor, { stiffness: 140, damping: 22, mass: 0.8 });
  const texto = useTransform(mola, (v) => `${Math.round(v)}${sufixo}`);

  useEffect(() => {
    mola.set(valor);
  }, [mola, valor]);

  return <motion.span style={{ fontVariantNumeric: 'tabular-nums' }}>{texto}</motion.span>;
}
