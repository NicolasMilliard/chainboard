import React from 'react'

import { useStateContext } from '../contexts/ContextProvider';

const SnowboardSize = () => {
  const { size, handleSnowboardSize } = useStateContext();

  const handleInputChange = (e) => {
    
  }
  
  return (
    <div>
        <h2 className='font-semibold text-xl sm:text-2xl sm:leading-tight mb-8'>Choose your snowboard size:</h2>
        <div className='flex flex-wrap'>
          <label htmlFor='snowboard-size' className='mr-2'>Size:</label>
          <input id='snowboard-size' type='range' min='142' max='167' className='chainboard-input-range' onChange={handleSnowboardSize} onInput={handleInputChange} />
          <span id='snowboard-size-choice' className='ml-2'>{size} cm</span>            
        </div>
    </div>
  )
}

export default SnowboardSize