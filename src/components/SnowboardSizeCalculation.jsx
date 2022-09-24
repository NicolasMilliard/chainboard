import React from 'react'
import { useForm } from 'react-hook-form'

import { useStateContext } from '../contexts/ContextProvider';
import { useStateBlockchainContext } from '../contexts/BlockchainContext';

import CloseIcon from './CloseIcon';

const SnowboardSizeCalculation = () => {
  const { register, handleSubmit } = useForm();
  const { handleLevel, setSize } = useStateBlockchainContext();
  const { isDisplay, setIsDisplay } = useStateContext();

  const modalDisplay = 'flex justify-center items-center';
  const modalHidden = 'hidden justify-center items-center';

  const onSubmit = async(values) => {
    const level = values.level;
    const style = values.style;
    const height = values.height;
    const weight = values.weight;
    let { levelRatio, styleRatio } = 0;
    let weightRatio;

    // If level is different than beginner, it adds one centimer to the calcul
    level !== 'beginner' ? levelRatio = 1 : levelRatio = 0;

    // If style is equal to freeride, it adds four centimers to the calcul
    style === 'freeride' ? styleRatio = 4 : styleRatio = 0;

    // Calculate size depending on height
    const sizeDependingOnHeight = height * 0.87;

    // To calculate size depending on weight, we need to determine the right weightRatio
    if(weight < 56) {
        weightRatio = 2.76;
    } else if(weight >= 56 && weight < 62) {
        weightRatio = 2.59;
    } else if(weight >= 62 && weight < 68) {
        weightRatio = 2.43;
    } else if(weight >= 68 && weight < 75) {
        weightRatio = 2.23;
    } else if(weight >= 75 && weight < 81) {
        weightRatio = 2.04;
    } else if(weight >= 81 && weight < 87) {
        weightRatio = 1.92;
    } else if(weight >= 87 && weight < 93) {
        weightRatio = 1.81;
    } else if(weight >= 93 && weight < 100) {
        weightRatio = 1.72;
    } else if(weight > 100) {
        weightRatio = 1.67;
    } else {
        console.log('Invalid input');
    }

    // Calculate size depending on weight
    const sizeDependingOnWeight = weight * weightRatio;

    // Calculate final size : we do the average between sizeDependingOnHeight and sizeDependingOnWeight. Then, we add levelRatio and styleRatio
    let snowboardSize = Math.round(((sizeDependingOnHeight + sizeDependingOnWeight) / 2) + levelRatio + styleRatio);

    // Maximum value for snowboardSize is 167 cm
    if(snowboardSize > 167) {
        snowboardSize = 167;
    }

    // Update the level, the size and close modal window
    // console.log('level: ' + level + ' - snowboardSize: ' + snowboardSize);
    handleLevel(level);
    setSize(snowboardSize);
    setIsDisplay(false);
  }

  return (
    <div id='snowboard-size-calculation-container' className={isDisplay ? modalDisplay : modalHidden}>
        <div id='snowboard-size-calculation-wrapper' className='flex flex-col justify-center items-center mx-auto max-w-7xl px-8'>
            <div id='snowboard-size-calculation-close' className='ml-20'>
                <button onClick={() => {setIsDisplay(false)}}><CloseIcon /></button>
            </div>
            <h2 className='text-2xl font-semibold mt-8 mb-10'>Find your snowboard size in 5 seconds!</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Level selection */}
                <div className='mb-6'>
                    <label htmlFor='level'>Level:</label>
                    <select {...register('level')} id='level' className='ml-5'>
                        <option value='beginner'>Beginner</option>
                        <option value='intermediate'>Intermediate</option>
                        <option value='expert'>Expert</option>
                    </select>
                </div>
                {/* Style selection */}
                <div className='mb-6'>
                    <label htmlFor='style'>Style:</label>
                    <select {...register('style')} id='style' className='ml-5'>
                        <option value='freestyle'>Freestyle</option>
                        <option value='freeride'>Freeride</option>
                    </select>
                </div>
                {/* Height selection */}
                <div className='mb-6'>
                    <label htmlFor='height'>Height (cm):</label>
                    <input {...register('height')} id='height' type='number' min='150' max='210' defaultValue='175' className='ml-5' />
                </div>
                {/* Weight selection */}
                <div className='mb-10'>
                    <label htmlFor='weight'>Weight (kg):</label>
                    <input {...register('weight')} id='weight' type='number' min='50' max='140' defaultValue='75' className='ml-5' />
                </div>
                {/* Submit form */}
                <div className='flex justify-center mb-8'>
                    <input type='submit' value='Apply recommendation' className='bg-[#f2504b] px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg' />
                </div>
            </form>
        </div>

    </div>
  )
}

export default SnowboardSizeCalculation