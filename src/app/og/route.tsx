import { ImageResponse } from 'next/og';

import { ler, LIMITE_MAXIMO, numeroDoParametro, VELOCIDADE_MAXIMA, VEREDITOS } from '@/lib/radar';

// Card de compartilhamento: "Passei a 66 numa via de 60. NÃO." no amarelo da faixa.

async function fonte(familia: string, eixo: string, texto: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${familia}:${eixo}&text=${encodeURIComponent(texto)}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const temResultado = params.has('radar');
  const radar = numeroDoParametro(params.get('radar') ?? undefined, 67, 0, VELOCIDADE_MAXIMA);
  const via = numeroDoParametro(params.get('via') ?? undefined, 60, 1, LIMITE_MAXIMO);
  const leitura = ler(radar, via);
  const v = VEREDITOS[leitura.categoria];

  const frase = temResultado ? `Passei a ${radar} numa via de ${via}.` : 'Passou no radar?';
  const resposta = temResultado ? (leitura.multado ? 'SIM.' : 'NÃO.') : 'Respira e confere.';
  const rodape = temResultado
    ? leitura.multado
      ? `${v.selo}: ${v.multa!.valor} e ${v.multa!.pontos} pontos. Confere a sua em fuimultado.app`
      : `A tolerância me salvou. Confere a sua em fuimultado.app`
    : 'A tolerância do radar, explicada em um segundo. fuimultado.app';
  const fundo = temResultado && leitura.multado ? v.cor : '#FFC629';
  const tinta = temResultado && leitura.multado ? v.tinta : '#111315';

  const todos = `fui multado?${frase}${resposta}${rodape}${via}0123456789`;
  const [italico, negrito] = await Promise.all([
    fonte('Barlow+Condensed', 'ital,wght@1,800', todos),
    fonte('Barlow+Condensed', 'wght@700', todos),
  ]);
  const fontes = [
    italico && { name: 'Display', data: italico, weight: 800 as const, style: 'italic' as const },
    negrito && { name: 'Display', data: negrito, weight: 700 as const, style: 'normal' as const },
  ].filter((f) => f !== null && f !== undefined);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: fundo,
          color: tinta,
          fontFamily: 'Display',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 64px 0', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <div style={{ width: 18, height: 5, borderRadius: 3, background: tinta }} />
              <div style={{ width: 11, height: 5, borderRadius: 3, background: tinta }} />
              <div style={{ width: 15, height: 5, borderRadius: 3, background: tinta }} />
            </div>
            <div style={{ fontSize: 38, fontStyle: 'italic', fontWeight: 800 }}>fui multado?</div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1 }}>{frase}</div>
          <div style={{ fontSize: temResultado ? 220 : 120, fontStyle: 'italic', fontWeight: 800, lineHeight: 0.9 }}>
            {resposta}
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.2, maxWidth: 900 }}>{rodape}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', height: 44, background: '#111315' }}>
          <div
            style={{
              width: '100%',
              height: 6,
              backgroundImage: 'repeating-linear-gradient(90deg, #FFC629 0 64px, transparent 64px 128px)',
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: fontes.length ? fontes : undefined },
  );
}
