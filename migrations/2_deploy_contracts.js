var YolCoin = artifacts.require("./YolCoin.sol");
var VoucherContract = artifacts.require("./VoucherContract.sol");

module.exports = function (deployer) {
  deployer.deploy(YolCoin);
  deployer.deploy(VoucherContract);
};