const path = require('path');

var HDWalletProvider = require('@truffle/hdwallet-provider');
const MNEMONIC =
  'liberty record renew snack hard material remain bind dress excuse thing where';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          'https://ropsten.infura.io/v3/869b7cb492e3441a9bf412042ab3976c'
        );
      },
      gas: 4600000,
      network_id: 3,
    },
  },

  compilers: {
    solc: {
      version: '0.5.1', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
        evmVersion: 'byzantium',
      },
    },
  },
};
