'use client';

import { useEffect } from 'react';

// The progress line remains CSS scroll-driven; this owns its accessible contents list.
export default function ReadingProgress() {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('.case-toc-list a');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        for (const link of links) link.classList.toggle('active', link.hash === '#' + entry.target.id);
      }
    }, { rootMargin: '-10% 0px -70% 0px' });
    document.querySelectorAll('.case-body-section').forEach(section => observer.observe(section));
    const triggers: HTMLButtonElement[] = [];
    document.querySelectorAll<HTMLImageElement>('.gallery-item img, .full-width-image img').forEach(img => {
      const target = img.closest('picture') || img;
      const trigger = document.createElement('button');
      trigger.type = 'button'; trigger.className = 'lightbox-trigger';
      trigger.setAttribute('aria-label', `Enlarge image: ${img.alt || 'case study image'}`);
      target.before(trigger); trigger.append(target); triggers.push(trigger);
      trigger.onclick = () => {
        const modal = document.querySelector<HTMLElement>('.lightbox-modal');
        const full = modal?.querySelector('img');
        if (!modal || !full) return;
        full.src = img.dataset.full || img.currentSrc || img.src;
        full.alt = img.alt || 'Case study image';
        modal.classList.add('active'); window.portfolioOverlay?.open(modal);
        modal.querySelector('button')?.focus();
      };
    });
    const scrollRegions = document.querySelectorAll<HTMLElement>('.case-table-wrap, .terminal-body, .routing-table-container, [style*="overflow-x: auto"], [style*="overflow: auto"]');
    const markScrollRegions = () => {
      document.querySelectorAll<HTMLElement>('.memory-result-box, .ciel-response-box').forEach(el => { el.tabIndex = 0; });
      scrollRegions.forEach(el => {
        const scrolls = el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
        if (scrolls && !el.hasAttribute('tabindex')) { el.tabIndex = 0; el.dataset.scrollFocus = '1'; }
        else if (!scrolls && el.dataset.scrollFocus) { el.removeAttribute('tabindex'); delete el.dataset.scrollFocus; }
      });
    };
    const resizeObserver = new ResizeObserver(markScrollRegions);
    scrollRegions.forEach(el => resizeObserver.observe(el));
    markScrollRegions(); window.addEventListener('load', markScrollRegions); window.addEventListener('resize', markScrollRegions);
    return () => {
      observer.disconnect(); resizeObserver.disconnect(); window.removeEventListener('load', markScrollRegions); window.removeEventListener('resize', markScrollRegions);
      for (const trigger of triggers) trigger.replaceWith(...trigger.childNodes);
    };
  }, []);
  return null;
}
