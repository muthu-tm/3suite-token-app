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
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { getTokenBalance } from "../../services/web3-token-services";
import { convertWeiToEth } from "../../services/web3-services";

const code = `//0xC4f4Bc698c3090A5aBC23dfCBc502296425895E9a,1
//0x72bCE2654500B99FC7876b1973636Ab116Da7C8A,0.5
//0x440641eABcA767D9274791F8CBF5D337e42e1091,0.9



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
      const resToken = await getTokenBalance(tokenAddress, walletAddress);

      console.log("resToken", resToken);
      setTokenBalance(resToken);
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
const onMultiSend = async() =>{
  try{

  }catch(err){
    if (err.code === 4001) {
    }
    console.log("err",err)
    return
  }
}
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
                    onChange={(e) => onChainChange(e)}
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
                Balance: {Number(tokenBalance).toFixed(5)}
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
        <button className="deploy-cta" onClick={onMultiSend}>Continue</button>
      ) : (
        <button className="deploy-cta-gray">Continue</button>
      )}
    </div>
  );
}

export default Multisender;
