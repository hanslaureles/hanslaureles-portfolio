import Icon from './Icon';

const nodes = [
  {
    title: 'Discord !apply',
    role: 'A job link or description posted with !apply in Discord.',
    icons: ['message-square'],
  },
  {
    title: 'Sakura splits the job',
    role: 'Sakura hands the job to Chaewon, Yunjin and Kazuha.',
    icons: ['workflow'],
  },
  {
    title: 'Three specialists, in parallel',
    role: 'Resume and cover letter, portfolio picks and a tech pitch, built at the same time.',
    icons: ['briefcase', 'palette', 'code'],
  },
  {
    title: "Eunchae's QA check",
    role: 'Checked against past lessons before anything reaches me.',
    icons: ['shield'],
  },
  {
    title: 'Approval card',
    role: 'Nothing is sent until I approve it.',
    icons: ['circle-check'],
  },
];

export default function PipelineMap() {
  return (
    <svg
      className="pipeline-map"
      viewBox="0 0 1120 320"
      role="group"
      aria-label="Request flow"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="pipeline-path" d="M112 40H1008" />
      {nodes.map((node, i) => (
        <foreignObject
          className="pipeline-node-wrap"
          x={16 + i * 224}
          y="56"
          width="192"
          height="240"
          key={node.title}
        >
          <div
            className="pipeline-node"
            tabIndex={0}
            role="group"
            aria-label={node.title}
            aria-describedby={`pipeline-role-${i + 1}`}
          >
            {node.icons.length === 1 ? (
              <span className="pipeline-node-symbol">
                <Icon name={node.icons[0]} />
              </span>
            ) : (
              <div className="pipeline-specialists">
                {node.icons.map((icon) => (
                  <span className="pipeline-node-symbol" key={icon}>
                    <Icon name={icon} />
                  </span>
                ))}
              </div>
            )}
            <h3>{node.title}</h3>
            <p id={`pipeline-role-${i + 1}`} className="pipeline-role">
              {node.role}
            </p>
          </div>
        </foreignObject>
      ))}
      <circle className="pipeline-dot" r="6" cx="0" cy="0" aria-hidden="true" />
    </svg>
  );
}
