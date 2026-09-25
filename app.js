/**
 * HANS LAURELES — PORTFOLIO JAVASCRIPT
 * Theme switching, Image Lightbox, Mobile Navigation, Copy Email Toast
 */

(function () {
  'use strict';

  // --- 1. Theme Management ---
  const THEME_KEY = 'hans_portfolio_theme';
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
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

  // --- 2. Mobile Drawer Navigation ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileDrawerClose = document.querySelector('.mobile-drawer-close');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (mobileDrawerClose) {
      mobileDrawerClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 3. Image Lightbox Modal ---
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-modal';
  lightbox.innerHTML = `
    <div class="lightbox-img-wrapper">
      <button class="lightbox-close-btn" aria-label="Close Lightbox">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <span>ESC</span>
      </button>
      <img src="" alt="Enlarged Case Study Graphic">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close-btn');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Case Study Diagram';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item img, .full-width-image img').forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
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
  window.addEventListener('keydown', (e) => {
    // ESC to close Lightbox or Drawer
    if (e.key === 'Escape') {
      closeLightbox();
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
    // 'T' to toggle theme (when not in input/textarea)
    if ((e.key === 't' || e.key === 'T') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
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
      showcaseTrack.style.scrollBehavior = 'smooth';
      showcaseTrack.scrollBy({ left: direction * step, behavior: 'smooth' });

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

})();