import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google';
import Header from '../components/Header';
import { cases } from '../lib/cases';
import Footer from '../components/Footer';
import Overlays from '../components/Overlays';
import { aboutLinks } from '../lib/about';
import { ThemeScript } from '../components/ThemeScript';
import { homeLinks } from '../components/home/HomeLinks';
import { IconDefinitions } from '../components/home/Icon';
import './fonts.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--next-serif',
  adjustFontFallback: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
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
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
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
