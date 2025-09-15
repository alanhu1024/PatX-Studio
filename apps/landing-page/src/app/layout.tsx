import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://patxstudio.com'),
  title: 'PatX Studio - AI Patent Claim Charts',
  description: 'Cut claim chart drafting time from 3 hours to 20–30 minutes with audit-ready evidence and export-ready charts. Faster, more reliable, and more cost-effective AI patent claim charts.',
  keywords: ['AI patent', 'claim charts', 'patent analysis', 'legal tech', 'patent software', 'AI legal tools'],
  authors: [{ name: 'AIGROW Inc.' }],
  creator: 'AIGROW Inc.',
  publisher: 'AIGROW Inc.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: '/',
    title: 'PatX Studio - AI Patent Claim Charts',
    description: 'Cut claim chart drafting time from 3 hours to 20–30 minutes with audit-ready evidence and export-ready charts.',
    siteName: 'PatX Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PatX Studio - AI Patent Claim Charts',
    description: 'Cut claim chart drafting time from 3 hours to 20–30 minutes with audit-ready evidence and export-ready charts.',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#3b82f6',
  },
}

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  initialScale: 1,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* 字体预加载优化 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PatX Studio",
              "description": "Cut claim chart drafting time from 3 hours to 20–30 minutes with audit-ready evidence and export-ready charts.",
              "url": "https://patxstudio.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://patxstudio.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "AIGROW Inc.",
                "url": "https://patxstudio.com"
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4PE9SF910V"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4PE9SF910V');
        `}</Script>
      </body>
    </html>
  )
}
