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
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
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
      document.querySelectorAll<HTMLElement>('button,a').forEach((button) => {
        if (
          button.tagName !== 'BUTTON' &&
          !button.classList.contains('btn') &&
          !button.querySelector('use[href^="#icon-arrow-"]')
        )
          return;
        if (getComputedStyle(button).position === 'static')
          button.classList.add('motion-button-static');
        button.classList.add('motion-button');
        button.querySelectorAll('span[aria-hidden="true"]').forEach((span) => {
          if (/^[↗→↓]$/.test(span.textContent?.trim() || ''))
            span.classList.add('motion-arrow');
        });
        button
          .querySelectorAll(
            'use[href="#icon-arrow-right"],use[href="#icon-arrow-up-right"],use[href="#icon-arrow-down"]',
          )
          .forEach((use) => use.parentElement?.classList.add('motion-arrow'));
        const tail = button.lastChild;
        if (
          tail?.nodeType === Node.TEXT_NODE &&
          /[↗→↓]\s*$/.test(tail.textContent || '')
        ) {
          const text = tail.textContent || '';
          tail.textContent = text.replace(/[↗→↓]\s*$/, '');
          const span = document.createElement('span');
          span.className = 'motion-arrow';
          span.ariaHidden = 'true';
          span.textContent = text.trim().slice(-1);
          button.append(span);
        }
      });
      const track = (element: HTMLElement, kind: 'pull' | 'tilt') => {
        let bounds: DOMRect | null = null;
        const reset = () => {
          bounds = null;
          for (const axis of ['x', 'y'])
            element.style.removeProperty(`--${kind}-${axis}`);
        };
        listen(element, 'pointerenter', () => {
          if (!reduced.matches && fine.matches)
            bounds = element.getBoundingClientRect();
        });
        listen(element, 'pointermove', (event) => {
          const pointer = event as PointerEvent;
          if (
            !bounds ||
            reduced.matches ||
            !fine.matches ||
            pointer.pointerType === 'touch'
          )
            return;
          const x =
              (pointer.clientX - bounds.x - bounds.width / 2) /
              (bounds.width / 2),
            y =
              (pointer.clientY - bounds.y - bounds.height / 2) /
              (bounds.height / 2),
            length = Math.max(1, Math.hypot(x, y));
          element.style.setProperty(
            `--${kind}-x`,
            kind === 'pull'
              ? `${(x / length) * 6}px`
              : `${(-y / length) * 4}deg`,
          );
          element.style.setProperty(
            `--${kind}-y`,
            kind === 'pull'
              ? `${(y / length) * 6}px`
              : `${(x / length) * 4}deg`,
          );
        });
        listen(element, 'pointerleave', reset);
        listen(element, 'blur', reset);
        listen(window, 'portfoliomotionchange', reset);
        listen(fine, 'change', reset);
      };
      document
        .querySelectorAll<HTMLElement>('.btn-primary')
        .forEach((button) => track(button, 'pull'));
      document
        .querySelectorAll<HTMLElement>('.project-card')
        .forEach((card) => track(card, 'tilt'));
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
