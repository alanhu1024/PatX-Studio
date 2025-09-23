/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用图片优化
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 启用压缩
  compress: true,
  // 移除X-Powered-By头
  poweredByHeader: false,
  // 启用严格模式
  reactStrictMode: true,
  // 优化构建
  // swcMinify: true, // This is now default in Next.js 13+
  // 启用ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  // 启用类型检查
  typescript: {
    ignoreBuildErrors: false,
  },

  // 静态资源优化和安全头部
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ]
  },
};

module.exports = nextConfig;
