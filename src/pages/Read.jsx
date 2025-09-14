import {React, useState, useRef} from "react"
import "./styles/Read.css"
// import { IoUploadOutline } from 'react-icons/io5';
import TTS2 from "./tts2.jsx"; // same folder

export default function Read(){
    const [inputText, setInputText] = useState("");   // tracks textarea input
    const [renderedText, setRenderedText] = useState(""); // tracks what we display
    const [isEditing, setIsEditing] = useState(true); // toggle edit/view
    const [currentWordIndex, setCurrentWordIndex] = useState(-1);
    const [selectedColor, setSelectedColor] = useState("#FFB3BA");
    const [selectedSpeed, setSelectedSpeed] = useState(1.0);
    const utteranceRef = useRef(null);
  

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

    const handleStartReading = (e) => {
        e.preventDefault();
        setIsEditing(false); // switch to view mode
    };

    const handleEdit = () => {
        setIsEditing(true); // switch back to edit mode
  };
    return(
        <>
            {/* <section> */}
  
                <div className="header">
                    <h1 className="headtext" id="heading">Choose Your Reading Text</h1>
                    <p className="headtext" id="paste-note">Paste your own text here or try one of our sample stories</p>
                </div>

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
                
                <div id="main_body"> 
                    
                    <div className="text_area">
                    
                        <h4 style={{marginBottom: "0"}}>  
                            <span className="serif-text"></span> &nbsp;
                            Paste Your Text
                        </h4>
                        <select
    value={selectedSpeed}
    onChange={(e) => setSelectedSpeed(parseFloat(e.target.value))}
    style={{
      padding: "0.6rem 1rem",
      borderRadius: "10px",
      marginBottom: "1.5rem",
      display: "block",
      marginLeft: "0",
      marginRight: "auto",
    }}
  >
    {speedOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
                        <p style ={{color: "#4A5565", fontSize:"16px", marginTop: "5px"}}>Copy and Paste any text you would like to read!</p>

                        {isEditing? (
                            <form onSubmit={handleStartReading}>
                            <textarea 
                                type = "text" 
                                id = "input-area" 
                                placeholder="You can paste anything you want...you know"
                                value = {inputText}
                                onChange={(e)=> setInputText(e.target.value)}
                            />
                            <div id="buttonsDiv"> 
                                <button type="submit" className="blueButton"> Read Text </button>
                                <button type="button" className="blueButton">
                                    {/* <IoUploadOutline size={24} color="#4A5565"/> */}
                                    <span>Upload File</span>
                                </button>
                            </div>
                       
                        </form>

                        ) : ( 
                            <div id="render_txt">
                            <p id="renderedText">{inputText}</p>
                            <div id="buttonsDiv">
                                <button onClick={handleEdit} className="blueButton">
                                Edit
                                </button>
                                <button className="blueButton" onClick={handleRead}>🎤 Read Aloud</button>
                                <button className="blueButton">Listen First</button>
                            </div>
                            </div>

                        )}
                        
                    </div>
                    {/* <div className="text_area" id ="sample-books">
                        <h4> Have a read aloud session and read too, to Practice!</h4>
                        <div id="render_txt">
                            {renderedText}
                        </div>
                    </div> */}
                </div>

                   <TTS2 
                    //{/* </section> */}
                   text={inputText} 
  selectedColor={selectedColor} 
  selectedSpeed={selectedSpeed} 

/>

        </>
    )
}

// import "./styles/Read.css"
// import TTS2 from "../tts2.jsx"; // same folder



// export default function Read(){
//     return(
//         <div className="container">
//             <header>
//                 <h1 className="headtext" id="heading">Choose Your Reading Text</h1>
//                 <p className="headtext" id="paste-note">Paste your reading text here or try one of our sample stories</p>
//             </header>
//             <main className="main-body">
//                 <div className="text-area">
//                     <h4 id = "paste-text">Paste Your Text</h4>
//                 <form action="something" class="content">
//                         <input type = "text" class="content" id = "input-area" placeholder="You can paste anything you want...you know"></input>
//                 </form>
//                 </div>
//                 <div className="text-area" id ="sample-books">
//                     yayy
//                 </div>
//             </main>
//         </div>
//     )
// }






