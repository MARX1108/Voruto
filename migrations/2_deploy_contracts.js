const DataContract = artifacts.require("DataContract");
const Storage = artifacts.require("Storage");
const Bank = artifacts.require("Bank");

module.exports = function (deployer) {
  deployer.deploy(DataContract);
  deployer.deploy(Storage);
  deployer.deploy(Bank);
};
