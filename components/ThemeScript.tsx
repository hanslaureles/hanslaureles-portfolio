export function ThemeScript({ nonce }: { nonce: string }) {
  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: `(function(){let savedTheme=null;try{savedTheme=localStorage.getItem('hans_portfolio_theme')}catch(e){}const theme=savedTheme||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',theme);if(location.pathname==='/')document.documentElement.dataset.motion=matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on'})();` }} />;
}
