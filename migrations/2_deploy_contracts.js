var MetaCoin = artifacts.require("./MetaCoin.sol");
var VoucherContract = artifacts.require("./VoucherContract.sol");

module.exports = function (deployer) {
  deployer.deploy(MetaCoin);
  deployer.deploy(VoucherContract);
};