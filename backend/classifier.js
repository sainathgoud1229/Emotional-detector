// classifier.js
// Simple keyword-based emotion classifier

const EMOTIONS = {
  happy: ["happy","joy","glad","delighted","excited","love","great","amazing","smile","cheerful"],
  sad: ["sad","unhappy","down","depressed","tear","cry","lonely","mourn","sorrow","sorry"],
  angry: ["angry","mad","furious","hate","irritat","annoy","rage","frustrat","upset"],
  fear: ["afraid","scared","fear","worried","anxious","nervous","panic","terrified","phobia"],
  surprise: ["surprised","surprise","shocked","wow","astonish","amazed","unexpected"],
  neutral: [] // fallback
};

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

// Basic scoring: count keyword occurrences (with small weight for repeated words)
function scoreText(text) {
  const tokens = tokenize(text);
  const scores = {};
  for (const e of Object.keys(EMOTIONS)) scores[e] = 0;

  tokens.forEach(token => {
    for (const [emotion, keywords] of Object.entries(EMOTIONS)) {
      for (const kw of keywords) {
        // partial-match: startsWith to catch "frustrated" from "frustrat"
        if (token === kw || token.startsWith(kw)) {
          scores[emotion] += 1;
        }
      }
    }
  });

  // small heuristic: exclamation boosts excitement/anger
  if (text.includes("!")) {
    scores.happy += 0.5;
    scores.angry += 0.5;
  }
  // emoticons / emojis heuristics
  if (/[😀😄😊😍😂]/.test(text)) scores.happy += 1;
  if (/[☹️😢😞]/.test(text)) scores.sad += 1;
  if (/[😡😠]/.test(text)) scores.angry += 1;

  return scores;
}

function detectEmotion(text) {
  if (!text || typeof text !== "string") return { emotion: "neutral", scores: { neutral: 1 } };
  const scores = scoreText(text);

  // normalize scores to probabilities
  const total = Object.values(scores).reduce((a,b)=>a+b, 0);
  if (total === 0) {
    return { emotion: "neutral", scores: { neutral: 1 } };
  }

  const normalized = {};
  for (const k of Object.keys(scores)) normalized[k] = +(scores[k] / total).toFixed(3);

  // choose highest
  let best = "neutral", bestScore = -1;
  for (const [k,v] of Object.entries(normalized)) {
    if (v > bestScore) { best = k; bestScore = v; }
  }

  return { emotion: best, scores: normalized };
}

module.exports = { detectEmotion };
