# ⚡️ Chainboard

## Table of Contents

1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Results](#results)

<a name="general-info"></a>

### General Info

---

Chainboard is a dApp working on Binance Smart Chain Testnet. In case you need testnet BNB, you can use
[this faucet](https://testnet.bnbchain.org/faucet-smart).\
This dApp is using [this Smart Contract](https://github.com/NicolasMilliard/chainboard/blob/main/contracts/Chainboard.sol).

<a name="technologies"></a>

### Technologies

---

A list of technologies used within the project:

- [Hardhat](https://hardhat.org/): Version ^2.10.1
- [Solidity](https://github.com/ethereum/solc-js): Version 0.8.17 (solc-js)
- [Dotenv](https://github.com/motdotla/dotenv): Version ^16.0.1
- [Node](https://nodejs.org/en/): Version 16.14.2
- [Ethers.js](https://docs.ethers.org/ethers.js/v3.0/html/): Version ^5.6.9
- [@nomicfoundation/hardhat-network-helpers](https://github.com/NomicFoundation/hardhat): Version ^1.0.7
- [@nomicfoundation/hardhat-toolbox](https://github.com/NomicFoundation/hardhat): Version ^1.0.2
- [React JS](https://fr.reactjs.org/): Version ^18.2.0
- [React Router DOM](https://github.com/remix-run/react-router/tree/main/packages/react-router-dom): Version ^6.2.1
- [React Hook Form](https://github.com/react-hook-form/react-hook-form): Version ^7.35.0
- [React Icons](https://react-icons.github.io/react-icons/): Version ^4.3.1
- [React Toastify](https://github.com/fkhadra/react-toastify): Version ^9.0.8
- [TailwindCSS](https://tailwindcss.com/): Version ^3.0.19

<a name="installation"></a>

### Installation

---

```sh
# Clone the repository
git clone https://github.com/NicolasMilliard/chainboard.git
cd chainboard

# Install dependencies
npm install

# Start the local blockchain in a terminal (optionnal)
npx hardhat node

# Deploy the Smart Contract on Hardhat node in a new terminal (option 1)
npx hardhat run scripts/deploy.js

# Deploy the Smart Contract on BSC tesnet in a new terminal (option 2)
npx hardhat run scripts/deploy.js --network testnet

# Start the app in a new terminal
npm run start
```

<a name="results"></a>

### Results

---

An online demonstration is available [on Vercel](https://chainboard.vercel.app/).

```sh
  Testing Chainboard...

✨ CONTEXT: Test addRenter

      √ should add _renter as a Renter (POV _renter)
      √ should init _renter status (POV _renter)
      √ should init _renter level (POV _renter)
      √ should init _renter snowboard size (POV _renter)
      √ should init _renter due at 0 (POV _renter)
      √ should init _renter start at 0 (POV _renter)
      √ should init _renter end at 0 (POV _renter)
      √ should return: You already have an account. (POV _renter)

✨ CONTEXT: Test checkOut

      √ should update _renter status (POV renter)
      √ should update _renter status (POV renter)
      √ should update _renter status (POV renter)
      √ should update _renter status (POV renter)
      √ should revert: _notRenter try to checkOut on _renter (POV _notRenter)
      √ should revert: _renter has a pending due (POV _renter)
      √ should revert: _renter can't rent (POV _renter)

✨ CONTEXT: Test getActualDuration

      √ should get _renter actual duration (POV renter)
      √ should revert: _notRenter try to getActualDuration on _renter (POV _notRenter)
      √ should revert: _renter has not a snowboard (POV _renter)

✨ CONTEXT: Test checkIn

      √ should set _renter status (POV renter)
      √ should set _renter end (POV renter)
      √ should set _renter's due (POV renter - duration 1 minute)
      √ should set _renter's due (POV renter - duration 2 minutes)
      √ should revert: _notRenter try to checkIn on _renter (POV _notRenter)
      √ should revert: _renter has not a snowboard (POV _renter)

✨ CONTEXT: Test getTotalDuration

      √ should return _renter's totalDuration (POV renter)
      √ revert: _notRenter checks totalDuration of _renter (POV renter)
      √ revert: _renter still have a snowboard (POV renter)
      √ revert: _renter does not have a snowboard (POV renter)

✨ CONTEXT: Test makePayment

      √ should update _renter's balance (POV renter)
      √ should update _owner's balance (POV owner)
      √ should update _renter status (POV renter)
      √ should update _renter due at 0 (POV _renter)
      √ should update _renter start at 0 (POV _renter)
      √ should update _renter end at 0 (POV _renter)
      √ should revert: _notRenter try to makePayment for _renter (POV _notRenter)
      √ should revert: _renter doesn't have a due (POV _renter)
      √ should revert: _renter doesn't set the correct amount (POV _notRenter)

✨ CONTEXT: Test getRenterStatus

      √ should init _renter status (POV _renter)
      √ should revert (POV _notRenter)

✨ CONTEXT: Test renterExists

      √ should init _renter status (POV _renter)
      √ should revert (POV _notRenter)

✨ CONTEXT: Test getLevel

      √ should init _renter status (POV _renter)
      √ should revert (POV _notRenter)

✨ CONTEXT: Test getSize

      √ should init _renter snowboard size (POV _renter)
      √ should revert (POV _notRenter)

✨ CONTEXT: Test getStart

      √ should init _renter start at 0 (POV _renter)
      √ should revert (POV _notRenter)

✨ CONTEXT: Test getEnd

      √ should init _renter end at 0 (POV _renter)
      √ should revert (POV _notRenter)

✨ CONTEXT: Test getDue

      √ should init _renter due at 0 (POV _renter)
      √ should revert (POV _notRenter)
```

Eth-gas-reporter

```sh
·------------------------------|----------------------------|-------------|-----------------------------·
|     Solc version: 0.8.17     ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·······························|····························|·············|······························
|  Methods                                                                                              │
···············|···············|··············|·············|·············|···············|··············
|  Contract    ·  Method       ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
···············|···············|··············|·············|·············|···············|··············
|  Chainboard  ·  addRenter    ·           -  ·          -  ·      97953  ·           51  ·          -  │
···············|···············|··············|·············|·············|···············|··············
|  Chainboard  ·  checkIn      ·       58867  ·      59071  ·      58882  ·           14  ·          -  │
···············|···············|··············|·············|·············|···············|··············
|  Chainboard  ·  checkOut     ·       56767  ·      59567  ·      57009  ·           23  ·          -  │
···············|···············|··············|·············|·············|···············|··············
|  Chainboard  ·  makePayment  ·           -  ·          -  ·      45339  ·            6  ·          -  │
···············|···············|··············|·············|·············|···············|··············
|  Deployments                 ·                                          ·  % of limit   ·             │
·······························|··············|·············|·············|···············|··············
|  Chainboard                  ·           -  ·          -  ·    2334890  ·        7.8 %  ·          -  │
·------------------------------|--------------|-------------|-------------|---------------|-------------·
```

Solidity-coverage

```sh
-----------------|----------|----------|----------|----------|----------------|
File             |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------|----------|----------|----------|----------|----------------|
 contracts\      |      100 |    96.15 |      100 |      100 |                |
  Chainboard.sol |      100 |    96.15 |      100 |      100 |                |
-----------------|----------|----------|----------|----------|----------------|
All files        |      100 |    96.15 |      100 |      100 |                |
-----------------|----------|----------|----------|----------|----------------|
```

Details for the coverage can be found at [this link](#).
