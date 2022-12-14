import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import LevelSelect from '../components/LevelSelect'
import SnowboardSize from '../components/SnowboardSize'
import SnowboardSizeCalculation from '../components/SnowboardSizeCalculation'
import ProductCarousel from '../components/ProductCarousel'
import BnbPrice from '../components/BnbPrice'
import Button from '../components/Button'
import ButtonLoader from '../components/ButtonLoader'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const Rent = () => {
  const { currentAccount, checkOut, renter, addRenter, renterExists, getDue, due, isLoading } = useStateBlockchainContext();
  let navigate = useNavigate();

  useEffect(() => {
    getDue();
    // if renter exist
    if(renter) {
      // if renter is renting
      if(renter.isRenting) {
        navigate('/renting');
        return;
      }
      // if renter has a pending due
      if(due > 0) {
        navigate('/payment');
        return;
      }
    } else {
      navigate('/');
      return;
    }
  }, [renter, due, getDue, navigate])

  const handleSubmit = async() => {
    await addRenter(currentAccount, true, false, 'beginner', 142, 0, 0, 0);
    console.log('[handleSubmit]: renter added');
  }

  return (
    <>
      <ToastContainer />
      <SnowboardSizeCalculation />
      <div className='flex flex-grow flex-shrink basis-0 justify-between mx-auto max-w-7xl mt-20 px-8'>
        <div className='flex flex-col flex-grow flex-shrink basis-0 justify-center'>
            {renterExists && <LevelSelect />}
            {renterExists && <SnowboardSize />}
            {renterExists && <BnbPrice />}
            { isLoading ? <button className='flex justify-center items-center chainboard-default-btn bg-[#f2504b] px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg'><ButtonLoader /></button> : renterExists ? <Button text='Check out' customFunc={checkOut} /> : <Button text='Create my profile' customFunc={handleSubmit} /> }
        </div>
        <div className='flex flex-grow flex-shrink basis-0'>
          <ProductCarousel />
        </div>
    </div>    
    </>
  )
}

export default Rent