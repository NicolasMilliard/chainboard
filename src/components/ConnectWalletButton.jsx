import React, { useContext } from 'react'
import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const ConnectWalletButton = () => {
  const { connectWallet, currentAccount } = useStateBlockchainContext();

  return (
    <button
      type='button'
      className='bg-[#f2504b] px-4 py-2 text-white text-14 sm:text-base font-semibold rounded-3xl hover:drop-shadow-lg'
      onClick={connectWallet}
    >
      { !currentAccount ? "Connect wallet" : `${currentAccount.slice(0, 5)}...${currentAccount.slice(currentAccount.length - 4)}` }
    </button>
  )
}

export default ConnectWalletButton