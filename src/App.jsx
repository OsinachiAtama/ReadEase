import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from"react-router-dom";
import Home from "./pages/Home"; 
import Navbar from "./components/Nav"
import Read from './pages/Read'
import './App.css'; 

import SignUp from './pages/Signup'
import Login from './pages/Login'

import React from "react";
import SpeechUI from './components/speechui.jsx';

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
