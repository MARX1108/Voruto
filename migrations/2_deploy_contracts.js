const DataContract = artifacts.require("DataContract");
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(DataContract);
  deployer.deploy(Storage);
};
