require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    devnet: {
      url: process.env.NEON_PROXY_RPC_URL || "https://devnet.neonevm.org/sol",
      accounts: [process.env.PRIVATE_KEY_SOLANA],
      chainId: 245022926,
    },
    mainnet: {
      url: process.env.NEON_PROXY_RPC_URL || "https://neon-proxy-mainnet.solana.p2p.org/sol",
      accounts: [process.env.PRIVATE_KEY_SOLANA],
      chainId: 245022934,
    }
  },
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com"
  }
};
