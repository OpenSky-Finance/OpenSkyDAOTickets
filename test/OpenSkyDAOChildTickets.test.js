const { expect } = require("chai");

const DUMMY_URI = "ipfs://urlhere";

describe("OpenSkyDAOChildTickets", function () {
  before(async function () {
    this.OpenSkyDAOChildTickets = await ethers.getContractFactory("OpenSkyDAOChildTickets");
  });

  beforeEach(async function () {
    [this.minter, this.addrs1, this.addrs2, this.addrs3, ...this.addrs] = await ethers.getSigners();

    this.openSkyDAOChildTickets = await this.OpenSkyDAOChildTickets.deploy("OpenSkyDAO Tickets", "OSDT", "0xb5505a6d998549090530911180f38aC5130101c6");
    await this.openSkyDAOChildTickets.deployed();
    const MINTER_ROLE = await this.openSkyDAOChildTickets.MINTER_ROLE();
    await this.openSkyDAOChildTickets.grantRole(MINTER_ROLE, this.minter.address);
  });

  it("Should mint successfully", async function () {
    await expect(this.openSkyDAOChildTickets.mint(
      this.addrs1.address,
      1,
      DUMMY_URI))
      .to.emit(this.openSkyDAOChildTickets, "Transfer")
      .withArgs(ethers.constants.AddressZero, this.addrs1.address, 1);
  });

  it("Should mint failure, if token already minted", async function () {
    await this.openSkyDAOChildTickets.mint(
      this.addrs1.address,
      1,
      DUMMY_URI
    );
    await expect(this.openSkyDAOChildTickets.mint(
      this.addrs2.address,
      1,
      DUMMY_URI))
      .to.be.revertedWith("ERC721: token already minted");
  });

  it("Token owner should be able to burn token", async function () {
    await this.openSkyDAOChildTickets.mint(
      this.addrs1.address,
      1,
      DUMMY_URI
    );
    expect(await this.openSkyDAOChildTickets.balanceOf(this.addrs1.address)).to.equal(1);
    await this.openSkyDAOChildTickets.connect(this.addrs1).burn(1);
    expect(await this.openSkyDAOChildTickets.balanceOf(this.addrs1.address)).to.equal(0);
  });

  it("Only token owner should be able to burn token", async function () {
    await this.openSkyDAOChildTickets.mint(
      this.addrs1.address,
      1,
      DUMMY_URI
    );
    await expect(
      this.openSkyDAOChildTickets.burn(1))
      .to.be.revertedWith("ERC721Burnable: caller is not owner nor approved");
  });
});
