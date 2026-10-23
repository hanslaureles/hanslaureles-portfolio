'use client';

import Script from 'next/script';

// Keep the fixed sample scorer shared with the legacy page until cutover.
export default function MemoryDemo({ nonce }: { nonce: string }) {
  return <Script src="/case-memory-demo.js?v=2.2.34" nonce={nonce} strategy="afterInteractive" />;
}
