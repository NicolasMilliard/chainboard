// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract Chainboard {
    address owner;
    uint ownerBalance;

    constructor() {
        owner = msg.sender;
    }

    struct Renter {
        address payable walletAddress;
        bool canRent;
        bool isRenting;
        uint balance;
        uint due;
        uint start;
        uint end;
    }

    mapping (address => Renter) public renters;

    // Add the renter to the blockchain
    function addRenter(address payable walletAddress, bool canRent, bool isRenting, uint balance, uint due, uint start, uint end) public {
        // Key is the walletAddress
        renters[walletAddress] = Renter(walletAddress, canRent, isRenting, balance, due, start, end);
    }

    modifier isRenter(address walletAddress) {
        require(msg.sender == walletAddress, "You can only manage your account.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed to access this.");
        _;
    }

    // Check out a snowboard
    function checkOut(address walletAddress) public isRenter(walletAddress) {
        require(renters[walletAddress].due == 0, "You have a pending balance.");
        require(renters[walletAddress].canRent == true, "You can't rent at this time.");

        renters[walletAddress].isRenting = true;
        renters[walletAddress].start = block.timestamp;
        renters[walletAddress].canRent = false;
    }

    // Check in a snowboard
    function checkIn(address walletAddress, uint snowboardPrice) public isRenter(walletAddress) {
        require(renters[walletAddress].isRenting == true, "You don't have a snowboard.");

        renters[walletAddress].isRenting = false;
        renters[walletAddress].end = block.timestamp;

        // Set due amount
        setDue(walletAddress, snowboardPrice);
    }

    // Get actual duration of snowboard use
    function getActualDuration(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        require(renters[walletAddress].isRenting == true, "You don't have a snowboard.");

        uint durationInSeconds = block.timestamp - renters[walletAddress].start;
        // Get duration in minutes
        uint duration = durationInSeconds / 60;
        return duration;
    }

    // Get total duration of snowboard use
    function getTotalDuration(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        if(renters[walletAddress].start == 0 || renters[walletAddress].end == 0) {
            return 0;
        } else {
            uint durationInSeconds = renters[walletAddress].end - renters[walletAddress].start;
            // Minimum duration is 1 minute
            if(durationInSeconds >= 60) {
                // Get duration in minutes
                uint duration = durationInSeconds / 60;
                return duration;
            } else {
                return 1;
            }
        }
    }

    // Get contract's balance
    function balanceOf() public view returns(uint) {
        // this refers to the contract
        return address(this).balance;
    }

    // Check if it's the owner
    function isOwner() public view returns(bool) {
        return owner == msg.sender;
    }

    // Get owner's balance
    function balanceOfOwner() public view onlyOwner() returns(uint) {
        return ownerBalance;
    }

    // Withdraw to owner's balance
    function withdrawOwnerBalance() payable public {
        payable(owner).transfer(ownerBalance);
        // Reset owner's balance
        ownerBalance = 0;
    }

    // Get renter's balance
    function balanceOfRenter(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].balance;
    }

    // Get renter informations
    function getRenterStatus(address walletAddress) public isRenter(walletAddress) view returns(bool canRent, bool isRenting) {
        canRent = renters[walletAddress].canRent;
        isRenting = renters[walletAddress].isRenting;
    }

    // Check if renter exist
    function renterExists(address walletAddress) public isRenter(walletAddress) view returns(bool) {
        // address(0) is the default value for an address
        if(renters[walletAddress].walletAddress != address(0)) {
            return true;
        }
        return false;
    }

    // Set due amount (calculated in minutes and not in hours to facilite testing phase)
    function setDue(address walletAddress, uint snowboardPrice) internal {
        uint timespanMinutes = getTotalDuration(walletAddress);
        // snowboardPrice must be in wei format (16 decimals), e.g. 0.012 BNB = 12000000000000000 wei
        renters[walletAddress].due = timespanMinutes * snowboardPrice;
    }

    // Get due amount
    function getDue(address walletAddress) public view returns(uint) {
        return renters[walletAddress].due;
    }

    // Return a bool to check is renter can rent
    function canRentSnowboard(address walletAddress) public isRenter(walletAddress) view returns(bool) {
        return renters[walletAddress].canRent;
    }

    // Deposit into the smart contract (renter's balance)
    function deposit(address walletAddress) public isRenter(walletAddress) payable {
        renters[walletAddress].balance += msg.value;
    }

    // Make the payment and reset rents parameters
    function makePayment(address walletAddress, uint amount) public isRenter(walletAddress) {
        require(renters[walletAddress].due > 0, "You don't have anything due at this time.");
        require(renters[walletAddress].balance > amount, "You don't have enough funds to cover payment. Please make a deposit first.");

        // Transfer amount from renter's smart contract balance to owner's smart contract balance
        renters[walletAddress].balance -= amount;
        ownerBalance += amount;

        // Balance is paid, renter can rent again
        renters[walletAddress].canRent = true;
        renters[walletAddress].due = 0;
        renters[walletAddress].start = 0;
        renters[walletAddress].end = 0;
    }
}