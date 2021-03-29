pragma solidity >=0.4.22 <0.9.0;

contract Remittance {
    
   address payable public aliceAddress;
   address payable public bobAddress;
   address payable public carolAddress;
   mapping (address => uint) public funds;
   
   bytes32 bobHashedPw;
   bytes32 carolHashedPw;
    
   event fundsTransferred(uint amount);   
    
    //The contract is created by Alice and she will fund it initially
    //All passwords are hashed offline and the hashes stored in the contract
    constructor(address payable _bobAddress, address payable _carolAddress, bytes32 _bobHashedPw, bytes32 _carolHashedPw) public payable {
        //Alice is set at the msg.sender since she's the one creating the contract
        aliceAddress = msg.sender;
        bobAddress = _bobAddress;
        carolAddress = _carolAddress;
        bobHashedPw = _bobHashedPw;
        carolHashedPw = _carolHashedPw;
        funds[carolAddress] = msg.value;
    }
    
    function getBalance(address _address) public view returns(uint) {
        return address(_address).balance;
    }
    
    function transferEther(bytes memory bobPw, bytes memory carolPw) public {
        require(msg.sender == carolAddress, "Only carol can call this function");
        uint amount = funds[carolAddress];
        if ( (bobHashedPw == keccak256(bobPw)) && (carolHashedPw == keccak256(carolPw))) {
           funds[carolAddress] = 0;
           carolAddress.call.value(amount)("");
           emit fundsTransferred(amount);
        } else {
            revert('Incorrect passwords submitted');
        }
    }
    
    //This function lets alice withdraw extra funds sent to the contract's fallback
    function withdraw() public {
        require(msg.sender == aliceAddress, "Only the deployer alice can withdraw extra funds sent to contract");
        uint amount = funds[aliceAddress];
        funds[aliceAddress] = 0;
        aliceAddress.transfer(amount);
    }

    //Extra funds goto Alice's address
    function () external payable {
        funds[aliceAddress] += msg.value;
    }
}