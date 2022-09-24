import React from 'react'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const TotalDuration = () => {
    const { renter, totalDuration, getTotalDuration } = useStateBlockchainContext();

    if(renter) {
        if(!renter.isRenting) {
            getTotalDuration();
        }
    }

  return (
    <div className='mb-20'>
        <p className='mb-4'>Your rental has started on:</p>
        {renter && !renter.isRenting && <p className='font-semibold text-xl'>{totalDuration}</p>}
    </div>
  )
}

export default TotalDuration