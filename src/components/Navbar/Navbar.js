import React, { useState, useEffect, useContext } from "react";
import "./navbar.css";
import LogoImage from "../../assets/Images/logoSuite2.png";
import { Modal } from "antd";
import copy from "copy-to-clipboard";
import Metamask from "../../assets/Images/metamask.png";
import TrustWallet from "../../assets/Images/trustwallet.png";
import { MdContentCopy } from "react-icons/md";
import { IconContext } from "react-icons";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { web3GlobalContext } from "../../context/global-context";
import getLinker from "../../utils/deepLink";
import mobileCheck from "../../utils/mobileCheck";
import { getEllipsisTxt } from "../../utils/formatter";
import { switchBlockchain } from "../../utils/web3-utils";
import config from "../../config";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const {
    setProvider,
    setWeb3Obj,
    setChainGlobal,
    setWalletAddress,
    chainGlobal,
  } = useContext(web3GlobalContext);
  const navigate = useNavigate()

  const walletType = localStorage.getItem("wallet_type");
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [web3Modal, setWeb3Modal] = useState(null);

  const PublicAddr = localStorage.getItem("walletAddress");

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          appName: "GODL gold",
          rpc: {
            137: "https://polygon-mainnet.infura.io/v3/d5fe74da0f8643f4983f966a06561fc4",
          },
        },
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      disableInjectedProvider: true,
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
  }, []);
  const copyToClipboard = () => {
    document.getElementById("wallet-address").style.color = "#3fa45a";
    document.getElementById("wallet-address").style.fontWeight = 600;
    setTimeout(() => {
      document.getElementById("wallet-address").style.color = "#fff";
      document.getElementById("wallet-address").style.fontWeight = 400;
    }, 250);

    copy(PublicAddr);
  };
  const metamaskHandler = async () => {
    const yourWebUrl = window.location.href; // Replace with your website domain
    const deepLink = `https://metamask.app.link/dapp/${yourWebUrl}`;
    const downloadMetamaskUrl = "https://metamask.io/download.html";

    if (window.ethereum) {
      await connectMetamask();
    } else if (mobileCheck()) {
      const linker = getLinker(downloadMetamaskUrl);
      linker.openURL(deepLink);
    } else {
      alert("Please Install Metamask!!!");
    }
  };

  const connectMetamask = async () => {
    try {
      setProvider(window.ethereum);
      setWeb3Obj(new Web3(window.ethereum));
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      setChainGlobal(networkId);
      localStorage.setItem("netId", networkId);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const publicAddress = Web3.utils.toChecksumAddress(accounts[0]);
      localStorage.setItem("walletAddress", publicAddress);
      setWalletAddress(publicAddress);
      localStorage.setItem("wallet_type", "metamask");
      setModal2Open(false);
      if (Number(networkId) != Number(config.defaultNetwork)) {
        switchBlockchainLogic(config.defaultNetwork);
      }
    } catch (e) {
      console.error(e);
      return;
    }
  };
  const connectWallet = async () => {
    try {
      // setWalletType("trustwallet")
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      setWeb3Obj(web3);
      setProvider(provider);
      const network = await web3.eth.getChainId();
      localStorage.setItem("netId", network);
      setChainGlobal(network);
      const accounts = await web3.eth.getAccounts();
      localStorage.setItem("wallet_type", "trustwallet");
      if (accounts) {
        const publicAddress = Web3.utils.toChecksumAddress(accounts[0]);
        localStorage.setItem("walletAddress", publicAddress);
        setWalletAddress(publicAddress);
      }

      setModal2Open(false);
      if (Number(network) != Number(config.defaultNetwork)) {
        switchBlockchainLogic(config.defaultNetwork);
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const diconnectWallet = async () => {
    localStorage.clear();
    setModal1Open(false);
    setWeb3Obj("");
    setWalletAddress(null);
  };

  const switchBlockchainLogic = async () => {
    try {
      await switchBlockchain(config.defaultNetwork);
      setChainGlobal(config.defaultNetwork);
    } catch (error) {
      console.log("Error in switchBlockchainLogic", error);
      return false;
    }
  };
  return (
    <div className="nav-cont">
      <div onClick={()=>navigate("/")}> 
      <img src={LogoImage} alt="" className="l-img" />
      </div>
{    window.location.pathname == "/token-deploy" ? <>
</> :
      <ul>
        <Link activeClass="active" to="home" spy={true} smooth={true}>
          <li>Home</li>
        </Link>
        <Link to="product" spy={true} smooth={true}>
          <li>Products</li>
        </Link>
        {/* <Link to="about" spy={true} smooth={true}>
          <li>About</li>
        </Link> */}
        <Link to="newsletter" spy={true} smooth={true}>
          <li>Newsletter</li>
        </Link>
      </ul>}

      {PublicAddr ? (
        <button className="connect-cta" onClick={() => setModal1Open(true)}>
          {getEllipsisTxt(PublicAddr, 9)}
        </button>
      ) : (
        <button className="connect-cta" onClick={() => setModal2Open(true)}>
          Connect wallet
        </button>
      )}
      <Modal
        className="popup-modal"
        title="Connect your wallet"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div style={{ margin: "50px auto 25px" }} className="cnt-wlt">
          <div>
            <img
              src={Metamask}
              alt=""
              className="w-icon"
              onClick={metamaskHandler}
            />
            <div style={{ color: "#fff", textAlign: "center" }}>Metamask</div>
          </div>
          <div>
            <img
              src={TrustWallet}
              alt=""
              className="w-icon"
              onClick={connectWallet}
            />
            <div style={{ color: "#fff", textAlign: "center" }}>
              TrustWallet
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        className="popup-modal"
        title=""
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div
          style={{
            margin: "30px auto 25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="gradient-popup-text">
            {walletType === "metamask" && "Connected with Metamask"}
            {walletType === "trustwallet" && "Connected with Trustwallet"}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 15 }}>
            {walletType === "metamask" && (
              <img
                src={Metamask}
                alt=""
                style={{ width: 35, height: 35, marginRight: 15 }}
              />
            )}
            {walletType === "trustwallet" && (
              <img
                src={TrustWallet}
                alt=""
                style={{ width: 35, height: 35, marginRight: 15 }}
              />
            )}
            <div
              id="wallet-address"
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 16,
                marginRight: 10,
                letterSpacing: 1,
              }}
            >
              {getEllipsisTxt(PublicAddr, 10)}
            </div>

            <IconContext.Provider
              value={{
                size: "1.4em",
                color: "gray",
                className: "global-class-name",
              }}
            >
              <div
                style={{ marginLeft: 8, marginTop: 10, cursor: "pointer" }}
                className="copy-icon"
                onClick={() => {
                  copyToClipboard();
                }}
              >
                <MdContentCopy />
              </div>
            </IconContext.Provider>
          </div>
          <button className="disconnect-btn" onClick={diconnectWallet}>
            Disconnect
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
