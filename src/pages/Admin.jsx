import React from 'react'
import Button from '../components/Button';

import { useStateBlockchainContext } from '../contexts/BlockchainContext'

const Admin = () => {
    const { owner, getOwnerBalance, ownerWithdraw, getContractBalance } = useStateBlockchainContext();

  return (
    <div>
        {/* Is owner ? */}
        {owner && <Button text='Get Owner balance' customFunc={getOwnerBalance} />}
        {/* Is owner ? */}
        {owner && <Button text='Get Contract balance' customFunc={getContractBalance} />}
        {/* Is owner ? */}
        {owner && <Button text='Withdraw (owner)' customFunc={ownerWithdraw} />}
    </div>
  )
}

export default Admin