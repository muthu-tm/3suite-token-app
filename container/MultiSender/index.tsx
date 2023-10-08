import React, { useContext, useEffect, useState } from "react";
import "./multisender.css";
import { SiHiveBlockchain } from "react-icons/si";
import { BiWallet, BiError } from "react-icons/bi";
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
import Web3 from "web3";
import config from "../../config";
import { AirdropERC20Token } from "../../services/web3-airdrop-services";
import { getEllipsisTxt } from "../../utils/formatter";
import { useAddress } from "@thirdweb-dev/react";
import { images } from "../../assets/image";
// let total_amount = Number(0);
let airdropContractAdd:any;
let TokenSymbol:any = "";

const code = ``;

const hightlightWithLineNumbers = (input: string, language: any) =>
  highlight(input, language)
    .split("\n")
    .map((line: any, i: number) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

function Multisender() {
  const walletAddress = useAddress()
  const [radioOption, setRadioOption] = useState<any>();
  const [tokenAddress, setTokenAddress] = useState();
  const [codeValue, setCodeValue] = useState(code);
  const [tokenBalance, setTokenBalance] = useState<any>();
  const [textValue, setTextValue] = useState("");
  const [showBalance, setShowBalance] = useState("1");
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [loadingText, setLoadingText] = useState<any>();
  const [totalAmount, setTotalAmount] = useState(0);
  const [toAddressArray, setToAddressArray] = useState([]);
  const [amountArray, setAmountArray] = useState([]);
  const [tnxHash, setTnxHash] = useState<any>();
  const [totalSenders, setTotalSenders] = useState(0);
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e:any) => {
      const file = e.target.result;
      console.log(file);
      setCodeValue(file);
    };

    reader.onerror = (e:any) => alert(e.target.error.name);
    reader.readAsText(file);
  };

  const { setChainGlobal, web3Obj }:any =
    useContext(web3GlobalContext);

  const chainId = localStorage.getItem("netId");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, []);

  const getCustomBalance = async (tokenAddress: never) => {
    try {
      setBalanceLoading(true);
      let checksumTknAddr = await convertToChecksum(tokenAddress);
      let resToken = await getTokenBalance(checksumTknAddr);
      // let balanceArray = [resToken];
      // let BalanceInEth = await convertWeiToEth(balanceArray);
      console.log("resToken: ", resToken);
      const getDecimal = await getTokenInfo(tokenAddress);
      TokenSymbol = getDecimal[1];
      console.log("TokenSymbol: ", TokenSymbol);
      console.log("decimal: ", getDecimal[0]);
      if (resToken > 0) {
        resToken = resToken / 10 ** getDecimal[0];
      }

      //0xC9Eb793f245CF94350de58D752a9d7f3AbC2aE40
      console.log("resToken: ", resToken);
      setTokenBalance(resToken);
      setBalanceLoading(false);
    } catch (err) {
      console.log("error", err);
      return;
    }
  };

  const nativeTokenBalance = async (walletAddress: any) => {
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
      chainId: 11155111,
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
  const onChainChange = async (e: any) => {
    console.log("chainValue", Number(e.target.value));
    setRadioOption(Number(e.target.value));
    await switchBlockchain(Number(e.target.value));
    setChainGlobal(Number(e.target.value));
    localStorage.setItem("netId", e.target.value);
  };

  useEffect(() => {
    if (Number(chainId) === Number(11155111)) {
      TokenSymbol = "Sepolia";
      airdropContractAdd = config.sepolia.airdrop;
    } else if (Number(chainId) === Number(5)) {
      TokenSymbol = "Georli";
      airdropContractAdd = config.georli.airdrop;
    } else if (Number(chainId) === Number(80001)) {
      TokenSymbol = "Mumbai";
      airdropContractAdd = config.mumbai.airdrop;
    } else if (Number(chainId) === Number(97)) {
      TokenSymbol = "BSC";
      airdropContractAdd = config.bsc.airdrop;
    } else if (Number(chainId) === Number(43113)) {
      TokenSymbol = "fujiScan";
      airdropContractAdd = config.fuji.airdrop;
    }
  }, [chainId]);




  const onMultiSend = async () => {
    try {
      console.log("code value", codeValue);
      let total_amount:any = 0;
      let amount_array:any= [];
      let toAddress_array:any = [];
      let total_senders:any = 0;
      let senders:any = codeValue.split("\n");
      for (let index = 0; index < senders.length; index++) {
        const sender = senders[index];
        let value:any = sender.split(",");

        if (Web3.utils.isAddress(value[0])) {
          console.log("ADDR");

          toAddress_array.push(value[0]);

          console.log("toAddress_array", toAddress_array);

          amount_array.push(value[1]);

          console.log("amount_array", amount_array);

          if (value[1] > 0) {
            console.log("value[1]", value[1]);

            total_amount += Number(value[1]);

            total_senders++;
          }
        }
      }
      setTotalSenders(total_senders);
      setToAddressArray(toAddress_array);
      setAmountArray(amount_array);
      setTotalAmount(total_amount);

      setModal1Open(true);
      setLoadingText("none");
    } catch (err:any) {
      if (err.code === 4001) {
      }
      console.log("err in for loop", err);
      return;
    }
  };

  const onDeployClick = async () => {
    try {
      setLoadingText("loading");
      if (tokenAddress) {
        let res = await increaseERC20Allowance(
          tokenAddress,
         airdropContractAdd,
          totalAmount
        );
        console.log("deploy Token Res: ", res);
        let airdropRes = await AirdropERC20Token(
          tokenAddress,
          toAddressArray,
          amountArray
        );
        console.log("Airdrop Token Res: ", airdropRes);
        if (airdropRes.status) {
          setLoadingText("success");
          setTnxHash(airdropRes.transactionHash);
        }
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
    } catch (error) {
      console.log(error);
      setLoadingText("error");
      return;
    }
  };
  const lookupSearch = () => {
    if (Number(chainId) === Number(11155111)) {
      window.open(config.sepolia.scan.concat(tnxHash), "_blank");
    } else if (Number(chainId) === Number(5)) {
      window.open(config.georli.scan.concat(tnxHash), "_blank");
    } else if (Number(chainId) === Number(80001)) {
      window.open(config.mumbai.scan.concat(tnxHash), "_blank");
    } else if (Number(chainId) === Number(97)) {
      window.open(config.bsc.scan.concat(tnxHash), "_blank");
    } else if (Number(chainId) === Number(43113)) {
      window.open(config.fuji.scan.concat(tnxHash), "_blank");
    }
  };
  const closeModal = () =>{
    setModal1Open(false)
    window.location.reload();
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
                onChange={(e:any) => setTokenAddress(e.target.value)}
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
        onCancel={closeModal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div style={{ marginTop: 20 }} />
        {loadingText == "loading" && (
          <div className="load">
            <img src={images.LoadingGif.src} alt="" className="loadingGif" />
            <div className="loadingText">Sending your Token</div>
          </div>
        )}
        {loadingText == "none" && (
          <>
            <div className="m-head" style={{ paddingBottom: 8 }}>
              Total no.of Sender: {totalSenders}
            </div>
            <div className="m-head" style={{ paddingBottom: 8 }}>
              Token Sending: {TokenSymbol}
            </div>
            <div className="m-head" style={{ paddingBottom: 8 }}>
              Total no.of Token: {totalAmount}
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
        {loadingText == "success" && (
          <>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
              <div className="m-head">Transaction Hash:</div>
              <div className="m-desc">{getEllipsisTxt(tnxHash, 15)} </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <div className="m-head" style={{ paddingBottom: 5 }}>
                View inExplorer:{" "}
              </div>
              {Number(chainId) === Number(11155111) ? (
                <div
                  className="m-desc cursor"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={lookupSearch}
                >
                  {config.sepolia.scan}.{getEllipsisTxt(tnxHash, 5)}
                </div>
              ) : (
                <>
                  {Number(chainId) === Number(5) ? (
                    <div
                      className="m-desc cursor"
                      style={{ textDecoration: "underline" }}
                      onClick={lookupSearch}
                    >
                      {config.georli.scan}.{getEllipsisTxt(tnxHash, 5)}
                    </div>
                  ) : (
                    <>
                      {Number(chainId) === Number(80001) ? (
                        <div
                          className="m-desc cursor"
                          style={{ textDecoration: "underline" }}
                          onClick={lookupSearch}
                        >
                          {config.mumbai.scan}.{getEllipsisTxt(tnxHash, 5)}
                        </div>
                      ) : (
                        <>
                          {Number(chainId) === Number(97) ? (
                            <div
                              className="m-desc cursor"
                              style={{ textDecoration: "underline" }}
                              onClick={lookupSearch}
                            >
                              {config.bsc.scan}.{getEllipsisTxt(tnxHash, 5)}
                            </div>
                          ) : (
                            <>
                              {Number(chainId) === Number(43113) ? (
                                <div
                                  className="m-desc cursor"
                                  style={{ textDecoration: "underline" }}
                                  onClick={lookupSearch}
                                >
                                  {config.fuji.scan}.
                                  {getEllipsisTxt(tnxHash, 5)}
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
        {loadingText == "error" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconContext.Provider
              value={{
                size: "4em",
                color: "tomato",
                className: "global-class-name",
              }}
            >
              <div style={{ marginBottom: 8, marginTop: 15 }}>
                <BiError />
              </div>
            </IconContext.Provider>
            <div
              className="m-head"
              style={{ paddingBottom: 15, color: "#fff", textAlign: "center" }}
            >
              Error while sending the token. Please check the values entered and
              Try again !
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Multisender;
