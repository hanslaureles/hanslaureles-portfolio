/**
 * HANS LAURELES — PORTFOLIO JAVASCRIPT
 * Theme switching, Image Lightbox, Mobile Navigation, Copy Email Toast
 */

(function () {
  'use strict';

  // --- 1. Theme Management ---
  const THEME_KEY = 'hans_portfolio_theme';
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeTransition;
  window.portfolioIcon = name => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
  window.portfolioMotion = {
    get disabled() { return motion.matches; }
  };
  function syncMotion() {
    document.documentElement.dataset.motion = window.portfolioMotion.disabled ? 'off' : 'on';
    if (window.portfolioMotion.disabled) activeTransition?.skipTransition();
    window.dispatchEvent(new Event('portfoliomotionchange'));
  }
  motion.addEventListener('change', syncMotion);
  syncMotion();
  document.querySelector('.skip-link').addEventListener('click', () => document.getElementById('main-content').focus());

  // One owner prevents overlapping theme/work transitions. The DOM update still
  // runs when an unsupported or skipped transition has no animation to display.
  function transition(update, kind = 'theme') {
    if (window.portfolioMotion.disabled || typeof document.startViewTransition !== 'function') {
      update();
      return Promise.resolve();
    }
    activeTransition?.skipTransition();
    document.documentElement.dataset.viewTransition = kind;
    let next;
    try { next = document.startViewTransition(update); }
    catch {
      delete document.documentElement.dataset.viewTransition;
      update();
      return Promise.resolve();
    }
    activeTransition = next;
    next.ready.catch(() => {}); // A superseded snapshot can legitimately be skipped.
    return next.finished.catch(() => {}).finally(() => {
      if (activeTransition !== next) return;
      activeTransition = null;
      delete document.documentElement.dataset.viewTransition;
    });
  }
  window.portfolioTransition = transition;

  // Storage access throws in Safari private mode or when site data is blocked;
  // an uncaught throw here would take down every feature in this IIFE.
  function readStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function storeTheme(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  function getPreferredTheme() {
    const saved = readStoredTheme();
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    storeTheme(theme);
    updateThemeIcons(theme);
  }

  function updateThemeIcons(theme) {
    const isDark = theme === 'dark';
    themeToggleButtons.forEach(btn => {
      btn.innerHTML = window.portfolioIcon(isDark ? 'sun' : 'moon');
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // Initialize theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      transition(() => applyTheme(nextTheme));
    });
  });

  // --- Overlays: one owner for scroll lock, inert background and focus return ---
  // The drawer, lightbox, Sentinel and Sakura all register here, so closing one
  // never unlocks the page (or un-inerts it) while another is still open.
  const overlayStack = []; // [{ el, returnTo }]

  function syncOverlays() {
    const top = overlayStack.length ? overlayStack[overlayStack.length - 1].el : null;
    document.body.style.overflow = top ? 'hidden' : '';
    for (const child of document.body.children) {
      child.inert = Boolean(top) && !child.contains(top);
    }
  }

  function openOverlay(el) {
    if (overlayStack.some(o => o.el === el)) return;
    overlayStack.push({ el, returnTo: document.activeElement });
    syncOverlays();
  }

  function closeOverlay(el) {
    const i = overlayStack.findIndex(o => o.el === el);
    if (i < 0) return;
    const [{ returnTo }] = overlayStack.splice(i, 1);
    syncOverlays();
    if (returnTo && typeof returnTo.focus === 'function' && document.contains(returnTo)) returnTo.focus();
  }

  window.portfolioOverlay = { open: openOverlay, close: closeOverlay };

  // Focus trap for the top-most overlay. `inert` keeps focus off the page behind,
  // but Tab can still leave the document (to the browser UI) from the last control;
  // this cycles Tab / Shift+Tab within the overlay instead.
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !overlayStack.length) return;
    const top = overlayStack[overlayStack.length - 1].el;
    const items = [...top.querySelectorAll(FOCUSABLE)].filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
    if (!items.length) { e.preventDefault(); return; }
    const first = items[0];
    const last = items[items.length - 1];
    const inside = top.contains(document.activeElement);
    if (e.shiftKey && (document.activeElement === first || !inside)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
      e.preventDefault();
      first.focus();
    }
  });

  // --- 2. Mobile Drawer Navigation ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileDrawerClose = document.querySelector('.mobile-drawer-close');

  function isDrawerOpen() {
    return Boolean(mobileDrawer && mobileDrawer.classList.contains('open'));
  }

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    openOverlay(mobileDrawer);
    const first = mobileDrawerClose || mobileDrawer.querySelector('a, button');
    if (first) first.focus();
  }

  function closeDrawer() {
    if (!isDrawerOpen()) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    closeOverlay(mobileDrawer); // returns focus to the menu button
  }

  if (mobileMenuBtn && mobileDrawer) {
    if (!mobileDrawer.id) mobileDrawer.id = 'mobileDrawer';
    mobileMenuBtn.setAttribute('aria-controls', mobileDrawer.id);
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.addEventListener('click', openDrawer);
    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
    mobileDrawer.querySelectorAll('a').forEach(link => link.addEventListener('click', closeDrawer));
  }

  // --- 3. Image Lightbox Modal ---
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-modal';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Enlarged image');
  lightbox.innerHTML = `
    <div class="lightbox-img-wrapper">
      <button class="lightbox-close-btn" aria-label="Close enlarged image">
        ${window.portfolioIcon('x')}
        <span>ESC</span>
      </button>
      <img src="" alt="">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close-btn');

  function isLightboxOpen() {
    return lightbox.classList.contains('active');
  }

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Case study image';
    lightbox.classList.add('active');
    openOverlay(lightbox);
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!isLightboxOpen()) return;
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    closeOverlay(lightbox); // returns focus to the image's trigger button
  }

  // Each enlargeable image sits inside a real <button>, so keyboard and screen
  // reader users can open it (a clickable <img> is neither focusable nor announced).
  document.querySelectorAll('.gallery-item img, .full-width-image img').forEach(img => {
    const target = img.closest('picture') || img;
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'lightbox-trigger';
    trigger.setAttribute('aria-label', `Enlarge image: ${img.alt || 'case study image'}`);
    target.parentNode.insertBefore(trigger, target);
    trigger.appendChild(target);
    trigger.addEventListener('click', () => {
      // Responsive <picture> images: open the largest variant, not the small fallback src.
      openLightbox(img.dataset.full || img.currentSrc || img.src, img.alt);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // --- 4. 1-Click Copy Email Feature ---
  const copyButtons = document.querySelectorAll('.contact-email-btn, .copy-email-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'hanslaureles92@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `${window.portfolioIcon('check')} Copied: ${email}`;
        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 2200);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  // --- 5. Keyboard Shortcuts ---
  // Alt-letter shortcuts stand down while the user is typing: in a text field
  // macOS Option+T types "†", AltGr layouts (Polish, German, ...) type accented
  // letters, and IME composition must not be interrupted.
  function altShortcutBlocked(e) {
    if (e.isComposing || e.keyCode === 229) return true;
    if (e.getModifierState && e.getModifierState('AltGraph')) return true;
    const el = e.target instanceof Element ? e.target : null;
    return Boolean(el && (el.isContentEditable || el.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')));
  }

  window.addEventListener('keydown', (e) => {
    // ESC closes the top-most of the lightbox / drawer.
    if (e.key === 'Escape') {
      if (isLightboxOpen()) closeLightbox();
      else if (isDrawerOpen()) closeDrawer();
    }
    // Alt+T toggles theme. A modifier is required (WCAG 2.1.4) so typing or
    // speech input never flips the theme; e.code keeps it working on macOS,
    // where Option+T produces a different e.key.
    if (e.code === 'KeyT' && e.altKey && !e.ctrlKey && !e.metaKey && !e.repeat && !altShortcutBlocked(e)) {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      transition(() => applyTheme(current === 'dark' ? 'light' : 'dark'));
    }
  });

  // The overview's event feed is keyboard scrollable.
  document.getElementById('sentinelLogFeed').tabIndex = 0;

  // Roles are available on hover, keyboard focus and touch activation. Escape
  // dismisses a role while focus stays on the name (WCAG 1.4.13).
  document.querySelectorAll('.agent-chip').forEach(chip => {
    const item = chip.parentElement;
    const show = () => { item.classList.add('role-visible'); chip.setAttribute('aria-expanded', 'true'); };
    const hide = () => { item.classList.remove('role-visible'); chip.setAttribute('aria-expanded', 'false'); };
    item.addEventListener('mouseenter', show);
    item.addEventListener('mouseleave', () => { if (document.activeElement !== chip) hide(); });
    chip.addEventListener('focus', show);
    chip.addEventListener('blur', hide);
    chip.addEventListener('click', show);
    chip.addEventListener('keydown', e => { if (e.key === 'Escape') { hide(); e.stopPropagation(); } });
  });

})();
