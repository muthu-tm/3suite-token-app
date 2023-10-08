import React from "react";
import { Link } from "react-scroll";
import { images } from "../../assets/image";

function HomePage() {
  return (
    <div className="banner" id="home">
      <div className="banner-left">
        <div className="banner-head"> A suite of tools for Web3 Products</div>
        <div className="banner-desc">
          3suite App has a set of decentralized applications (dApps) to provide
          multi-chain solutions for projects and individuals in the Web3
          ecosystem. These tools were built to help you create your own web3
          products fast, simple and cheap way!
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 25 }}>
          <Link to="newsletter" spy={true} smooth={true}>
            <button className="join-cta">Join Us</button>
          </Link>
        </div>
      </div>
      <img src={images.shortLogo.src} alt="" className="b-img" />
    </div>
  );
}

export default HomePage;
