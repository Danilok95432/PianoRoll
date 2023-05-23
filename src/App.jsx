import { useState } from 'react'
import Start from './Components/Start'
import Interface from './Components/Interface'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route exact path='' component={Start} element={<Start />} />
            <Route exact path='/interface' component={Interface} element={<Interface />} />
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
