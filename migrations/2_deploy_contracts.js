// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const Remittance = artifacts.require("Remittance");

module.exports = function(deployer, network, accounts) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  const bobAddress = accounts[1];
  const carolAddress = accounts[2];
  const bobHashedPw = "0x7624778dedc75f8b322b9fa1632a610d40b85e106c7d9bf0e743a9ce291b9c6f";
  const carolHashedPw = "0x7624778dedc75f8b322b9fa1632a610d40b85e106c7d9bf0e743a9ce291b9c6f";
  //accounts[0] is alice's address in this case
  deployer.deploy(Remittance, bobAddress, carolAddress, bobHashedPw, carolHashedPw, {from: accounts[0], value: 1000});
};
