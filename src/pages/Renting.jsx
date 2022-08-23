import React from 'react'
import Button from '../components/Button';

import { useStateBlockchainContext } from '../contexts/BlockchainContext'
import { useStateContext } from '../contexts/ContextProvider'

import { snowboards } from '../data/snowboards'

const Renting = () => {
    const { currentAccount, renter, checkIn, deposit, due, makePayment } = useStateBlockchainContext();
    const { level } = useStateContext();

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
    <div>
        {/* If the user is currently renting a snowboard */}
        {/* {renter.isRenting && <Button text='Check in' customFunc={handleCheckIn} />} */}
        <Button text='Check in' customFunc={handleCheckIn} />
        <Button text='Deposit' customFunc={() => deposit('0.02')} />
        {/* If due greater than 0 */}
        {due > 0 && <Button text='Make Payment' customFunc={makePayment} />}
    </div>
  )
}

export default Renting