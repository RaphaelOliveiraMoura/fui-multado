import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A página /sobre do site antigo virou a seção "Como calculamos" da home.
  async redirects() {
    return [{ source: '/sobre', destination: '/#como', permanent: true }];
  },
  // O `next dev` do Next 16 escreve AGENTS.md e CLAUDE.md sozinho quando detecta um agente de IA,
  // e a árvore fica suja a cada execução. As regras do repo ficam no AGENTS.md escrito à mão.
  agentRules: false,
};

export default nextConfig;
