import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Contact from './pages/Contact/Contact'

import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}> </Route>
          <Route path='/products' element={<Products/>}> </Route>
          <Route path='/contact' element={<Contact/>}> </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
