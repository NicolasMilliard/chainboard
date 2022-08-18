import React from 'react'

import ConnectWalletButton from './ConnectWalletButton'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-20 max-w-7xl mx-auto pt-8'>
        {/* Logo container */}
        <div className='flex items-baseline'>
            <h2 className='text-2xl sm:text-3xl  font-extrabold'>Chainboard</h2>
            <span className='chainboard-dot ml-1'></span>
        </div>
        <ConnectWalletButton />        
    </div>
  )
}

export default Navbar