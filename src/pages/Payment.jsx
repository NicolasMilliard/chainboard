import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ProductCarousel from '../components/ProductCarousel'
import BnbPay from '../components/BnbPay'

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const Payment = () => {
    const { currentAccount, renter, start, getStart, end, getEnd, getTotalDuration, getDue, due, makePayment } = useStateBlockchainContext();
    const TIMESTAMP_IN_MILLISECONDS = 1000;
    let navigate = useNavigate();

    useEffect(() => {
        getDue();

        // if renter exist
        if(renter) {
            console.log('payemnt renter.isRenting: ' + renter.isRenting);
            console.log('payment due:' + due);

            // if renter is renting
            if(renter.isRenting) {
                navigate('/renting');
                return;
            }

            // if due is equal to '0.0' / 0
            if(due === '0.0' || due === 0) {
                navigate('/');
                return;
            }
        } else {
            console.log('renter is false');
        }

        getStart();
        getEnd();
        getTotalDuration();
      }, [currentAccount])

    // IMPORTANT: for testing, the price per hour is converted to price per minute (so all calculations are relative to minutes)
    const startDateFormat = () => {
        if(start !== undefined) {
          const startDate = new Date(start * TIMESTAMP_IN_MILLISECONDS);
          const startDateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(startDate.getTime());
          return startDateFormat;
        }
    }

    const endDateFormat = () => {
        if(end !== undefined) {
          const endDate = new Date(end * TIMESTAMP_IN_MILLISECONDS);
          const endDateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(endDate.getTime());
          return endDateFormat;
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='flex flex-grow flex-shrink basis-0 justify-between mx-auto max-w-7xl mt-20 px-8'>
                <div className='flex flex-col flex-grow flex-shrink basis-0 items-center justify-center'>
                    <h1 className='font-extrabold text-2xl sm:text-6xl sm:leading-tight'>Thank your for your rental! 🏂</h1>
                    <div className='flex items-center'>
                        <ProductCarousel />
                        <div className='chainboard-default-mini-btn'>
                            {
                                due === '0.0' ?
                                    <Link to='/' className='chainboard-default-mini-btn bg-[#f2504b] mb-6 px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg'>Return home</Link>
                                :
                                    <>
                                        <p>Your rental has started on <strong>{startDateFormat()}</strong> and has ended on <strong>{endDateFormat()}</strong>.</p>
                                        <p className='mt-10'>{due === 0 ? 'You have pay:' : 'You need to pay:'}</p>
                                        <BnbPay />
                                        <button onClick={makePayment} className='chainboard-default-btn bg-[#f2504b] mb-6 px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg'>Pay {due} BNB</button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Payment