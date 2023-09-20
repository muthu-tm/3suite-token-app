import React, { useContext, useEffect, useState } from "react";
import "./multisender.css";
import { SiHiveBlockchain } from "react-icons/si";
import { BiWallet } from "react-icons/bi";
import { BsFiletypeCsv } from "react-icons/bs";
import { TbLockAccess } from "react-icons/tb";
import { IconContext } from "react-icons";
import { switchBlockchain } from "../../utils/web3-utils";
import { web3GlobalContext } from "../../context/global-context";
import Eth from "../../assets/Images/ethereum.svg";
import Matic from "../../assets/Images/polygon.svg";
import Avax from "../../assets/Images/avax.svg";
import { Modal } from "antd";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import {
  getTokenBalance,
  getTokenInfo,
  increaseERC20Allowance,
} from "../../services/web3-token-services";
import {
  convertToChecksum,
  convertWeiToEth,
} from "../../services/web3-services";
import DotGif from "../../assets/Images/dot-loading.gif";
import loadingGif from "../../assets/Images/loading-green-loading.gif";
import Web3 from "web3";
import config from "../../config";
let total_amount = Number(0);
let total_senders = 0;
let TokenSymbol = "";
const code = `0xC4f4Bc698c3090A5aBC23dfCBc50227C25895E9a,1
0xC4f4Bc698c3090A5aBC23dfCBc50227C25895E9a,0.5
0xC4f4Bc698c3090A5aBC23dfCBc50227C25895E9a,0.9
  `;

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

function Multisender() {
  const [radioOption, setRadioOption] = useState();
  const [tokenAddress, setTokenAddress] = useState();
  const [codeValue, setCodeValue] = useState(code);
  const [tokenBalance, setTokenBalance] = useState();
  const [textValue, setTextValue] = useState("");
  const [showBalance, setShowBalance] = useState("1");
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const handleChange = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      const file = e.target.result;
      console.log(file);
      setCodeValue(file);
    };

    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
  };

  const { setChainGlobal, walletAddress, web3Obj } =
    useContext(web3GlobalContext);

  const chainId = localStorage.getItem("netId");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, []);

  const getCustomBalance = async (tokenAddress) => {
    try {
      setBalanceLoading(true);
      let checksumTknAddr = await convertToChecksum(tokenAddress);
      let resToken = await getTokenBalance(checksumTknAddr, walletAddress);
      // let balanceArray = [resToken];
      // let BalanceInEth = await convertWeiToEth(balanceArray);
      console.log("resToken: ", resToken)
      const getDecimal = await getTokenInfo(tokenAddress);
      TokenSymbol = getDecimal[1];
      console.log("TokenSymbol: ", TokenSymbol)
      console.log("decimal: ", getDecimal[0])
      if (resToken > 0) {
        resToken = resToken / 10 ** getDecimal[0];
      }

      //0xC9Eb793f245CF94350de58D752a9d7f3AbC2aE40
      console.log("resToken: ", resToken)
      setTokenBalance(resToken);
      setBalanceLoading(false);
    } catch (err) {
      console.log("error", err);
      return;
    }
  };

  const nativeTokenBalance = async (walletAddress) => {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [walletAddress, "latest"],
    });
    const balanceArray = [balance];
    let BalanceInEth = await convertWeiToEth(balanceArray);
    setTokenBalance(BalanceInEth);
  };

  useEffect(() => {
    if (chainId && walletAddress) {
      nativeTokenBalance(walletAddress);
    }
  }, [chainId]);

  useEffect(() => {
    if (walletAddress && tokenAddress) {
      getCustomBalance(tokenAddress);
    }
  }, [tokenAddress]);

  const blockchainFeed = [
    {
      id: 1,
      ChainName: "Georli",
      symbol: "ETH",
      image: `${Eth}`,
      chainId: 5,
    },
    {
      id: 2,
      ChainName: "Sepolia",
      symbol: "ETH",
      image: `${Eth}`,
      chainId: 1115511,
    },
    {
      id: 3,
      ChainName: "Mumbai",
      symbol: "MATIC",
      image: `${Matic}`,
      chainId: 80001,
    },
    // {
    //   id: 4,
    //   ChainName: "BSC testnet",
    //   symbol: "BSC",
    //   image: `${Bsc}`,
    //   chainId: 97,
    // },
    {
      id: 5,
      ChainName: "Fuji C chain",
      symbol: "AVAX",
      image: `${Avax}`,
      chainId: 43113,
    },
  ];
  const onChainChange = async (e) => {
    console.log("chainValue", Number(e.target.value));
    setRadioOption(Number(e.target.value));
    await switchBlockchain(Number(e.target.value));
    setChainGlobal(Number(e.target.value));
    localStorage.setItem("netId", e.target.value);
  };

  useEffect(() => {
    if (Number(chainId) === Number(1115511)) {
      TokenSymbol = "Sepolia";
    } else if (Number(chainId) === Number(5)) {
      TokenSymbol = "Georli";
    } else if (Number(chainId) === Number(80001)) {
      TokenSymbol = "Mumbai";
    } else if (Number(chainId) === Number(97)) {
      TokenSymbol = "Sepolia";
    } else if (Number(chainId) === Number(43113)) {
      TokenSymbol = "fujiScan";
    }
  }, [chainId]);

  const onMultiSend = async () => {
    try {
      let senders = code.split("\n");
      for (let index = 0; index < senders.length; index++) {
        const sender = senders[index];
        let value = sender.split(",");
        if (!Web3.utils.isAddress(value[0])) {
          if (value[1] > 0) {
            total_amount += Number(value[1]);
            total_senders++;
          }
        }

      }
    } catch (err) {
      if (err.code === 4001) {
      }
      console.log("err in for loop", err);
      return;
    }
  };

  const onDeployClick = async () => {
    try {
      setLoadingText(true);
      setModal1Open(true);
      let data = {
        name: name,
        symbol: symbol,
        supply: Number(supply),
        decimals: Number(decimals),
      };
      console.log(data);
      
      if (tokenAddress) {
        let res = await  increaseERC20Allowance(tokenAddress, config.mumbai.airdrop, total_amount)
        console.log("deploy Token Res: ", res);
      }
      // if (name && symbol && supply) {
      //   let deployRes = await deployToken(
      //     name,
      //     symbol,
      //     supply,
      //     decimals ? decimals : Number(18),
      //     mintFunction,
      //     burnFunction,
      //     pauseFunction
      //   );
      //   console.log("deploy Token Res: ", deployRes);
      //   if (deployRes && deployRes.transactionHash) {
      //     console.log(
      //       "Successfully created an ERC20: ",
      //       deployRes.events.TokenDeployed.returnValues.tokenAddress
      //     );
      //     setTnxHash(deployRes.transactionHash);
      //     setTokenAddr(
      //       deployRes.events.TokenDeployed.returnValues.tokenAddress
      //     );
      //     setLoadingText(false);
      //   } else {
      //     console.log("Failed to create an ERC20 Token!");
      //   }
      // } else {
      //   return;
      // }
      setLoadingText(false);
      setModal1Open(false);
    } catch (error) {
      console.log(error);
      setModal1Open(false);
    }
  };

  return (
    <div className="ms-sec">
      <div className="Heading">3Suite Token - Multisender</div>
      <div className="select-bc">
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconContext.Provider
            value={{
              size: "1.2em",
              color: "rgb(139 149 169)",
              className: "global-class-name",
            }}
          >
            <div style={{ marginRight: 8 }}>
              <SiHiveBlockchain />
            </div>
          </IconContext.Provider>
          <div className="sub-head">Select Chain</div>
        </div>
        <div className="desc">
          Choose the blockchain that you want to create your token on.
        </div>
        <div className="bc-compartment">
          {blockchainFeed?.map((item, index) => {
            return (
              <div className="single-card">
                <div className="bc-data">
                  <img
                    src={item.image}
                    alt="blochain chain"
                    className="bc-img"
                  />
                  <div>
                    <div className="bc-name">{item.ChainName}</div>
                    <div className="bc-symbol">{item.symbol}</div>
                  </div>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    id={item.chainId}
                    name={item.ChainName}
                    value={item.chainId}
                    className="radio-btn"
                    onChange={(e) => {
                      onChainChange(e);
                    }}
                    checked={
                      Number(chainId) === Number(item.chainId) ? true : false
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="tkn-addr">
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <IconContext.Provider
            value={{
              size: "1.2em",
              color: "rgb(139 149 169)",
              className: "global-class-name",
            }}
          >
            <div style={{ marginRight: 8 }}>
              <BiWallet />
            </div>
          </IconContext.Provider>
          <div className="sub-head">Wallet Address</div>
        </div>
        <input
          placeholder={walletAddress ? "" : " Please connect your wallet "}
          className="token-input-ms"
          value={walletAddress}
        />
      </div>
      <div className="tkn-sec">
        <div className="tkn-addr">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <IconContext.Provider
                value={{
                  size: "1.2em",
                  color: "rgb(139 149 169)",
                  className: "global-class-name",
                }}
              >
                <div style={{ marginRight: 8 }}>
                  <TbLockAccess />
                </div>
              </IconContext.Provider>
              <div className="sub-head">Token Address</div>
            </div>
            {tokenBalance && (
              <div className="sub-head">
                {/* Balance:{balanceLoading ? <span><img src={DotGif} alt="" className="dot-gif" /></span> :<span>{Number(tokenBalance).toFixed(7)}</span>  } */}
                Balance : {Number(tokenBalance).toFixed(4)}
              </div>
            )}
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                className="checkbox"
                checked={showBalance === "1" ? true : false}
                onChange={() => setShowBalance("1")}
              />
              <div
                className="tk-label"
                style={{ paddingBottom: 0, paddingLeft: 8 }}
              >
                {" "}
                Native Token
              </div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginLeft: 35 }}
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={showBalance === "2" ? true : false}
                onChange={() => setShowBalance("2")}
              />
              <div
                className="tk-label"
                style={{ paddingBottom: 0, paddingLeft: 8 }}
              >
                {" "}
                Custom Token
              </div>
            </div>
          </div>

          {showBalance === "2" ? (
            <div className="tkn-field" style={{ marginTop: 20 }}>
              <input
                placeholder="Please enter the token address"
                className="token-input-ms"
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="tkn-addr">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 25,
          }}
        >
          <IconContext.Provider
            value={{
              size: "1.2em",
              color: "rgb(139 149 169)",
              className: "global-class-name",
            }}
          >
            <div style={{ marginRight: 8 }}>
              <BsFiletypeCsv />
            </div>
          </IconContext.Provider>
          <div className="sub-head">List of Addresses in CSV</div>
        </div>
        <Editor
          value={codeValue}
          onValueChange={(code) => setCodeValue(code)}
          highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
          padding={10}
          textareaId="codeArea"
          className="editor"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            outline: 0,
            width: "99%",
          }}
        />
        <div className="csv-button">
          Upload CSV
          <input
            type="file"
            name="input"
            onChange={handleChange}
            className="csv-opac"
          />
        </div>

      </div>
      {walletAddress ? (
        <button className="deploy-cta" onClick={onMultiSend}>
          Continue
        </button>
      ) : (
        <button className="deploy-cta-gray">Continue</button>
      )}
      <Modal
        className="popup-modal"
        title={"MultiSender Detail"}
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div style={{ marginTop: 20 }} />
        {loadingText ? (
          <div className="load">
            <img src={loadingGif} alt="" className="loadingGif" />
            <div className="loadingText">Sending your Token</div>
          </div>
        ) : (
          <>
            <div className="m-head" style={{ paddingBottom: 8 }}>
              Total no.of Sender: {total_senders}
            </div>
            <div className="m-head" style={{ paddingBottom: 8 }}>
              Token Sending: {TokenSymbol}
            </div>
            <div className="m-head" style={{ paddingBottom: 8 }}>
              Total no.of Token: {total_amount}
            </div>
            <button
              className="deploy-cta"
              style={{ margin: "15px 0 8px" }}
              onClick={onDeployClick}
            >
              Approve
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Multisender;
