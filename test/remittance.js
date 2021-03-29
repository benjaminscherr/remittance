//const _deploy_contracts = require("../migrations/2_deploy_contracts");

const Remittance = artifacts.require("Remittance");



contract("Remittance", accounts => {
    const bobAddress = accounts[1];
    const carolAddress = accounts[2];

    //These are examples of a hashed password
    const bobHashedPw = "0x7624778dedc75f8b322b9fa1632a610d40b85e106c7d9bf0e743a9ce291b9c6f";
    const carolHashedPw = "0x7624778dedc75f8b322b9fa1632a610d40b85e106c7d9bf0e743a9ce291b9c6f";
    const expectedBalance = 1000;

    it("should have an initial balance of 1000", () => {

    return Remittance.new(bobAddress, carolAddress, bobHashedPw, carolHashedPw, {from: accounts[0], value: 1000})
        .then(contract => {
            remittance = contract;
            return web3.eth.getBalance(remittance.address);
        })
        .then(balance => {
            assert.equal(expectedBalance, balance, "Balances are not equal")
        });
    });

    it("should successfully send ether", () => {
        
    let carolStartingBalance;
  
    return Remittance.new(bobAddress, carolAddress, bobHashedPw, carolHashedPw, {from: accounts[0], value: 1000})
        .then(contract => {
            remittance = contract;
            return web3.eth.getBalance(carolAddress);
        })
        .then(balance => {
            carolStartingBalance = balance;
            //These are the passwords that will generate the above hashed passwords
            return remittance.transferEther("0x6869", "0x6869", {from: carolAddress, gasPrice: 0 })
        })
        .then(() => {
            return web3.eth.getBalance(carolAddress);
        })
        .then(carolEndingBalance => {
            assert.equal(carolEndingBalance, parseInt(carolStartingBalance) + 1000, "balances are not equal");
        });
    });
});