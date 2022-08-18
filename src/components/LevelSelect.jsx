import React from 'react'

import { useStateContext } from '../contexts/ContextProvider';

import { levels } from '../data/levels';

const LevelSelect = () => {
  const { handleLevel, level } = useStateContext(); 

  const active = 'flex items-center capitalize chainboard-icon-flash-button-active';
  const normal = 'flex items-center capitalize chainboard-icon-flash-button';

  return (
    <div className='mb-20'>
        <h2 className='font-semibold text-xl sm:text-2xl sm:leading-tight mb-8'>Select your level:</h2>
        {levels.map((item) => (
          <button
            key={item.level}
            id={item.level}
            type='submit'
            className={normal}
            onClick={() => handleLevel(item.level)}
          >
            {item.icon}
            <span className='ml-2'>{item.level}</span>
          </button>
        ))}
        
    </div>
  )
}

export default LevelSelect