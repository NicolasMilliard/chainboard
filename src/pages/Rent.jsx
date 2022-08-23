import React from 'react'
import { useNavigate } from 'react-router-dom'

import LevelSelect from '../components/LevelSelect'
import SnowboardSize from '../components/SnowboardSize'
import ProductCarousel from '../components/ProductCarousel'
import BnbPrice from '../components/BnbPrice'
import Button from '../components/Button'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const Rent = () => {
  const { currentAccount, checkOut, renter, addRenter, renterExists } = useStateBlockchainContext();
  let navigate = useNavigate();

  const handleSubmit = async() => {
    await addRenter(currentAccount, true, false, 0, 0, 0, 0);
    console.log('[handleSubmit]: renter added');
  }

  const handleCheckOut = async() => {
    checkOut();
    
    if(renter.isRenting) {
      navigate('/renting');
    } else {
      console.log(renter.isRenting);
    }
  }

  return (
    <div className='flex flex-grow flex-shrink basis-0 justify-between mx-auto max-w-7xl mt-20 px-8 sm:mt-40'>
        <div className='flex flex-col flex-grow flex-shrink basis-0'>
            <LevelSelect />
            <SnowboardSize />
            <BnbPrice />
            {renterExists ? <Button text='Check out' customFunc={handleCheckOut} /> : <Button text='Create my profile' customFunc={handleSubmit} />}
        </div>
        <div className='flex flex-grow flex-shrink basis-0'>
          <ProductCarousel />
        </div>
    </div>
  )
}

export default Rent