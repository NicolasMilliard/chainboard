import React from 'react'
import { Link } from 'react-router-dom'

import ConnectWalletButton from './ConnectWalletButton'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-20 max-w-7xl mx-auto px-8 pt-8'>
      <div className='flex items-center'>
        {/* Logo container */}
        <Link to='/' className='flex items-baseline mr-8'>
            <h2 className='text-2xl sm:text-3xl  font-extrabold'>Chainboard</h2>
            <span className='chainboard-dot ml-1'></span>
        </Link>
      </div>
      <div>
        <ConnectWalletButton />
      </div>      
    </div>
  )
}

export default Navbar