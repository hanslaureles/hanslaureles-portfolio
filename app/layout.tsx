import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Overlays from '../components/Overlays';
import { ThemeScript } from '../components/ThemeScript';
import '../public/styles.css';
import './fonts.css';

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--next-sans', adjustFontFallback: false, fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'] });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--next-serif', adjustFontFallback: false, fallback: ['Georgia', 'Times New Roman', 'serif'] });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--next-mono', adjustFontFallback: false, fallback: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'] });

export const metadata: Metadata = {
  title: 'Hans Aaron Laureles',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const requestHeaders = await headers();
  const nonce = requestHeaders.get('x-nonce') || '';
  const isCase = requestHeaders.get('x-portfolio-path')?.startsWith('/case-') || false;
  return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning><head><base href="/" /><ThemeScript nonce={nonce} /></head><body><Header current={isCase ? 'work' : undefined} />{children}<Footer minimal={isCase} /><Overlays /></body></html>;
}
