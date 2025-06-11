# Neon Dev Bootcamp – Week 5: Raydium Protocol Integration via Neon EVM

## 🌉 Cross-Chain DeFi Implementation

This project demonstrates seamless interaction with Solana's Raydium protocol directly from Solidity contracts using Neon EVM's composability features. I've successfully executed all core Raydium operations including pool creation, liquidity management, and token swaps.

## 🏆 Key Achievements

✅ **Created Raydium Pool**  

- Initialized CPMM pool with token pair (SOL/WrappedSOL)
- Pool ID: `0x3f9d43fa6d6b16c058f398537e85e324fb9131c3c45be40c3f4e92c87b48af91`
- Transaction: [`0x092f609b78686ce45499544633d8b91abc8684345df4ceb5d9feedc5a29c955c`](https://neon-devnet.blockscout.com/tx/0x092f609b78686ce45499544633d8b91abc8684345df4ceb5d9feedc5a29c955c)

✅ **Liquidity Management**  

- Added liquidity: 5M Token A + 2.5M Token B
- Withdrew liquidity successfully
- Transaction: [`0x3d1a38f07f0c84265b23244063ba5fec04f81cfcce30df5cabbeaf7d6e57ce75`](https://neon-devnet.blockscout.com/tx/0x3d1a38f07f0c84265b23244063ba5fec04f81cfcce30df5cabbeaf7d6e57ce75)

✅ **Advanced Features**  

- Locked LP positions as NFTs (with & without metadata)
- Collected swap fees after pool activity
- Transactions: [`0xf3f18b1ad8efa2e232099fecb3dc40445eeafa1427b65ffbb5b29a0a1b65bdff`](https://neon-devnet.blockscout.com/tx/0xf3f18b1ad8efa2e232099fecb3dc40445eeafa1427b65ffbb5b29a0a1b65bdff), [`0x96e6d4f1c0cd741393d3c214d0a7f6d95baa356b06ec1a63f36a637e535f34ff`](https://neon-devnet.blockscout.com/tx/0x96e6d4f1c0cd741393d3c214d0a7f6d95baa356b06ec1a63f36a637e535f34ff)

## 📊 Technical Implementation

### Contracts Deployed

**CallRaydiumProgram**: [`0xB58Eff11ff50BE1Ac294d3D61260Bb4b3A1Dd468`](https://neon-devnet.blockscout.com/address/0xB58Eff11ff50BE1Ac294d3D61260Bb4b3A1Dd468)

### Core Functions Tested

1. `createPoolInstruction` - Created new CPMM pool
2. `addLiquidityInstruction` - Provided initial liquidity
3. `withdrawLiquidityInstruction` - Removed liquidity
4. `lockLiquidityInstruction` - Converted LP to NFT
5. `collectFeesInstruction` - Harvested swap fees
6. `swapInputInstruction` - Fixed input swap
7. `swapOutputInstruction` - Fixed output swap

## 🔍 Key Learnings

1. **Architectural Differences**:
   - Raydium's stateless program model vs Uniswap's contract-based approach
   - Manual token account management on Solana vs Ethereum's automatic handling

2. **Optimization Techniques**:
   - Premade account arrays to reduce computation costs
   - Proper slippage handling for cross-chain swaps

3. **Composability Power**:
   - Full Raydium functionality accessible from Solidity
   - Unified interface for EVM and Solana operations

## 🛠 Project Setup

### Prerequisites

- Node.js v16+
- Hardhat environment
- Neon Devnet configuration
- Test NEON tokens from [faucet](https://neonfaucet.org)

### Clone the repository

   ```bash
   git clone https://github.com/codewithmide/NeonEVM-Bootcamp
   cd 04-SPLTokenProgramLibrary
   cp .env.example .env
   npm install
   ```

### Run Tests

```bash
npx hardhat test test/composability/raydium.test.js --network neondevnet
```

## Project Idea: "Time-Locked Yield NFTs"

### What It Does

- Lets users provide liquidity to a Raydium pool.
- Locks their LP tokens into NFTs.
- Prevents unlocking (withdrawal) until a fixed future time.
- Rewards users with higher swap fee shares the longer they lock.

### Why It's Unique

- Combines DeFi (Raydium liquidity) with NFTs (LP positions).
- Adds time-locking logic for incentives
- Works like a “DeFi savings bond” — users commit to staying in the pool for a period.

### How It Works (Step-by-Step)

- Create or Select a Pool
- You create or select an existing Raydium pool.
- User Adds Liquidity
- They use `addLiquidityInstruction`.
- Lock Liquidity with Metadata
- Use `lockLiquidityInstruction` to convert LP tokens into an NFT.
- Add metadata like:
  - `lock_until`: future timestamp
  - `initial_amount`
  - `bonus_rate`
- Prevent Premature Unlock
- Track NFT ID and lock time in your Solidity contract.

- Only allow `collectFeesInstruction` or `withdrawLiquidityInstruction` if `block.timestamp` >= `lock_until`.
- Collect Fees
- Users who wait can call `collectFeesInstruction` to claim their share of trading fees.
