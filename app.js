/**
 * HANS LAURELES — PORTFOLIO JAVASCRIPT
 * Theme switching, Image Lightbox, Mobile Navigation, Copy Email Toast
 */

(function () {
  'use strict';

  // --- 1. Theme Management ---
  const THEME_KEY = 'hans_portfolio_theme';
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  
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
      btn.innerHTML = isDark
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Switch to light mode"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Switch to dark mode"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    });
  }

  // Initialize theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
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

  // --- 2. Mobile Drawer Navigation ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileDrawerClose = document.querySelector('.mobile-drawer-close');

  function isDrawerOpen() {
    return Boolean(mobileDrawer && mobileDrawer.classList.contains('open'));
  }

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    openOverlay(mobileDrawer);
    const first = mobileDrawerClose || mobileDrawer.querySelector('a, button');
    if (first) first.focus();
  }

  function closeDrawer() {
    if (!isDrawerOpen()) return;
    mobileDrawer.classList.remove('open');
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
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
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B8A3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied: ${email}`;
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
      applyTheme(current === 'dark' ? 'light' : 'dark');
    }
  });

  // --- 6. Table of Contents Scrollspy ---
  const tocLinks = document.querySelectorAll('.case-toc-list a');
  const sections = document.querySelectorAll('.case-body-section');
  if (tocLinks.length > 0 && sections.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-10% 0px -70% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  // --- 7. Selected Works Horizontal Showcase Carousel (Infinite Loop) ---
  const showcaseTrack = document.getElementById('projectShowcaseTrack');
  const showcasePrevBtn = document.getElementById('showcasePrevBtn');
  const showcaseNextBtn = document.getElementById('showcaseNextBtn');
  const showcaseThumb = document.getElementById('showcaseProgressThumb');

  if (showcaseTrack) {
    const originalCards = Array.from(showcaseTrack.querySelectorAll('.editorial-card'));
    const totalCards = originalCards.length;

    // Build infinite loop by cloning cards before and after
    if (totalCards > 1) {
      const prependFragment = document.createDocumentFragment();
      const appendFragment = document.createDocumentFragment();

      originalCards.forEach((card) => {
        const beforeClone = card.cloneNode(true);
        beforeClone.classList.add('is-clone');
        beforeClone.setAttribute('aria-hidden', 'true');
        beforeClone.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1'));
        prependFragment.appendChild(beforeClone);

        const afterClone = card.cloneNode(true);
        afterClone.classList.add('is-clone');
        afterClone.setAttribute('aria-hidden', 'true');
        afterClone.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1'));
        appendFragment.appendChild(afterClone);
      });

      showcaseTrack.insertBefore(prependFragment, originalCards[0]);
      showcaseTrack.appendChild(appendFragment);
    }

    function getMetrics() {
      const card = originalCards[0];
      if (!card) return { step: 0, loopWidth: 0 };
      const style = window.getComputedStyle(showcaseTrack);
      const gap = parseFloat(style.gap) || 24;
      const cardWidth = card.getBoundingClientRect().width;
      const step = cardWidth + gap;
      const loopWidth = step * totalCards;
      return { cardWidth, gap, step, loopWidth };
    }

    function initPosition() {
      const { loopWidth } = getMetrics();
      if (loopWidth > 0) {
        showcaseTrack.style.scrollBehavior = 'auto';
        showcaseTrack.scrollLeft = loopWidth;
        showcaseTrack.style.scrollBehavior = '';
        updateProgressThumb();
      }
    }

    // Set initial position aligned to first real card
    setTimeout(initPosition, 80);
    window.addEventListener('load', initPosition, { once: true });

    let isResetting = false;

    function checkBoundaryReset() {
      if (isResetting) return;
      const { loopWidth } = getMetrics();
      if (loopWidth <= 0) return;

      const current = showcaseTrack.scrollLeft;

      // Scrolled past real cards into after-clones zone
      if (current >= loopWidth * 2 - 4) {
        isResetting = true;
        showcaseTrack.style.scrollBehavior = 'auto';
        showcaseTrack.style.scrollSnapType = 'none';
        showcaseTrack.scrollLeft = current - loopWidth;
        requestAnimationFrame(() => {
          showcaseTrack.style.scrollBehavior = '';
          showcaseTrack.style.scrollSnapType = '';
          isResetting = false;
        });
      }
      // Scrolled before real cards into before-clones zone
      else if (current < loopWidth - 4) {
        isResetting = true;
        showcaseTrack.style.scrollBehavior = 'auto';
        showcaseTrack.style.scrollSnapType = 'none';
        showcaseTrack.scrollLeft = current + loopWidth;
        requestAnimationFrame(() => {
          showcaseTrack.style.scrollBehavior = '';
          showcaseTrack.style.scrollSnapType = '';
          isResetting = false;
        });
      }
    }

    function updateProgressThumb() {
      if (!showcaseThumb || totalCards <= 1) return;
      const { loopWidth } = getMetrics();
      if (loopWidth <= 0) return;

      const offsetInLoop = ((showcaseTrack.scrollLeft - loopWidth) % loopWidth + loopWidth) % loopWidth;
      const ratio = Math.min(1, Math.max(0, offsetInLoop / loopWidth));
      const thumbWidthPercent = (1 / totalCards) * 100;
      showcaseThumb.style.width = `${thumbWidthPercent}%`;
      showcaseThumb.style.left = `${ratio * (100 - thumbWidthPercent)}%`;
    }

    // Arrow navigation - continuous looping, never disabled
    if (showcasePrevBtn) {
      showcasePrevBtn.disabled = false;
    }
    if (showcaseNextBtn) {
      showcaseNextBtn.disabled = false;
    }

    let navTimer = null;

    function scrollByStep(direction) {
      const { step } = getMetrics();
      if (step <= 0) return;

      clearTimeout(navTimer);
      // Honor the OS "reduce motion" setting: jump instead of gliding.
      const scrollMode = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      showcaseTrack.style.scrollBehavior = scrollMode;
      showcaseTrack.scrollBy({ left: direction * step, behavior: scrollMode });

      navTimer = setTimeout(() => {
        checkBoundaryReset();
      }, 380);
    }

    if (showcasePrevBtn) {
      showcasePrevBtn.addEventListener('click', () => scrollByStep(-1));
    }

    if (showcaseNextBtn) {
      showcaseNextBtn.addEventListener('click', () => scrollByStep(1));
    }

    let scrollDebounce = null;
    showcaseTrack.addEventListener('scroll', () => {
      updateProgressThumb();
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(checkBoundaryReset, 180);
    }, { passive: true });

    if ('onscrollend' in window) {
      showcaseTrack.addEventListener('scrollend', () => {
        checkBoundaryReset();
      });
    }

    window.addEventListener('resize', () => {
      checkBoundaryReset();
      updateProgressThumb();
    });

    // Drag-to-scroll interaction on desktop
    let isDown = false;
    let startX, scrollLeftVal;

    showcaseTrack.addEventListener('mousedown', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      isDown = true;
      showcaseTrack.classList.add('is-dragging');
      startX = e.pageX - showcaseTrack.offsetLeft;
      scrollLeftVal = showcaseTrack.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      showcaseTrack.classList.remove('is-dragging');
      checkBoundaryReset();
    });

    showcaseTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - showcaseTrack.offsetLeft;
      const walk = (x - startX) * 1.3;
      showcaseTrack.scrollLeft = scrollLeftVal - walk;
      updateProgressThumb();
    });
  }

  // --- 8. Keyboard-reachable scroll regions (WCAG 2.1.1) ---
  // A region that scrolls but holds nothing focusable can't be scrolled from the
  // keyboard. Demo output boxes grow after interaction, so they are always
  // focusable; terminals and wide tables only when they actually overflow.
  const ALWAYS_SCROLLABLE = '.memory-result-box, .ciel-response-box';
  const MAYBE_SCROLLABLE = '.terminal-body, .routing-table-container, [style*="overflow-x: auto"], [style*="overflow: auto"]';

  document.querySelectorAll(ALWAYS_SCROLLABLE).forEach(el => {
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
  });

  function markScrollRegions() {
    document.querySelectorAll(MAYBE_SCROLLABLE).forEach(el => {
      const scrolls = el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
      if (scrolls) {
        if (!el.hasAttribute('tabindex')) { el.tabIndex = 0; el.dataset.scrollFocus = '1'; }
      } else if (el.dataset.scrollFocus) {
        el.removeAttribute('tabindex');
        delete el.dataset.scrollFocus;
      }
    });
  }

  let scrollRegionFrame = 0;
  const scheduleScrollRegions = () => {
    cancelAnimationFrame(scrollRegionFrame);
    scrollRegionFrame = requestAnimationFrame(markScrollRegions);
  };
  if (document.readyState === 'complete') markScrollRegions();
  else window.addEventListener('load', markScrollRegions, { once: true });
  window.addEventListener('resize', scheduleScrollRegions);

})();