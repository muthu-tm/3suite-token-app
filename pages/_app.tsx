import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import Layout from "../app-components/layout";
import "../styles/navbar.css"
import "../styles/Footer.css";
import "../styles/home.css";
import "../styles/Activity.css";
import "../styles/deploy.css";
import "../styles/feature.css";
import "../styles/multisender.css";
import "../styles/newsletter.css";
import "../styles/ToggleSwitch.css";
import "../styles/product.css";
import "../styles/globalStyles.css";

import { Web3Global } from "../context/global-context";
import React from "react";



export default function App({ Component, pageProps }:any) {
  return (
    <Web3Global>
      <ThirdwebProvider
        clientId="d974fd84e15a8fb6456c8c94112b56da"
        supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
        activeChain="mumbai"
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThirdwebProvider>
    </Web3Global>
  );
}
