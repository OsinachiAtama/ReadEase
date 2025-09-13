let ws;

export function startSession(referenceText, onMessage) {
  ws = new WebSocket("ws://localhost:5000/realtime-assess");

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "start", referenceText }));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
}

export function sendAudioChunk(chunk) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "audio", chunk }));
  }
}

export function stopSession() {
  if (ws) {
    ws.send(JSON.stringify({ type: "stop" }));
    ws.close();
  }
}
