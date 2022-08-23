import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Rent from './pages/Rent'
import Renting from './pages/Renting'
import Admin from './pages/Admin'

import { useStateBlockchainContext } from './contexts/BlockchainContext'

import './App.css'

const App = () => {
    const { currentAccount } = useStateBlockchainContext();
  return (
    <>
      <BrowserRouter>
        <Navbar />        
        {/* Routes */}
        <Routes>
          {/* Display snowboards selection if connected. If not, display homepage. */}
          <Route path='/' element={currentAccount ? <Rent /> : <Home />} />
          <Route path='/renting' element={<Renting />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App