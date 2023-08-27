import React from "react";
import "./product.css";
import { FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";

function Product() {
  return (
    <div className="prod-cont">
      <div className="prod-head">Explore Our Innovative Product Line</div>
      <div className="p-desc">
        Step into the realm of seamless token deployment with our cutting-edge
        web3 technology. Our suite of products is meticulously designed to
        revolutionize how you create, deploy, and manage token contracts on the
        blockchain. Harness the power of decentralized networks while enjoying a
        user-friendly experience that simplifies the complexities of contract
        deployment.
      </div>
      <div className="prod-section">
        <div className="single-prod">
          <div className="sp-head">Token Mint</div>
          <div className="sp-desc">
            {" "}
            Step into the realm of seamless token deployment with our
            cutting-edge web3 technology. Our suite of products is meticulously
            designed to revolutionize how you create, deploy, and manage token
            contracts on the blockchain
          </div>
          <div className="sp-cta">
            <div>Launch DApp </div>

            <IconContext.Provider
              value={{
                size: "1.1em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft: 8, marginTop: 5 }}>
                <FaChevronRight />
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <div className="single-prod">
          <div className="sp-head">Brand Creation</div>
          <div className="sp-desc">
            {" "}
            Step into the realm of seamless token deployment with our
            cutting-edge web3 technology. Our suite of products is meticulously
            designed to revolutionize how you create, deploy, and manage token
            contracts on the blockchain
          </div>
          <div className="sp-cta">
            <div>Launch DApp </div>

            <IconContext.Provider
              value={{
                size: "1.1em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft: 8, marginTop: 5 }}>
                <FaChevronRight />
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <div className="single-prod">
          <div className="sp-head">MultiSender/Airdrop</div>
          <div className="sp-desc">
            {" "}
            Step into the realm of seamless token deployment with our
            cutting-edge web3 technology. Our suite of products is meticulously
            designed to revolutionize how you create, deploy, and manage token
            contracts on the blockchain
          </div>
          <div className="sp-cta">
            <div>Launch DApp </div>

            <IconContext.Provider
              value={{
                size: "1.1em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft: 8, marginTop: 5 }}>
                <FaChevronRight />
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <div className="single-prod">
          <div className="sp-head">Allowance - Revoke</div>
          <div className="sp-desc">
            {" "}
            Step into the realm of seamless token deployment with our
            cutting-edge web3 technology. Our suite of products is meticulously
            designed to revolutionize how you create, deploy, and manage token
            contracts on the blockchain
          </div>
          <div className="sp-cta">
            <div>Launch DApp </div>

            <IconContext.Provider
              value={{
                size: "1.1em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft: 8, marginTop: 5 }}>
                <FaChevronRight />
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <div className="single-prod">
          <div className="sp-head">Token Swap</div>
          <div className="sp-desc">
            {" "}
            Step into the realm of seamless token deployment with our
            cutting-edge web3 technology. Our suite of products is meticulously
            designed to revolutionize how you create, deploy, and manage token
            contracts on the blockchain
          </div>
          <div className="sp-cta">
            <div>Launch DApp </div>

            <IconContext.Provider
              value={{
                size: "1.1em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft: 8, marginTop: 5 }}>
                <FaChevronRight />
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <div className="single-prod">
          <div className="sp-head">Launchpad</div>
          <div className="sp-desc">
            {" "}
            Step into the realm of seamless token deployment with our
            cutting-edge web3 technology. Our suite of products is meticulously
            designed to revolutionize how you create, deploy, and manage token
            contracts on the blockchain
          </div>
          <div className="sp-cta">
            <div>Launch DApp </div>

            <IconContext.Provider
              value={{
                size: "1.1em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft: 8, marginTop: 5 }}>
                <FaChevronRight />
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <div className="single-prod">
          <div className="sp-head">RPC Explorer</div>
          <div className="sp-desc">
            {" "}
            Step into the realm of seamless token deployment with our
            cutting-edge web3 technology. Our suite of products is meticulously
            designed to revolutionize how you create, deploy, and manage token
            contracts on the blockchain
          </div>
          <div className="sp-cta">
            <div>Launch DApp </div>

            <IconContext.Provider
              value={{
                size: "1.1em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft: 8, marginTop: 5 }}>
                <FaChevronRight />
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
