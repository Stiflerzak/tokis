/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // defaults to true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imaawvvwxvlyknuvwnzh.supabase.co",
      },
       {
        protocol: "https",
        hostname: "xjyebvxpqwfgcpwvtgcg.supabase.co",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://hilarykariuki.vercel.app/;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
