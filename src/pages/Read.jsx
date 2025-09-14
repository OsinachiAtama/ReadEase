import {React, useState} from "react"
import "./styles/Read.css"
// import { IoUploadOutline } from 'react-icons/io5';

export default function Read(){
    const [inputText, setInputText] = useState("");   // tracks textarea input
    const [renderedText, setRenderedText] = useState(""); // tracks what we display
    const [isEditing, setIsEditing] = useState(true); // toggle edit/view

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
                <div id="main_body"> 
                    <div className="text_area">
                        <h4 style={{marginBottom: "0"}}>  
                            <span className="serif-text">T</span> &nbsp;
                            Paste Your Text
                        </h4>
                        <p style ={{color: "#4A5565", fontSize:"16px", marginTop: "5px"}}>Copy and Paste any text you'd like to read</p>

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
                                <button type="submit" className="blueButton"> Start Reading </button>
                                <button type="button" className="blueButton">
                                    {/* <IoUploadOutline size={24} color="#4A5565"/> */}
                                    <span>Upload file(soon)</span>
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
                                <button className="blueButton">Read Aloud</button>
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
            {/* </section> */}
        </>
    )
}



