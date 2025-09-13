import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from"react-router-dom";
import Home from "./pages/Home"; 
import About from "./pages/About";
import './App.css'; 
import Navbar from "./components/Nav"


function App() {
  return (
    <>
      <Router>
       <Navbar />
        <Routes> 
          <Route path="/" element = {<Home/>} />
          <Route path= "/about" element = {<About/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
