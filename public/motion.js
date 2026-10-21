/* Decorative motion is progressive enhancement; content never depends on it. */
function initPortfolioMotion() {
  'use strict';
  const reduced = window.portfolioMotion;
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const buttons = [...document.querySelectorAll('button, a')].filter(el =>
    el.tagName === 'BUTTON' || el.classList.contains('btn') || el.querySelector('use[href^="#icon-arrow-"]'));
  buttons.forEach(button => {
    if (getComputedStyle(button).position === 'static') button.classList.add('motion-button-static');
    button.classList.add('motion-button');
    // Preserve accessible labels; only the existing arrow gets its own transform.
    button.querySelectorAll('span[aria-hidden="true"]').forEach(span => {
      if (/^[↗→↓]$/.test(span.textContent.trim())) span.classList.add('motion-arrow');
    });
    button.querySelectorAll('use[href="#icon-arrow-right"], use[href="#icon-arrow-up-right"], use[href="#icon-arrow-down"]').forEach(use => use.parentElement.classList.add('motion-arrow'));
    const tail = button.lastChild;
    if (tail?.nodeType === Node.TEXT_NODE && /[↗→↓]\s*$/.test(tail.textContent)) {
      const arrow = tail.textContent.trim().slice(-1);
      tail.textContent = tail.textContent.replace(/[↗→↓]\s*$/, '');
      const span = document.createElement('span');
      span.className = 'motion-arrow'; span.ariaHidden = 'true'; span.textContent = arrow;
      button.appendChild(span);
    }
  });
  const magnets = [...document.querySelectorAll('.btn-primary')];
  magnets.forEach(button => {
    let bounds;
    const reset = () => { bounds = null; button.style.removeProperty('--pull-x'); button.style.removeProperty('--pull-y'); };
    button.addEventListener('pointerenter', () => { if (!reduced.disabled && fine.matches) bounds = button.getBoundingClientRect(); });
    button.addEventListener('pointermove', event => {
      if (!bounds || reduced.disabled || !fine.matches || event.pointerType === 'touch') return;
      const x = (event.clientX - bounds.x - bounds.width / 2) / (bounds.width / 2);
      const y = (event.clientY - bounds.y - bounds.height / 2) / (bounds.height / 2);
      const length = Math.max(1, Math.hypot(x, y));
      button.style.setProperty('--pull-x', `${x / length * 6}px`);
      button.style.setProperty('--pull-y', `${y / length * 6}px`);
    });
    button.addEventListener('pointerleave', reset);
    button.addEventListener('blur', reset);
    window.addEventListener('portfoliomotionchange', reset);
    fine.addEventListener('change', reset);
  });
  document.querySelectorAll('.project-card').forEach(card => {
    let bounds;
    const reset = () => { bounds = null; card.style.removeProperty('--tilt-x'); card.style.removeProperty('--tilt-y'); };
    card.addEventListener('pointerenter', () => { if (!reduced.disabled && fine.matches) bounds = card.getBoundingClientRect(); });
    card.addEventListener('pointermove', event => {
      if (!bounds || reduced.disabled || !fine.matches || event.pointerType === 'touch') return;
      const x = (event.clientX - bounds.x - bounds.width / 2) / (bounds.width / 2);
      const y = (event.clientY - bounds.y - bounds.height / 2) / (bounds.height / 2);
      const length = Math.max(1, Math.hypot(x, y));
      card.style.setProperty('--tilt-x', `${-y / length * 4}deg`);
      card.style.setProperty('--tilt-y', `${x / length * 4}deg`);
    });
    card.addEventListener('pointerleave', reset);
    window.addEventListener('portfoliomotionchange', reset);
    fine.addEventListener('change', reset);
  });
  if (typeof IntersectionObserver !== 'function') return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('awaiting-entry');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06 });
  if (!reduced.disabled) document.querySelectorAll('.work-section, .principles-section, .experience-section, .faq-section').forEach(group => {
    group.querySelectorAll('.home-section-title, .project-card, .process-strip li, .resume-timeline > li, details').forEach((item, index) => {
      item.classList.add('reveal-item');
      item.style.setProperty('--entry-delay', `${Math.min(index, 3) * 60}ms`);
      if (item.getBoundingClientRect().top >= innerHeight) {
        item.classList.add('awaiting-entry');
        observer.observe(item);
      }
    });
  });
  window.addEventListener('portfoliomotionchange', () => {
    if (!reduced.disabled) return;
    observer.disconnect();
    document.querySelectorAll('.awaiting-entry').forEach(el => el.classList.remove('awaiting-entry'));
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPortfolioMotion, { once: true });
else initPortfolioMotion();
