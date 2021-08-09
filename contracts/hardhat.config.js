require("@nomiclabs/hardhat-waffle");
require('@eth-optimism/hardhat-ovm');
require('dotenv').config()
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.6",
  networks: {
    optimistic: {
      url: 'http://127.0.0.1:8545',
      accounts: { mnemonic: 'test test test test test test test test test test test junk' },
      gasPrice: 15000000,      
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
   },
    kovan_optimistic: {
      url: 'https://kovan.optimism.io',
      accounts: { mnemonic: process.env.MNEMONIC },
      gasPrice: 15000000,
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/135a0ffb7c06426e9f4031175cf84bcd',
      accounts: { mnemonic: process.env.MNEMONIC },
      gasPrice: 'auto'
    }
  }
};
