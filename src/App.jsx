import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from"react-router-dom";
import Home from "./pages/Home"; 
import Navbar from "./components/Nav"
import Read from './pages/Read'
import './App.css'; 




function App() {
  const [count, setCount] = useState(0)

    return (
    <>
      <Router>
       <Navbar />
        <Routes> 
          <Route path="/" element = {<Home/>} />
          <Route path= "/Read" element = {<Read/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
