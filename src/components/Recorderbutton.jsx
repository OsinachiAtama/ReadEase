import { useEffect } from "react";
import { useRecorder } from "../hooks/useRecorder";
import { uploadRecordingAndGetResult } from "../../services/assess";

export function RecorderButton({ referenceText, onResult }) {
  const { recording, blob, start, stop, setBlob } = useRecorder();

  useEffect(() => {
    if (!blob) return;

    // ✅ Play back recording immediately
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();

    // ✅ Then send to backend
    (async () => {
      try {
        const data = await uploadRecordingAndGetResult(blob, referenceText);
        onResult(data);
      } catch (e) {
        onResult({ ok: false, error: e.message });
      }
      setBlob(null);
    })();
  }, [blob, referenceText]);

  return (
    <div>
      {!recording ? (
        <button onClick={start}>🎤 Start Recording</button>
      ) : (
        <button onClick={stop}>⏹ Stop & Analyze</button>
      )}
    </div>
  );
}


