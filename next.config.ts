// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   experimental: {}, // Supprime 'fontLoaders'
// };

// export default nextConfig;



// export default {
//   reactStrictMode: true
// };


export default {
  reactStrictMode: true,
  env: {
    // Définir NEXTAUTH_SECRET uniquement si l'environnement n'est pas "test"
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'test' ? '' : process.env.NEXTAUTH_SECRET || '',
  },
};
