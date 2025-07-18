import { useEffect, useState } from 'react';
import Error from "./components/Error.jsx"
import Home from "./components/Home.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import Signup from "./components/SignUp.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login.jsx"
function App() {
  return(

    <Router> 

    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<Signup/>} /> 
        
    </Routes>
  </Router>

  )

  
  
}

export default App;
