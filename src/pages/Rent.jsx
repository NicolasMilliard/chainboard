import React from 'react'

import LevelSelect from '../components/LevelSelect'
import SnowboardSize from '../components/SnowboardSize'
import ProductCarousel from '../components/ProductCarousel'
import BnbPrice from '../components/BnbPrice'


const Rent = () => {
  return (
    <div className='flex flex-grow flex-shrink basis-0 justify-between mx-auto max-w-7xl mt-20 sm:mt-40'>
        <div className='flex flex-col flex-grow flex-shrink basis-0'>
            <LevelSelect />
            <SnowboardSize />
            <BnbPrice />
        </div>
        <div className='flex flex-grow flex-shrink basis-0'>
          <ProductCarousel />
        </div>
    </div>
  )
}

export default Rent