const { expect } = require('chai');
const hre = require('hardhat');

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
      await expect(testRenterExists).to.be.true;
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
      await expect(testRenterStatus.canRent).to.be.true;
      await expect(testRenterStatus.isRenting).to.be.false;
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
      await expect(testRenterLevel).to.be.equal('beginner');
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
      await expect(testRenterSnowboardSize).to.be.equal(142);
    });

    // Check if renter due is initialized
    it('should init _renter due at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterSnowboardSize = await chainboardContract
        .connect(_renter)
        .getDue(_renter.address, { from: _renter.address });
      await expect(testRenterSnowboardSize).to.be.equal(0);
    });

    // Check if renter start time is is initialized
    it('should init _renter start at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterSnowboardSize = await chainboardContract
        .connect(_renter)
        .getStart(_renter.address, { from: _renter.address });
      await expect(testRenterSnowboardSize).to.be.equal(0);
    });

    // Check if renter end time is is initialized
    it('should init _renter end at 0 (POV _renter)', async () => {
      // Add _renter as a renter
      await chainboardContract.connect(_renter).addRenter(_renter.address, true, false, 'beginner', 142, 0, 0, 0, {
        from: _renter.address,
      });

      const testRenterSnowboardSize = await chainboardContract
        .connect(_renter)
        .getEnd(_renter.address, { from: _renter.address });
      await expect(testRenterSnowboardSize).to.be.equal(0);
    });
  });
});
