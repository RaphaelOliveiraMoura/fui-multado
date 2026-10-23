import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed, JetBrains_Mono } from 'next/font/google';

import { SITE_URL } from '@/lib/site';

import './globals.css';

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display-carregada',
});

const corpo = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body-carregada',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-mono-carregada',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Fui multado? Calculadora de tolerância de radar',
    template: '%s · Fui multado?',
  },
  description:
    'Passou no radar? Diga quanto ele marcou e o limite da via: a gente aplica a tolerância da lei e diz na hora se vem multa, de que tipo e quantos pontos.',
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Fui multado?' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#F3F1EA',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${corpo.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
