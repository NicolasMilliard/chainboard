import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'

import { BlockchainProvider } from './contexts/BlockchainContext'
import { ContextProvider } from './contexts/ContextProvider'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BlockchainProvider>
        <ContextProvider>
            <App />
        </ContextProvider>
    </BlockchainProvider>
);