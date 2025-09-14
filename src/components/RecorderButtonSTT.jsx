import { useEffect } from "react";
import { useRecorder } from "../hooks/useRecorder";
import { uploadRecordingAndGetTranscript } from "../../services/transcribe";

export function RecorderButtonSTT({ referenceText, onResult }) {
  const { recording, blob, start, stop, setBlob } = useRecorder();

  useEffect(() => {
    if (!blob) return;

   

    (async () => {
      try {
        const data = await uploadRecordingAndGetTranscript(blob, referenceText);
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
        <button onClick={start}>🎤 Start (STT)</button>
      ) : (
        <button onClick={stop}>⏹ Stop & Transcribe</button>
      )}
    </div>
  );
}
