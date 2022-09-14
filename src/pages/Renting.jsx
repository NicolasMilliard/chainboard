import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import RentingPrice from '../components/RentingPrice'
import ProductCarousel from '../components/ProductCarousel'
import ActualDuration from '../components/ActualDuration'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'
import { useStateContext } from '../contexts/ContextProvider'

import { snowboards } from '../data/snowboards'

const Renting = () => {
    const { currentAccount, renter, checkIn, deposit, due, makePayment } = useStateBlockchainContext();
    const { level } = useStateContext();
    let navigate = useNavigate();

    useEffect(() => {
      // if renting is false and due equal to 0, redirect to the home/rent page
      if(renter) {
        if(renter.isRenting === false && due === 0) {
          navigate('/');
        }
      }
    })

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
          {/* If the user has a pending due, he can't rent a snowboard so ActualDuration must be hidden */}
          {<ActualDuration />}
           {/* If the user has a pending due, he can't rent a snowboard so RentingPrice must be hidden */}
          {<RentingPrice />}
          {/* If the user is currently renting a snowboard */}
          {renter && renter.isRenting && <Button text='Check in' customFunc={handleCheckIn} />}
          {/* <Button text='Deposit' customFunc={() => deposit('0.02')} /> */}
          {/* If due greater than 0 */}
          {due > 0 && <button onClick={makePayment} className='chainboard-default-btn bg-[#f2504b] mb-6 px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg'>Pay {due} BNB</button>}
        </div>
        <div className='flex flex-grow flex-shrink basis-0'>
          <ProductCarousel />
        </div>
    </div>
  )
}

export default Renting