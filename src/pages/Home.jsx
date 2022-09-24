import React from 'react'
import { ToastContainer } from 'react-toastify'

import ConnectWalletButton from '../components/ConnectWalletButton'
import Button from '../components/Button'
import ButtonLoader from '../components/ButtonLoader'
import bsc from '../img/logo/bsc.svg'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const Home = () => {
    const { currentAccount, renterExists, addRenter, isLoading } = useStateBlockchainContext();

    const handleSubmit = async() => {
        await addRenter(currentAccount, true, false, 'beginner', 142, 0, 0, 0);
        // console.log('[handleSubmit]: renter added');
      }

    return (
        <>
        <ToastContainer />
        {/* Hero section height = 100vh - ([NavBar height] + main content margin top) */}
        <div className='chainboard-hero-bg h-[calc(100vh_-_10rem)] sm:h-[calc(100vh_-_15rem)]'>
            <div id='hero-text-container' className='flex flex-col justify-between h-full max-w-7xl mx-auto mt-20 sm:mt-40 px-8'>
                <div>
                    {
                        !currentAccount && !renterExists ?
                            <div>
                                <h1 className='font-extrabold text-2xl sm:text-6xl sm:leading-tight'>Rediscover the world<br />thanks to <span className='text-[#f2504b]'>Blockchain</span></h1>
                                <p className='mt-10 max-w-md leading-7'>Rent your snowboard at the real cost thanks to the blockchain technology.</p>
                                <p className='mb-10 max-w-md leading-7'>Connect your wallet, create your profile, choose your snowboard and you're ready to go!</p>
                                <ConnectWalletButton />
                            </div>
                        :
                            <div>
                                <h1 className='font-extrabold text-2xl sm:text-6xl sm:leading-tight'>Congrats! 🎉<br />Your wallet is <span className='text-[#f2504b]'>connected</span>!</h1>
                                <p className='my-10 max-w-md leading-7'>Create your profile to access to the snowboards selection.</p>
                                { isLoading ? <button className='flex items-center bg-[#f2504b] px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg'><ButtonLoader /></button> : <Button text='Create my profile' customFunc={handleSubmit} /> }
                            </div>
                    }
                </div>
                <div className='mt-10 mb-8'>
                    <p className='chainboard-bsc-text uppercase text-[#858585] font-medium '>Powered by</p>
                    <img src={bsc} alt='Binance Smart Chain' className='chainboard-bsc-logo' />
                </div>
            </div>
        </div>
        </>
  )
}

export default Home