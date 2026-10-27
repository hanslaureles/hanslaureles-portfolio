'use client';

import { useEffect } from 'react';
import Sakura from '../Sakura';
import {
  motionDisabled,
  skipTransition,
  transition,
} from '../../lib/home-browser';

export default function Motion() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const cleanup: (() => void)[] = [];
    const listen = (
      target: EventTarget,
      event: string,
      handler: EventListener,
    ) => {
      target.addEventListener(event, handler);
      cleanup.push(() => target.removeEventListener(event, handler));
    };
    window.portfolioIcon = (name) =>
      `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
    window.portfolioMotion = {
      get disabled() {
        return motionDisabled();
      },
    };
    window.portfolioTransition = transition;
    function sync() {
      document.documentElement.dataset.motion = reduced.matches ? 'off' : 'on';
      if (reduced.matches) skipTransition();
      window.dispatchEvent(new Event('portfoliomotionchange'));
    }
    listen(reduced, 'change', sync);
    sync();
    const skip = document.querySelector('.skip-link');
    if (skip)
      listen(skip, 'click', () =>
        document.getElementById('main-content')?.focus(),
      );
    let initialized = false;
    const readyObserver = new MutationObserver(enhance);
    function enhance() {
      if (
        initialized ||
        !document.querySelector('#mobileMenu') ||
        !document.querySelector('.faq-layout') ||
        !document.querySelector('#sakuraDrawer')
      )
        return;
      initialized = true;
      readyObserver.disconnect();
      // The fill sweep says "this takes you somewhere", so only links that navigate get it
      // (Hans's review, 2026-10-27): action buttons keep their plain hover and focus styles.
      document
        .querySelectorAll<HTMLElement>('a.btn[href]')
        .forEach((link) => {
          if (getComputedStyle(link).position === 'static')
            link.classList.add('motion-button-static');
          link.classList.add('motion-button');
        });
      document.querySelectorAll<HTMLElement>('.agent-chip').forEach((chip) => {
        const item = chip.parentElement!;
        const show = () => {
          item.classList.add('role-visible');
          chip.setAttribute('aria-expanded', 'true');
        };
        const hide = () => {
          item.classList.remove('role-visible');
          chip.setAttribute('aria-expanded', 'false');
        };
        listen(item, 'mouseenter', show);
        listen(item, 'mouseleave', () => {
          if (document.activeElement !== chip) hide();
        });
        listen(chip, 'focus', show);
        listen(chip, 'blur', hide);
        listen(chip, 'click', show);
        listen(chip, 'keydown', (event) => {
          if ((event as KeyboardEvent).key === 'Escape') {
            hide();
            event.stopPropagation();
          }
        });
      });
      if (typeof IntersectionObserver !== 'function') return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              entry.target.classList.remove('awaiting-entry');
              observer.unobserve(entry.target);
            }
        },
        { threshold: 0.06 },
      );
      if (!reduced.matches)
        document
          .querySelectorAll(
            '.work-section,.principles-section,.experience-section,.faq-section',
          )
          .forEach((group) => {
            group
              .querySelectorAll<HTMLElement>(
                '.home-section-title,.project-card,.process-strip li,.resume-timeline > li,details',
              )
              .forEach((item, index) => {
                item.classList.add('reveal-item');
                item.style.setProperty(
                  '--entry-delay',
                  `${Math.min(index, 3) * 60}ms`,
                );
                if (item.getBoundingClientRect().top >= innerHeight) {
                  item.classList.add('awaiting-entry');
                  observer.observe(item);
                }
              });
          });
      listen(window, 'portfoliomotionchange', () => {
        if (reduced.matches) {
          observer.disconnect();
          document
            .querySelectorAll('.awaiting-entry')
            .forEach((el) => el.classList.remove('awaiting-entry'));
        }
      });
      cleanup.push(() => observer.disconnect());
    }
    listen(window, 'portfoliohome:ready', enhance);
    readyObserver.observe(document.body, { childList: true, subtree: true });
    enhance();
    return () => {
      readyObserver.disconnect();
      cleanup.forEach((fn) => fn());
      skipTransition();
      delete window.portfolioIcon;
      delete window.portfolioMotion;
      delete window.portfolioTransition;
    };
  }, []);
  return <Sakura home />;
}
