require("dotenv").config();

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const OpenSkyDAOChildTickets = await deploy("OpenSkyDAOChildTickets", {
    from: deployer,
    args: ["OpenSkyDAO Tickets", "OSDT", process.env.CHILD_CHAIN_MANAGER],
    log: true,
  });

  console.log("OpenSkyDAOChildTickets deployed: ", OpenSkyDAOChildTickets.address);

  const openSkyDAOChildTickets = await ethers.getContract("OpenSkyDAOChildTickets", deployer);
  const MINTER_ROLE = await openSkyDAOChildTickets.MINTER_ROLE();
  await openSkyDAOChildTickets.grantRole(MINTER_ROLE, process.env.MINTER);
};

module.exports.tags = ['ChildChain'];
