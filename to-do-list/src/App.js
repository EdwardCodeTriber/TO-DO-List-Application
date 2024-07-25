import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Main from './Pages/Main';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Main' element={<Main/> }/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
