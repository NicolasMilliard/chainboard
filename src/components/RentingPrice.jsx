import React from 'react'
import bsc from '../img/logo/bsc-short.svg'

import { snowboards } from '../data/snowboards'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const RentingPrice = () => {
    const { actualDuration, level } = useStateBlockchainContext();
    return (
        <div>
            <p>Current total:</p>
            <div className='flex flex-wrap mb-20'>
            <div className='flex flex-wrap items-center'>
                <img src={bsc} alt='Binance Smart Chain' className='chainboard-bsc-logo-price mr-4' />
                <div className='chainboard-bsc-separator'></div>
            </div>
            <div className='ml-4'>
                {snowboards.map(item => {
                    if(item.level === level) {
                        const actualPrice = (item.price * actualDuration).toFixed(3);
                        return (
                            <p key={item.level}>
                                <span className='text-[#f2504b] font-semibold'>{actualPrice} BNB</span><br />
                                <span><abbr title='Duration is calculate in minutes to facilitate tests.'>{actualDuration} {actualDuration == 1 ? 'hour' : 'hours'} of renting*</abbr></span>
                            </p>
                        )
                    }
                })}
            </div>
            </div>
        </div>
    )
}

export default RentingPrice