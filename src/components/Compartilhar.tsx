'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import type { Leitura } from '@/lib/radar';
import { caminhoDoResultado, fraseDoResultado } from '@/lib/site';

import styles from './Compartilhar.module.css';

export function Compartilhar({ leitura }: { leitura: Leitura }) {
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 2200);
    return () => clearTimeout(t);
  }, [aviso]);

  async function compartilhar() {
    const url = new URL(caminhoDoResultado(leitura.medida, leitura.limite), window.location.origin).toString();
    const texto = `${fraseDoResultado(leitura.medida, leitura.limite)} Confere a sua:`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Fui multado?', text: texto, url });
        return;
      }
      await navigator.clipboard.writeText(`${texto} ${url}`);
      setAviso('Link copiado. É só colar.');
    } catch (erro) {
      // Fechar a folha de compartilhar não é erro.
      if (erro instanceof DOMException && erro.name === 'AbortError') return;
      setAviso('Não deu para copiar. Copia o endereço da página.');
    }
  }

  return (
    <span className={styles.envoltorio}>
      <motion.button
        type="button"
        className={styles.botao}
        onClick={compartilhar}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        Compartilhar resultado
      </motion.button>
      <AnimatePresence>
        {aviso && (
          <motion.span
            role="status"
            className={styles.aviso}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
          >
            {aviso}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
