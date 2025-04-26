# 🎴 Memory Card Game (Solidity + Hardhat)

A simple smart contract memory matching game where players flip two cards and score points for matches.

---

## 📦 Features

- Flip two cards per turn
- Earn points for matching pairs
- Track matched cards and scores on-chain
- Unit tests and demo script included

---

## 📂 Commands

**Install dependencies:**
```bash
npm install
```

**Compile contracts:**
```bash
npx hardhat compile
```

**Run tests:**
```bash
npx hardhat test
```

**Run demo:**
```bash
npx hardhat node
npx hardhat run scripts/demoMemoryCardGame.js --network localhost
```

---

## 📜 Example Output

```bash
Deployer Score: 1
Player Score: 1
Final Matched State:
Card 0: Matched - true
Card 1: Matched - true
...
```

---

## 📌 Notes

- Cards are initialized on deployment.
- For production, randomness should be verifiable (e.g. Chainlink VRF).

---

Clean and focused ✅ Would you like this as a markdown file too?