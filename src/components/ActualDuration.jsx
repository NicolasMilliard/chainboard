import React from 'react'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const ActualDuration = () => {
    // const { actualDuration } = useStateBlockchainContext();
    const actualDuration = 1661270497000;
    const timestamp = new Date(actualDuration);
    const duration = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(timestamp.getTime());
    // const duration = timestamp.toDateString();
  return (
    <div className='mb-20'>
        <p className='mb-4'>Your rental has started on:</p>
        <p className='font-semibold text-xl'>{duration}</p>
    </div>
  )
}

export default ActualDuration