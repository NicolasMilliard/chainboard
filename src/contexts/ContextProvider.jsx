import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [size, setSize] = useState('142');
    const [level, setLevel] = useState('beginner');
    const [isDisplay, setIsDisplay] = useState(false);

    const handleLevel = (selectedLevel) => {
        setLevel(selectedLevel);
    }

    const handleSnowboardSize = (e) => {
        setSize(e.target.value);
    }

    return (
        <StateContext.Provider
            value={{
                size, setSize, handleSnowboardSize,
                level, handleLevel,
                isDisplay, setIsDisplay
            }}    
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);