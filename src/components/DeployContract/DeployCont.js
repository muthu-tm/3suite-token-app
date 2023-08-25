import React,{useState,useEffect, useContext} from "react";
import "./deploy.css";
import Eth from "../../assets/Images/ethereum.svg";
import Matic from "../../assets/Images/polygon.svg";
import Bsc from "../../assets/Images/binance.svg";
import Avax from "../../assets/Images/avax.svg";
import { HiSquares2X2 } from "react-icons/hi2";
// import { GoArrowUpRight } from "react-icons/go";
import { BsLink45Deg } from "react-icons/bs";
import { IconContext } from "react-icons";
import Codenz from "../../assets/Images/Codenz.png";
import Suite from "../../assets/Images/3suite.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import Crypit from "../../assets/Images/crypit.png"
import config from "../../config";
import { switchBlockchain } from "../../utils/web3-utils";
import { web3GlobalContext } from "../../context/global-context";

function DeployContract() {
  const [radioOption,setRadioOption] = useState()
  const  {setChainGlobal} = useContext(web3GlobalContext)
const chainId = localStorage.getItem("netId")
  const blockchainFeed = [
    {
      id: 1,
      ChainName: "Georli",
      symbol: "ETH",
      image: `${Eth}`,
      chainId:5,
    },
    {
      id: 2,
      ChainName: "Sepolia",
      symbol: "ETH",
      image: `${Eth}`,
      chainId:1115511,
    },
    {
      id: 3,
      ChainName: "Mumbai",
      symbol: "MATIC",
      image: `${Matic}`,
      chainId:80001,
    },
    {
      id: 4,
      ChainName: "BSC testnet",
      symbol: "BSC",
      image: `${Bsc}`,
      chainId:97,
    },
    {
      id: 5,
      ChainName: "Fuji C chain",
      symbol: "AVAX",
      image: `${Avax}`,
      chainId:43113,
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

  const onChainChange = async(e) =>{
    console.log("chainValue" , Number(e.target.value))
    setRadioOption(Number(e.target.value))  
      await switchBlockchain(Number(e.target.value));
      setChainGlobal(Number(e.target.value));
      localStorage.setItem("netId",e.target.value)

  }
  return (
    <div className="deploy-sec">
      {/* <div>Deploy Contract</div> */}
      <div className="right-sec">
        <div className="sub-head">Our Products</div>
        <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        autoPlayTimeout={100}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={100}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div className="Product">
          <div className="prod-head">Codenz</div>
          <div className="prod-desc">
            Explore an extraordinary collection of tokenized code creations that
            transcend mere functionality. From elegant algorithms to poetic
            scripts, our marketplace hosts a variety of code artifacts waiting
            to be appreciated as digital treasures.
          </div>
          <img src={Codenz} alt="" className="prod-img" />
          <button className="connect-cta" style={{marginBottom:10}}>
          <div style={{ display: "flex", alignItems: "center" }}>
          <div> Take me there </div>
            <IconContext.Provider
              value={{
                size: "1.2em",
                color: "#3fa45a",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft:5,marginTop:5 }}>
                {/* <GoArrowUpRight /> */}
              </div>
            </IconContext.Provider>
            </div>
           </button>
        </div>
        <div className="Product">
          <div className="prod-head">3Suite</div>
          <div className="prod-desc">
          Dive into a world of limitless imagination, where every digital
              creation becomes a masterpiece. Our curated collection features a
              diverse array of NFTs, from mesmerizing digital artwork to
              captivating virtual experiences.
          </div>
          <img src={Suite} alt="" className="prod-img" />
          <button className="connect-cta" style={{marginBottom:10}} >
          <div style={{ display: "flex", alignItems: "center" }}>
          <div> Take me there </div>
            <IconContext.Provider
              value={{
                size: "1.2em",
                color: "#3fa45a",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft:5,marginTop:5 }}>
                {/* <GoArrowUpRight /> */}
              </div>
            </IconContext.Provider>
            </div>
           </button>
        </div>
        <div className="Product">
          <div className="prod-head">CrypIT</div>
          <div className="prod-desc">
          CrypIT is an unified crypto super app built to make the web3
              journey of everyday people safe, simple and hassle free. CrypIT
              aims to bridge the gap between traditional fiat and crypto
              currency.
          </div>
          <img src={Crypit} alt="" className="prod-img" />
          <button className="connect-cta" style={{marginBottom:10}}>
          <div style={{ display: "flex", alignItems: "center" }}>
          <div> Take me there </div>
            <IconContext.Provider
              value={{
                size: "1.2em",
                color: "#3fa45a",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft:5,marginTop:5 }}>
                {/* <GoArrowUpRight /> */}
              </div>
            </IconContext.Provider>
            </div>
           </button>
        </div>
        </Carousel>
      </div>
      <div className="left-sec">
        <div className="Heading">Create Token</div>
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
                      onChange={(e)=>onChainChange(e)}
                      checked = {Number(chainId) === Number(item.chainId) ? true : false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="token-data">
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
          <div style={{ marginTop: 24 }}>
            <div className="tk-label">Token Name</div>
            <input placeholder="eg: 'Sample Token'" className="token-input" />
          </div>
          <div style={{ marginTop: 15 }}>
            <div className="tk-label"> Symbol</div>
            <input placeholder="eg: 'STKN'" className="token-input" />
          </div>
          <div style={{ marginTop: 15 }}>
            <div className="tk-label"> Total Supply</div>
            <input placeholder="eg: '20,000'" className="token-input" />
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
              <input type="checkbox" className="checkbox" />
              <div
                className="tk-label"
                style={{ paddingBottom: 0, paddingLeft: 8 }}
              >
                {" "}
                Mint Function
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" className="checkbox" />
              <div
                className="tk-label"
                style={{ paddingBottom: 0, paddingLeft: 8 }}
              >
                {" "}
                Burn Function
              </div>
            </div>
          </div>
          <div style={{ marginTop: 15 }}>
            <div className="tk-label"> Owner Address</div>
            <input
              placeholder="eg: '0x72bCE2654500B89FC7876b1973636Ab116Da7C8A'"
              className="token-input"
            />
          </div>
          <button className="deploy-cta">Deploy</button>
        </div>
      </div>
      
    </div>
  );
}

export default DeployContract;
