import React, { useState, useEffect } from 'react'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

import { levels } from '../data/levels';

const LevelSelect = () => {
  const { handleLevel, level } = useStateBlockchainContext();
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const active = 'flex items-center capitalize chainboard-icon-flash-button-active font-semibold';
  const normal = 'flex items-center capitalize chainboard-icon-flash-button';

  useEffect(() => {
    setSelectedLevel(() => level);
  }, [selectedLevel])

  return (
    <div className='mb-20'>
        <h2 className='font-semibold text-xl sm:text-2xl sm:leading-tight mb-8'>Select your level:</h2>
        {levels.map((item) => (
          <button
            key={item.level}
            id={item.level}
            type='submit'
            className={selectedLevel == item.level ? active : normal}
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