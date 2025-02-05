import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EtherModule = buildModule("EtherWallet", (m) => {
    const EtherWallet = m.contract("EtherWallet");

    return {EtherWallet};
});

module.exports = EtherModule;