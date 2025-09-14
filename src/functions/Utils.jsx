function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function tokens(s) { return normalize(s).split(" ").filter(Boolean); }

function wer(target, hyp) {
  const T = tokens(target); const H = tokens(hyp);
  const n = T.length, m = H.length;
  const dp = Array.from({length:n+1}, ()=>Array(m+1).fill(0));
  for (let i=0;i<=n;i++) dp[i][0] = i;
  for (let j=0;j<=m;j++) dp[0][j] = j;
  for (let i=1;i<=n;i++){
    for (let j=1;j<=m;j++){
      const cost = T[i-1] === H[j-1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost);
    }
  }
  return n ? dp[n][m] / n : 0;
}

module.exports = { wer };
