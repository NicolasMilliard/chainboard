import React from 'react'
import Flash from './Flash'

const LevelSelect = () => {
  return (
    <div className='mb-20'>
        <h2 className='font-semibold text-xl sm:text-2xl sm:leading-tight mb-8'>Select your level:</h2>
        {/* Beginner */}
        <button type='button' className='chainboard-icon-button flex items-center' onClick={() => {}}>
            <Flash />
            <span className='ml-2'>Beginner</span>
        </button>
        {/* Intermediate */}
        <button type='button' className='chainboard-icon-button flex items-center' onClick={() => {}}>
            <Flash /><Flash />
            <span className='ml-2'>Intermediate</span>
        </button>
        {/* Expert */}
        <button type='button' className='chainboard-icon-button flex items-center' onClick={() => {}}>
            <Flash /><Flash /><Flash />
            <span className='ml-2'>Expert</span>
        </button>
    </div>
  )
}

export default LevelSelect