import React from 'react'

const Button = ({ text, customFunc }) => {
  return (
    <button type='button' onClick={customFunc} className='chainboard-default-btn bg-[#f2504b] mb-6 px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg' >
        {text}
    </button>
  )
}

export default Button