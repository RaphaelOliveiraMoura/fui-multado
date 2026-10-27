import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A página /sobre do site antigo virou a seção "Como calculamos" da home.
  async redirects() {
    return [{ source: '/sobre', destination: '/#como', permanent: true }];
  },
  // O `next dev` do Next 16 escreve AGENTS.md e CLAUDE.md sozinho quando detecta um agente de IA,
  // e a árvore fica suja a cada execução. As regras do repo ficam no AGENTS.md escrito à mão.
  agentRules: false,
  // O proxy da PostHog (contrato em ~/projects/nexus/knowledge/metricas.md): o navegador manda
  // os eventos para /ingest no próprio domínio e o Next repassa para a região US, porque
  // bloqueador de anúncio corta us.i.posthog.com, não o caminho do site.
  async rewrites() {
    return [
      { source: '/ingest/static/:caminho*', destination: 'https://us-assets.i.posthog.com/static/:caminho*' },
      { source: '/ingest/:caminho*', destination: 'https://us.i.posthog.com/:caminho*' },
    ];
  },
  // a API da PostHog usa barra no fim em alguns caminhos, e o redirecionamento automático do
  // Next quebraria o repasse
  skipTrailingSlashRedirect: true,
  // Higiene de resposta (padrão em ~/projects/nexus/knowledge/padrao-sites-vercel.md §5): nada
  // disso muda o que o site faz, só fecha o que ele nunca vai precisar. O HSTS a Vercel já manda.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:caminho*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
