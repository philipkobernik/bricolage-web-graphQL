import Head from 'next/head'
import { OG_SITE_DESCRIPTION } from '../lib/constants'

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Press+Start+2P&display=swap" rel="stylesheet"/>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={OG_SITE_DESCRIPTION}
      />

      {/* Essential META Tags */}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Non-Essential, But Recommended */}
      <meta property="og:site_name" content="bricolage" />
    </Head>
  )
}
