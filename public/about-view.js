// about.html: experience view toggle (cards / git timeline).
// Moved out of the page for the CSP (Phase 5A): script-src allows no inline script.
// Dual-Mode Experience View Toggler & SHA Copy
(function () {
  const btnCards = document.getElementById('btnViewCards');
  const btnGit = document.getElementById('btnViewGit');
  const cardsView = document.getElementById('experience-cards-view');
  const gitView = document.getElementById('experience-git-view');

  if (!btnCards || !btnGit || !cardsView || !gitView) return;

  function setView(mode) {
    if (mode === 'git') {
      cardsView.style.display = 'none';
      gitView.style.display = 'block';
      btnGit.classList.add('active');
      btnGit.setAttribute('aria-selected', 'true');
      btnCards.classList.remove('active');
      btnCards.setAttribute('aria-selected', 'false');
      try { localStorage.setItem('hans_about_view_pref', 'git'); } catch(e) {}
    } else {
      gitView.style.display = 'none';
      cardsView.style.display = 'flex';
      btnCards.classList.add('active');
      btnCards.setAttribute('aria-selected', 'true');
      btnGit.classList.remove('active');
      btnGit.setAttribute('aria-selected', 'false');
      try { localStorage.setItem('hans_about_view_pref', 'cards'); } catch(e) {}
    }
  }

  btnCards.addEventListener('click', () => setView('cards'));
  btnGit.addEventListener('click', () => setView('git'));

  // Check saved preference or URL hash
  if (window.location.hash === '#git' || (function(){ try { return localStorage.getItem('hans_about_view_pref') === 'git'; } catch(e){ return false; } })()) {
    setView('git');
  }

})();
