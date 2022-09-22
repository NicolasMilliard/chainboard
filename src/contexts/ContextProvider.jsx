import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [isDisplay, setIsDisplay] = useState(false);

    return (
        <StateContext.Provider
            value={{
                isDisplay, setIsDisplay
            }}    
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);