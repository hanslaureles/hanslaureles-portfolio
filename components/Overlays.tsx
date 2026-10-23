'use client';

import { useEffect } from 'react';
import Icon from './home/Icon';

declare global {
  interface Window {
    portfolioOverlay?: {
      open(el: HTMLElement): void;
      close(el: HTMLElement): void;
    };
  }
}

export default function Overlays({ home = false }: { home?: boolean }) {
  function closeLightbox() {
    const el = document.querySelector<HTMLElement>('.lightbox-modal');
    if (el) {
      el.classList.remove('active');
      window.portfolioOverlay?.close(el);
    }
  }
  useEffect(() => {
    const stack: { el: HTMLElement; returnTo: Element | null }[] = [];
    function sync() {
      const top = stack.at(-1)?.el;
      document.body.style.overflow = top ? 'hidden' : '';
      for (const child of document.body.children)
        if (child instanceof HTMLElement)
          child.inert = Boolean(top) && !child.contains(top || null);
    }
    window.portfolioOverlay = {
      open(el) {
        if (!stack.some((item) => item.el === el)) {
          stack.push({ el, returnTo: document.activeElement });
          sync();
        }
      },
      close(el) {
        const index = stack.findIndex((item) => item.el === el);
        if (index < 0) return;
        const [{ returnTo }] = stack.splice(index, 1);
        sync();
        if (returnTo instanceof HTMLElement && returnTo.isConnected)
          returnTo.focus();
      },
    };
    function trap(event: KeyboardEvent) {
      const top = stack.at(-1)?.el;
      if (event.key === 'Escape' && top?.classList.contains('lightbox-modal'))
        closeLightbox();
      if (!top || event.key !== 'Tab') return;
      const items = [
        ...top.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ].filter(
        (el) =>
          el.getClientRects().length &&
          getComputedStyle(el).visibility !== 'hidden',
      );
      const first = items[0],
        last = items.at(-1);
      if (!first) event.preventDefault();
      else if (
        event.shiftKey &&
        (document.activeElement === first ||
          !top.contains(document.activeElement))
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !top.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', trap);
    return () => {
      document.removeEventListener('keydown', trap);
      stack.length = 0;
      sync();
      delete window.portfolioOverlay;
    };
  }, []);
  return (
    <div
      className="lightbox-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
    >
      <div className="lightbox-img-wrapper">
        <button
          className="lightbox-close-btn"
          aria-label="Close enlarged image"
          onClick={closeLightbox}
        >
          {home ? (
            <Icon name="x" />
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
          <span>ESC</span>
        </button>
        <img alt="" />
      </div>
    </div>
  );
}
