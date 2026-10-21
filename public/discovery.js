/* Homepage discovery, with the existing cards as the single project source. */
(function () {
  'use strict';

  // Use the same overview entry point as the LSFM card; the overlay owns focus.
  document.getElementById('heroOverviewBtn').addEventListener('click', () => window.openSentinelHUD());

  const cards = [...document.querySelectorAll('.project-card[data-category]')];
  const tabs = [...document.querySelectorAll('.work-filters [role="tab"]')];
  const toggles = [...document.querySelectorAll('.work-views button')];
  const results = document.getElementById('work-results');
  const gallery = document.getElementById('work-gallery');
  const index = document.getElementById('work-index');
  let filter = 'All', view = 'gallery';
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const rows = cards.map(card => {
    const row = make('li', 'index-project');
    row.dataset.category = card.dataset.category;
    row.dataset.project = card.id;
    const identity = make('div', 'index-identity');
    identity.append(make('p', 'index-type', card.dataset.type));
    const heading = make('h3', '');
    heading.append(card.querySelector('h3 a').cloneNode(true));
    identity.append(heading);
    const detail = make('div', 'index-detail');
    const problem = card.querySelector('.project-problem');
    if (problem) detail.append(problem.cloneNode(true));
    detail.append(make('p', 'index-description', card.querySelector('.project-description').textContent.trim()));
    detail.append(card.querySelector('.project-stack').cloneNode(true));
    for (const selector of ['.project-fact', '.project-scope']) {
      const extra = card.querySelector(selector);
      if (extra) { extra.hidden = false; detail.append(extra); }
    }
    row.append(identity, detail, card.querySelector('.project-case-link').cloneNode(true));
    index.append(row);
    return row;
  });
  const matches = item => filter === 'All' || item.dataset.category === filter;
  function render() {
    tabs.forEach(tab => {
      const selected = tab.dataset.filter === filter;
      tab.ariaSelected = String(selected);
      tab.tabIndex = selected ? 0 : -1;
      if (selected) results.setAttribute('aria-labelledby', tab.id);
    });
    toggles.forEach(button => button.ariaPressed = String(button.dataset.view === view));
    cards.forEach(card => card.hidden = !matches(card));
    rows.forEach(row => row.hidden = !matches(row));
    gallery.hidden = view !== 'gallery';
    index.hidden = view !== 'index';
  }
  function change(nextFilter, nextView) {
    filter = nextFilter; view = nextView;
    window.portfolioTransition(render, 'work');
  }
  tabs.forEach((tab, i) => {
    const count = cards.filter(card => tab.dataset.filter === 'All' || card.dataset.category === tab.dataset.filter).length;
    tab.querySelector('.filter-count').textContent = count;
    tab.addEventListener('click', () => change(tab.dataset.filter, view));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      change(tabs[next].dataset.filter, view);
    });
  });
  toggles.forEach(button => button.addEventListener('click', () => change(filter, button.dataset.view)));
  results.setAttribute('role', 'tabpanel');
  results.tabIndex = 0;
  render();
  document.querySelector('.work-controls').hidden = false;
})();


/* Scripted request flow; only local timers and SVG transforms, never a request. */
(() => {
  const section = document.getElementById('request-pipeline');
  const nodes = [...section.querySelectorAll('.pipeline-node')];
  const map = section.querySelector('.pipeline-map');
  const narrow = matchMedia('(max-width: 767px)');
  let timers = [], frame;
  function cancel() {
    timers.forEach(clearTimeout);
    timers = [];
    cancelAnimationFrame(frame);
  }
  function complete() {
    cancel();
    section.dataset.state = 'finished';
    nodes.forEach(node => node.classList.add('is-reached'));
  }
  function run() {
    cancel();
    if (window.portfolioMotion.disabled) { complete(); return; }
    section.dataset.state = 'idle';
    nodes.forEach(node => node.classList.remove('is-reached'));
    // Flush the previous replay's animation before a restart.
    map.getBoundingClientRect();
    frame = requestAnimationFrame(() => {
      section.dataset.state = 'playing';
      nodes[0].classList.add('is-reached');
      nodes.slice(1).forEach((node, i) => timers.push(setTimeout(() => node.classList.add('is-reached'), (i + 1) * 1500)));
      timers.push(setTimeout(complete, 6000));
    });
  }
  function layout() {
    const vertical = narrow.matches;
    const width = map.clientWidth, step = width / 5, height = map.clientHeight;
    map.setAttribute('viewBox', vertical ? '0 0 320 1120' : `0 0 ${width} ${height}`);
    // Each node owns a full column with its icon centred, so the line runs centre to centre
    // and the reached ring (3 px wider than the icon) never touches a column edge.
    section.querySelectorAll('.pipeline-node-wrap').forEach((node, i) => {
      node.setAttribute('x', vertical ? '52' : String(i * step));
      node.setAttribute('y', vertical ? String(16 + i * 220) : '56');
      node.setAttribute('width', vertical ? '252' : String(step));
      node.setAttribute('height', vertical ? '210' : String(height - 56));
    });
    const start = step / 2, end = step * 4.5;
    map.style.setProperty('--pipeline-start-x', `${start}px`);
    map.style.setProperty('--pipeline-end-x', `${end}px`);
    section.querySelector('.pipeline-path').setAttribute('d', vertical ? 'M82 46H24V926H82 M24 266H82 M24 486H82 M24 706H82' : `M${start} 86H${end}`);
    if (section.dataset.state === 'playing') complete();
  }
  document.getElementById('pipelineRun').addEventListener('click', run);
  window.addEventListener('portfoliomotionchange', () => { if (window.portfolioMotion.disabled) complete(); });
  narrow.addEventListener('change', layout);
  layout();
  new ResizeObserver(layout).observe(map);
  if (window.portfolioMotion.disabled) complete();
})();

/* The native details remain the source and the phone/no-JavaScript fallback. */
(() => {
  const section = document.getElementById('recruiter-faq');
  const details = [...section.querySelectorAll('details')];
  const layout = document.createElement('div');
  layout.className = 'faq-layout';
  const list = document.createElement('div');
  list.className = 'faq-tabs';
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', 'Recruiter questions');
  list.setAttribute('aria-orientation', 'vertical');
  const panel = document.createElement('div');
  panel.id = 'faq-answer'; panel.className = 'faq-answer'; panel.tabIndex = 0;
  panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-atomic', 'true');
  const number = document.createElement('span');
  number.className = 'faq-number'; number.ariaHidden = 'true';
  const question = document.createElement('h3'), answer = document.createElement('p');
  panel.append(number, question, answer);
  const tabs = ['Availability', 'Time zone', 'Teams', 'Stack', 'Start'].map((label, i) => {
    const tab = document.createElement('button');
    tab.type = 'button'; tab.id = `faq-tab-${i}`; tab.className = 'faq-tab';
    const index = document.createElement('span');
    index.className = 'faq-tab-number'; index.textContent = String(i + 1).padStart(2, '0');
    tab.append(index, document.createTextNode(label));
    tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', panel.id);
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown') next = (i + 1) % details.length;
      if (event.key === 'ArrowUp') next = (i + details.length - 1) % details.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = details.length - 1;
      if (next === undefined) return;
      event.preventDefault(); tabs[next].focus(); select(next);
    });
    list.append(tab); return tab;
  });
  function select(index) {
    tabs.forEach((tab, i) => { tab.ariaSelected = String(i === index); tab.tabIndex = i === index ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tabs[index].id);
    number.textContent = String(index + 1).padStart(2, '0');
    question.textContent = details[index].querySelector('summary').textContent;
    answer.textContent = details[index].querySelector('p').textContent;
  }
  select(0);
  panel.setAttribute('aria-live', 'polite');
  layout.append(list, panel); details[0].before(layout);
  section.classList.add('faq-enhanced');
})();
