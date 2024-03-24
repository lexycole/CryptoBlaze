/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Slider from "./Components/Slider/Slider2";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { getPhantomWallet, getSolflareWallet, getSolletWallet, getMathWallet, getLedgerWallet } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import { useMemo } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import "@solana/wallet-adapter-react-ui/styles.css";
import Admin from "./screens/admin/Admin";

function App() {
  // mainnet
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => "https://convincing-wild-borough.solana-mainnet.quiknode.pro/387e6bc5581d8d3828e3ef7e658e6f44cc97a1ba/", [network]);
  // devnet
  // const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl("devnet"), [network]);

  const wallets = useMemo(() => [getPhantomWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet(), getLedgerWallet()], []);

  return (
    <Router>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div className="backgound-custom">
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Banner />
                      <Slider />
                    </>
                  }
                />
                <Route path="/admin" element={<Admin />} />
              </Routes>
              <Footer />
            </div>
            <NotificationContainer />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  );
}

export default App;
