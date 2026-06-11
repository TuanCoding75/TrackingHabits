import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Formular from './Formular/Formular';
import Tasks from './Tasks/Tasks'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Tasks />
    </>
  )
}

export default App
