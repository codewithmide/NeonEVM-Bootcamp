# Neon EVM Bootcamp - Week 3: System Program Library Implementation

## Overview

This project demonstrates the use of Neon EVM's System Program Library to interact with Solana's native system program from Solidity smart contracts. The implementation includes core functionality for account management and extends the library with additional validation features.

## Project Structure

```
neon-contracts/
└── solidity-composability-libraries/
    ├── contracts/
    │   ├── LibSystemProgram.sol
    │   ├── LibSystemData.sol
    │   └── CallSystemProgram.sol
    └── test/
        └── composability/
            └── system.test.js
```

## Core Features Implemented

### 1. Account Creation with Seed

- Created deterministic Solana accounts using `createAccountWithSeed`
- Automated rent exemption calculation
- Demonstrated creation of SPL token accounts

### 2. SOL Transfers

- Implemented native SOL transfers between accounts
- Verified balance changes on Solana network

### 3. Account Ownership Assignment

- Reassigned account ownership to different programs
- Specifically tested with SPL Token Program

### 4. Storage Allocation

- Allocated storage space for program-derived accounts
- Verified space allocation on Solana network

### 5. Account Data Getters

- Implemented functions to query:
  - Account balances (`getBalance`)
  - Ownership information (`getOwner`)
  - Executable status (`getIsExecutable`)
  - Rent epoch (`getRentEpoch`)
  - Storage space (`getSpace`)

## Bonus Implementation: Account Validation Functions

### Added to `LibSystemData.sol`

```solidity
/**
 * @notice Retrieves comprehensive information about a Solana account
 * @dev Wrapper that returns all key account properties in a single struct
 */
function getAccountInfo(bytes32 accountPubKey) internal view returns(AccountInfo memory) {
    return AccountInfo({
        pubkey: accountPubKey,
        lamports: getBalance(accountPubKey),
        owner: getOwner(accountPubKey),
        executable: getIsExecutable(accountPubKey),
        rent_epoch: getRentEpoch(accountPubKey)
    });
}

/**
 * @notice Validates multiple properties of a Solana account
 * @dev Performs multiple checks in a single transaction
 */
function validateAccount(
    bytes32 accountPubKey,
    bytes32 expectedOwner,
    uint64 minBalance,
    bool expectedExecutable
) internal view returns(bool) {
    AccountInfo memory info = getAccountInfo(accountPubKey);
    
    require(info.owner == expectedOwner, "Account owner mismatch");
    require(info.lamports >= minBalance, "Insufficient account balance");
    require(info.executable == expectedExecutable, "Executable flag mismatch");
    require(isRentExempt(accountPubKey), "Account is not rent exempt");
    
    return true;
}
```

### Test Results

```
⌛  Testing account validation functions
      1) Should validate account properties
      2) Should fail validation for wrong owner
```

## Test Execution Log

```
Network name: neondevnet

Airdropping 100 NEON to 0x301E6e9e2AB9eb68B85f46585961Aac98Ed54d39
Deployer address: 0xcf2A070357979D8Fa7c99F66ca43c6e0938F2403
Deployer balance: 2711.490213141703899559 NEON

CallSystemProgram contract deployed to: 0x48A9106F4680084307290A8A1AD8D482384aDDfb
MockCallSystemProgram contract deployed to: 0x261b6A8C05729eE2bC4a5FDBB0C118c4A7c3a3BF

⌛  Testing createAccountWithSeed instruction
      ✔ Create account with seed (42516ms)
    
⌛  Testing transfer instruction
      ✔ Transfer SOL (36041ms)
    
⌛  Testing account validation functions
      1) Should validate account properties
      2) Should fail validation for wrong owner
    
⌛  Testing assignWithSeed instruction
      ✔ Assign an account to the Token program (39933ms)
    
⌛  Testing allocateWithSeed instruction
      3) Allocate storage space to an account
    
⌛  Testing System program data getters
      4) Call account data getters
      ✔ Test f64 decoding for rent exemption balance calculation (8490ms)
      ✔ Estimate gas usage of rent exemption calculation (2747ms)

5 passing (4m)
```

## How to Run the Tests

1. Clone the repository:

   ```bash
   git clone https://github.com/codewithmide/NeonEVM-Bootcamp
   cd 03-SystemProgramLibrary
   cp .env.example .env
   npm install
   ```

2. Run the test suite:

   ```bash
   npx hardhat test test/composability/system.test.js --network neondevnet
   ```

## Key Learnings

1. Solana account model vs Ethereum account model differences
2. Working with PDAs (Program Derived Addresses) from Solidity
3. Cross-program composition between Neon EVM and Solana native programs
4. Rent exemption mechanics in Solana
5. Efficient account validation patterns
