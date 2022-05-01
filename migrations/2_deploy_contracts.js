const DataContract = artifacts.require("DataContract");

module.exports = function(deployer) {
  deployer.deploy(DataContract);
};
