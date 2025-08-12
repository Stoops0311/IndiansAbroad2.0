import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Handle legacy DNN URLs that cause 404s
      {
        source: '/home.aspx',
        destination: '/',
        permanent: true,
      },
      {
        source: '/Default.aspx',
        destination: '/',
        permanent: true,
      },
      // Catch-all for DNN query parameters
      {
        source: '/(.*).aspx',
        destination: '/',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
