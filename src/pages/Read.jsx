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
// export {TTS2};

import "./styles/Read.css";
import TTS2 from "./tts2.jsx"; // same folder

export default function Read() {
    return (
        <div className="container">
            <header>
                <h1 className="headtext" id="heading">Choose Your Reading Text</h1>
                {/* <p className="headtext" id="paste-note">
                    Paste your reading text here or try one of our sample stories
                </p> */}
            </header>
            <main className="main-body">
                <div className="text-area">
                    <h4 id="paste-text">Paste Your Text</h4>
                    <form action="something" className="content">
                        <input
                            type="text"
                            className="content"
                            id="input-area"
                            placeholder="You can paste anything you want...you know"
                        />
                    </form>
                </div>
                <div className="text-area" id="sample-books">
                    <TTS2 /> {/* This renders your TTS2 component */}
                </div>
            </main>
        </div>
    );
}


