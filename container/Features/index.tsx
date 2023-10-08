import React from "react";
import {BiSearchAlt} from  "react-icons/bi"
import {AiOutlineFileProtect} from  "react-icons/ai"
import {BsTools} from  "react-icons/bs"
import {MdSecurity} from  "react-icons/md"
import {GiTwoCoins} from  "react-icons/gi"
import {BsFillCreditCardFill} from  "react-icons/bs"
import { IconContext } from "react-icons";

function Features() {
  return (
    <div className="feature-cont" id="about">
      <div className="f-head">Built by Web3 Experts for Token Management</div>
      <div className="f-cont">
        <div className="f-cont-50">
          <div className="single-fc">
          <IconContext.Provider
              value={{
                size: "1.5em",
                color: "#3fa45ab5",
                className: "global-class-name",
              }}
            >
              <div style={{ marginRight: 15, marginTop: 5 }}>
                <BiSearchAlt />
              </div>
            </IconContext.Provider>
            <div className="single-fc-cont">Focus on creating your product, instead of spending time on token management.</div>
          </div>
          <div className="single-fc">
          <IconContext.Provider
              value={{
                size: "1.5em",
                color: "#3fa45ab5",
                className: "global-class-name",
              }}
            >
              <div style={{ marginRight: 15, marginTop: 5 }}>
                <AiOutlineFileProtect />
              </div>
            </IconContext.Provider>
            <div className="single-fc-cont">Save huge cost, time & effort with our fully customizable pre-audited smart contracts.</div>
          </div>
          <div className="single-fc">
          <IconContext.Provider
              value={{
                size: "1.5em",
                color: "#3fa45ab5",
                className: "global-class-name",
              }}
            >
              <div style={{ marginRight: 15, marginTop: 5 }}>
                <BsTools />
              </div>
            </IconContext.Provider>
            <div className="single-fc-cont">Grow your business and community faster by leveraging our suite of tools.</div>
          </div>
        </div>
        <div className="f-cont-50" >
          <div className="single-fc">
          <IconContext.Provider
              value={{
                size: "1.5em",
                color: "#3fa45ab5",
                className: "global-class-name",
              }}
            >
              <div style={{ marginRight: 15, marginTop: 5 }}>
                <MdSecurity />
              </div>
            </IconContext.Provider>
            <div className="single-fc-cont">Build, launch, customize and manage your tokens with our securely built dapps.</div>
          </div>
          <div className="single-fc">
          <IconContext.Provider
              value={{
                size: "1.5em",
                color: "#3fa45ab5",
                className: "global-class-name",
              }}
            >
              <div style={{ marginRight: 15, marginTop: 5 }}>
                <GiTwoCoins />
              </div>
            </IconContext.Provider>
            <div className="single-fc-cont">Our audited smart contracts provides solid security, thus more time and cost savings for you.</div>
          </div>
          <div className="single-fc">
          <IconContext.Provider
              value={{
                size: "1.5em",
                color: "#3fa45ab5",
                className: "global-class-name",
              }}
            >
              <div style={{ marginRight: 15, marginTop: 5 }}>
                <BsFillCreditCardFill />
              </div>
            </IconContext.Provider>
            <div className="single-fc-cont">No credit card or subscription required, pay only for what you use from your wallet.</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Features;
