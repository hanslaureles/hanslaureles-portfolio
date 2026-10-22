import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import Script from 'next/script';
import ReadingProgress from './ReadingProgress';

export default async function CaseLayout({ slug, title, children }: { slug: string; title: string; children: ReactNode }) {
  const nonce = (await headers()).get('x-nonce') || '';
  return <><main id="main-content" className="container">{children}</main><ReadingProgress /><Script src="/sakura-copilot.js?v=2.2.34" nonce={nonce} strategy="afterInteractive" /></>;
}
