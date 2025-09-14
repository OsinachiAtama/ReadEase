import { useRef, useState } from "react";

export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [blob, setBlob] = useState(null);
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunksRef.current = [];
    const mr = new MediaRecorder(stream);
    mediaRef.current = mr;

    mr.ondataavailable = (e) => chunksRef.current.push(e.data);
    mr.onstop = () => {
      const mime = mr.mimeType || "audio/webm";
      setBlob(new Blob(chunksRef.current, { type: mime }));
      stream.getTracks().forEach(t => t.stop());
    };

    mr.start();
    setRecording(true);
  }

  function stop() {
    mediaRef.current?.stop();
    setRecording(false);
  }

  return { recording, blob, start, stop, setBlob };
}
