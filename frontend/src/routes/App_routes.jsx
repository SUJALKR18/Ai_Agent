import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'  
import Home from '../screens/Home'
import Project from '../screens/Project'
const App_routes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path ="/project" element = {<Project />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App_routes