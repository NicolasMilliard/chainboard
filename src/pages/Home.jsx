import React from 'react'

import ConnectWalletButton from '../components/ConnectWalletButton'
import bsc from '../img/logo/bsc.svg'

const Home = () => {
  return (
    /* Hero section height = 100vh - ([NavBar height] + main content margin top)  */    
    <div className='chainboard-hero-bg h-[calc(100vh_-_10rem)] sm:h-[calc(100vh_-_15rem)] bg-no-repeat bg-right-bottom'>
            <div className='flex flex-col justify-between h-full max-w-7xl mx-auto mt-20 sm:mt-40 px-8'>
                <div>
                    <h1 className='font-extrabold text-2xl sm:text-6xl sm:leading-tight'>Rediscover the world<br />thanks to <span className='text-[#f2504b]'>Blockchain</span></h1>
                    <p className='mt-10 max-w-md leading-7'>Rent your snowboard at the real cost thanks to the blockchain technology.</p>
                    <p className='mb-10 max-w-md leading-7'>Connect your wallet, choose your snowboard and you're ready to go!</p>
                    <ConnectWalletButton />
                </div>
                <div className='mt-10 mb-8'>
                    <p className='chainboard-bsc-text uppercase text-[#858585] font-medium '>Powered by</p>
                    <img src={bsc} alt='Binance Smart Chain' className='chainboard-bsc-logo' />
                </div>
            </div>
        </div>
  )
}

export default Home