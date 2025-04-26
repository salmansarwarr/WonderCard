// require("@nomiclabs/hardhat-waffle");
require("hardhat-abi-exporter");
require("hardhat-contract-sizer");
require("dotenv").config();
require("hardhat-gas-reporter");
require("hardhat-deploy");

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-chai-matchers");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
let _optimizer = {
    // Toggles whether the optimizer is on or off.
    // It's good to keep it off for development
    // and turn on for when getting ready to launch.
    enabled: true,
    // The number of runs specifies roughly how often
    // the deployed code will be executed across the
    // life-time of the contract.
    runs: 400,
};

module.exports = {
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API || "",
    },
    solidity: {
        compilers: [
            {
                version: "0.8.29",
                settings: {
                    optimizer: _optimizer,
                },
            }
        ],
    },

    networks: {
        hardhat: {
            chainId: 1337,
        },
    },

    abiExporter: {
        path: "../frontend/src/contracts/ABIs",
        runOnCompile: true,
        clear: true,
        only: [":HorseNFT$"],
        flat: true,
        spacing: 2,
        pretty: true,
    },
    mocha: {
        timeout: 100000000,
    },
    gasReporter: {
        outputFile: "gas-report.txt",
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
        noColors: true,
        coinmarketcap: process.env.COIN_MARKETCAP_API_KEY || "",
        token: "ETH",
    },
};
