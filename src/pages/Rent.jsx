import React from 'react'

import LevelSelect from '../components/LevelSelect'
import SnowboardSize from '../components/SnowboardSize'
import ProductSlider from '../components/ProductSlider'

const Rent = () => {
  return (
    <div className='flex flex-wrap h-full max-w-7xl mx-auto mt-20 sm:mt-40 px-8'>
        <div className='flex flex-col justify-between'>
            <LevelSelect />
            <SnowboardSize />
        </div>
        <div>
          <ProductSlider />
        </div>
    </div>
  )
}

export default Rent