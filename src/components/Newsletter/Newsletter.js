import React from "react";
import "./newsletter.css";

function Newsletter() {
  return (
    <div className="newsletter">
      <div className="n-head">Join with our 3Suite App</div>
      <div className="n-desc">
        Step into the realm of seamless token deployment with our cutting-edge
        web3 technology. Our suite of products is meticulously designed to
        revolutionize how you create, deploy, and manage token contracts on the
        blockchain. The EverRise Ecosystem helps provide security solutions for
        both DeFi projects and holders.
      </div>
      <div className="get-in-touch">
        <input placeholder="Get in touch with us"  className="GT-cta"/>
        <button className="sub-cta">Submit</button>
      </div>
    </div>
  );
}

export default Newsletter;
