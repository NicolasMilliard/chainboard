import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Button from '../components/Button'
import RentingPrice from '../components/RentingPrice'
import ProductCarousel from '../components/ProductCarousel'
import ActualDuration from '../components/ActualDuration'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

import { snowboards } from '../data/snowboards'

const Renting = () => {
    const { currentAccount, renter, checkIn, level, due, makePayment } = useStateBlockchainContext();
    let navigate = useNavigate();

    useEffect(() => {
      // if renting is false and due equal to '0.0', redirect to the home/rent page
      if(renter) {
        if(renter.isRenting === false && due === '0.0') {
          navigate('/');
        } else {
          console.log('renter.isRenting: ' + renter.isRenting);
          console.log('due: ' + due);
        }
      } else {
        console.log('renter error: ' + renter);
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
    <>
      <ToastContainer />
      <div className='flex flex-grow flex-shrink basis-0 justify-between mx-auto max-w-7xl mt-20 px-8 sm:mt-40'>
        <div className='flex flex-col flex-grow flex-shrink basis-0'>
          {/* If the user has a pending due, he can't rent a snowboard so ActualDuration must be hidden */}
          {due && <ActualDuration />}
           {/* If the user has a pending due, he can't rent a snowboard so RentingPrice must be hidden */}
          {due && <RentingPrice />}
          {/* If the user is currently renting a snowboard */}
          {renter && renter.isRenting && <Button text='Check in' customFunc={handleCheckIn} />}
          {/* If due greater than 0 */}
          {due > 0 && <button onClick={makePayment} className='chainboard-default-btn bg-[#f2504b] mb-6 px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg'>Pay {due} BNB</button>}
        </div>
        <div className='flex flex-grow flex-shrink basis-0'>
          <ProductCarousel />
        </div>
      </div>
    </>
  )
}

export default Renting