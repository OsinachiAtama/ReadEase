// import { useState, useEffect, useRef } from 'react';

// export default function HighlightedReader() {
//   const [text, setText] = useState(
//     'Highlight this text or type your own, and watch as each word lights up while being read aloud!'
//   );
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const utteranceRef = useRef(null);

//   const words = text.split(' ');

//   const handleRead = () => {
//     if (utteranceRef.current) {
//       speechSynthesis.cancel(); // stop previous reading
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utteranceRef.current = utterance;

//     // Optional: fun cartoon-style voice
//     utterance.pitch = 1.5; // higher pitch
//     utterance.rate = 1.1;  // slightly faster
//     const voice = speechSynthesis.getVoices().find(v => v.lang === 'en-US');
//     if (voice) utterance.voice = voice;

//     // Track spoken words
//     let charIndex = 0;
//     utterance.addEventListener('boundary', (event) => {
//       if (event.name === 'word') {
//         // Find which word corresponds to the current character index
//         let wordCount = 0;
//         let chars = 0;
//         for (let w of words) {
//           chars += w.length + 1; // +1 for space
//           if (chars > event.charIndex) break;
//           wordCount++;
//         }
//         setCurrentWordIndex(wordCount);
//       }
//     });

//     utterance.addEventListener('end', () => {
//       setCurrentWordIndex(-1); // reset highlight when done
//     });

//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         rows={4}
//         style={{ width: '100%', marginBottom: '1rem' }}
//       />

//       <button onClick={handleRead} style={{ padding: '0.5rem 1rem' }}>
//         Read Text
//       </button>

//       <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
//         {words.map((word, i) => (
//           <span
//             key={i}
//             style={{
//               backgroundColor: i === currentWordIndex ? 'yellow' : 'transparent',
//               marginRight: '4px',
//               backgroundColor: i === currentWordIndex ? 'blue' : 'transparent',
//               marginRight: '4px',
//             }}
//           >
//             {word}
//           </span>
//         ))}
//       </p>
//     </div>
//   );
// }


//rainbow colors version
// import { useState, useRef } from 'react';

// export default function HighlightedReader() {
//   const [text, setText] = useState(
//     'Highlight this text or type your own, and watch as each word lights up while being read aloud!'
//   );
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const utteranceRef = useRef(null);

//   const words = text.split(' ');

//   // 🌈 Rainbow colors
//   const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

//   const handleRead = () => {
//     if (utteranceRef.current) {
//       speechSynthesis.cancel();
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utteranceRef.current = utterance;

//     utterance.pitch = 1.5;
//     utterance.rate = 1.1;
//     const voice = speechSynthesis.getVoices().find(v => v.lang === 'en-US');
//     if (voice) utterance.voice = voice;

//     utterance.addEventListener('boundary', (event) => {
//       if (event.name === 'word') {
//         let wordCount = 0;
//         let chars = 0;
//         for (let w of words) {
//           chars += w.length + 1;
//           if (chars > event.charIndex) break;
//           wordCount++;
//         }
//         setCurrentWordIndex(wordCount);
//       }
//     });

//     utterance.addEventListener('end', () => {
//       setCurrentWordIndex(-1);
//     });

//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         rows={4}
//         style={{ width: '100%', marginBottom: '1rem' }}
//       />

//       <button onClick={handleRead} style={{ padding: '0.5rem 1rem' }}>
//         Read Text
//       </button>

//       <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
//         {words.map((word, i) => (
//           <span
//             key={i}
//             style={{
//               backgroundColor:
//                 i === currentWordIndex
//                   ? rainbow[i % rainbow.length] // cycle through rainbow 🌈
//                   : 'transparent',
//               marginRight: '4px',
//               borderRadius: '4px',
//               padding: '2px 4px',
//             }}
//           >
//             {word}
//           </span>
//         ))}
//       </p>
//     </div>
//   );
// }

//pastel colors version
// import { useState, useRef } from 'react';

// export default function HighlightedReader() {
//   const [text, setText] = useState(
//     'Highlight this text or type your own, and watch as each word lights up while being read aloud!'
//   );
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const [selectedColor, setSelectedColor] = useState("Pastel Red");
//   const utteranceRef = useRef(null);

//   const words = text.split(' ');

//   // 🌈 Pastel rainbow colors
//   const pastelRainbow = {
//     "Pastel Red": "#FFB3BA",
//     "Pastel Orange": "#FFDFBA",
//     "Pastel Yellow": "#FFFFBA",
//     "Pastel Green": "#BAFFC9",
//     "Pastel Blue": "#BAE1FF",
//     "Pastel Purple": "#E0BBFF",
//     "Pastel Pink": "#FFCCE5"
//   };

//   const handleRead = () => {
//     if (utteranceRef.current) {
//       speechSynthesis.cancel();
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utteranceRef.current = utterance;

//     utterance.pitch = 1.5;
//     utterance.rate = 1.1;
//     const voice = speechSynthesis.getVoices().find(v => v.lang === 'en-US');
//     if (voice) utterance.voice = voice;

//     utterance.addEventListener('boundary', (event) => {
//       if (event.name === 'word') {
//         let wordCount = 0;
//         let chars = 0;
//         for (let w of words) {
//           chars += w.length + 1;
//           if (chars > event.charIndex) break;
//           wordCount++;
//         }
//         setCurrentWordIndex(wordCount);
//       }
//     });

//     utterance.addEventListener('end', () => {
//       setCurrentWordIndex(-1);
//     });

//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         rows={4}
//         style={{ width: '100%', marginBottom: '1rem' }}
//       />

//       {/* Color selector dropdown */}
//       <div style={{ marginBottom: "1rem" }}>
//         <label style={{ marginRight: "0.5rem" }}>Highlight Color:</label>
//         <select
//           value={selectedColor}
//           onChange={(e) => setSelectedColor(e.target.value)}
//           style={{ padding: "0.3rem" }}
//         >
//           {Object.keys(pastelRainbow).map((color) => (
//             <option key={color} value={color}>
//               {color}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button onClick={handleRead} style={{ padding: '0.5rem 1rem' }}>
//         Read Text
//       </button>

//       <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
//         {words.map((word, i) => (
//           <span
//             key={i}
//             style={{
//               backgroundColor:
//                 i === currentWordIndex ? pastelRainbow[selectedColor] : 'transparent',
//               marginRight: '4px',
//               borderRadius: '4px',
//               padding: '2px 4px',
//             }}
//           >
//             {word}
//           </span>
//         ))}
//       </p>
//     </div>
//   );
// }

//pastel colors with colors shown
// import { useState, useRef } from "react";

// export default function HighlightedReader() {
//   const [text, setText] = useState(
//     "Highlight this text or type your own, and watch as each word lights up while being read aloud!"
//   );
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const [selectedColor, setSelectedColor] = useState("#FFB3BA"); // default: pastel red
//   const utteranceRef = useRef(null);

//   const words = text.split(" ");

//   // 🌈 Pastel rainbow colors
//   const pastelRainbow = [
//     { name: "Pastel Red", hex: "#FFB3BA" },
//     { name: "Pastel Orange", hex: "#FFDFBA" },
//     { name: "Pastel Yellow", hex: "#FFFFBA" },
//     { name: "Pastel Green", hex: "#BAFFC9" },
//     { name: "Pastel Blue", hex: "#BAE1FF" },
//     { name: "Pastel Purple", hex: "#E0BBFF" },
//     { name: "Pastel Pink", hex: "#FFCCE5" },
//   ];

//   const handleRead = () => {
//     if (utteranceRef.current) {
//       speechSynthesis.cancel();
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utteranceRef.current = utterance;

//     utterance.pitch = 1.5;
//     utterance.rate = 1.1;
//     const voice = speechSynthesis.getVoices().find((v) => v.lang === "en-US");
//     if (voice) utterance.voice = voice;

//     utterance.addEventListener("boundary", (event) => {
//       if (event.name === "word") {
//         let wordCount = 0;
//         let chars = 0;
//         for (let w of words) {
//           chars += w.length + 1;
//           if (chars > event.charIndex) break;
//           wordCount++;
//         }
//         setCurrentWordIndex(wordCount);
//       }
//     });

//     utterance.addEventListener("end", () => {
//       setCurrentWordIndex(-1);
//     });

//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         rows={4}
//         style={{ width: "100%", marginBottom: "1rem" }}
//       />

//       {/* 🎨 Color swatch selector */}
//       <div style={{ marginBottom: "1rem" }}>
//         <p style={{ marginBottom: "0.5rem" }}>Select Highlight Color:</p>
//         <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
//           {pastelRainbow.map((color) => (
//             <button
//               key={color.hex}
//               onClick={() => setSelectedColor(color.hex)}
//               title={color.name}
//               style={{
//                 width: "32px",
//                 height: "32px",
//                 borderRadius: "50%",
//                 border:
//                   selectedColor === color.hex
//                     ? "3px solid black"
//                     : "1px solid #ccc",
//                 backgroundColor: color.hex,
//                 cursor: "pointer",
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <button onClick={handleRead} style={{ padding: "0.5rem 1rem" }}>
//         Read Text
//       </button>

//       <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
//         {words.map((word, i) => (
//           <span
//             key={i}
//             style={{
//               backgroundColor:
//                 i === currentWordIndex ? selectedColor : "transparent",
//               marginRight: "4px",
//               borderRadius: "4px",
//               padding: "2px 4px",
//             }}
//           >
//             {word}
//           </span>
//         ))}
//       </p>
//     </div>
//   );
// }



// Center pastel color palette
// import { useState, useRef } from "react";

// export default function HighlightedReader() {
//   const [text, setText] = useState(
//     "Highlight this text or type your own, and watch as each word lights up while being read aloud!"
//   );
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const [selectedColor, setSelectedColor] = useState("#FFB3BA"); // default pastel red
//   const utteranceRef = useRef(null);

//   const words = text.split(" ");

//   // 🌈 Pastel rainbow palette
//   const pastelRainbow = [
//     { name: "Pastel Red", hex: "#FFB3BA" },
//     { name: "Pastel Orange", hex: "#FFDFBA" },
//     { name: "Pastel Yellow", hex: "#FFFFBA" },
//     { name: "Pastel Green", hex: "#BAFFC9" },
//     { name: "Pastel Blue", hex: "#BAE1FF" },
//     { name: "Pastel Purple", hex: "#E0BBFF" },
//     { name: "Pastel Pink", hex: "#FFCCE5" },
//   ];

//   const handleRead = () => {
//     if (utteranceRef.current) {
//       speechSynthesis.cancel();
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utteranceRef.current = utterance;

//     utterance.pitch = 1.5;
//     utterance.rate = 1.1;
//     const voice = speechSynthesis.getVoices().find((v) => v.lang === "en-US");
//     if (voice) utterance.voice = voice;

//     utterance.addEventListener("boundary", (event) => {
//       if (event.name === "word") {
//         let wordCount = 0;
//         let chars = 0;
//         for (let w of words) {
//           chars += w.length + 1;
//           if (chars > event.charIndex) break;
//           wordCount++;
//         }
//         setCurrentWordIndex(wordCount);
//       }
//     });

//     utterance.addEventListener("end", () => {
//       setCurrentWordIndex(-1);
//     });

//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Comic Sans MS, sans-serif" }}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         rows={4}
//         style={{
//           width: "100%",
//           marginBottom: "1rem",
//           padding: "0.5rem",
//           fontSize: "1rem",
//           borderRadius: "8px",
//           border: "2px solid #ddd",
//         }}
//       />

//       {/* 🎨 Centered color palette */}
//       <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
//         <p style={{ marginBottom: "0.75rem", fontSize: "1.1rem" }}>
//           Pick Your Highlight Color:
//         </p>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "0.75rem",
//             flexWrap: "wrap",
//           }}
//         >
//           {pastelRainbow.map((color) => (
//             <button
//               key={color.hex}
//               onClick={() => setSelectedColor(color.hex)}
//               title={color.name}
//               style={{
//                 width: "60px",
//                 height: "40px",
//                 borderRadius: "12px", // softer rectangles
//                 border:
//                   selectedColor === color.hex
//                     ? "3px solid #555"
//                     : "2px solid #eee",
//                 backgroundColor: color.hex,
//                 cursor: "pointer",
//                 boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                 transition: "transform 0.15s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.transform = "scale(1.1)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.transform = "scale(1)")
//               }
//             />
//           ))}
//         </div>
//       </div>

//       <div style={{ textAlign: "center" }}>
//         <button
//           onClick={handleRead}
//           style={{
//             padding: "0.7rem 1.5rem",
//             borderRadius: "12px",
//             border: "none",
//             backgroundColor: "#BAE1FF",
//             cursor: "pointer",
//             fontSize: "1rem",
//             fontWeight: "bold",
//             boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
//           }}
//         >
//           🎤 Read Text
//         </button>
//       </div>

//       <p
//         style={{
//           marginTop: "1.5rem",
//           fontSize: "1.3rem",
//           lineHeight: "2rem",
//           textAlign: "center",
//         }}
//       >
//         {words.map((word, i) => (
//           <span
//             key={i}
//             style={{
//               backgroundColor:
//                 i === currentWordIndex ? selectedColor : "transparent",
//               marginRight: "6px",
//               borderRadius: "6px",
//               padding: "2px 6px",
//               transition: "background-color 0.2s ease",
//             }}
//           >
//             {word}
//           </span>
//         ))}
//       </p>
//     </div>
//   );
// }


import React, { useState, useRef } from "react";

export default function TTS2() {
  const [text, setText] = useState(
    "Highlight this text or type your own, and watch as each word lights up while being read aloud!"
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
    <div style={{ padding: "2rem", fontFamily: "'Comic Sans MS', cursive" }}>
  {/* ✏️ Fixed-size Text Box */}
  <textarea
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
  />

  {/* 🎨 Color Palette */}
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
  </div>

  {/* ⚡ Speed Selector */}
  <select
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
  </select>

  {/* 🎤 Read Button */}
  <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
    <button
      onClick={handleRead}
      style={{
        padding: "0.8rem 1.8rem",
        borderRadius: "12px",
        border: "none",
        backgroundColor: "#BAE1FF",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
      }}
    >
      🎤 Read Text
    </button>
  </div>

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
