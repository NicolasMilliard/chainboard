import React from 'react'
import { useForm } from 'react-hook-form'

const SnowboardSizeCalculation = () => {
  const { handleSubmit, register, formState: { errors, isSubmitting },} = useForm();

  const onSubmit = async(values) => {

  }

  return (
    /* Section height = 100vh - ([NavBar height] + main content margin top)  */
    <div id='snowboard-size-calculation-container'>
        <div id='snowboard-size-calculation-wrapper' className='flex flex-col justify-center items-center mx-auto max-w-7xl px-8'>
            <div className='flex'>
                <h2>Find your snowboard size in 5 seconds!</h2>
                <span>X</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Level selection */}
                <div>
                    <label htmlFor='level'>Level:</label>
                    <select name='level' id='level'>
                        <option value='beginner'>Beginner</option>
                        <option value='intermediate'>Intermediate</option>
                        <option value='expert'>Expert</option>
                    </select>
                </div>
                {/* Style selection */}
                <div>
                    <label htmlFor='style'>Style:</label>
                    <select name='style' id='style'>
                        <option value='freeride'>Freeride</option>
                        <option value='freestyle'>Freestyle</option>
                        <option value='splitboard'>Splitboard</option>
                    </select>
                </div>
                {/* Height selection */}
                <div>
                    <label htmlFor='height'>Height (cm):</label>
                    <input type='number' min='150' max='210' defaultValue='175' />
                </div>
                {/* Weight selection */}
                <div>
                    <label htmlFor='height'>Weight (kg):</label>
                    <input type='number' min='50' max='140' defaultValue='75' />
                </div>
                {/* Submit form */}
                <div>
                    <button>Calculate</button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default SnowboardSizeCalculation