import { useState } from "react";
import { RecorderButtonSTT } from "../components/RecorderButtonSTT";

export default function ReadPageSTT() {
  const [result, setResult] = useState(null);

  // The text you want the user to read (the "reference")
  const referenceText = "The quick brown fox jumps over the lazy dog.";//Insert text from text area here

  const metrics = result?.metrics;
  const accuracyPct = metrics ? Math.round(metrics.combined * 100) : null;
  const werPct = metrics ? Math.round(metrics.werAcc * 100) : null;
  const cerPct = metrics ? Math.round(metrics.cerAcc * 100) : null;
  const missed = metrics?.missed ?? [];

  return (
    <main>
      <h2>Read this aloud:</h2>
      <p>{referenceText}</p>

      <RecorderButtonSTT referenceText={referenceText} onResult={setResult} />

      {result?.transcript && (
        <p style={{ marginTop: 16 }}>
          <strong>Transcript:</strong> {result.transcript}
        </p>
      )}

      {metrics && (
        <div style={{ marginTop: 12 }}>
          <p><strong>Accuracy:</strong> {accuracyPct}%</p>
          {/* <small>WER acc: {werPct}% • CER acc: {cerPct}%</small> */}

          {missed.length > 0 && (
            <>
              <p style={{ marginTop: 8 }}><strong>Most likely missed:</strong></p>
              <p>{missed.join(", ")}</p>
            </>
          )}
        </div>
      )}

      {metrics?.alignment && (
        <p style={{ marginTop: 8 }}>
          {metrics.alignment.map((a, i) => {
            if (a.op === "match") return <span key={i} style={{ color: "green" }}>{a.target} </span>;
            if (a.op === "sub")   return <span key={i} style={{ color: "orange" }}>{a.said} </span>;
            if (a.op === "del")   return <span key={i} style={{ color: "red", textDecoration: "line-through" }}>{a.target} </span>;
            if (a.op === "ins")   return <span key={i} style={{ color: "gray" }}>{a.said} </span>;
            return null;
          })}
        </p>
      )}
    </main>
  );
}
