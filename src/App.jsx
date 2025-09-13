import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import render_get_start from './pages/getting_started'
import RenderGetStart from './pages/getting_started'

function App() {
  const [count, setCount] = useState(0)

    return (
    <>
      <RenderGetStart/> 
    </>
  );
}


export default App
