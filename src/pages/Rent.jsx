import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LevelSelect from '../components/LevelSelect'
import SnowboardSize from '../components/SnowboardSize'
import SnowboardSizeCalculation from '../components/SnowboardSizeCalculation'
import ProductCarousel from '../components/ProductCarousel'
import BnbPrice from '../components/BnbPrice'
import Button from '../components/Button'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const Rent = () => {
  const { currentAccount, checkOut, renter, addRenter, renterExists } = useStateBlockchainContext();
  let navigate = useNavigate();

  useEffect(() => {
    // if renting is true, redirect to the renting page
    if(renter) {
      if(renter.isRenting) {
        navigate('/renting');
      }
    }
  })

  const handleSubmit = async() => {
    await addRenter(currentAccount, true, false, 0, 0, 0, 0);
    console.log('[handleSubmit]: renter added');
  }

  return (
    <>
      <SnowboardSizeCalculation />
      <div className='flex flex-grow flex-shrink basis-0 justify-between mx-auto max-w-7xl mt-20 px-8'>
        <div className='flex flex-col flex-grow flex-shrink basis-0 justify-center'>
            <LevelSelect />
            <SnowboardSize />
            <BnbPrice />
            {renterExists ? <Button text='Check out' customFunc={checkOut} /> : <Button text='Create my profile' customFunc={handleSubmit} />}
        </div>
        <div className='flex flex-grow flex-shrink basis-0'>
          <ProductCarousel />
        </div>
    </div>    
    </>
  )
}

export default Rent