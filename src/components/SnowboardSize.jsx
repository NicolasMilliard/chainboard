import React from 'react'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const SnowboardSize = () => {
  const { size, handleSnowboardSize, setIsDisplay } = useStateBlockchainContext();

  // console.log(size);

  // Manage background color's track of the input range
  const handleInputChange = (e) => {
    let target = e.target;
    
    const min = target.min;
    const max = target.max;

    // size is taken from the state
    target.style.backgroundSize = (size - min) * 100 / (max - min) + '% 100%';
  }
  
  return (
    <div className='mb-20'>
        <h2 className='font-semibold text-xl sm:text-2xl sm:leading-tight mb-8'>Choose your snowboard size:</h2>
        <div className='flex flex-wrap items-center'>
          <label htmlFor='snowboard-size' className='mr-3'>Size:</label>
          <input id='snowboard-size' type='range' min='138' max='167' defaultValue={size} className='chainboard-input-range' style={{backgroundSize: (size - 138) * 100 / (167 - 138) + '% 100%'}} onChange={handleSnowboardSize} onInput={handleInputChange} />
          <span id='snowboard-size-choice' className='ml-3'>{size} cm</span>            
        </div>
        <button onClick={() => {setIsDisplay(true)}}>Calculate my size's snowboard</button>
    </div>
  )
}

export default SnowboardSize