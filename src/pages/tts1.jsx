import { useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('');

  const handleRead = () => {
    // Get highlighted text
    const selectedText = window.getSelection().toString();

    if (!selectedText) {
      alert('Please highlight some text first!');
      return;
    }

    // Use Web Speech API to read the text aloud
    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.voice = speechSynthesis.getVoices().find(v => v.lang === 'en-US');
    utterance.pitch = 1.5; // high pitch
    utterance.rate = 1.1;  // faster
    speechSynthesis.speak(utterance);



    // Update state so we can show what is being read
    setMessage(selectedText);
    console.log('Reading aloud:', selectedText);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <p>
        Highlight this text or any other text on the page, then click the button to hear it spoken aloud.
      </p>

      <button onClick={handleRead} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
        Read Highlighted Text
      </button>

      {message && (
        <p style={{ marginTop: '1rem', color: 'blue' }}>
          Reading aloud: "{message}"
        </p>
      )}
    </div>
  );
}