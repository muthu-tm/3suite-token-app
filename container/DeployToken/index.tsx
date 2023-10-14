import React, { useState, useEffect, useContext } from "react";
import { HiSquares2X2 } from "react-icons/hi2";
import { BsLink45Deg } from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdContentCopy } from "react-icons/md";
import { IconContext } from "react-icons";
import { switchBlockchain } from "../../utils/web3-utils";
import { web3GlobalContext } from "../../context/global-context";
import { deployToken } from "../../services/web3-token-services";
import { Modal } from "antd";
import { getEllipsisTxt } from "../../utils/formatter";
import copy from "copy-to-clipboard";
import config from "../../config";
import { AddCustomToken } from "../../services/addCustomToken";
import { ConnectWallet, useAddress, useChain } from "@thirdweb-dev/react";
import { images } from "../../assets/image";
let factoryContractAdd: any;
let chainId: any;

function DeployToken() {
  const walletAddress = useAddress();
  const chain: any = useChain();
  console.log("chainID", Number(chain?.chainId));
  console.log("chain", chain);
  const [radioOption, setRadioOption] = useState<any>();
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [supply, setSupply] = useState();
  const [decimals, setDecimals] = useState();
  const [tnxHash, setTnxHash] = useState<any>();
  const [modal1Open, setModal1Open] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [tnkAddress, setTokenAddr] = useState();
  const [mintFunction, setMintFunction] = useState(false);
  const [burnFunction, setBurnFunction] = useState(false);
  const [pauseFunction, setPauseFunction] = useState(false);

  const { setChainGlobal, web3Obj }: any = useContext(web3GlobalContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const blockchainFeed = [
    {
      id: 1,
      ChainName: "Georli",
      symbol: "ETH",
      image: images.Eth.src,
      chainId: 5,
    },
    {
      id: 2,
      ChainName: "Sepolia",
      symbol: "ETH",
      image: images.Eth.src,
      chainId: 11155111,
    },
    {
      id: 3,
      ChainName: "Mumbai",
      symbol: "MATIC",
      image: images.Matic.src,
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
      image: images.Avax.src,
      chainId: 43113,
    },
  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 2000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1100 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1100, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const onChainChange = async (e: any) => {
    console.log("chainValue", Number(e.target.value));
    setRadioOption(Number(e.target.value));
    await switchBlockchain(Number(e.target.value));
    setChainGlobal(Number(e.target.value));
    localStorage.setItem("netId", e.target.value);
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
      if (name && symbol && supply) {
        let deployRes = await deployToken(
          name,
          symbol,
          supply,
          decimals ? decimals : Number(18),
          mintFunction,
          burnFunction,
          pauseFunction
        );
        console.log("deploy Token Res: ", deployRes);
        if (deployRes && deployRes.transactionHash) {
          console.log(
            "Successfully created an ERC20: ",
            deployRes.events.TokenDeployed.returnValues.tokenAddress
          );
          setTnxHash(deployRes.transactionHash);
          setTokenAddr(
            deployRes.events.TokenDeployed.returnValues.tokenAddress
          );
          setLoadingText(false);
        } else {
          console.log("Failed to create an ERC20 Token!");
        }
      } else {
        return;
      }
      setLoadingText(false);
      // setModal1Open(false);
    } catch (error) {
      console.log(error);
      setModal1Open(false);
    }
  };


  const lookupSearch = () => {
    if (Number(chain?.chainId) === Number(11155111)) {
      window.open(config.sepolia.scan.concat(tnxHash), "_blank");
    } else if (Number(chain?.chainId) === Number(5)) {
      window.open(config.georli.scan.concat(tnxHash), "_blank");
    } else if (Number(chain?.chainId) === Number(80001)) {
      window.open(config.mumbai.scan.concat(tnxHash), "_blank");
    } else if (Number(chain?.chainId) === Number(97)) {
      window.open(config.bsc.scan.concat(tnxHash), "_blank");
    } else if (Number(chain?.chainId) === Number(43113)) {
      window.open(config.fuji.scan.concat(tnxHash), "_blank");
    }
  };

  const closeModal = async () => {
    setModal1Open(false);
    window.location.reload();
  };

  return (
    <div className="deploy-sec">
      <div className="mint-cont">
        <div className="Heading">Create Token - Testnet</div>
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
                <HiSquares2X2 />
              </div>
            </IconContext.Provider>
            <div className="sub-head">Select Blockchain</div>
          </div>
          <div className="desc">
            Choose the blockchain that you want to create your token on.
          </div>
          <div className="bc-compartment">
            {blockchainFeed?.map((item, index) => {
              return (
                <div className="single-card" data-aos="fade-down" data-aos-duration="800">
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
                        Number(chain?.chainId) === Number(item.chainId)
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="token-data" >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContext.Provider
              value={{
                size: "1.2em",
                color: "rgb(139 149 169)",
                className: "global-class-name",
              }}
            >
              <div style={{ marginRight: 8 }}>
                <BsLink45Deg />
              </div>
            </IconContext.Provider>
            <div className="sub-head">Token Information</div>
          </div>
          <div className="desc">
            Please provide the following information to create your token
          </div>
          <div style={{ marginTop: 24 }} >
            <div className="tk-label">Token Name *</div>
            <input
              placeholder="3Suite Token"
              className="token-input"
              onChange={(e: any) => setName(e.target.value)}
              
            />
          </div>
          <div style={{ marginTop: 15 }}>
            <div className="tk-label"> Symbol *</div>
            <input
              placeholder="SUITE"
              className="token-input"
              onChange={(e: any) => setSymbol(e.target.value)}
            />
          </div>
          <div style={{ marginTop: 15 }}>
            <div className="tk-label"> Total Supply *</div>
            <input
              placeholder="1000"
              className="token-input"
              onChange={(e: any) => setSupply(e.target.value)}
            />
          </div>
          <div style={{ marginTop: 15 }}>
            <div className="tk-label"> Decimals</div>
            <input
              placeholder="18"
              className="token-input"
              onChange={(e: any) => setDecimals(e.target.value)}
            />
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
              marginBottom: 15,
            }}
          >
            <div className="tk-label"> Contract Configiration</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                className="checkbox"
                checked={mintFunction ? true : false}
                onClick={() => {
                  setMintFunction(!mintFunction);
                  setBurnFunction(false);
                  setPauseFunction(false);
                }}
              />
              <div
                className="tk-label"
                style={{ paddingBottom: 0, paddingLeft: 8 }}
              >
                {" "}
                Mint Function
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                className="checkbox"
                checked={burnFunction ? true : false}
                onClick={() => {
                  setMintFunction(false);
                  setBurnFunction(!burnFunction);
                  setPauseFunction(false);
                }}
              />
              <div
                className="tk-label"
                style={{ paddingBottom: 0, paddingLeft: 8 }}
              >
                {" "}
                Burn Function
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                className="checkbox"
                checked={pauseFunction ? true : false}
                onClick={() => {
                  setMintFunction(false);
                  setBurnFunction(false);
                  setPauseFunction(!pauseFunction);
                }}
              />
              <div
                className="tk-label"
                style={{ paddingBottom: 0, paddingLeft: 8 }}
              >
                {" "}
                Pause Function
              </div>
            </div>
          </div>
          <div style={{ marginTop: 15 }}>
            <div className="tk-label"> Owner Address</div>
            <input
              placeholder="eg: '0x72bCE2654500B89FC7876b1973636Ab116Da7C8A'"
              className="token-input"
              value={walletAddress}
            />
          </div>
          {name && symbol && supply ? (
            <button className="deploy-cta" onClick={onDeployClick}>
              Deploy Token
            </button>
          ) : (
            <button className="deploy-cta-gray">Deploy Token</button>
          )}
        </div>
      </div>
      <Modal
        className="popup-modal"
        title={loadingText ? "MINTING" : "TOKEN MINTED"}
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={closeModal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {loadingText ? (
          <div className="load">
            <img src={images.LoadingGif.src} alt="" className="loadingGif" />
            <div className="loadingText">Minting your Token</div>
          </div>
        ) : (
          <>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 20 }}
            >
              <div className="m-head">Transaction Hash :</div>
              <div className="m-desc" id="tx-hash">
                {getEllipsisTxt(tnxHash, 15)}
              </div>
              <IconContext.Provider
                value={{
                  size: "1.2em",
                  color: "#fff",
                  className: "global-class-name",
                }}
              >
                <div
                  style={{ marginLeft: 8, marginTop: 5, cursor: "pointer" }}
                  className="copy-icon"
                  onClick={() => {
                    // copyToClipboard();
                  }}
                >
                  <MdContentCopy />
                </div>
              </IconContext.Provider>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
              <div className="m-head">Token Address :</div>
              <div className="m-desc">{getEllipsisTxt(tnkAddress, 9)}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <div className="m-head">View in Explorer: </div>
              {Number(chain?.chainId) === Number(11155111) ? (
                <div
                  className="m-desc cursor"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={lookupSearch}
                >
                  {config.sepolia.scan}.{getEllipsisTxt(tnxHash, 5)}
                </div>
              ) : (
                <>
                  {Number(chain?.chainId) === Number(5) ? (
                    <div
                      className="m-desc cursor"
                      style={{ textDecoration: "underline" }}
                      onClick={lookupSearch}
                    >
                      {config.georli.scan}.{getEllipsisTxt(tnxHash, 5)}
                    </div>
                  ) : (
                    <>
                      {Number(chain?.chainId) === Number(80001) ? (
                        <div
                          className="m-desc cursor"
                          style={{ textDecoration: "underline" }}
                          onClick={lookupSearch}
                        >
                          {config.mumbai.scan}.{getEllipsisTxt(tnxHash, 5)}
                        </div>
                      ) : (
                        <>
                          {Number(chain?.chainId) === Number(97) ? (
                            <div
                              className="m-desc cursor"
                              style={{ textDecoration: "underline" }}
                              onClick={lookupSearch}
                            >
                              {config.bsc.scan}.{getEllipsisTxt(tnxHash, 5)}
                            </div>
                          ) : (
                            <>
                              {Number(chain?.chainId) === Number(43113) ? (
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

            <button
              className="deploy-cta"
              onClick={() =>
                AddCustomToken(
                  tnkAddress,
                  symbol ? symbol : "TKN",
                  decimals ? decimals : Number(18),
                  "",
                  web3Obj
                )
              }
            >
              {" "}
              Add to Metamask
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

export default DeployToken;
