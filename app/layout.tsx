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
  title: '404 — Page Not Found · Hans Aaron Laureles',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const nonce = (await headers()).get('x-nonce') || '';
  return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning><head><base href="/" /><ThemeScript nonce={nonce} /></head><body><Header />{children}<Footer /><Overlays /></body></html>;
}
