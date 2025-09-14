import { useState } from "react";
import { RecorderButton } from "../components/Recorderbutton";
import { AssessmentPanel } from "../components/Assessment";

export default function ReadPage() {
  const [result, setResult] = useState(null);

  return (
    <main>
      <h2>Read this aloud:</h2>
      <p>The quick brown fox jumps over the lazy dog.</p>

      <RecorderButton 
        referenceText="The quick brown fox jumps over the lazy dog." 
        onResult={setResult} 
    />


      <AssessmentPanel result={result} />
    </main>
  );
}
