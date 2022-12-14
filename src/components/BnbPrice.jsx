import React from 'react'
import bsc from '../img/logo/bsc-short.svg'

import { snowboards } from '../data/snowboards'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const BnbPrice = () => {
  const { level } = useStateBlockchainContext();
  return (
    <div className='flex flex-wrap mb-20'>
      <div className='flex flex-wrap items-center'>
        <img src={bsc} alt='Binance Smart Chain' className='chainboard-bsc-logo-price mr-4' />
        <div className='chainboard-bsc-separator'></div>
      </div>
      <div className='ml-4'>
        {snowboards.map(item => {
          if(item.level === level)
          return (
            <p key={item.level}>
              <span className='text-[#f2504b] font-semibold'>{item.price} BNB / hour</span><br />
              <span>{item.price * 8} BNB / day</span>
          </p>
          )
        })}
      </div>
    </div>
  )
}

export default BnbPrice