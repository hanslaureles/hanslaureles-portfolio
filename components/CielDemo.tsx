'use client';

import Script from 'next/script';

export default function CielDemo({ nonce }: { nonce: string }) {
  return <Script src="/case-ciel-demo.js?v=2.2.34" nonce={nonce} strategy="afterInteractive" />;
}
