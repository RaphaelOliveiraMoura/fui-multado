import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A página /sobre do site antigo virou a seção "Como calculamos" da home.
  async redirects() {
    return [{ source: '/sobre', destination: '/#como', permanent: true }];
  },
};

export default nextConfig;
