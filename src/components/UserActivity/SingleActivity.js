import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getEllipsisTxt } from "../../utils/formatter";
import { IconContext } from "react-icons";
import copy from "copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";

function SingleActivity() {
  const location = useLocation();
  const { state } = location;
  const heading = state;
  console.log("heading", heading);
  const [copied, setCopied] = useState(false);
  const mintFeed = [
    {
      id: 1,
      token: "TTKO3",
      address: "0xC4f4Bc698c3090A5aBC23dfCBc50227C25895E9a",
      date: "20 September 2023",
    },
    {
      id: 2,
      token: "TestToken",
      address: "0xC4f4Bc698c3090A5aBC23dfCBc50227C25895E9a",
      date: "17 August 2023",
    },
    {
      id: 3,
      token: "SampleToken",
      address: "0xC4f4Bc698c3090A5aBC23dfCBc50227C25895E9a",
      date: "6 August 2023",
    },
  ];
  const copyToClipboard = () => {
    document.getElementById("token-address").style.color = "#22cf1ebd";
    document.getElementById("token-address").style.fontWeight = 600;
    setTimeout(() => {
      document.getElementById("token-address").style.color = "#fff";
      document.getElementById("token-address").style.fontWeight = 400;
    }, 250);

    setCopied(true);
    copy("enter the value here");
  };
  return (
    <div className="activity-sec">
      <div className="Heading">{heading}</div>
<div style={{marginTop:40}} />

{heading==="Token Minting" && 
<>
      {mintFeed?.map((item, index) => {
        return (
          <div className="s-width-card">
            <div className="index">{item.id}.</div>
            <div className="data-card">
                <div>
              <span style={{fontWeight:600}}>{item.token}</span>   has been minted by <span style={{fontWeight:600}}>{item.address}</span> on {item.date}
            </div>
            <div className="explorer-link">
                View in Explorer : <a style={{color:"rgb(246 252 249 / 67%)",textDecoration:'underline',cursor:"pointer"}}>{getEllipsisTxt("https://testnet.snowtrace.io/tx/0xA23d50890896B711b1d175E30983E157e4A1D229",15)}</a>
            </div>
            <div className="explorer-link" style={{display:"flex",alignItems:'center'}}>
                Token Address : <a style={{color:"rgb(246 252 249 / 67%)"}}   id="token-address">{getEllipsisTxt("0xA23d50890896B711b1d175E30983E157e4A1D229",9)}</a>
                <span>

                <IconContext.Provider
              value={{
                size: "1.2em",
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
                </span>
            </div>
            </div>
          
          </div>
        );
      })}
      </>
    }

    {heading === "Multisender" && <>
    <div className="s-width-card">
            <div className="index">1.</div>
            <div className="data-card">
            <span style={{fontWeight:600}}>20 TTKO3</span> token sent by 0xC4f4Bc698c3090A5aBC23dfCBc50227C25895E9a
              <div className="file-data">
<div className="uploaded-file"> 1. 0xC4f4Bc698c3090A5aBC23dfCBc50227C25895E9a, 10 </div>
<div className="uploaded-file"> 2. 0x72bCE2654500B89FC7876b1973636Ab116Da7C8A, 5 </div>
<div className="uploaded-file"> 3. 0xFa24307eDc4992d97300e1F27e67E3390E080a42, 5 </div>
              </div>
            </div>
            </div>
    </>}
    </div>
  );
}

export default SingleActivity;
