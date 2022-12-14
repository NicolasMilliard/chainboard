import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Button from '../components/Button'
import ButtonLoader from '../components/ButtonLoader'
import RentingPrice from '../components/RentingPrice'
import ProductCarousel from '../components/ProductCarousel'
import ActualDuration from '../components/ActualDuration'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

import { snowboards } from '../data/snowboards'

const Renting = () => {
    const { renter, checkIn, level, due, getDue, isLoading } = useStateBlockchainContext();
    let navigate = useNavigate();

    useEffect(() => {
      getDue();

      // if renter exist      
      if(renter) {
        if(renter.isRenting === false) {
          if(due > 0) {
            navigate('/payment');
          } else {
            navigate('/');
          }
        }
      }
    })

    const handleCheckIn = async() => {
        snowboards.map(item => {
          if(item.level === level) {
            const price = item.price;
            // price must be sent in wei as a string
            const weiPrice = (price * (10 ** 18)).toString();
            // console.log('currentAccount: ' + currentAccount + ' - price: ' + weiPrice);
            checkIn(weiPrice);
            return null;
          } else {
            return null;
          }
        })
      }

  return (
    <>
      <ToastContainer />
      <div className='flex flex-grow flex-shrink basis-0 items-center justify-between mx-auto max-w-7xl mt-20 px-8 sm:mt-40'>
        <div className='flex flex-col flex-grow flex-shrink basis-0'>
          <ActualDuration />
          <RentingPrice />
          {/* If the user is currently renting a snowboard */}
          { isLoading ? <button className='flex justify-center items-center chainboard-default-btn bg-[#f2504b] px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg'><ButtonLoader /></button> : renter && renter.isRenting && <Button text='Check in' customFunc={handleCheckIn} /> }
        </div>
        <div className='flex flex-grow flex-shrink basis-0'>
          <ProductCarousel />
        </div>
      </div>
    </>
  )
}

export default Renting