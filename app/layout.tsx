import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import localFont from 'next/font/local';
import Header from '../components/Header';
import { cases } from '../lib/cases';
import Footer from '../components/Footer';
import Overlays from '../components/Overlays';
import { aboutLinks } from '../lib/about';
import { ThemeScript } from '../components/ThemeScript';
import { homeLinks } from '../components/home/HomeLinks';
import { IconDefinitions } from '../components/home/Icon';
import './fonts.css';

const plusJakartaSans = localFont({
  src: './fonts/plus-jakarta-sans/plus-jakarta-sans-latin-normal.woff2',
  weight: '300 700',
  style: 'normal',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  variable: '--next-sans',
  adjustFontFallback: false,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
});
const instrumentSerif = localFont({
  src: [
    {
      path: './fonts/instrument-serif/instrument-serif-latin-normal.woff2',
      style: 'normal',
    },
    {
      path: './fonts/instrument-serif/instrument-serif-latin-italic.woff2',
      style: 'italic',
    },
  ],
  weight: '400',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  variable: '--next-serif',
  adjustFontFallback: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});
const jetBrainsMono = localFont({
  src: './fonts/jetbrains-mono/jetbrains-mono-latin-normal.woff2',
  weight: '400 500',
  style: 'normal',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  variable: '--next-mono',
  adjustFontFallback: false,
  fallback: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
});

export const metadata: Metadata = {
  title: 'Hans Aaron Laureles',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const requestHeaders = await headers();
  const nonce = requestHeaders.get('x-nonce') || '';
  const currentCase = cases.find(
    (item) => '/case-' + item.slug === requestHeaders.get('x-portfolio-path'),
  );
  const isCase = Boolean(currentCase);
  const isAbout = requestHeaders.get('x-portfolio-path') === '/about';
  const isHome = requestHeaders.get('x-portfolio-path') === '/';
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <base href="/" />
        <link
          rel="stylesheet"
          href={isHome ? '/home.css?v=2.2.34' : '/styles.css?v=2.2.34'}
          precedence="next"
        />
        <ThemeScript nonce={nonce} />
      </head>
      <body>
        {isHome && (
          <>
            <a className="skip-link" href="#main-content">
              Skip to content
            </a>
            <IconDefinitions />
          </>
        )}
        <Header
          current={isAbout ? 'about' : isCase || isHome ? 'work' : undefined}
          mobileLinks={
            isHome ? homeLinks : isAbout ? aboutLinks : currentCase?.mobileLinks
          }
          showSakura={isHome || isAbout || currentCase?.slug === 'ciel'}
          home={isHome}
        />
        {children}
        {!isHome && (
          <Footer
            minimal={isCase}
            lsfm={currentCase?.slug === 'lsfm'}
            about={isAbout}
          />
        )}
        <Overlays home={isHome} />
      </body>
    </html>
  );
}
