import React from 'react'

import { useStateContext } from '../contexts/ContextProvider';

import { snowboards } from '../data/snowboards'

const ProductCarousel = () => {
  const { size, level } = useStateContext();

  return (
    <div className='carousel-container'>
      <div className='carousel-wrapper'>
        <div className='carousel-content-wrapper'>
          <div className='flex items-center carousel-content'>
            {snowboards.map(item => {
              if(item.level === level)
                return (
                  <div key={item.level}>
                    {item.images.map((snowboard) => (
                      <img
                        key={snowboard.id}
                        src={snowboard.src}
                        alt={snowboard.alt}
                        style={{ height: (size * 4.40) + 'px'}}
                        className='mx-auto'
                      />
                    ))}
                  </div>
                )
            })}
          </div>
        </div>
      </div>      
    </div>
  )
}

export default ProductCarousel