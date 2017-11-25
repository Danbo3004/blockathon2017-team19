var YolCoin = artifacts.require("./YolCoin.sol");
var StandardToken = artifacts.require("./StandardToken.sol");
var VoucherContract = artifacts.require("./VoucherContract.sol");

module.exports = function (deployer) {
  deployer.deploy(YolCoin);
  deployer.deploy(StandardToken);
  deployer.deploy(VoucherContract);
};