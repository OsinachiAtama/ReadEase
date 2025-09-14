export async function uploadRecordingAndGetTranscript(blob, referenceText) {
  const formData = new FormData();
  formData.append("audio", blob, "recording.webm");
  formData.append("referenceText", referenceText); // <-- important

  const resp = await fetch("http://localhost:5050/transcribe", {
    method: "POST",
    body: formData,
  });

  if (!resp.ok) throw new Error("STT server error: " + resp.status);
  return resp.json(); // { ok, transcript, metrics }
}
