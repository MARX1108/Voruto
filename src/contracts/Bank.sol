pragma solidity ^0.5.0;

contract Bank {
    mapping(address => uint256) public balanceOf; // balances, indexed by addresses

    event Deposit(address, uint256);

    function receive(uint256 amount) public payable {
        // require(msg.value == amount);
        balanceOf[msg.sender] += amount; // adjust the account's balance
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) public {
        require(amount <= balanceOf[msg.sender]);
        balanceOf[msg.sender] -= amount;
        msg.sender.transfer(amount);
    }
}
