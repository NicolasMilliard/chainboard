import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Rent from './pages/Rent'

import { useStateBlockchainContext } from './contexts/BlockchainContext'

import './App.css'

const App = () => {
    const { connectWallet, currentAccount } = useStateBlockchainContext();
  return (
    <>
        <Navbar />
        {/* Display snowboards selection if connected. If not, display homepage. */}
        {currentAccount ? <Rent /> : <Home />}
    </>
  )
}

export default App