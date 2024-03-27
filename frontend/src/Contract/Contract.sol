// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract CryptoPayment {
    address public owner;
    mapping(address => uint256) public balances;

    event PaymentReceived(address indexed from, uint256 amount);
    event PaymentSent(address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }

    function sendPayment(address payable recipient, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract balance");

        recipient.transfer(amount);
        emit PaymentSent(recipient, amount);
    }
}
