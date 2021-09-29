module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const OpenSkyDAOTickets = await deploy("OpenSkyDAOTickets", {
    from: deployer,
    args: ["OpenSkyDAO Tickets", "OSDT"],
    log: true,
  });

  console.log("OpenSkyDAOTickets deployed: ", OpenSkyDAOTickets.address);
  
  const openSkyDAOTickets = await ethers.getContract("OpenSkyDAOTickets", deployer);
  const PREDICATE_ROLE = await openSkyDAOTickets.PREDICATE_ROLE();
  await openSkyDAOTickets.grantRole(PREDICATE_ROLE, "0x56E14C4C1748a818a5564D33cF774c59EB3eDF59");
};

module.exports.tags = ['RootChain'];
