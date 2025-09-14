export async function uploadRecordingAndGetResult(blob, referenceText) {
  // Wrap the audio and text in FormData
  const formData = new FormData();
  formData.append("audio", blob, "speech.webm");
  formData.append("referenceText", referenceText);

  // Call your local backend (Express or Firebase Emulator)
  const res = await fetch("http://localhost:5050/assess-pronunciation", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  return res.json(); // Returns { ok, transcript, wer, wordScores, overall? }
}
