import "./styles/Read.css";
import { useState } from "react";
import { RecorderButton } from "../components/Recorderbutton.jsx";
import { AssessmentPanel } from "../components/Assessment.jsx";

export default function Read() {
  const [referenceText, setReferenceText] = useState("The quick brown fox jumps over the lazy dog.");
  const [result, setResult] = useState(null);

  return (
    <div className="container" style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <header>
        <h1 className="headtext" id="heading">Read this aloud</h1>
        <p className="headtext" id="paste-note">Paste your reading text, then record yourself.</p>
      </header>

      <main className="main-body" style={{ display: "grid", gap: 16 }}>
        <textarea
          value={referenceText}
          onChange={(e) => setReferenceText(e.target.value)}
          rows={5}
          style={{ width: "100%", fontSize: 16, padding: 8 }}
          placeholder="Paste the story here…"
        />
    
        <RecorderButton referenceText={referenceText} onResult={setResult} />
        {console.log("1"+JSON.stringify(result))}
        

        <AssessmentPanel result={result} />
        {console.log("2"+result)}
      </main>
    </div>
  );
}
