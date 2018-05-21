var Portfolio = artifacts.require("Portfolio");

module.exports = function(deployer) {
  deployer.deploy(Portfolio,{gas: 6654755});
}; 