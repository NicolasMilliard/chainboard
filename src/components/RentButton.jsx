import React from 'react'

import Button from './Button'


// {
//     (() => {
//       if(renterExists) {
//         if(renter.isRenting) {
//           return (<Button text='Check in' customFunc={handleCheckIn} />)
//         } else {
//           return (<Button text='Check out' customFunc={checkOut} />)      
//         }
//       } else {
//         return (<Button text='Create my profile' customFunc={handleSubmit} />)
//       }
//     })
//   }

const RentButton = () => {

    const rentButton = async() => {
        return <p>Ok</p>
    }

    return ( 
        <div>     
            {
                (() => {
                    if('a'==='b') {
                            return (
                                <p>Hi</p>
                            )
                        } else if ('b'==='b') {
                            return (
                            <p>Hello</p>
                            )
                        } else {
                            return (
                                <p>Bye</p>
                            )
                        }
                })()  
            }  
        </div>  
    )
}

export default RentButton