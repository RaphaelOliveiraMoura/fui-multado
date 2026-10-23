import { describe, expect, it } from 'vitest';

import { categoria, considerada, faixas, ler, limiares, numeroDoParametro } from './radar';

describe('considerada', () => {
  it('desconta 7 km/h até 107 km/h medidos', () => {
    expect(considerada(67)).toBe(60);
    expect(considerada(101)).toBe(94);
    expect(considerada(107)).toBe(100);
  });

  it('desconta 7% acima de 107 km/h, sem casas decimais', () => {
    expect(considerada(108)).toBe(100);
    expect(considerada(115)).toBe(106);
    expect(considerada(130)).toBe(120);
  });

  it('nunca fica negativa', () => {
    expect(considerada(3)).toBe(0);
    expect(considerada(-10)).toBe(0);
  });
});

describe('categoria', () => {
  it('separa livre, tolerância e as três multas numa via de 60', () => {
    expect(categoria(55, 60)).toBe('livre');
    expect(categoria(60, 60)).toBe('livre');
    expect(categoria(66, 60)).toBe('tolerancia');
    expect(categoria(67, 60)).toBe('tolerancia');
    expect(categoria(68, 60)).toBe('media');
    expect(categoria(79, 60)).toBe('media');
    expect(categoria(80, 60)).toBe('grave');
    expect(categoria(97, 60)).toBe('grave');
    expect(categoria(98, 60)).toBe('gravissima');
  });

  it('usa a regra de 7% nas vias rápidas', () => {
    // 108 medidos viram 100 considerados; 109 viram 101, já multa.
    expect(categoria(108, 100)).toBe('tolerancia');
    expect(categoria(109, 100)).toBe('media');
  });
});

describe('limiares e faixas', () => {
  it('acha a primeira medida de cada multa', () => {
    expect(limiares(60)).toEqual({ media: 68, grave: 80, gravissima: 98 });
  });

  it('cobre de 0 ao teto sem buracos', () => {
    const { faixas: lista, teto } = faixas(60);
    expect(lista[0].de).toBe(0);
    expect(lista.at(-1)!.ate).toBe(teto);
    for (let i = 1; i < lista.length; i++) expect(lista[i].de).toBe(lista[i - 1].ate);
  });
});

describe('ler', () => {
  it('diz quanto sobrou quando a tolerância salva', () => {
    const l = ler(66, 60);
    expect(l.multado).toBe(false);
    expect(l.folga).toBe(1);
    expect(l.resumo).toContain('1 km/h abaixo do limite');
  });

  it('diz quanto faltou quando multa', () => {
    const l = ler(72, 60);
    expect(l.categoria).toBe('media');
    expect(l.percentual).toBe(8);
    expect(l.faltou).toBe(5);
    expect(l.resumo).toContain('R$ 130,16');
  });
});

describe('numeroDoParametro', () => {
  it('aceita número dentro dos limites e corrige o resto', () => {
    expect(numeroDoParametro('72', 67, 0, 400)).toBe(72);
    expect(numeroDoParametro(['90', '10'], 67, 0, 400)).toBe(90);
    expect(numeroDoParametro('abc', 67, 0, 400)).toBe(67);
    expect(numeroDoParametro(undefined, 60, 1, 200)).toBe(60);
    expect(numeroDoParametro('999', 60, 1, 200)).toBe(200);
  });
});
