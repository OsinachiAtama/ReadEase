// server/metrics.js

function normalizeWords(s) {
  return s.toLowerCase().replace(/[^a-z0-9']+/g, " ").trim().split(/\s+/).filter(Boolean);
}

// WER with traceback so we can see which words were missed (deletions)
export function werWithAlignment(reference, hypothesis) {
  console.log("hello")
  const ref = normalizeWords(reference);
  console.log(reference)
  const hyp = normalizeWords(hypothesis);
  console.log(hypothesis)

  const n = ref.length, m = hyp.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const bp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(null)); // backpointers

  for (let i = 0; i <= n; i++) { dp[i][0] = i; bp[i][0] = i === 0 ? null : "del"; }
  for (let j = 0; j <= m; j++) { dp[0][j] = j; bp[0][j] = j === 0 ? null : "ins"; }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = ref[i - 1] === hyp[j - 1];
      const del = dp[i - 1][j] + 1;
      const ins = dp[i][j - 1] + 1;
      const sub = dp[i - 1][j - 1] + (match ? 0 : 1);
      const best = Math.min(del, ins, sub);
      dp[i][j] = best;
      bp[i][j] = (best === sub) ? (match ? "match" : "sub") : (best === del ? "del" : "ins");
    }
  }

  // traceback → alignment
  const alignment = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    const op = bp[i][j];
    if (op === "match" || op === "sub") {
      alignment.push({ target: ref[i - 1] ?? null, said: hyp[j - 1] ?? null, op });
      i--; j--;
    } else if (op === "del") {
      alignment.push({ target: ref[i - 1], said: null, op: "del" });
      i--;
    } else if (op === "ins") {
      alignment.push({ target: null, said: hyp[j - 1], op: "ins" });
      j--;
    } else {
      break;
    }
  }
  alignment.reverse();

  const edits = dp[n][m];
  const errorRate = n ? edits / n : 0;
  const accuracy = 1 - errorRate;
  const missed = alignment.filter(a => a.op === "del").map(a => a.target);

  return { errorRate, accuracy, alignment, missed };
}

export function cer(reference, hypothesis) {
  const ref = reference.toLowerCase().replace(/[^a-z0-9]/g, "");
  const hyp = hypothesis.toLowerCase().replace(/[^a-z0-9]/g, "");
  const n = ref.length, m = hyp.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = ref[i - 1] === hyp[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  const errorRate = n ? dp[n][m] / n : 0;
  return { errorRate, accuracy: 1 - errorRate };
}

// Combine (defaults: WER 70%, CER 30%)
export function combinedAccuracy(reference, transcript, werWeight = 0.7, cerWeight = 0.3) {
  console.log("helo")
  console.log(transcript)
  console.log(reference)
  const { accuracy: werAcc, alignment, missed } = werWithAlignment(reference, transcript);
  const { accuracy: cerAcc } = cer(reference, transcript);
  const combined = werAcc * werWeight + cerAcc * cerWeight;
  return { combined, werAcc, cerAcc, alignment, missed };
}
