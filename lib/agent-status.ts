import { agents } from './home';

type RecordValue = Record<string, unknown>;
const record = (value: unknown): value is RecordValue =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const utc = (value: unknown) =>
  typeof value === 'string' && Number.isFinite(Date.parse(value))
    ? Date.parse(value)
    : null;
export type AgentState = {
  state: 'online' | 'starting' | 'last-seen' | 'offline' | 'unknown';
  beat: number | null;
};

export function parseStatus(raw: unknown, now: number) {
  if (!record(raw) || raw.schema_version !== 1 || !record(raw.swarm))
    return null;
  const generatedAt = utc(raw.generated_at);
  if (generatedAt === null || generatedAt > now + 5 * 60 * 1000) return null;
  const swarm: Record<string, AgentState> = {};
  for (const { id } of agents) {
    const value = raw.swarm[id];
    if (
      !record(value) ||
      typeof value.status !== 'string' ||
      !['online', 'not_ready', 'stale', 'offline', 'unknown'].includes(
        value.status,
      )
    )
      return null;
    const beat = utc(value.last_heartbeat_utc);
    if (value.last_heartbeat_utc !== null && beat === null) return null;
    const fresh = beat !== null && beat <= now && now - beat <= 15 * 60 * 1000;
    const state: AgentState['state'] =
      beat !== null && beat > now
        ? 'unknown'
        : fresh && value.status === 'online'
          ? 'online'
          : fresh && value.status === 'not_ready'
            ? 'starting'
            : beat !== null
              ? 'last-seen'
              : value.status === 'offline'
                ? 'offline'
                : 'unknown';
    swarm[id] = { state, beat };
  }
  const lat = raw.llm_latency,
    m = raw.missions;
  const latency =
    record(lat) &&
    typeof lat.p50_ms === 'number' &&
    Number.isFinite(lat.p50_ms) &&
    typeof lat.p95_ms === 'number' &&
    Number.isFinite(lat.p95_ms) &&
    Number.isInteger(lat.sample_count) &&
    Number(lat.sample_count) > 0 &&
    typeof lat.measured_on === 'string'
      ? {
          p50: lat.p50_ms,
          p95: lat.p95_ms,
          n: Number(lat.sample_count),
          date: lat.measured_on,
        }
      : null;
  const packages =
    record(m) &&
    Number.isInteger(m.application_packages) &&
    Number(m.application_packages) >= 0
      ? { count: Number(m.application_packages), days: String(m.window_days) }
      : null;
  return { generatedAt, agents: swarm, latency, packages };
}

export function timeAgo(ms: number) {
  const min = Math.floor(Math.max(0, ms) / 60000);
  return min < 1
    ? 'just now'
    : min < 60
      ? `${min} min ago`
      : min < 2880
        ? `${Math.floor(min / 60)} h ago`
        : `${Math.floor(min / 1440)} days ago`;
}

export function manilaTime() {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return new Date(Date.now() + 8 * 3600000).toISOString().slice(11, 19);
  }
}

export const replayEvents = [
  {
    agent: 'EUNCHAE',
    icon: 'shield',
    msg: 'Watchdog cycle: CPU, RAM and disk sampled via psutil (every 5 min).',
  },
  {
    agent: 'SAKURA',
    icon: 'workflow',
    msg: 'Daily briefing posts once a day after 08:00.',
  },
  {
    agent: 'YUNJIN',
    icon: 'palette',
    msg: 'Weekly portfolio audit: page structure and image assets scanned.',
  },
  {
    agent: 'SAKURA',
    icon: 'workflow',
    msg: 'On !inbox: unread mail is classified into 10 LSFM/ Gmail labels.',
  },
  {
    agent: 'KAZUHA',
    icon: 'code',
    msg: 'On !ask: answers are grounded in the SQLite + Gemini-embedding knowledge base.',
  },
  {
    agent: 'CHAEWON',
    icon: 'briefcase',
    msg: 'On !pdf: the single-page ATS resume is compiled with headless Edge.',
  },
];
export const missionReplay = [
  {
    agent: 'SAKURA',
    icon: 'workflow',
    msg: '!apply <job url> received: scraping the posting, extracting role and company.',
  },
  {
    agent: 'CHAEWON',
    icon: 'briefcase',
    msg: 'Analyzing ATS fit and tailoring the resume and cover letter.',
  },
  {
    agent: 'YUNJIN',
    icon: 'palette',
    msg: 'Curating the case studies that best match the role.',
  },
  {
    agent: 'KAZUHA',
    icon: 'code',
    msg: 'Drafting the frontend tech pitch and CS positioning.',
  },
  {
    agent: 'EUNCHAE',
    icon: 'shield',
    msg: "QA check: the package is scored against the team's recorded failure lessons.",
  },
  {
    agent: 'SAKURA',
    icon: 'workflow',
    msg: 'Master proposal compiled and posted to the approvals channel for review.',
  },
];
