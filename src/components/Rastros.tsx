'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

type Risco = { x: number; y: number; comprimento: number; espessura: number; profundidade: number };

const QUANTIDADE = 70;

function hexParaRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Riscos de velocidade passando atrás do título. Andam mais rápido quanto mais
 * o radar marcou e ganham a cor do veredito quando vira multa.
 */
export function Rastros({ velocidade, cor, multado }: { velocidade: number; cor: string; multado: boolean }) {
  const tela = useRef<HTMLCanvasElement>(null);
  const alvo = useRef({ velocidade, cor, multado });
  const reduzir = useReducedMotion();

  useEffect(() => {
    alvo.current = { velocidade, cor, multado };
  }, [velocidade, cor, multado]);

  useEffect(() => {
    const canvas = tela.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let largura = 0;
    let altura = 0;
    let riscos: Risco[] = [];
    let quadro = 0;
    let visivel = true;
    let ultimo = performance.now();
    let atual = alvo.current.velocidade;
    let mistura = 0;

    const novoRisco = (x?: number): Risco => {
      const profundidade = 0.25 + Math.random() * 0.75;
      return {
        x: x ?? Math.random() * largura,
        y: Math.random() * altura,
        comprimento: 40 + Math.random() * 180 * profundidade,
        espessura: 1 + profundidade * 2.5,
        profundidade,
      };
    };

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = canvas.clientWidth;
      altura = canvas.clientHeight;
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      riscos = Array.from({ length: QUANTIDADE }, () => novoRisco());
    };

    const desenhar = (dt: number) => {
      const { velocidade: v, cor, multado } = alvo.current;
      // Suaviza a troca de velocidade para o arrasto não dar tranco.
      atual += (v - atual) * Math.min(1, dt * 4);
      mistura += ((multado ? 1 : 0) - mistura) * Math.min(1, dt * 3);
      const [r, g, b] = hexParaRgb(cor);
      const tom = (c: number, base: number) => Math.round(base + (c - base) * mistura);

      ctx.clearRect(0, 0, largura, altura);
      for (const risco of riscos) {
        risco.x -= atual * 9 * risco.profundidade * dt;
        if (risco.x + risco.comprimento < 0) Object.assign(risco, novoRisco(largura + Math.random() * 200));
        const alfa = (0.05 + risco.profundidade * 0.12) * (0.4 + mistura * 0.9);
        ctx.strokeStyle = `rgba(${tom(r, 17)}, ${tom(g, 19)}, ${tom(b, 21)}, ${alfa})`;
        ctx.lineWidth = risco.espessura;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(risco.x, risco.y);
        ctx.lineTo(risco.x + risco.comprimento * (0.5 + atual / 160), risco.y);
        ctx.stroke();
      }
    };

    const laco = (agora: number) => {
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      if (visivel) desenhar(dt);
      quadro = requestAnimationFrame(laco);
    };

    medir();
    const aoRedimensionar = new ResizeObserver(medir);
    aoRedimensionar.observe(canvas);
    const observador = new IntersectionObserver(([e]) => (visivel = e.isIntersecting));
    observador.observe(canvas);

    if (reduzir) {
      desenhar(0);
    } else {
      quadro = requestAnimationFrame(laco);
    }

    return () => {
      cancelAnimationFrame(quadro);
      aoRedimensionar.disconnect();
      observador.disconnect();
    };
  }, [reduzir]);

  return (
    <canvas
      ref={tela}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
