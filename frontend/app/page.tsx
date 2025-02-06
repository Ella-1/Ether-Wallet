import Image from "next/image";
import Navbar from "./component/Navbar";
import EtherWalletComponent from "./component/Etherwallet";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <EtherWalletComponent />
    </div>
  );
}
