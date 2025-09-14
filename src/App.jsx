import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from"react-router-dom";
import Home from "./pages/Home"; 
import Navbar from "./components/Nav"
import Read from './pages/readpageSTT'


import SignUp from './pages/Signup'
import Login from './pages/Login'
import './App.css'; 


import ReadPageSTT from './pages/readpageSTT';

import React from "react";


function App() {
  const [count, setCount] = useState(0)

    return (
    <>
      <Router>
       <Navbar />
        <Routes> 
          <Route path="/" element = {<Home/>} />
          <Route path= "/readpageSTT" element = {<Read/>} />
          <Route path= "/Login" element = {<Login/>} />
          <Route path= "/SignUp" element = {<SignUp/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
