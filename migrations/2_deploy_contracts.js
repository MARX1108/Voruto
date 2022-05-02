const DataContract = artifacts.require("DataContract");
const DStorage = artifacts.require("DStorage");

module.exports = function (deployer) {
  deployer.deploy(DataContract);
  deployer.deploy(DStorage);
};
