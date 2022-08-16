import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [size, setSize] = useState('142');

    const handleSnowboardSize = (e) => {
        setSize(e.target.value);
    }

    return (
        <StateContext.Provider
            value={{
                size,
                handleSnowboardSize
            }}    
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);