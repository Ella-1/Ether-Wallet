import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { vars } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
        url: vars.get("SEPOLIA_API_URL"),
        accounts: [vars.get("PRIVATE_KEY")],
        chainId: Number(vars.get("SEPOLIA_CHAIN_ID")),
    },

},

etherscan: {
  apiKey: {
    sepolia: 'F1QYMFAQPITGC1T2EJ9ABEQ9F7P8F2MTX4'
  }
}
};

export default config;
