import { ler, VEREDITOS } from './radar';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fuimultado.app';

export const PADRAO = { radar: 67, via: 60 };

export function caminhoDoResultado(radar: number, via: number): string {
  return `/?radar=${radar}&via=${via}`;
}

/** A frase do card e do texto compartilhado: "Passei a 66 numa via de 60. Fui multado? Não." */
export function fraseDoResultado(radar: number, via: number): string {
  const { categoria } = ler(radar, via);
  return `Passei a ${radar} numa via de ${via}. Fui multado? ${VEREDITOS[categoria].resposta}`;
}
