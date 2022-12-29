require('@nomicfoundation/hardhat-toolbox');
require('hardhat-gas-reporter');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    testnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.ACCOUNTS],
    },
  },
  gasReporter: {
    enabled: true,
  },
};
