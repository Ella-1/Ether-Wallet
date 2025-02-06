"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { sepolia } from 'wagmi/chains'

const Navbar = () => {
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  const handleConnectWallet = async () => {
    try {
      await connectAsync({ connector: metaMask(), chainId: sepolia.id });
      console.log("Wallet connected:", address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  // Function to get first 4 and last 4 characters of the address
  const getShortAddress = (address: string | undefined) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    disconnect();
    console.log("Wallet disconnected");
  };

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with Circular Border */}
        <Link href="/" className="text-2xl font-bold">
          <div className="rounded-full hover:border-gray-400 transition-colors duration-200">
            Bata
          </div>
        </Link>

        {/* Connect Wallet Button or Wallet Info */}
        <div className="flex items-center space-x-4">
          {!isConnected ? (
            <button
              onClick={handleConnectWallet}
              className="rounded-full border-2 border-white p-2 hover:border-gray-400 transition-colors duration-200"
            >
              Connect Wallet
            </button>
          ) : (
            <>
              {/* Show wallet address only on medium and larger screens */}
              <div className="hidden md:block text-sm">
                {getShortAddress(address)} {/* Display first and last 4 chars */}
              </div>
              
              {/* Show balance and disconnect button on all screens */}
              <div className="text-sm">
                Balance: ${Number(balance?.formatted).toFixed(2)} {balance?.symbol} {/* Display balance */}
              </div>
              <button
                onClick={handleDisconnect}
                className="rounded-full border-2 border-white p-2 hover:border-gray-400 transition-colors duration-200"
              >
                Disconnect
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Separator Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
    </nav>
  );
};

export default Navbar;
