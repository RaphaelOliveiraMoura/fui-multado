import { ler, VEREDITOS } from './radar';

// Na Vercel, o domínio de produção do projeto; fuimultado.app não está ligado
// a ele (2026-10-23). NEXT_PUBLIC_SITE_URL vence quando houver domínio próprio.
const producao = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (producao ? `https://${producao}` : 'http://localhost:6400');

/** O endereço como aparece escrito: sem protocolo. */
export const SITE_NOME = SITE_URL.replace(/^https?:\/\//, '');

export const PADRAO = { radar: 67, via: 60 };

export function caminhoDoResultado(radar: number, via: number): string {
  return `/?radar=${radar}&via=${via}`;
}

/** A frase do card e do texto compartilhado: "Passei a 66 numa via de 60. Fui multado? Não." */
export function fraseDoResultado(radar: number, via: number): string {
  const { categoria } = ler(radar, via);
  return `Passei a ${radar} numa via de ${via}. Fui multado? ${VEREDITOS[categoria].resposta}`;
}
