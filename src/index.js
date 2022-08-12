import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'

import { BlockchainProvider } from './contexts/BlockchainContext'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BlockchainProvider>
        <App />
    </BlockchainProvider>
);