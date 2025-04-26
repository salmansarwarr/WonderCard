const { deployments, ethers } = require("hardhat");
const { expect } = require("chai");

describe("MemoryCardGame Contract Unit Tests", () => {
    let memoryCardGame;
    let deployer, user;

    beforeEach(async () => {
        [deployer, user] = await ethers.getSigners();

        const cardTypes = [1, 2, 1, 2]; // for 4 cards: two pairs
        await deployments.fixture(["MemoryCardGame"]);

        const MemoryCardGameFactory = await ethers.getContractFactory(
            "MemoryCardGame"
        );
        memoryCardGame = await MemoryCardGameFactory.deploy(cardTypes);
        await memoryCardGame.waitForDeployment();
    });

    it("should initialize card types correctly", async () => {
        expect(await memoryCardGame.cardTypes(0)).to.equal(1);
        expect(await memoryCardGame.cardTypes(1)).to.equal(2);
        expect(await memoryCardGame.cardTypes(2)).to.equal(1);
        expect(await memoryCardGame.cardTypes(3)).to.equal(2);
    });

    it("should flip two matching cards and increase player score", async () => {
        const pos1 = 0; // card type 1
        const pos2 = 2; // card type 1

        await expect(memoryCardGame.flipCards(pos1, pos2))
            .to.emit(memoryCardGame, "CardRevealed")
            .withArgs(deployer.address, pos1, 1)
            .and.to.emit(memoryCardGame, "CardRevealed")
            .withArgs(deployer.address, pos2, 1)
            .and.to.emit(memoryCardGame, "MatchFound")
            .withArgs(deployer.address, pos1, pos2);

        const score = await memoryCardGame.getScore(deployer.address);
        expect(score).to.equal(1);
    });

    it("should emit NoMatch event when flipped cards are different", async () => {
        const pos1 = 0; // type 1
        const pos2 = 1; // type 2

        await expect(memoryCardGame.flipCards(pos1, pos2))
            .to.emit(memoryCardGame, "NoMatch")
            .withArgs(deployer.address, pos1, pos2);

        const score = await memoryCardGame.getScore(deployer.address);
        expect(score).to.equal(0);
    });

    it("should not allow flipping the same card twice", async () => {
        await expect(memoryCardGame.flipCards(1, 1)).to.be.revertedWith(
            "Cannot flip same card"
        );
    });

    it("should not allow flipping a card that's already matched", async () => {
        // First, flip and match cards 0 and 2 (both type 1)
        await memoryCardGame.flipCards(0, 2);

        // Now, try flipping one of the matched cards again
        await expect(memoryCardGame.flipCards(0, 1)).to.be.revertedWith(
            "Card already matched"
        );
    });

    it("should track matched state correctly", async () => {
        // Before match
        expect(await memoryCardGame.isMatched(0)).to.equal(false);

        await memoryCardGame.flipCards(0, 2);

        // After match
        expect(await memoryCardGame.isMatched(0)).to.equal(true);
        expect(await memoryCardGame.isMatched(2)).to.equal(true);
    });
});
