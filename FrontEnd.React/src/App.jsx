import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UI from './Components/UI'
import Login from './Components/Login'
import Signup from './Components/Signup'
import ProtectedRoute from './Components/Protectedroute'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Signup />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/dashboard' 
          element={
            <ProtectedRoute>
              <UI />
            </ProtectedRoute>
          }></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App