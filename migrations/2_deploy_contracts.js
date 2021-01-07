var Contract = artifacts.require('./Betting.sol');

module.exports = function (deployer) {
  deployer.deploy(Contract);
};
