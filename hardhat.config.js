require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3"); // Required for OpenZeppelin test-helpers
require('dotenv').config();
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-deploy-ethers')
require('global-agent/bootstrap');
require('hardhat-abi-exporter');
require('hardhat-deploy');
require('./tasks');

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: 0,
    }
  },
  networks: {
    hardhat: {
    },
    rinkeby: {
      live: true,
      saveDeployments: true,
      allowUnlimitedContractSize: true,
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.PRIVATE_KEY]
    },
    goerli: {
      live: true,
      saveDeployments: true,
      allowUnlimitedContractSize: true,
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.PRIVATE_KEY]
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  abiExporter: {
    path: './data/abi',
    clear: true,
    flat: true,
    except:[],
    spacing: 2
  }
}
