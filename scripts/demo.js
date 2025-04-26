const { ethers } = require("hardhat");

async function main() {
    console.log("📦 Deploying MemoryCardGame contract...");

    const cardTypes = [1, 2, 1, 2]; // for demonstration — two pairs
    const MemoryCardGameFactory = await ethers.getContractFactory("MemoryCardGame");
    const memoryCardGame = await MemoryCardGameFactory.deploy(cardTypes);
    await memoryCardGame.waitForDeployment();

    console.log(`✅ Contract deployed at: ${memoryCardGame.target}`);

    const [deployer, player] = await ethers.getSigners();

    console.log("\n🎴 Initial Card Types:");
    for (let i = 0; i < cardTypes.length; i++) {
        const type = await memoryCardGame.cardTypes(i);
        console.log(`Card ${i}: Type ${type}`);
    }

    console.log("\n👥 Deployer flipping two matching cards (positions 0 and 2)...");
    let tx = await memoryCardGame.flipCards(0, 2);
    await tx.wait();

    let score = await memoryCardGame.getScore(deployer.address);
    console.log(`Deployer Score: ${score.toString()}`);

    console.log("\n👥 Player flipping two different cards (positions 1 and 3)...");

    tx = await memoryCardGame.connect(player).flipCards(1, 3);
    await tx.wait();

    let playerScore = await memoryCardGame.getScore(player.address);
    console.log(`Player Score: ${playerScore.toString()}`);

    console.log("\n✅ Final Matched State:");
    for (let i = 0; i < cardTypes.length; i++) {
        const matched = await memoryCardGame.isMatched(i);
        console.log(`Card ${i}: Matched - ${matched}`);
    }

    console.log("\n🎉 Demonstration complete.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Error in demonstration script:", error);
        process.exit(1);
    });
