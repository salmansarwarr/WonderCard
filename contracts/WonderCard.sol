// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract MemoryCardGame {
    address public owner;
    uint8 public totalCards = 4;

    mapping(uint8 => uint8) public cardTypes; // cardPosition => type (like 1,2,3,4)
    mapping(uint8 => bool) public matchedCards; // cardPosition => isMatched
    mapping(address => uint) public playerScores;

    event CardRevealed(address player, uint8 pos, uint8 cardType);
    event MatchFound(address player, uint8 pos1, uint8 pos2);
    event NoMatch(address player, uint8 pos1, uint8 pos2);

    constructor(uint8[] memory _cardTypes) {
        require(_cardTypes.length == totalCards, "Invalid card set");
        owner = msg.sender;

        for (uint8 i = 0; i < totalCards; i++) {
            cardTypes[i] = _cardTypes[i];
        }
    }

    function flipCards(uint8 pos1, uint8 pos2) public {
        require(pos1 != pos2, "Cannot flip same card");
        require(!matchedCards[pos1] && !matchedCards[pos2], "Card already matched");

        uint8 type1 = cardTypes[pos1];
        uint8 type2 = cardTypes[pos2];

        emit CardRevealed(msg.sender, pos1, type1);
        emit CardRevealed(msg.sender, pos2, type2);

        if (type1 == type2) {
            matchedCards[pos1] = true;
            matchedCards[pos2] = true;
            playerScores[msg.sender] += 1;
            emit MatchFound(msg.sender, pos1, pos2);
        } else {
            emit NoMatch(msg.sender, pos1, pos2);
        }
    }

    function getScore(address player) public view returns (uint) {
        return playerScores[player];
    }

    function isMatched(uint8 pos) public view returns (bool) {
        return matchedCards[pos];
    }
}
