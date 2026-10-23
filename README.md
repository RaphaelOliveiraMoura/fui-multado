# Fui multado?

Passou no radar e ficou na dúvida? Você completa a frase "Passei a [67] km/h
numa via de [60]." e a página aplica a tolerância da lei e responde na hora se
vem multa, de que gravidade, quanto custa e quantos pontos.

## A regra

- **Tolerância** (Resolução CONTRAN nº 798/2020): até 107 km/h medidos,
  desconta 7 km/h; acima disso, desconta 7%, sem casas decimais. O resultado é
  a velocidade considerada.
- **Gravidade** (CTB, art. 218), pelo excesso da considerada sobre o limite:
  até 20% é média (R$ 130,16, 4 pontos); de 20% a 50%, grave (R$ 195,23,
  5 pontos); acima de 50%, gravíssima (R$ 880,41, 7 pontos e suspensão).

Tudo isso vive em [`src/lib/radar.ts`](src/lib/radar.ts), com testes ao lado.

## Rodando

Node 24 (ver `.nvmrc`). Porta fixa 6400.

```bash
npm install
npm run dev
```

`npm test` roda os testes do cálculo, `npm run typecheck` e `npm run lint`
conferem o resto, `npm run build` gera a versão de produção.

## Compartilhar

O endereço acompanha a frase (`/?radar=72&via=60`). Um link assim abre a página
com esses números e gera o card de prévia em `/og?radar=72&via=60`.

O endereço público vem de `NEXT_PUBLIC_SITE_URL` (padrão
`https://fuimultado.app`).
