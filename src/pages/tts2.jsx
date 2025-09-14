import React, { useState, useRef } from "react";

export default function TTS2() {
  const [text, setText] = useState(
    ""
  );
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [selectedColor, setSelectedColor] = useState("#FFB3BA");
  const [selectedSpeed, setSelectedSpeed] = useState(1.0);
  const utteranceRef = useRef(null);

  const words = text.split(" ");

  const pastelRainbow = [
    { name: "Pastel Red", hex: "#FFB3BA" },
    { name: "Pastel Orange", hex: "#FFDFBA" },
    { name: "Pastel Yellow", hex: "#FFFFBA" },
    { name: "Pastel Green", hex: "#BAFFC9" },
    { name: "Pastel Blue", hex: "#BAE1FF" },
    { name: "Pastel Purple", hex: "#E0BBFF" },
    { name: "Pastel Pink", hex: "#FFCCE5" },
  ];

  const speedOptions = [
    { label: "🐢 Slow", value: 0.8 },
    { label: "🐇 Normal", value: 1.0 },
    { label: "🐆 Fast", value: 1.3 },
  ];

  const handleRead = () => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.pitch = 1.3;
    utterance.rate = selectedSpeed;

    const voice = speechSynthesis.getVoices().find((v) => v.lang === "en-US");
    if (voice) utterance.voice = voice;

    utterance.addEventListener("boundary", (event) => {
      if (event.name === "word") {
        let wordCount = 0;
        let chars = 0;
        for (let w of words) {
          chars += w.length + 1;
          if (chars > event.charIndex) break;
          wordCount++;
        }
        setCurrentWordIndex(wordCount);
      }
    });

    utterance.addEventListener("end", () => {
      setCurrentWordIndex(-1);
    });

    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: 'Lora'}}>
  {/* ✏️ Fixed-size Text Box */}
  {/* <textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
    rows={6} // fixed number of rows
    style={{
      width: "80%",
      height: "150px", // fixed height
      marginBottom: "1.2rem",
      padding: "1rem",
      fontSize: "1rem",
      borderRadius: "12px",
      border: "3px solid #abd7f9ff",
      outline: "none",
      backgroundColor: "#d0dfbfff",
      resize: "none", // prevent user from resizing
      overflowY: "auto", // add scroll if text overflows
      whiteSpace: "pre-wrap", // wrap text
      wordWrap: "break-word", // wrap long words
    }}
    placeholder="Type your text..."
  /> */}

  {/* 🎨 Color Palette
  <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
    {pastelRainbow.map((color) => (
      <button
        key={color.hex}
        onClick={() => setSelectedColor(color.hex)}
        title={color.name}
        style={{
          width: "70px",
          height: "40px",
          borderRadius: "10px",
          border:
            selectedColor === color.hex ? "3px solid #555" : "2px solid #eee",
          backgroundColor: color.hex,
          cursor: "pointer",
          margin: "0 4px",
        }}
      />
    ))}
    return 
  </div> */}
  

  {/* ⚡ Speed Selector */}
  {/* <select
    value={selectedSpeed}
    onChange={(e) => setSelectedSpeed(parseFloat(e.target.value))}
    style={{
      padding: "0.6rem 1rem",
      borderRadius: "10px",
      marginBottom: "1.5rem",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    {speedOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select> */}

  {/* 🎤 Read Button
  <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
    <button
      onClick={handleRead}
      style={{
        padding: "0.8rem 1.8rem",
        borderRadius: "12px",
        border: "none",
        backgroundColor: "#5f7fe9ff",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
      }}
    >
      🎤 Read Text
    </button>
  </div> */}

  {/* 📖 Highlighted Text Underneath Speed Dropdown */}
  <div
    style={{
      marginTop: "1rem",
      fontSize: "1.3rem",
      lineHeight: "2rem",
      textAlign: "center",
    }}
  >
    {words.map((word, i) => (
      <span
        key={i}
        style={{
          backgroundColor: i === currentWordIndex ? selectedColor : "transparent",
          marginRight: "6px",
          borderRadius: "6px",
          padding: "2px 6px",
          transition: "background-color 0.2s ease",
        }}
      >
        {word}
      </span>
    ))}
  </div>
</div>
  );
}
