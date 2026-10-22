'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactEmail({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText('hanslaureles92@gmail.com');
      setCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      location.href = 'mailto:hanslaureles92@gmail.com';
    }
  }
  return (
    <button
      className={`contact-email-btn btn ${compact ? 'btn-outline' : 'btn-primary'}`}
      data-email="hanslaureles92@gmail.com"
      style={compact ? { width: '100%', justifyContent: 'center' } : undefined}
      onClick={copy}
    >
      {copied ? (
        <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B8A3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{' '}Copied: hanslaureles92@gmail.com</>
      ) : compact ? (
        'hanslaureles92@gmail.com'
      ) : (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>{' '}
          <span>hanslaureles92@gmail.com [Copy]</span>
        </>
      )}
    </button>
  );
}
