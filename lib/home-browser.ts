declare global {
  interface Window {
    portfolioMotion?: { readonly disabled: boolean };
    portfolioTransition?: typeof transition;
    portfolioIcon?: (name: string) => string;
    openSentinelHUD?: () => void;
    closeSentinelHUD?: () => void;
    toggleSentinelHUD?: () => void;
    openSakuraCopilot?: () => void;
  }
}

let active: ViewTransition | undefined;
export function motionDisabled() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}
export function transition(update: () => void, kind = 'theme'): Promise<void> {
  if (motionDisabled() || !document.startViewTransition) {
    update();
    return Promise.resolve();
  }
  active?.skipTransition();
  document.documentElement.dataset.viewTransition = kind;
  let next: ViewTransition;
  try {
    next = document.startViewTransition(update);
  } catch {
    delete document.documentElement.dataset.viewTransition;
    update();
    return Promise.resolve();
  }
  active = next;
  void next.ready.catch(() => {});
  return next.finished
    .catch(() => {})
    .then(() => {
      if (active === next) {
        active = undefined;
        delete document.documentElement.dataset.viewTransition;
      }
    });
}
export function skipTransition() {
  active?.skipTransition();
}

export function altShortcutBlocked(event: KeyboardEvent) {
  return (
    event.isComposing ||
    event.keyCode === 229 ||
    event.getModifierState('AltGraph') ||
    (event.target instanceof Element &&
      Boolean(
        event.target.closest(
          'input,textarea,select,[contenteditable]:not([contenteditable="false"])',
        ),
      ))
  );
}
