export default function NotFound() {
  return <main id="main-content" className="section-spacing" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}><div className="container" style={{ textAlign: 'center', maxWidth: 680 }}>
    <div className="badge badge-accent" style={{ marginBottom: 24 }}>HTTP ERROR 404</div>
    <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', marginBottom: 16 }}>Lost in the <span className="serif-italic">Margins.</span></h1>
    <p className="lead" style={{ marginBottom: 36 }}>The requested URL was not found on this server or has been relocated to another section.</p>
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}><a href="/index.html" className="btn btn-primary">Return to Selected Work</a><a href="/about.html" className="btn btn-outline">Read About Me</a></div>
  </div></main>;
}
export { notFoundMetadata as metadata } from '../lib/not-found-metadata';
