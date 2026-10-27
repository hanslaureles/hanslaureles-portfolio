import Icon from './Icon';
import { agents, projects } from '../../lib/home';

const featuredSizes =
  '(min-width: 1240px) 366px, (min-width: 1100px) calc((92vw - 48px) / 3), (min-width: 600px) calc((92vw - 24px) / 2), calc(100vw - 40px)';
const smallSizes =
  '(min-width: 1240px) 268px, (min-width: 1100px) calc((92vw - 72px) / 4), (min-width: 600px) calc((92vw - 24px) / 2), calc(100vw - 40px)';

export function ProjectIndex() {
  return (
    <>
      {projects.map((project) => (
        <li
          className="index-project"
          data-category={project.category}
          data-project={`project-${project.slug}`}
          key={project.slug}
        >
          <div className="index-identity">
            <p className="index-type">{project.type}</p>
            <h3>
              <a href={project.href}>{project.title}</a>
            </h3>
          </div>
          <div className="index-detail">
            {project.problem && (
              <p className="project-problem">{project.problem}</p>
            )}
            <p className="index-description">{project.description}</p>
            <ul className="index-stack project-stack" aria-label="Stack">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {project.scope && (
              <p className="project-scope">
                <span>Doesn’t do:</span> {project.scope}
              </p>
            )}
          </div>
          <a href={`/case-${project.slug}.html`} className="project-case-link">
            Case study
          </a>
        </li>
      ))}
    </>
  );
}

export default function ProjectCards() {
  return (
    <>
      {projects.map((project) => {
        const featured = project.category === 'AI';
        const sizes =
          project.slug === 'memory'
            ? '(min-width: 1240px) 366px, (min-width: 1100px) calc((92vw - 48px) / 3), (min-width: 600px) 46vw, calc(100vw - 40px)'
            : featured
              ? featuredSizes
              : smallSizes;
        const image = (hash: string, i: number, format: string) =>
          `/images/${project.folder}-mockup-${[480, 960, 1600][i]}.${hash}.${format}`;
        return (
          <article
            id={`project-${project.slug}`}
            data-category={project.category}
            data-type={project.type}
            data-stack={project.stack.join('|')}
            className={`project-card ${featured ? 'flagship-card' : 'more-project-card'}`}
            key={project.slug}
          >
            <a
              className="project-image"
              href={project.imageHref}
              aria-label={project.imageLabel}
            >
              {project.browser && (
                <span className="browser-chrome">
                  <span className="browser-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="browser-url">{project.browser}</span>
                </span>
              )}
              <picture>
                <source
                  type="image/avif"
                  srcSet={project.avif
                    .map(
                      (hash, i) =>
                        `${image(hash, i, 'avif')} ${[480, 960, 1600][i]}w`,
                    )
                    .join(', ')}
                  sizes={sizes}
                />
                <source
                  type="image/webp"
                  srcSet={project.webp
                    .map(
                      (hash, i) =>
                        `${image(hash, i, 'webp')} ${[480, 960, 1600][i]}w`,
                    )
                    .join(', ')}
                  sizes={sizes}
                />
                <img
                  src={image(project.webp[1], 1, 'webp')}
                  alt={project.alt}
                  width="960"
                  height={project.height}
                  loading={project.slug === 'ciel' ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </picture>
            </a>
            <div className="project-copy">
              {project.slug === 'lsfm' ? (
                <div className="project-card-heading">
                  <ul className="agent-chips" aria-label="Five-agent team">
                    {[
                      agents[0],
                      agents[1],
                      agents[3],
                      agents[2],
                      agents[4],
                    ].map((agent) => (
                      <li key={agent.id}>
                        <button
                          type="button"
                          className="agent-chip"
                          aria-label={agent.name}
                          aria-describedby={`role-${agent.id}`}
                          aria-expanded="false"
                          aria-controls={`role-${agent.id}`}
                        >
                          <Icon name={agent.icon} />
                        </button>
                        <span
                          className="agent-role"
                          id={`role-${agent.id}`}
                          role="tooltip"
                        >
                          {agent.role}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <h3>
                <a href={project.href}>{project.title}</a>
              </h3>
              {project.problem && (
                <p className="project-problem">{project.problem}</p>
              )}
              <p className="project-description" hidden={featured}>
                {project.description}
              </p>
              <ul className="index-stack project-stack" aria-label="Stack">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="project-actions">
                <a
                  href={`/case-${project.slug}.html`}
                  className="project-case-link"
                >
                  Case study
                </a>
                {project.demo && (
                  <a href={project.demo}>
                    Demo
                  </a>
                )}
                {project.slug === 'lsfm' && (
                  <>
                    <a
                      href="https://github.com/hanslaureles/lsfm-ai-hq"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source
                    </a>
                    <button
                      type="button"
                      id="sentinelToggleBtn"
                      aria-label="Open the agent overview (simulated replay, not a live connection)"
                      title="Open the agent overview (Alt+S)"
                      aria-keyshortcuts="Alt+S"
                    >
                      Agent overview
                    </button>
                  </>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
