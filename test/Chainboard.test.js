const { expect } = require('chai');
const hre = require('hardhat');
const helpers = require('@nomicfoundation/hardhat-network-helpers');

describe('Testing Chainboard...', async () => {
  // Variables used through all tests
  const zeroAddress = hre.ethers.constants.AddressZero;
  let chainboardContract;
  let _owner;
  let _renter;

  beforeEach(async () => {
    // Deploy contract and get signers
    const chainboard = await hre.ethers.getContractFactory('Chainboard');
    chainboardContract = await chainboard.deploy();
    await chainboardContract.deployed();
    [_owner, _renter] = await hre.ethers.getSigners();
  });

  describe('\n✨ CONTEXT: Test addRenter\n', async () => {
    // Check if renter exists
    it('should add _renter as a Renter (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterExists = await chainboardContract.connect(_renter).renterExists(_renter.address, {
        from: _renter.address,
      });

      expect(testRenterExists).to.be.true;
    });

    // Check if renter status is initialized
    it('should init _renter status (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterStatus = await chainboardContract
        .connect(_renter)
        .getRenterStatus(_renter.address, { from: _renter.address });

      expect(testRenterStatus.canRent).to.be.true;
      expect(testRenterStatus.isRenting).to.be.false;
    });

    // Check if renter level is initialized
    it('should init _renter level (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterLevel = await chainboardContract
        .connect(_renter)
        .getLevel(_renter.address, { from: _renter.address });

      expect(testRenterLevel).to.be.equal('beginner');
    });

    // Check if renter snowboard size is initialized
    it('should init _renter snowboard size (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterSnowboardSize = await chainboardContract
        .connect(_renter)
        .getSize(_renter.address, { from: _renter.address });

      expect(testRenterSnowboardSize).to.be.equal(142);
    });

    // Check if renter due is initialized
    it('should init _renter due at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterDue = await chainboardContract
        .connect(_renter)
        .getDue(_renter.address, { from: _renter.address });

      expect(testRenterDue).to.be.equal(0);
    });

    // Check if renter start time is initialized
    it('should init _renter start at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterStart = await chainboardContract
        .connect(_renter)
        .getStart(_renter.address, { from: _renter.address });

      expect(testRenterStart).to.be.equal(0);
    });

    // Check if renter end time is initialized
    it('should init _renter end at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterEnd = await chainboardContract
        .connect(_renter)
        .getEnd(_renter.address, { from: _renter.address });

      expect(testRenterEnd).to.be.equal(0);
    });
  });

  describe('\n✨ CONTEXT: Test checkOut\n', async () => {
    // Check if renter status is updated
    it('should update _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Get updated renter status
      const testRenterStatus = await chainboardContract
        .connect(_renter)
        .getRenterStatus(_renter.address, { from: _renter.address });

      expect(testRenterStatus.canRent).to.be.false;
      expect(testRenterStatus.isRenting).to.be.true;
    });

    // Check if renter level is updated
    it('should update _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'expert', 142, { from: _renter.address });

      // Get updated renter level
      const testRenterLevel = await chainboardContract
        .connect(_renter)
        .getLevel(_renter.address, { from: _renter.address });

      expect(testRenterLevel).to.be.equal('expert');
    });

    // Check if renter snowboard size is updated
    it('should update _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 160, { from: _renter.address });

      // Get updated renter level
      const testRenterSnowboardSize = await chainboardContract
        .connect(_renter)
        .getSize(_renter.address, { from: _renter.address });

      expect(testRenterSnowboardSize).to.be.equal(160);
    });

    // Check if renter start is updated
    it('should update _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Get updated renter level
      const testRenterStart = await chainboardContract
        .connect(_renter)
        .getStart(_renter.address, { from: _renter.address });
      const latestBlockTimeStamp = (await ethers.provider.getBlock('latest')).timestamp;

      expect(testRenterStart).to.be.equal(latestBlockTimeStamp);
    });
  });

  describe('\n✨ CONTEXT: Test getActualDuration\n', async () => {
    // Return the actual duration in minutes
    it('should get _renter actual duration (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Get _renter start
      const renterStart = Number(
        await chainboardContract.connect(_renter).getStart(_renter.address, { from: _renter.address }),
      );

      // Get latest block
      const latestBlockTimeStamp = (await ethers.provider.getBlock('latest')).timestamp;

      // Get actual duration in minutes
      const durationInSeconds = latestBlockTimeStamp - renterStart;
      let durationInMinutes;
      // Minimum duration is 60 seconds
      if (durationInSeconds >= 60) {
        durationInMinutes = durationInSeconds / 60;
      } else {
        durationInMinutes = 1;
      }

      // Get actual renting duration
      const testActualDuration = await chainboardContract
        .connect(_renter)
        .getActualDuration(_renter.address, { from: _renter.address });

      expect(testActualDuration).to.be.equal(durationInMinutes);
    });
  });

  describe('\n✨ CONTEXT: Test checkIn\n', async () => {
    // Check if renter status is updated
    it('should set _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter status
      const testRenterStatus = await chainboardContract
        .connect(_renter)
        .getRenterStatus(_renter.address, { from: _renter.address });

      expect(testRenterStatus.isRenting).to.be.false;
    });

    // Check if renter end is updated
    it('should set _renter end (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter end
      const testRenterEnd = await chainboardContract
        .connect(_renter)
        .getEnd(_renter.address, { from: _renter.address });
      const latestBlockTimeStamp = (await ethers.provider.getBlock('latest')).timestamp;

      expect(testRenterEnd).to.be.equal(latestBlockTimeStamp);
    });

    // Check if renter due is updated (1 minute)
    it("should set _renter's due (POV renter - duration 1 minute)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter's due
      const testRenterDue = await chainboardContract
        .connect(_renter)
        .getDue(_renter.address, { from: _renter.address });

      expect(testRenterDue).to.be.equal(snowboardPrice);
    });

    // Check if renter due is updated (2 minutes)
    it("should set _renter's due (POV renter - duration 2 minutes)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Change time so renting is equal to 2 minutes (8 blocks of 15 seconds)
      await helpers.mine(8, { interval: 15 });

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter's due
      const testRenterDue = await chainboardContract
        .connect(_renter)
        .getDue(_renter.address, { from: _renter.address });

      expect(testRenterDue).to.be.equal(snowboardPrice);
    });
  });

  describe('\n✨ CONTEXT: Test makePayment\n', async () => {
    it("should update _renter's balance (POV renter)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address, { from: _renter.address });

      // Get _renter's balance before payment
      const renterBalanceBeforePayment = await _renter.getBalance();

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      // Get _renter's balance after payment
      const renterBalanceAfterPayment = await _renter.getBalance();

      // _renter balance must be less to balance - due (because of tx fees)
      await expect(renterBalanceAfterPayment).to.be.lt(renterBalanceBeforePayment.sub(due));
    });

    it("should update _owner's balance (POV owner)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address, { from: _renter.address });

      // Get _owner's balance before payment
      const ownerBalanceBeforePayment = await _owner.getBalance();

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      // Get _owner's balance after payment
      const ownerBalanceAfterPayment = await _owner.getBalance();

      // _owner balance must be equal to balance + _renter's due
      await expect(ownerBalanceAfterPayment).to.be.equal(ownerBalanceBeforePayment.add(due));
    });

    // Check if renter status is updated
    it('should update _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address, { from: _renter.address });

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      // Get updated renter status
      const testRenterStatus = await chainboardContract
        .connect(_renter)
        .getRenterStatus(_renter.address, { from: _renter.address });

      expect(testRenterStatus.canRent).to.be.true;
    });

    // Check if renter due is updated
    it('should update _renter due at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address, { from: _renter.address });

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      const testRenterDue = await chainboardContract
        .connect(_renter)
        .getDue(_renter.address, { from: _renter.address });

      expect(testRenterDue).to.be.equal(0);
    });

    // Check if renter start time is updated
    it('should update _renter start at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address, { from: _renter.address });

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      const testRenterStart = await chainboardContract
        .connect(_renter)
        .getStart(_renter.address, { from: _renter.address });

      expect(testRenterStart).to.be.equal(0);
    });

    // Check if renter end time is updated
    it('should update _renter end at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142, { from: _renter.address });

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice, { from: _renter.address });

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address, { from: _renter.address });

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      const testRenterEnd = await chainboardContract
        .connect(_renter)
        .getEnd(_renter.address, { from: _renter.address });

      expect(testRenterEnd).to.be.equal(0);
    });
  });
});
