import React from 'react'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const ActualDuration = () => {
    const { actualDuration } = useStateBlockchainContext();
    // IMPORTANT: for testing, the price per hour is converted to price per minute (so all calculations are relative to minutes)
    const MS_PER_MINUTE = 60000;
    const startRentingDate = new Date(new Date() - (actualDuration * MS_PER_MINUTE));
    const startRentingDateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(startRentingDate.getTime());
  return (
    <div className='mb-20'>
        <p className='mb-4'>Your rental has started on:</p>
        <p className='font-semibold text-xl'>{startRentingDateFormat}</p>
    </div>
  )
}

export default ActualDuration