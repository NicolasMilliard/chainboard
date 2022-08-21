import React, { createContext, useContext, useEffect, useState } from 'react'
import contractConfig from '../contract-config.json'
import { ethers } from 'ethers'

const { abi, contractAddress } = contractConfig;

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [renter, setRenter] = useState();
    const [renterExists, setRenterExists] = useState();
    const [due, setDue] = useState();
    const [actualDuration, setActualDuration] = useState();
    const [totalDuration, setTotalDuration] = useState();
    const [owner, setOwner] = useState(false);
    const [renterBalance, setRenterBalance] = useState();
    const [contractBalance, setContractBalance] = useState();
    const [ownerBalance, setOwnerBalance] = useState();

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
    const checkWalletConnection = async() => {
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

    // Add the user as a renter
    const addRenter = async(currentAccount, canRent, isRenting, balance, due, start, end) => {
        try {
            console.log(`[addRenter]currentAccount: ${currentAccount} - ${canRent} - ${isRenting} - ${balance} - ${due} - ${start} - ${end}`);
            const addRenter = await contract.addRenter(currentAccount, canRent, isRenting, balance, due, start, end);
            await addRenter.wait();
            checkRenterExists();
        } catch (error) {
            console.log(error);
        }
    }

    // Check if the renter exists
    const checkRenterExists = async() => {
        try {
            console.log('[checkRenterExists]currentAccount: ' + currentAccount);
            if(currentAccount) {
                // Return true if renter exists
                const renterExists = await contract.renterExists(currentAccount);
                setRenterExists(renterExists);
                console.log('[checkRenterExists]renterExists: ' + renterExists);

                // If renter exists, we get his status (canRent and isRenting)
                if(renterExists) {
                    await getRenterStatus();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get renter's information
    const getRenterStatus = async() => {
        try {
            if(currentAccount) {
                const renter = await contract.getRenterStatus(currentAccount);
                // Save canRent and isRenting values in the state
                setRenter(renter);
                console.log('[getRenterStatus]renter.canRent: ' + renter.canRent);
                console.log('[getRenterStatus]renter.isRenting: ' + renter.isRenting);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get renter's balance
    const getRenterBalance = async() => {
        try {
            if(currentAccount) {
                const renterBalance = await contract.balanceOfRenter(currentAccount);
                // Store the balance in the state
                setRenterBalance(ethers.utils.formatEther(renterBalance))
                console.log('[getRenterBalance]renterBalance: ' + renterBalance);
            }            
        } catch (error) {
            console.log(error);            
        }
    }

    // Deposit BNB into the smart contract
    const deposit = async(value) => {
        try {
            if(currentAccount) {
                const bnbValue = ethers.utils.parseEther(value);

                console.log('[deposit] due: ' + value);
                console.log('[deposit] bnbValue: ' + value);
                // Specify the value of the message
                const deposit = await contract.deposit(currentAccount, { value: bnbValue });
                await deposit.wait();
                console.log('[deposit]deposit.currentAccount: ' + deposit.currentAccount + 'deposit.value: ' + deposit.value);
                await getRenterBalance();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get the renter's due
    const getDue = async() => {
        try {
            if(currentAccount) {
                const due = await contract.getDue(currentAccount);
                // Store the due in the state
                setDue(ethers.utils.formatEther(due));
                console.log('[getDue]due: ' + due);
            }            
        } catch (error) {
            console.log(error);
        }
    }

    // Get the actual duration
    const getActualDuration = async() => {
        try {
            if(currentAccount){
                const actualDuration = await contract.getActualDuration(currentAccount);
                // Store the actualDuration in the state and make it a number
                setActualDuration(Number(actualDuration));
                console.log('[getActualDuration]actualDuration: ' + actualDuration);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get the total duration
    const getTotalDuration = async() => {
        try {
            if(currentAccount) {
                const totalDuration = await contract.getTotalDuration(currentAccount);
                // Store the totalDuration in the state and make it a number
                setTotalDuration(Number(totalDuration));
                console.log('[getTotalDuration]totalDuration: ' + totalDuration);
            }            
        } catch (error) {
            console.log(error);
        }
    }

    // Make the payment
    const makePayment = async() => {
        try {
            if(currentAccount) {
                const bnbValue = ethers.utils.parseEther(due);
                const deposit = await contract.makePayment(currentAccount, bnbValue);
                await deposit.wait();

                console.log('[makePayment] due: ' + due);
                console.log('[makePayment] bnbValue: ' + due);

                // Check if canRent, isRenting, balance, totalDuration and due are correctly reset and store the results in appropriate states
                await getRenterStatus();
                await getRenterBalance();
                await getTotalDuration();
                await getDue();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Call checkout function
    const checkOut = async() => {
        try {
            const checkOut = await contract.checkOut(currentAccount);
            await checkOut.wait();

            // Update renter's status
            await getRenterStatus();
        } catch (error) {
            console.log(error);
        }
    }

    // Call checkin function
    const checkIn = async(weiPrice) => {
        try {
            const checkIn = await contract.checkIn(currentAccount, weiPrice);
            await checkIn.wait();

            // Update renter's status, due actual duration and total duration
            await getRenterStatus();
            await getDue();
            await getTotalDuration();
        } catch (error) {
            console.log(error);
        }
    }

    // Call isOwner function
    const isOwner = async() => {
        try {
            if(currentAccount) {
                const owner = await contract.isOwner();
                // Store the owner (boolean) in the state
                setOwner(owner);
                console.log('[isOwner]owner: ' + owner);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get contract's balance
    const getContractBalance = async() => {
        try {
            const contractBalance = await contract.balanceOf();
            setContractBalance(ethers.utils.formatEther(contractBalance));
            console.log('[getContractBalance]contractBalance: ' + contractBalance);
        } catch (error) {
            console.log(error);
        }
    }

    // Get owner's balance
    const getOwnerBalance = async() => {
        try {
            if(owner) {
                const ownerBalance = await contract.balanceOfOwner();
                setOwnerBalance(ethers.utils.formatEther(ownerBalance));
                console.log('[getOwnerBalance]ownerBalance: ' + ownerBalance);
            } else {
                console.log('[getOwnerBalance]owner: ' + owner);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Owner withdraw
    const ownerWithdraw = async() => {
        try {
            const ownerBalance = await contract.withdrawOwnerBalance();
            await ownerBalance.wait;
            // Update owner's balance and contract's balance
            await getOwnerBalance();
            await getContractBalance();            
        } catch (error) {
            console.log(error);
        }
    }

    // When variables changes
    useEffect(() => {
        checkWalletConnection();
        checkRenterExists();
        getRenterBalance();
        getDue();
        // getActualDuration();
        getTotalDuration();
        isOwner();
        getContractBalance();
        getOwnerBalance();
    }, [currentAccount])

  return (
    <BlockchainContext.Provider
        value={{
            connectWallet,
            currentAccount,
            renterExists,
            addRenter,
            renter,
            checkOut,
            checkIn,
            getDue,
            due,
            deposit,
            makePayment
        }}
    >
        { children }
    </BlockchainContext.Provider>
  )
}

export const useStateBlockchainContext = () => useContext(BlockchainContext);