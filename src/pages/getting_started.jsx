import "../components/styles/get_start.css"
export default function RenderGetStart(){
    return(
        <div className="container">
            <header>
                <h1 className="headtext" id="heading">Choose Your Reading Text</h1>
                <p className="headtext" id="paste-note">Paste your reading text here or try one of our sample stories</p>
            </header>
            <main className="main-body">
                <div className="text-area">
                    <h4 id = "paste-text">Paste Your Text</h4>
                <form action="something" class="content">
                        <input type = "text" class="content" id = "input-area" placeholder="You can paste anything you want...you know"></input>
                </form>
                </div>
                <div className="text-area" id ="sample-books">
                    yayy
                </div>
            </main>
        </div>
    )
}