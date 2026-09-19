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

  // --- 7. Selected Works Horizontal Showcase Carousel ---
  const showcaseTrack = document.getElementById('projectShowcaseTrack');
  const showcasePrevBtn = document.getElementById('showcasePrevBtn');
  const showcaseNextBtn = document.getElementById('showcaseNextBtn');
  const showcaseCounter = document.getElementById('showcaseCounter');
  const showcaseThumb = document.getElementById('showcaseProgressThumb');

  if (showcaseTrack) {
    const cards = showcaseTrack.querySelectorAll('.editorial-card');
    const totalCards = cards.length;

    function getCardStep() {
      if (cards.length > 0) {
        return cards[0].offsetWidth + 24; // card width + gap
      }
      return 360;
    }

    function updateCarouselState() {
      const maxScroll = showcaseTrack.scrollWidth - showcaseTrack.clientWidth;
      const currentScroll = showcaseTrack.scrollLeft;

      // Update Arrow disabled states
      if (showcasePrevBtn) showcasePrevBtn.disabled = currentScroll <= 6;
      if (showcaseNextBtn) showcaseNextBtn.disabled = currentScroll >= maxScroll - 6;

      // Calculate active card index (1-based) based on first primarily visible card
      const trackLeft = showcaseTrack.getBoundingClientRect().left;
      let activeIdx = 1;
      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        if (rect.right > trackLeft + (rect.width * 0.4)) {
          activeIdx = i + 1;
          break;
        }
      }

      if (showcaseCounter) {
        showcaseCounter.textContent = `0${activeIdx} / 0${totalCards}`;
      }

      // Update progress thumb
      if (showcaseThumb && maxScroll > 0) {
        const ratio = Math.min(1, Math.max(0, currentScroll / maxScroll));
        const thumbWidthPercent = Math.max(20, (showcaseTrack.clientWidth / showcaseTrack.scrollWidth) * 100);
        showcaseThumb.style.width = `${thumbWidthPercent}%`;
        showcaseThumb.style.left = `${ratio * (100 - thumbWidthPercent)}%`;
      }
    }

    if (showcasePrevBtn) {
      showcasePrevBtn.addEventListener('click', () => {
        showcaseTrack.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
      });
    }

    if (showcaseNextBtn) {
      showcaseNextBtn.addEventListener('click', () => {
        showcaseTrack.scrollBy({ left: getCardStep(), behavior: 'smooth' });
      });
    }

    showcaseTrack.addEventListener('scroll', updateCarouselState, { passive: true });
    window.addEventListener('resize', updateCarouselState);

    // Initial calculation
    setTimeout(updateCarouselState, 120);

    // Drag-to-scroll for mouse interaction on desktop
    let isDown = false;
    let startX, scrollLeftVal;

    showcaseTrack.addEventListener('mousedown', (e) => {
      // Don't intercept clicks on links or buttons
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
    });

    showcaseTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - showcaseTrack.offsetLeft;
      const walk = (x - startX) * 1.4;
      showcaseTrack.scrollLeft = scrollLeftVal - walk;
    });
  }

})();