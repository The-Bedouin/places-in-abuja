/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

import createMDX from '@next/mdx';
const withMDX = createMDX({
  extension: /\.mdx?$/
});

export default withMDX(nextConfig);


