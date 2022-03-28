import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Home, Login, Register, Shops, Dashboard, Controlpanel } from './pages'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/shops' element={<Shops/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/controlpanel' element={<Controlpanel/>}></Route>
      </Routes>
    </div>
  )
}

export default App