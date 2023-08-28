import React from "react";
import "./home.css";
import Codenz from "../../assets/Images/Codenz.png";

function Home() {
  return (
    <div className="banner">
      {/* Empowering Your Tokens, One Contract at a Time */}
      <div className="banner-left">
        <div className="banner-head"> A suite of tools for web3 products</div>
        <div className="banner-desc">
          3suite App has a set of decentralized applications (dApps) to provide
          multi-chain solutions for projects and individuals in the Web3
          ecosystem. These tools were built to help you create your own web3
          products fast, simple and cheap way!
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}> 
        <button className="join-cta" >
      Join Us
        </button> 

        </div>
 
      </div>
      <img src={Codenz} alt="" className="b-img" />
    </div>
  );
}

export default Home;
