import 'server-only';
import { KNOWLEDGE_BASE } from './kb';

const STOP_WORDS = new Set(
  'a an and are as at be by for from has he in is it its of on that the to was were will with does tell me about what who how can did do hans laureles'.split(
    ' ',
  ),
);
function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_\-.\s]/g, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}
const documents = KNOWLEDGE_BASE.map((doc) => {
  const tokens = tokenize(
    `${doc.title} ${doc.title} ${doc.keywords.join(' ')} ${doc.category} ${doc.summary} ${doc.evidence}`,
  );
  const frequencies = new Map<string, number>();
  for (const token of tokens)
    frequencies.set(token, (frequencies.get(token) || 0) + 1);
  return { doc, length: tokens.length, frequencies };
});
const averageLength =
  documents.reduce((sum, doc) => sum + doc.length, 0) / documents.length;
const documentFrequencies = new Map<string, number>();
for (const { frequencies } of documents)
  for (const token of frequencies.keys())
    documentFrequencies.set(token, (documentFrequencies.get(token) || 0) + 1);

export function search(question: string) {
  const tokens = tokenize(question);
  return documents
    .map(({ doc, length, frequencies }) => {
      let score = 0;
      for (const token of tokens) {
        const tf = frequencies.get(token) || 0;
        if (!tf) continue;
        const n = documentFrequencies.get(token) || 0;
        const idf = Math.log(1 + (documents.length - n + 0.5) / (n + 0.5));
        score +=
          idf *
          ((tf * 2.5) / (tf + 1.5 * (0.25 + 0.75 * (length / averageLength))));
        if (doc.keywords.includes(token)) score += 1.5;
        if (doc.title.toLowerCase().includes(token)) score += 2;
      }
      return { doc, score };
    })
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0.3)
    .slice(0, 3)
    .map(({ doc: { keywords, linkUrl, ...doc } }) => ({
      ...doc,
      link: linkUrl,
    }));
}
