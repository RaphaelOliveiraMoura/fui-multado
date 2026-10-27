import type { Metadata } from 'next';

import { Experiencia } from '@/components/Experiencia';
import { Rodape } from '@/components/Rodape';
import { LIMITE_MAXIMO, numeroDoParametro, VELOCIDADE_MAXIMA } from '@/lib/radar';
import { fraseDoResultado, PADRAO, SITE_URL } from '@/lib/site';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

async function lerParametros(searchParams: Props['searchParams']) {
  const p = await searchParams;
  return {
    compartilhado: p.radar !== undefined,
    radar: numeroDoParametro(p.radar, PADRAO.radar, 0, VELOCIDADE_MAXIMA),
    via: numeroDoParametro(p.via, PADRAO.via, 1, LIMITE_MAXIMO),
  };
}

// Link compartilhado ganha título e card com o resultado de quem mandou.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { compartilhado, radar, via } = await lerParametros(searchParams);
  const imagem = compartilhado ? `/og?radar=${radar}&via=${via}` : '/og';
  const titulo = compartilhado ? fraseDoResultado(radar, via) : 'Fui multado? Calculadora de tolerância de radar';
  return {
    title: { absolute: titulo },
    alternates: { canonical: '/' },
    openGraph: { title: titulo, images: [{ url: imagem, width: 1200, height: 630 }] },
    twitter: { title: titulo, images: [imagem] },
  };
}

// Os dados estruturados dizem quem fez o site: todo produto da Hashord se declara criado por ela.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fui multado?',
  url: SITE_URL,
  inLanguage: 'pt-BR',
  creator: { '@type': 'Organization', name: 'Hashord', url: 'https://www.hashord.com' },
};

export default async function Home({ searchParams }: Props) {
  const { radar, via } = await lerParametros(searchParams);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Experiencia radarInicial={radar} limiteInicial={via} />
      <Rodape />
    </>
  );
}
