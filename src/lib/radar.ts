// Regra de tolerância da Resolução CONTRAN nº 798/2020 e enquadramento do
// art. 218 do CTB. Tudo aqui é puro: a interface só lê o que sai daqui.

export type Categoria = 'livre' | 'tolerancia' | 'media' | 'grave' | 'gravissima';

export const LIMITE_DA_REGRA_FIXA = 107;
export const TOLERANCIA_FIXA = 7;
export const TOLERANCIA_PERCENTUAL = 0.07;

export const VELOCIDADE_MAXIMA = 400;
export const LIMITE_MAXIMO = 200;

/** Até 107 km/h medidos, desconta 7 km/h; acima disso, desconta 7% (sem casas decimais). */
export function considerada(medida: number): number {
  const vm = Math.max(0, Math.round(medida));
  if (vm <= LIMITE_DA_REGRA_FIXA) return Math.max(0, vm - TOLERANCIA_FIXA);
  return Math.floor(vm * (1 - TOLERANCIA_PERCENTUAL));
}

export function excesso(medida: number, limite: number): number {
  return (considerada(medida) - limite) / limite;
}

export function multado(medida: number, limite: number): boolean {
  return considerada(medida) > limite;
}

export function categoria(medida: number, limite: number): Categoria {
  if (!multado(medida, limite)) return medida > limite ? 'tolerancia' : 'livre';
  const e = excesso(medida, limite);
  if (e <= 0.2) return 'media';
  if (e <= 0.5) return 'grave';
  return 'gravissima';
}

function primeiraMedida(pred: (vm: number) => boolean): number {
  for (let vm = 0; vm <= VELOCIDADE_MAXIMA; vm++) if (pred(vm)) return vm;
  return VELOCIDADE_MAXIMA;
}

/** Primeira velocidade medida que cai em cada categoria de multa, para um limite. */
export function limiares(limite: number) {
  return {
    media: primeiraMedida((vm) => multado(vm, limite)),
    grave: primeiraMedida((vm) => excesso(vm, limite) > 0.2),
    gravissima: primeiraMedida((vm) => excesso(vm, limite) > 0.5),
  };
}

export type Faixa = { categoria: Categoria; de: number; ate: number; rotulo: string };

/** As cinco faixas em velocidade medida, de 0 até um teto que deixa a gravíssima visível. */
export function faixas(limite: number): { faixas: Faixa[]; teto: number } {
  const t = limiares(limite);
  const teto = Math.ceil((t.gravissima * 1.25) / 10) * 10;
  return {
    teto,
    faixas: [
      { categoria: 'livre', de: 0, ate: limite, rotulo: `0–${limite}` },
      { categoria: 'tolerancia', de: limite, ate: t.media - 1, rotulo: `${limite + 1}–${t.media - 1}` },
      { categoria: 'media', de: t.media - 1, ate: t.grave - 1, rotulo: `${t.media}–${t.grave - 1}` },
      { categoria: 'grave', de: t.grave - 1, ate: t.gravissima - 1, rotulo: `${t.grave}–${t.gravissima - 1}` },
      { categoria: 'gravissima', de: t.gravissima - 1, ate: teto, rotulo: `${t.gravissima}+` },
    ],
  };
}

// Cores em hex (e não var()) porque o motion interpola entre elas.
export type Veredito = {
  nome: string;
  selo: string;
  titulo: string;
  resposta: string;
  cor: string;
  tinta: string;
  multa?: { valor: string; pontos: number; extra?: string };
};

// Valores do art. 218 do CTB após a Lei 13.281/2016 (gravíssima multiplicada por 3).
export const VEREDITOS: Record<Categoria, Veredito> = {
  livre: {
    nome: 'Livre',
    selo: 'Dentro do limite',
    titulo: 'Respira. Sem multa.',
    resposta: 'Não.',
    cor: '#3EE08F',
    tinta: '#0B2618',
  },
  tolerancia: {
    nome: 'Tolerância',
    selo: 'Salvo pela tolerância',
    titulo: 'Ufa. A tolerância te salvou.',
    resposta: 'Não.',
    cor: '#FFC629',
    tinta: '#2E2400',
  },
  media: {
    nome: 'Média',
    selo: 'Infração média',
    titulo: 'Dessa vez não deu: multa média.',
    resposta: 'Sim, média.',
    cor: '#FF8A3D',
    tinta: '#2E1300',
    multa: { valor: 'R$ 130,16', pontos: 4 },
  },
  grave: {
    nome: 'Grave',
    selo: 'Infração grave',
    titulo: 'Multa grave: 5 pontos na carteira.',
    resposta: 'Sim, grave.',
    cor: '#F0443A',
    tinta: '#1F0503',
    multa: { valor: 'R$ 195,23', pontos: 5 },
  },
  gravissima: {
    nome: 'Gravíssima',
    selo: 'Infração gravíssima',
    titulo: 'Gravíssima: dá suspensão da CNH.',
    resposta: 'Sim, gravíssima.',
    cor: '#C21857',
    tinta: '#FFFFFF',
    multa: { valor: 'R$ 880,41', pontos: 7, extra: 'Suspensão do direito de dirigir' },
  },
};

export type Leitura = {
  medida: number;
  limite: number;
  considerada: number;
  categoria: Categoria;
  multado: boolean;
  /** Excesso sobre o limite, em % inteiro (negativo quando abaixo). */
  percentual: number;
  /** km/h que ainda cabiam no radar antes da multa (0 se já multou). */
  folga: number;
  /** km/h a menos no radar que bastariam para escapar (0 se não multou). */
  faltou: number;
  tolerancia: string;
  resumo: string;
  detalhe: string;
};

export function ler(medida: number, limite: number): Leitura {
  const vm = Math.max(0, Math.round(medida));
  const vc = considerada(vm);
  const cat = categoria(vm, limite);
  const ultimaSemMulta = limiares(limite).media - 1;
  const percentual = Math.round(((vc - limite) / limite) * 100);
  const tolerancia = vm <= LIMITE_DA_REGRA_FIXA ? '7 km/h' : '7%';
  const v = VEREDITOS[cat];

  let resumo: string;
  let detalhe: string;
  if (cat === 'livre') {
    resumo = 'Você estava abaixo do limite da via. Nem precisou da tolerância.';
    detalhe = `O radar marcou ${vm} km/h e a via permite ${limite}. Nem precisou da tolerância.`;
  } else if (cat === 'tolerancia') {
    const sobra = vc === limite ? 'exatamente o limite. Passou raspando.' : `${limite - vc} km/h abaixo do limite.`;
    resumo = `Com a tolerância de ${tolerancia}, a velocidade considerada é ${vc}: ${sobra}`;
    detalhe = `O radar marcou ${vm}, mas a velocidade considerada é ${vc} km/h. ${
      vc === limite ? 'Exatamente no limite: passou raspando.' : `Ainda sobravam ${limite - vc} km/h de folga.`
    }`;
  } else {
    resumo = `Considerada ${vc} km/h, ${percentual}% acima do limite: ${v.multa!.valor} e ${v.multa!.pontos} pontos na carteira.`;
    detalhe =
      `A velocidade considerada foi ${vc} km/h, ${percentual}% acima dos ${limite} da via. ` +
      `Com ${vm - ultimaSemMulta} km/h a menos no radar, você escapava.` +
      (cat === 'gravissima' ? ' Além da multa, cabe suspensão do direito de dirigir.' : '');
  }

  return {
    medida: vm,
    limite,
    considerada: vc,
    categoria: cat,
    multado: multado(vm, limite),
    percentual,
    folga: Math.max(0, ultimaSemMulta - vm),
    faltou: Math.max(0, vm - ultimaSemMulta),
    tolerancia,
    resumo,
    detalhe,
  };
}

/** Lê um número de um parâmetro de URL, dentro de limites; cai no padrão se vier lixo. */
export function numeroDoParametro(valor: unknown, padrao: number, min: number, max: number): number {
  const texto = Array.isArray(valor) ? valor[0] : valor;
  const n = typeof texto === 'string' ? Number.parseInt(texto, 10) : Number.NaN;
  if (!Number.isFinite(n)) return padrao;
  return Math.min(max, Math.max(min, n));
}
