import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [size, setSize] = useState('142');
    const [level, setLevel] = useState('beginner');

    const handleLevel = (selectedLevel) => {
        setLevel(selectedLevel);
    }

    const handleSnowboardSize = (e) => {
        setSize(e.target.value);
    }

    return (
        <StateContext.Provider
            value={{
                size, handleSnowboardSize,
                level, handleLevel
            }}    
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);