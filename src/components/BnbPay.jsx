import React from 'react'
import bsc from '../img/logo/bsc-short.svg'
import { snowboards } from '../data/snowboards'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const BnbPay = () => {
    const { level, totalDuration, due } = useStateBlockchainContext();
    
  return (
    <div className='flex flex-wrap mt-6 mb-10'>
      <div className='flex flex-wrap items-center'>
        <img src={bsc} alt='Binance Smart Chain' className='chainboard-bsc-logo-price mr-4' />
        <div className='chainboard-bsc-separator'></div>
      </div>
      <div className='ml-4'>
        {snowboards.map(item => {
          if(item.level === level)
          return (
            <p key={item.level}>
              <span className='text-[#f2504b] font-semibold text-xl'>{due} BNB</span><br />
              <span><abbr title='Duration is calculate in minutes to facilitate tests.'>{totalDuration} {totalDuration == 1 ? 'hour*' : 'hours*'} of renting.</abbr></span>
          </p>
          )
        })}
      </div>
    </div>
  )
}

export default BnbPay