import React from 'react'

import LevelSelect from '../components/LevelSelect'
import SnowboardSize from '../components/SnowboardSize'
import ProductCarousel from '../components/ProductCarousel'
import BnbPrice from '../components/BnbPrice'
import Button from '../components/Button'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'
import { useStateContext } from '../contexts/ContextProvider'

import { snowboards } from '../data/snowboards'

const Rent = () => {
  const { currentAccount, checkOut, checkIn, addRenter, renterExists, due, deposit, makePayment } = useStateBlockchainContext();
  const { level } = useStateContext();

  const handleSubmit = async() => {
    await addRenter(currentAccount, true, false, 0, 0, 0, 0);
    console.log('[handleSubmit]: renter added');
  }

  const handleCheckIn = async() => {
    snowboards.map(item => {
      if(item.level === level) {
        const price = item.price;
        // price must be sent in wei as a string
        const weiPrice = (price * (10 ** 18)).toString();
        console.log('currentAccount: ' + currentAccount + ' - price: ' + weiPrice);
        checkIn(weiPrice);
      }
    })
  }

  return (
    <div className='flex flex-grow flex-shrink basis-0 justify-between mx-auto max-w-7xl mt-20 px-8 sm:mt-40'>
        <div className='flex flex-col flex-grow flex-shrink basis-0'>
            <LevelSelect />
            <SnowboardSize />
            <BnbPrice />
            {/* If the user is a renter, he can checkout. If he's not, he must create his profile before renting his snowboard */}
            {renterExists ? <Button text='Check out' customFunc={checkOut} /> : <Button text='Create my profile' customFunc={handleSubmit} />}
            <Button text='Check in' customFunc={handleCheckIn} />
            <Button text='Deposit' customFunc={() => deposit('0.2')} />
            {/* If due greater than 0 */}
            {due > 0 ? <Button text='Make Payment' customFunc={makePayment} /> : ''}
        </div>
        <div className='flex flex-grow flex-shrink basis-0'>
          <ProductCarousel />
        </div>
    </div>
  )
}

export default Rent