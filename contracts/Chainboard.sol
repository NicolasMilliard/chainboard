// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/*
* @title Chainboard
* @author Nicolas Milliard
* @notice Smart contract for renting snowboards
*/

contract Chainboard {
    // @notice Only owner can receive the payment of the renting of a snowboard
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    /* @dev Renter is initialize by the front end with the current account of the user and following values:
     * canRent = true, isRenting = false, {due, start, end} = 0, level = 'beginner', size = 142
    */
    struct Renter {
        address walletAddress;
        bool canRent;
        bool isRenting;
        string level;
        uint8 size;
        uint128 due;
        uint256 start;
        uint256 end;
    }

    // @dev Utility mapping to register all renters
    mapping (address => Renter) private renters;

    // @notice Modifier to check if the current account connected to the front end is the same account specify for the transaction
    modifier isRenter(address walletAddress) {
        require(msg.sender == walletAddress, "You can only manage your account.");
        _;
    }

    // @notice Create the renter's profile
    // @dev Require check if renter doesn't have an existing account. If not, add the renter to the mapping
    // @param walletAddress is the current account of the user
    // @param canRent is initialize by the frontend at true
    // @param isRenting is initialize by the frontend at false
    // @param level is initialize by the frontend at beginner
    // @param size is initialize by the frontend at 142
    // @param due is initialize by the frontend at 0
    // @param start is initialize by the frontend at 0
    // @param end is initialize by the frontend at 0
    function addRenter(address walletAddress, bool canRent, bool isRenting, string memory level, uint8 size, uint128 due, uint256 start, uint256 end) public {
        require(renterExists(walletAddress) == false, "You already have an account.");
        // Key is the walletAddress
        renters[walletAddress] = Renter(walletAddress, canRent, isRenting, level, size, due, start, end);
    }

    // @notice Get renter's values for canRent and isRenting
    // @dev Check if the sender is a renter with the modifier isRenter
    // @param walletAddress is the current account of the user
    // @return two booleans
    function getRenterStatus(address walletAddress) public isRenter(walletAddress) view returns(bool canRent, bool isRenting) {
        canRent = renters[walletAddress].canRent;
        isRenting = renters[walletAddress].isRenting;
    }

    // @notice Check if a renter exist
    // @dev A renter exist if his account address is store in the mapping at the key equal to his account address
    // @param walletAddress is the current account of the user
    // @return a boolean
    function renterExists(address walletAddress) public isRenter(walletAddress) view returns(bool) {
        // address(0) is the default value for an address
        if(renters[walletAddress].walletAddress != address(0)) {
            return true;
        }
        return false;
    }

    // @notice Check out a snowboard
    /* @dev Only a renter can rent a snowboard. It needs the renter's due is equal to 0 and the renter's canRent to be true
     * When a renter check out a snowboard, his parameters isRenting, level, size, start and canRent are update
     * start initialize a counter based and the timestamp of the block of the transaction
    */
    // @param walletAddress is the current account of the user
    function checkOut(address walletAddress, string memory level, uint8 size) public isRenter(walletAddress) {
        require(renters[walletAddress].due == 0, "You have a pending payment.");
        require(renters[walletAddress].canRent == true, "You can't rent at this time.");

        renters[walletAddress].isRenting = true;
        renters[walletAddress].level = level;
        renters[walletAddress].size = size;
        renters[walletAddress].start = block.timestamp;
        renters[walletAddress].canRent = false;
    }

    // @notice Get renter's level
    // @dev Check if the sender is a renter with the modifier isRenter
    // @param walletAddress is the current account of the user
    // @return a string
    function getLevel(address walletAddress) public isRenter(walletAddress) view returns(string memory level) {
        level = renters[walletAddress].level;
    }

    // @notice Get renter's snowboard size
    // @dev Check if the sender is a renter with the modifier isRenter
    // @param walletAddress is the current account of the user
    // @return a uint
    function getSize(address walletAddress) public isRenter(walletAddress) view returns(uint8 size) {
        size = renters[walletAddress].size;
    }

    // @notice Check in a snowboard
    /* @dev Only a renter can rent a snowboard. It needs the renter's isRenting equal to true
     * When a renter check in a snowboard, his parameters isRenting and end are update
     * Renter's due is calculate with the function setDue
    */
    // @param walletAddress is the current account of the user
    // @param snowboardPrice is the price of the snowboard (in wei) per minute
    function checkIn(address walletAddress, uint128 snowboardPrice) public isRenter(walletAddress) {
        require(renters[walletAddress].isRenting == true, "You don't have a snowboard.");

        renters[walletAddress].isRenting = false;
        renters[walletAddress].end = block.timestamp;

        // Set due amount
        setDue(walletAddress, snowboardPrice);
    }

    // @notice Get the start of the rental
    // @dev If start is not defined, it returns 0
    // @param walletAddress is the current account of the user
    // @return a uint
    function getStart(address walletAddress) public isRenter(walletAddress) view returns(uint256 start) {
        start = renters[walletAddress].start;
    }

    // @notice Get the end of the rental
    // @dev If end is not defined, it returns 0
    // @param walletAddress is the current account of the user
    // @return a uint
    function getEnd(address walletAddress) public isRenter(walletAddress) view returns(uint256 end) {
        end = renters[walletAddress].end;
    }

    // @notice Set due amount
    // @dev When the renter checkIn his snowboard, the due is calculate regarding the snowboardPrice
    // @param walletAddress is the current account of the user
    // @param snowboardPrice is the price of the snowboard (in wei) per minute
    function setDue(address walletAddress, uint128 snowboardPrice) internal {
        uint timespanMinutes = getTotalDuration(walletAddress);
        renters[walletAddress].due = uint128(timespanMinutes) * snowboardPrice;
    }

    // @notice Get due amount is usefull to display the due in the dApp
    // @dev Only a renter can rent a snowboard
    // @param walletAddress is the current account of the user
    // @return the due of the renter
    function getDue(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].due;
    }

    
    // @notice Get actual duration of snowboard rent
    /* @dev Only a renter can have an actual duration
     * Renter must rent a snowboard (isRenting == true)
     * To get actual duration, block.timestamp is used
    */
    // @param walletAddress is the current account of the user
    // @return the actual duration of the renting (in seconds)
    function getActualDuration(address walletAddress) public view isRenter(walletAddress) returns(uint) {
        require(renters[walletAddress].isRenting == true, "You don't have a snowboard.");

        uint durationInSeconds = block.timestamp - renters[walletAddress].start;

        return handleDuration(durationInSeconds);
    }

    // @notice Get total duration of snowboard rent
    /* @dev Only a renter can have a total duration
     * Renter must checkOut then checkIn a snowboard (handle by isRenting)
    */
    // @param walletAddress is the current account of the user
    // @return the total duration of the renting (in seconds)
    function getTotalDuration(address walletAddress) public view isRenter(walletAddress) returns(uint) {
        require(renters[walletAddress].isRenting == false, "You are still renting a snowboard");
        require(renters[walletAddress].start > 0, "You are not renting a snowboard");
        require(renters[walletAddress].end > 0, "You are still renting a snowboard");
        
        uint durationInSeconds = renters[walletAddress].end - renters[walletAddress].start;

        return handleDuration(durationInSeconds);
    }

    // @notice Check if duration is less than one minute, set it to one otherwise convert duration in minutes
    // @param durationInSeconds is the duration sent by getActualDuration or getTotalDuration
    // @return the duration in minutes
    function handleDuration(uint durationInSeconds) pure internal returns(uint) {
        if(durationInSeconds >= 60) {
            // Get duration in minutes
            uint durationInMinutes = durationInSeconds / 60;
            return durationInMinutes;
        } else {
            return 1;
        }
    }

    // @notice Make the payment and reset renter parameters
    /* @dev Only a renter can have make a payment
     * A due must to be set greater than 0
     * The value sent by the renter must be equal to the due (done in the dApp)
    */
    // @param walletAddress is the current account of the user
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