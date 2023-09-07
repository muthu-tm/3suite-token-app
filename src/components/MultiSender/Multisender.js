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
import Bsc from "../../assets/Images/binance.svg";
import Avax from "../../assets/Images/avax.svg";
import Select from "react-select";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

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
  const [selectedValue, setSelectedValue] = useState();
  const [codeValue, setCodeValue] = useState(code);

  const [textValue, setTextValue] = useState("");
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
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      color: "#fff!important",
      width: "99%",
      padding: "5px 8px",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: state.isFocused
        ? "rgba(152, 161, 192, 0.24)"
        : "rgba(152, 161, 192, 0.24)",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused
          ? "rgba(152, 161, 192, 0.24)"
          : "rgba(152, 161, 192, 0.24)",
        cursor: "pointer",
      },
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: isFocused ? "#000" : isSelected ? "#000" : "#fff",
      background: isFocused ? "#3fa45a" : isSelected ? "#3fa45a" : "#19281E",
      zIndex: 1,
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#fff!important",
    }),
  };
  const options = [
    { value: "1", label: "Level 1" },
    { value: "2", label: "Level 2" },
    { value: "3", label: "Level 3" },
    { value: "4", label: "Level 4" },
    { value: "5", label: "Level 5" },
    { value: "6", label: "Level 6" },
    { value: "7", label: "Level 7" },
    { value: "8", label: "Level 8" },
    { value: "9", label: "Level 9" },
    { value: "10", label: "Level 10" },
  ];
  const CustomOption = options.map((item) => {
    item.label = <div>address</div>;
    return item;
  });
  const onClickAddress = async (e) => {
    console.log(e.value);
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
                <TbLockAccess />
              </div>
            </IconContext.Provider>
            <div className="sub-head">Token Address</div>
          </div>
          <div className="tkn-field">
            <Select
              styles={customStyles}
              options={CustomOption}
              onChange={onClickAddress}
              placeholder={"Select Address"}
              value={CustomOption.find((obj) => obj.value === selectedValue)}
              isDisabled={walletAddress?false:true}
            />
          </div>
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
{walletAddress ? 
      <button className="deploy-cta">Continue</button>
      :
      <button className="deploy-cta-gray">Continue</button>
       
       }
    </div>
  );
}

export default Multisender;
