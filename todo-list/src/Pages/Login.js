import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
     <h1>Login</h1>
     <div>
        <Link to="/Register"> Sign up</Link>
        <br/>
        <br/>
        <Link to="/Main"> Sign In</Link>
     </div>
    
    
    </>
  )
}

export default Login