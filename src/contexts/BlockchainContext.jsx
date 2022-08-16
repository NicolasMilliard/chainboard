import React, { createContext, useContext, useEffect, useState } from 'react'
import contractConfig from '../contract-config.json'
import { ethers } from 'ethers'

const { abi, contractAddress } = contractConfig;

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [balance, setBalance] = useState();

    // Read-only access to the blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Sign messages and transactions on the blockchain
    const signer = provider.getSigner();

    // Contract (BSC Testnet)
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Connect wallet and store address in the state
    const connectWallet = async () => {
        try {
            // Is Metamask installed?
            if(!window.ethereum) return alert("Please install Metamask.")

            // Prompt user for account connection
            const accounts = await provider.send("eth_requestAccounts", []);
            // Save user address in the state
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    // Check if wallet is connected
    const checkWalletConnection = async () => {
        try {
            // Is Metamask installed?
            if(!window.ethereum) return alert("Please install Metamask.")

            // Request the use account
            const accounts = await provider.send("eth_accounts", []);

            if(accounts.length) {
                // Save user address in the state
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get contract's balance
    const getContractBalance = async () => {
        try {
            const contractBalance = await contract.balanceOf();
            setBalance(ethers.utils.formatEther(contractBalance));
        } catch (error) {
            console.log(error);            
        }
    }

    // When variables changes
    useEffect(() => {
        checkWalletConnection();
        getContractBalance();
    }, [])

  return (
    <BlockchainContext.Provider
        value={{
            connectWallet,
            currentAccount
        }}
    >
        {children}
    </BlockchainContext.Provider>
  )
}

export const useStateBlockchainContext = () => useContext(BlockchainContext);