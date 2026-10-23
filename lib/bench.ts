import fs from 'node:fs';
import path from 'node:path';

export type BenchCard = {
  id: string; title: string; date: string; unit: string; headline: string; headline_stats: [string, number | 'all'][]; meta: string;
  axis: { min: number; max: number; scale: string }; source_repo: string; source_commit: string;
  rows: { label: string; source: string; samples_ms: number[] }[];
};

export function loadBench(id: string): BenchCard {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error('Invalid benchmark id');
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/bench', id + '.json'), 'utf8'));
}
