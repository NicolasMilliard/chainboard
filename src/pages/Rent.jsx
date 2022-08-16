import React from 'react'

import LevelSelect from '../components/LevelSelect'
import SnowboardSize from '../components/SnowboardSize'

const Rent = () => {
  return (
    <div className='flex flex-col justify-between h-full max-w-7xl mx-auto mt-20 sm:mt-40 px-8'>
        <div>
            <LevelSelect />
            <SnowboardSize />
        </div>
    </div>
  )
}

export default Rent