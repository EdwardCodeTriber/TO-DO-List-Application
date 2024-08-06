import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Main from './Pages/Main';
import Landingpage from './Pages/Landingpage';
import './App.css'

function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Main' element={<Main/> }/>
      </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App
