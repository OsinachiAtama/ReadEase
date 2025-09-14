export function AssessmentPanel({ result }) {
  if (!result) return null;
  if (!result.ok) return <p>❌ Error: {result.error}</p>;

  return (
    <section style={{ marginTop: 16 }}>
      {result.overall && (
        <p>
          <strong>Accuracy:</strong> {(result.overall.accuracy * 100).toFixed(1)}% &nbsp;
          <strong>Fluency:</strong> {(result.overall.fluency * 100).toFixed(1)}% &nbsp;
          <strong>Completeness:</strong> {(result.overall.completeness * 100).toFixed(1)}%
        </p>
      )}
      <p><strong>WER:</strong> {(result.wer * 100).toFixed(1)}%</p>
      <div style={{ lineHeight: 2, marginTop: 8, backgroundColor:"red"}} >
        {result.wordScores.map((w, i) => (
          <span
            key={i}
            style={{
              background:
                w.status === "ok" ? "transparent" :
                w.status === "missed" ? "#fecaca" : "#fde68a",
              padding: "0 2px",
              borderRadius: 4,
              marginRight: 4
            }}
            
          >
            {w.said ? `You said: ${w.said}` : ""}
            {w.target}
          </span>
        ))}
      </div>
      {result.transcript && (
        <details style={{ marginTop: 8 }}>
          <summary>Transcript</summary>
          <p style={{ fontStyle: "italic", marginTop: 6 }}>{result.transcript}</p>
        </details>
      )}
    </section>
  );
}
