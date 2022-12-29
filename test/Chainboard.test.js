const { expect } = require('chai');
const hre = require('hardhat');
const helpers = require('@nomicfoundation/hardhat-network-helpers');

describe('Testing Chainboard...', async () => {
  // Variables used through all tests
  let chainboardContract;
  let _owner;
  let _renter;
  let _notRenter;

  beforeEach(async () => {
    // Deploy contract and get signers
    const chainboard = await hre.ethers.getContractFactory('Chainboard');
    chainboardContract = await chainboard.deploy();
    await chainboardContract.deployed();
    [_owner, _renter, _notRenter] = await hre.ethers.getSigners();
  });

  describe('\n✨ CONTEXT: Test addRenter\n', async () => {
    // Check if renter exists
    it('should add _renter as a Renter (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterExists = await chainboardContract.connect(_renter).renterExists(_renter.address);

      expect(testRenterExists).to.be.true;
    });

    // Check if renter status is initialized
    it('should init _renter status (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterStatus = await chainboardContract.connect(_renter).getRenterStatus(_renter.address);

      expect(testRenterStatus.canRent).to.be.true;
      expect(testRenterStatus.isRenting).to.be.false;
    });

    // Check if renter level is initialized
    it('should init _renter level (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterLevel = await chainboardContract.connect(_renter).getLevel(_renter.address);

      expect(testRenterLevel).to.be.equal('beginner');
    });

    // Check if renter snowboard size is initialized
    it('should init _renter snowboard size (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterSnowboardSize = await chainboardContract.connect(_renter).getSize(_renter.address);

      expect(testRenterSnowboardSize).to.be.equal(142);
    });

    // Check if renter due is initialized
    it('should init _renter due at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterDue = await chainboardContract.connect(_renter).getDue(_renter.address);

      expect(testRenterDue).to.be.equal(0);
    });

    // Check if renter start time is initialized
    it('should init _renter start at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterStart = await chainboardContract.connect(_renter).getStart(_renter.address);

      expect(testRenterStart).to.be.equal(0);
    });

    // Check if renter end time is initialized
    it('should init _renter end at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterEnd = await chainboardContract.connect(_renter).getEnd(_renter.address);

      expect(testRenterEnd).to.be.equal(0);
    });

    // Try to add _renter twice
    it('should return: You already have an account. (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Add _renter as a renter a second time
      await expect(
        chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0),
      ).to.be.revertedWith('You already have an account.');
    });
  });

  describe('\n✨ CONTEXT: Test checkOut\n', async () => {
    // Check if renter status is updated
    it('should update _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Get updated renter status
      const testRenterStatus = await chainboardContract.connect(_renter).getRenterStatus(_renter.address);

      expect(testRenterStatus.canRent).to.be.false;
      expect(testRenterStatus.isRenting).to.be.true;
    });

    // Check if renter level is updated
    it('should update _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'expert', 142);

      // Get updated renter level
      const testRenterLevel = await chainboardContract.connect(_renter).getLevel(_renter.address);

      expect(testRenterLevel).to.be.equal('expert');
    });

    // Check if renter snowboard size is updated
    it('should update _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 160);

      // Get updated renter level
      const testRenterSnowboardSize = await chainboardContract.connect(_renter).getSize(_renter.address);

      expect(testRenterSnowboardSize).to.be.equal(160);
    });

    // Check if renter start is updated
    it('should update _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Get updated renter level
      const testRenterStart = await chainboardContract.connect(_renter).getStart(_renter.address);
      const latestBlockTimeStamp = (await ethers.provider.getBlock('latest')).timestamp;

      expect(testRenterStart).to.be.equal(latestBlockTimeStamp);
    });

    it('should revert: _notRenter try to checkOut on _renter (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Try to checkout a snowboard on another account
      await expect(
        chainboardContract.connect(_notRenter).checkOut(_renter.address, 'beginner', 142),
      ).to.be.revertedWith('You can only manage your account.');
    });

    it('should revert: _renter has a pending due (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard (setDue is called)
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Try to checkout a snowboard again
      await expect(chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142)).to.be.revertedWith(
        'You have a pending payment.',
      );
    });

    it("should revert: _renter can't rent (POV _renter)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Try to checkout a snowboard again
      await expect(chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142)).to.be.revertedWith(
        "You can't rent at this time.",
      );
    });
  });

  describe('\n✨ CONTEXT: Test getActualDuration\n', async () => {
    // Return the actual duration in minutes
    it('should get _renter actual duration (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Get _renter start
      const renterStart = Number(await chainboardContract.connect(_renter).getStart(_renter.address));

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
      const testActualDuration = await chainboardContract.connect(_renter).getActualDuration(_renter.address);

      expect(testActualDuration).to.be.equal(durationInMinutes);
    });

    it('should revert: _notRenter try to getActualDuration on _renter (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Try to checkin a snowboard on another account
      await expect(chainboardContract.connect(_notRenter).getActualDuration(_renter.address)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });

    it('should revert: _renter has not a snowboard (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Try to checkin without having checkout before
      await expect(chainboardContract.connect(_renter).getActualDuration(_renter.address)).to.be.revertedWith(
        "You don't have a snowboard.",
      );
    });
  });

  describe('\n✨ CONTEXT: Test checkIn\n', async () => {
    // Check if renter status is updated
    it('should set _renter status (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter status
      const testRenterStatus = await chainboardContract.connect(_renter).getRenterStatus(_renter.address);

      expect(testRenterStatus.isRenting).to.be.false;
    });

    // Check if renter end is updated
    it('should set _renter end (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter end
      const testRenterEnd = await chainboardContract.connect(_renter).getEnd(_renter.address);
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
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter's due
      const testRenterDue = await chainboardContract.connect(_renter).getDue(_renter.address);

      expect(testRenterDue).to.be.equal(snowboardPrice);
    });

    // Check if renter due is updated (2 minutes)
    it("should set _renter's due (POV renter - duration 2 minutes)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Change time so renting is equal to 2 minutes (8 blocks of 15 seconds)
      await helpers.mine(8, { interval: 15 });

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter's due
      const testRenterDue = await chainboardContract.connect(_renter).getDue(_renter.address);

      expect(testRenterDue).to.be.equal(snowboardPrice);
    });

    it('should revert: _notRenter try to checkIn on _renter (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Try to checkin a snowboard on another account
      await expect(chainboardContract.connect(_notRenter).checkIn(_renter.address, snowboardPrice)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });

    it('should revert: _renter has not a snowboard (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Try to checkin without having checkout before
      await expect(chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice)).to.be.revertedWith(
        "You don't have a snowboard.",
      );
    });
  });

  describe('\n✨ CONTEXT: Test getTotalDuration\n', async () => {
    it("should return _renter's totalDuration (POV renter)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get start time of renting
      const startTime = await chainboardContract.connect(_renter).getStart(_renter.address);

      // Get end time of renting
      const endTime = await chainboardContract.connect(_renter).getEnd(_renter.address);

      // Get total renting duration
      const testTotalDuration = await chainboardContract.connect(_renter).getTotalDuration(_renter.address);

      expect(testTotalDuration).to.be.equal(endTime - startTime);
    });

    it('revert: _notRenter checks totalDuration of _renter (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      await expect(chainboardContract.connect(_notRenter).getTotalDuration(_renter.address)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });

    it('revert: _renter still have a snowboard (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      await expect(chainboardContract.connect(_renter).getTotalDuration(_renter.address)).to.be.revertedWith(
        'You are still renting a snowboard.',
      );
    });

    it('revert: _renter does not have a snowboard (POV renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      await expect(chainboardContract.connect(_renter).getTotalDuration(_renter.address)).to.be.revertedWith(
        'You did not rent a snowboard.',
      );
    });
  });

  describe('\n✨ CONTEXT: Test makePayment\n', async () => {
    it("should update _renter's balance (POV renter)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address);

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
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address);

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
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address);

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      // Get updated renter status
      const testRenterStatus = await chainboardContract.connect(_renter).getRenterStatus(_renter.address);

      expect(testRenterStatus.canRent).to.be.true;
    });

    // Check if renter due is updated
    it('should update _renter due at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address);

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      const testRenterDue = await chainboardContract.connect(_renter).getDue(_renter.address);

      expect(testRenterDue).to.be.equal(0);
    });

    // Check if renter start time is updated
    it('should update _renter start at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address);

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      const testRenterStart = await chainboardContract.connect(_renter).getStart(_renter.address);

      expect(testRenterStart).to.be.equal(0);
    });

    // Check if renter end time is updated
    it('should update _renter end at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address);

      // _renter make payment
      await chainboardContract.connect(_renter).makePayment(_renter.address, { value: due });

      const testRenterEnd = await chainboardContract.connect(_renter).getEnd(_renter.address);

      expect(testRenterEnd).to.be.equal(0);
    });

    it('should revert: _notRenter try to makePayment for _renter (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address);

      // _notRenter try to make payment for _renter
      await expect(
        chainboardContract.connect(_notRenter).makePayment(_renter.address, { value: due }),
      ).to.be.revertedWith('You can only manage your account.');
    });

    it("should revert: _renter doesn't have a due (POV _renter)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Get updated renter's due
      const due = await chainboardContract.connect(_renter).getDue(_renter.address);

      // _renter try to make payment
      await expect(chainboardContract.connect(_renter).makePayment(_renter.address, { value: due })).to.be.revertedWith(
        "You don't have anything due at this time.",
      );
    });

    it("should revert: _renter doesn't set the correct amount (POV _notRenter)", async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      // Checkout a snowboard
      await chainboardContract.connect(_renter).checkOut(_renter.address, 'beginner', 142);

      // Price for a beginner snowboard is 0.012 BNB
      const snowboardPrice = ethers.utils.parseUnits((0.012).toString(), 'ether');

      // Checkin a snowboard
      await chainboardContract.connect(_renter).checkIn(_renter.address, snowboardPrice);

      // _notRenter try to make payment for _renter
      await expect(chainboardContract.connect(_renter).makePayment(_renter.address, { value: 0 })).to.be.revertedWith(
        "You don't set the correct amount (must be equal to your due).",
      );
    });
  });

  describe('\n✨ CONTEXT: Test getRenterStatus\n', async () => {
    // Check if renter status is initialized
    it('should init _renter status (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterStatus = await chainboardContract.connect(_renter).getRenterStatus(_renter.address);

      expect(testRenterStatus.canRent).to.be.true;
      expect(testRenterStatus.isRenting).to.be.false;
    });

    // Revert if sender is not a renter
    it('should revert (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      await expect(chainboardContract.connect(_notRenter).getRenterStatus(_renter.address)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });
  });

  describe('\n✨ CONTEXT: Test renterExists\n', async () => {
    // Check if renter status is initialized
    it('should init _renter status (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterExists = await chainboardContract.connect(_renter).renterExists(_renter.address);

      expect(testRenterExists).to.be.true;
    });

    // Revert if sender is not a renter
    it('should revert (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      await expect(chainboardContract.connect(_notRenter).renterExists(_renter.address)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });
  });

  describe('\n✨ CONTEXT: Test getLevel\n', async () => {
    // Check if renter status is initialized
    it('should init _renter status (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterLevel = await chainboardContract.connect(_renter).getLevel(_renter.address);

      expect(testRenterLevel).to.be.equal('beginner');
    });

    // Revert if sender is not a renter
    it('should revert (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      await expect(chainboardContract.connect(_notRenter).getLevel(_renter.address)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });
  });

  describe('\n✨ CONTEXT: Test getSize\n', async () => {
    it('should init _renter snowboard size (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterSnowboardSize = await chainboardContract.connect(_renter).getSize(_renter.address);

      expect(testRenterSnowboardSize).to.be.equal(142);
    });

    // Revert if sender is not a renter
    it('should revert (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      await expect(chainboardContract.connect(_notRenter).getSize(_renter.address)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });
  });

  describe('\n✨ CONTEXT: Test getStart\n', async () => {
    it('should init _renter start at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterStart = await chainboardContract.connect(_renter).getStart(_renter.address);

      expect(testRenterStart).to.be.equal(0);
    });

    // Revert if sender is not a renter
    it('should revert (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      await expect(chainboardContract.connect(_notRenter).getStart(_renter.address)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });
  });

  describe('\n✨ CONTEXT: Test getEnd\n', async () => {
    it('should init _renter end at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterEnd = await chainboardContract.connect(_renter).getEnd(_renter.address);

      expect(testRenterEnd).to.be.equal(0);
    });

    // Revert if sender is not a renter
    it('should revert (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      await expect(chainboardContract.connect(_notRenter).getEnd(_renter.address)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });
  });

  describe('\n✨ CONTEXT: Test getDue\n', async () => {
    it('should init _renter due at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      const testRenterDue = await chainboardContract.connect(_renter).getDue(_renter.address);

      expect(testRenterDue).to.be.equal(0);
    });

    // Revert if sender is not a renter
    it('should revert (POV _notRenter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0);

      await expect(chainboardContract.connect(_notRenter).getDue(_renter.address)).to.be.revertedWith(
        'You can only manage your account.',
      );
    });
  });
});
