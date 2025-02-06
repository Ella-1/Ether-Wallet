"use client";
import React, { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { sepolia } from "wagmi/chains";
import { useWriteContract, useContractRead } from "wagmi";
import { parseUnits } from "ethers/lib/utils";

const contractAddress = "0xE8d109ADa650cf86463C0326cF71b7dD562dd70c";
const etherWalletABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]

const EtherWalletComponent: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const { writeContractAsync } = useWriteContract();

  // Get wallet balance
  const { data: walletBalance } = useContractRead({
    address: contractAddress,
    abi: etherWalletABI,
    functionName: "getBalance",
  });

  // Connect Wallet
  const handleConnectWallet = async () => {
    try {
      await connectAsync({ connector: metaMask(), chainId: sepolia.id });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  // Withdraw funds
  const handleWithdraw = async () => {
    if (!address || isLoading || !withdrawAmount) return;

    try {
      const weiAmount = parseUnits(withdrawAmount, "ether"); // Convert ETH to Wei

      setIsLoading(true);
      await writeContractAsync({
        functionName: "withdraw",
        args: [weiAmount], // Pass converted value
        abi: etherWalletABI,
        address: contractAddress,
      });

      console.log("Withdrawal successful");
    } catch (error) {
      console.error("Withdraw error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-sm mx-auto mt-10">
      {!isConnected ? (
        <button
          onClick={handleConnectWallet}
          className="rounded-full border-2 border-white p-2 hover:border-gray-400 transition-colors duration-200"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <div className="text-center text-2xl font-bold mb-4">
            <p>Balance: {walletBalance ? walletBalance.toString() : "Loading..."} wei</p>
          </div>

          {/* Withdraw Section */}
          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter amount (wei)"
              className="text-black p-2 w-full rounded-md"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <button
              onClick={handleWithdraw}
              className="mt-2 w-full rounded-full bg-red-500 hover:bg-red-600 text-white py-2 px-4"
              disabled={isLoading}
            >
              Withdraw
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EtherWalletComponent;
