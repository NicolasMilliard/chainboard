import React, { createContext, useContext, useEffect, useState } from 'react'
import contractConfig from '../contract-config.json'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

const { abi, contractAddress } = contractConfig;

const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [renter, setRenter] = useState();
    const [renterExists, setRenterExists] = useState();
    const [size, setSize] = useState();
    const [level, setLevel] = useState("");
    const [due, setDue] = useState();
    const [actualDuration, setActualDuration] = useState();
    const [totalDuration, setTotalDuration] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    // Read-only access to the blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Sign messages and transactions on the blockchain
    const signer = provider.getSigner();

    // Contract (BSC Testnet)
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const handleLevel = (selectedLevel) => {
        setLevel(selectedLevel);
    }

    const handleSnowboardSize = (e) => {
        setSize(e.target.value);
    }

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
            }

            // Is account changed?
            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            });
        } catch (error) {
            toast.error('The connection has failed. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    // Is current chain matches the BSC Testnet chain?
    const checkNetwork = async() => {
        try {
            if(window.ethereum) {
                // Targets BSC Tesnet chain (id: 0x61)
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x61' }],
                });
            }
        } catch (switchError) {
            // If the chain is not already present on Metamask
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x61',
                            chainName: 'Binance Smart Chain Testnet',
                            nativeCurrency: {
                                name: 'Binance Chain Native Token',
                                symbol: 'tBNB',
                                decimals: 18
                            },
                            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545', 'https://data-seed-prebsc-2-s1.binance.org:8545', 'https://data-seed-prebsc-1-s2.binance.org:8545', 'https://data-seed-prebsc-2-s2.binance.org:8545', 'https://data-seed-prebsc-1-s3.binance.org:8545', 'https://data-seed-prebsc-2-s3.binance.org:8545'],
                            blockExplorerUrls: ['https://testnet.bscscan.com']
                        },
                    ],
                });
            } catch (error) {
                toast.info('Please add BSC Testnet to your MetaMask to use the application.', {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true
                });
            }
        }
    };

    // Add the user as a renter
    const addRenter = async(currentAccount, canRent, isRenting, level, size, due, start, end) => {
        try {
            console.log(`[addRenter]currentAccount: ${currentAccount} - ${canRent} - ${isRenting} - ${level} - ${size} - ${due} - ${start} - ${end}`);
            const addRenter = await contract.addRenter(currentAccount, canRent, isRenting, level, size, due, start, end);
            await addRenter.wait();
            checkRenterExists();
        } catch (error) {
            toast.error('We cannot add you as a renter. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
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
                    await getLevel();
                    await getSize();
                }
            }
        } catch (error) {
            toast.error('We cannot check if you have an account. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    // Get renter's information
    const getRenterStatus = async() => {
        try {
            if(currentAccount) {
                const renter = await contract.getRenterStatus(currentAccount);
                // Save canRent and isRenting values in the state
                setRenter(renter);
                console.log('[getRenterStatus]renter: ' + renter);
                console.log('[getRenterStatus]renter.canRent: ' + renter.canRent);
                console.log('[getRenterStatus]renter.isRenting: ' + renter.isRenting);
            }
        } catch (error) {
            toast.error('We cannot check your account status. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
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
            toast.error('' + error.errorArgs, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    // Get the actual duration
    const getActualDuration = async() => {
        try {
            if(currentAccount) {
                const actualDuration = await contract.getActualDuration(currentAccount);
                // Store the actualDuration in the state and make it a number
                setActualDuration(Number(actualDuration));
                console.log('[getActualDuration]actualDuration: ' + actualDuration);
            }
        } catch (error) {
            toast.error('We cannot check your actual renting duration. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
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
        } catch(error) {
            
        }
    }

    // Get the rental start
    const getStart = async() => {
        try {
            if(currentAccount) {
                const start = await contract.getStart(currentAccount);
                // Store the start in the state
                setStart(start);
                console.log('[getStart]start: ' + start);
            }            
        } catch (error) {
            toast.error('' + error.errorArgs, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    // Get the rental end
    const getEnd = async() => {
        try {
            if(currentAccount) {
                const end = await contract.getEnd(currentAccount);
                // Store the end in the state
                setEnd(end);
                console.log('[getEnd]end: ' + end);
            }            
        } catch (error) {
            toast.error('' + error.errorArgs, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    // Make the payment
    const makePayment = async() => {
        try {
            if(currentAccount) {
                const weiDue = (due * (10 ** 18)).toString();
                const deposit = await contract.makePayment(currentAccount, { value: weiDue });
                await deposit.wait();

                console.log('[makePayment] weiDue: ' + weiDue);

                // Check if canRent, isRenting, totalDuration and due are correctly reset and store the results in appropriate states
                await getRenterStatus();
                await getTotalDuration();
                await getDue();

                toast.success('The payment was successful. Thank you!', {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('The payment has failed. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    // Call checkOut function
    const checkOut = async() => {
        try {
            const checkOut = await contract.checkOut(currentAccount, level, size);
            await checkOut.wait();
            
            // Update renter's status
            await getRenterStatus();
        } catch (error) {
            toast.error('The transaction has failed. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    // Get the renter's level
    const getLevel = async() => {
        try {
            if(currentAccount) {
                const level = await contract.getLevel(currentAccount);
                // Store the level in the state
                setLevel(level);
                console.log('[getLevel]level: ' + level);
            }
        } catch (error) {
            toast.error('The transaction has failed. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    // Get the renter's snowboard size
    const getSize = async() => {
        try {
            if(currentAccount) {
                const size = await contract.getSize(currentAccount);
                // Store the size in the state
                setSize(size);
                console.log('[getSize]size: ' + size);
            }            
        } catch (error) {
            toast.error('The transaction has failed. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    // Call checkIn function
    const checkIn = async(weiPrice) => {
        try {
            const checkIn = await contract.checkIn(currentAccount, weiPrice);
            await checkIn.wait();

            // Update renter's status, due actual duration and total duration
            await getRenterStatus();
            await getDue();
            await getTotalDuration();
        } catch (error) {
            toast.error('The transaction has failed. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        }
    }

    useEffect(() => {
        checkNetwork();
        checkWalletConnection();
        checkRenterExists();
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
            getRenterStatus,
            getLevel,
            getSize,
            checkIn,
            getDue,
            due,
            makePayment,
            getActualDuration,
            actualDuration,
            getTotalDuration,
            totalDuration,
            size, setSize, handleSnowboardSize,
            level, handleLevel,
            start, getStart,
            end, getEnd
        }}
    >
        { children }
    </BlockchainContext.Provider>
  )
}

export const useStateBlockchainContext = () => useContext(BlockchainContext);