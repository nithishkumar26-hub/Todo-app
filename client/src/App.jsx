import React from 'react'
import { Signinpage } from './lib/components/Signinpage'
import { Todonode } from './lib/components/Todonode'
import {BrowserRouter, Routes, Route} from "react-router-dom"


const App = () => {
  return (
    <div className='font-poppins'>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Signinpage/>}/>
              <Route path="/Todo" element={<Todonode/>}/>
          </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App