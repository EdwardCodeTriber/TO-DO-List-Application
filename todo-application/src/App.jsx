import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Landingpage from './Pages/Landingpage';

function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Home' element={<Home/> }/>
      </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App
