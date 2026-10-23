import type { MenuLink } from '../../lib/cases';
import Icon from './Icon';

export const homeLinks: MenuLink[] = [
  { href: 'index.html', label: 'Selected Work', className: 'active' },
  {
    href: '#',
    label: '🌸 Ask Sakura (AI Copilot)',
    className: 'open-sakura-btn',
    style: { color: 'var(--tone-pink)', fontWeight: 600 },
  },
  { href: 'about.html', label: 'About Me' },
  {
    href: 'case-ciel.html',
    label: (
      <>
        <Icon name="sparkles" /> Manas: Ciel
      </>
    ),
    style: { color: 'var(--tone-amber)', fontWeight: 600 },
  },
  { href: 'case-lsfm.html', label: 'LSFM AI HQ' },
  { href: 'case-memory.html', label: 'Memory Core' },
  {
    href: 'aura-store/index.html',
    label: (
      <>
        Aura Coffee (Live Store <Icon name="arrow-up-right" />)
      </>
    ),
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    href: 'Hans_Laureles_Resume.pdf',
    label: (
      <>
        Resume (PDF) <Icon name="arrow-up-right" />
      </>
    ),
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    href: 'https://github.com/hanslaureles',
    label: (
      <>
        GitHub Profile <Icon name="arrow-up-right" />
      </>
    ),
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];
