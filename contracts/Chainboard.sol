// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./SafeMath.sol";

contract Chainboard {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    struct Renter {
        address walletAddress;
        bool canRent;
        bool isRenting;
        uint due;
        uint start;
        uint end;
    }

    mapping (address => Renter) public renters;

    modifier isRenter(address walletAddress) {
        require(msg.sender == walletAddress, "You can only manage your account.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed to access this.");
        _;
    }

    // Add the renter to the blockchain
    function addRenter(address walletAddress, bool canRent, bool isRenting, uint due, uint start, uint end) public {
        require(renterExists(walletAddress) == false, "You already have an account.");
        // Key is the walletAddress
        renters[walletAddress] = Renter(walletAddress, canRent, isRenting, due, start, end);
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

    // Check out a snowboard
    function checkOut(address walletAddress) public isRenter(walletAddress) {
        require(renters[walletAddress].due == 0, "You have a pending payment.");
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

    // Set due amount (calculated in minutes and not in hours to facilite testing phase)
    function setDue(address walletAddress, uint snowboardPrice) internal {
        uint timespanMinutes = getTotalDuration(walletAddress);
        // snowboardPrice must be in wei format (16 decimals), for example 0.012 BNB = 12000000000000000 wei
        renters[walletAddress].due = SafeMath.mul(timespanMinutes, snowboardPrice);
    }

    // Get due amount
    function getDue(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].due;
    }

    // Get actual duration of snowboard use
    function getActualDuration(address walletAddress) public view isRenter(walletAddress) returns(uint) {
        require(renters[walletAddress].isRenting == true, "You don't have a snowboard.");

        uint durationInSeconds = SafeMath.sub(block.timestamp, renters[walletAddress].start);

        return handleDuration(durationInSeconds);
    }

    // Get total duration of snowboard use
    function getTotalDuration(address walletAddress) public view isRenter(walletAddress) returns(uint) {
        require(renters[walletAddress].isRenting == false, "You are still renting a snowboard");
        require(renters[walletAddress].start > 0, "You are not renting a snowboard");
        require(renters[walletAddress].end > 0, "You are still renting a snowboard");
        
        uint durationInSeconds = SafeMath.sub(renters[walletAddress].end, renters[walletAddress].start);

        return handleDuration(durationInSeconds);
    }

    // Detect if duration is less than one minute and convert duration in minutes
    function handleDuration(uint durationInSeconds) pure internal returns(uint) {
        if(durationInSeconds >= 60) {
            // Get duration in minutes
            uint durationInMinutes = SafeMath.div(durationInSeconds, 60);
            return durationInMinutes;
        } else {
            return 1;
        }
    }

    // Check if the current account is the owner
    function isOwner() public view returns(bool) {
        return owner == msg.sender;
    }

    // Make the payment and reset renter parameters
    function makePayment(address walletAddress) public isRenter(walletAddress) payable {
        require(renters[walletAddress].due > 0, "You don't have anything due at this time.");
        require(renters[walletAddress].due == msg.value, "You don't set the correct amount (must be equal to your due)");

        // Transfer amount from renter's account to owner's account
        payable(owner).transfer(msg.value);

        // Payment is made, renter can rent again
        renters[walletAddress].canRent = true;
        renters[walletAddress].due = 0;
        renters[walletAddress].start = 0;
        renters[walletAddress].end = 0;
    }
}