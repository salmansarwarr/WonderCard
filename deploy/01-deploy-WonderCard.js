const { network } = require("hardhat");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    
    await deploy("WonderCards", {
        from: deployer,
        to: null,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log("----------------------------");
};

module.exports.tags = ["all", "nft"];
