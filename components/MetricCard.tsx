import { loadBench } from '../lib/bench';
import { Fragment } from 'react';

const percentile = (samples: number[], p: number) => [...samples].sort((a,b) => a-b)[Math.max(0, Math.ceil(samples.length * p / 100) - 1)];
const fmt = (ms: number, unit: string) => unit === 's' ? `${(ms / 1000).toFixed(2)} s` : `${Math.round(ms).toLocaleString('en-US')} ms`;
const axisLabel = (ms: number, unit: string) => ms === 0 ? `0 ${unit}` : ms < 1000 ? `${ms} ms` : `${ms / 1000} s`;

export default function MetricCard({ id }: { id: string }) {
  const card = loadBench(id), axis = card.axis;
  const x = (ms: number) => Number((1000 * (axis.scale === 'log' ? (Math.log(ms) - Math.log(axis.min)) / (Math.log(axis.max) - Math.log(axis.min)) : (ms-axis.min)/(axis.max-axis.min))).toFixed(1));
  const counts = card.rows.map(row => row.samples_ms.length);
  const values = card.headline_stats.map(([stat, rows]) => fmt(percentile(rows === 'all' ? card.rows.flatMap(row => row.samples_ms) : card.rows[rows].samples_ms, Number(stat.slice(1))), card.unit));
  const headline = card.headline.replace(/\{(\d+)\}/g, (_, index) => values[Number(index)]);
  const meta = card.meta.replace('{n_each}', new Set(counts).size === 1 ? String(counts[0]) : counts.join('/')).replace('{n_total}', String(counts.reduce((a,b)=>a+b,0))).replace('{date}', card.date);
  const files = [...new Set(card.rows.map(row => row.source))];
  return <figure className="metric-card" data-metric={id} aria-labelledby={`mc-${id}`}>
    <figcaption id={`mc-${id}`}><span className="metric-card-title">{card.title}</span><span className="metric-card-value">{headline}</span><span className="metric-card-meta">{meta}</span></figcaption>
    {card.rows.map(row => { const samples = row.samples_ms, p50 = percentile(samples, 50); return <div className="mc-row" key={row.label}><span className="mc-label">{row.label}</span><svg className="mc-strip" viewBox="0 0 1000 20" preserveAspectRatio="none" role="img" aria-label={`${samples.length} runs: ${fmt(Math.min(...samples),card.unit)} to ${fmt(Math.max(...samples),card.unit)}, p50 ${fmt(p50,card.unit)}`}>
      {samples.map((sample,i) => <line key={i} className="mc-run" x1={x(sample)} x2={x(sample)} y1="4" y2="16" />)}<line className="mc-p50" x1={x(p50)} x2={x(p50)} y1="0" y2="20" /></svg><span className="mc-stat">{fmt(p50,card.unit)}</span></div>; })}
    <div className="mc-axis" aria-hidden="true"><span>{axisLabel(axis.min,card.unit)}</span><span>{axis.scale === 'log' ? 'log scale' : 'linear scale'}</span><span>{axisLabel(axis.max,card.unit)}</span></div>
    <p className="metric-card-source">Each tick is one recorded run; the tall tick is the p50. Source: {files.map((file,i) => <Fragment key={file}>{i ? ' · ' : ''}<a href={`https://github.com/${card.source_repo}/blob/${card.source_commit}/${file}`} target="_blank" rel="noopener noreferrer">{file.split('/').at(-1)}</a></Fragment>)}</p>
  </figure>;
}
