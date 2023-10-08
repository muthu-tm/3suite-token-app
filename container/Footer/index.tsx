import React from "react";
import { IconContext } from "react-icons";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-scroll";
import { useRouter } from "next/router";
import { images } from "../../assets/image";

const Footer = () => {
const router = useRouter()
  const lookupLikedIn = () => {
    window.open("https://www.linkedin.com/company/3suite-tech/", "_blank");
  };
  const lookupInsta = () => {
    window.open(
      "https://instagram.com/3suite?igshid=MWZjMTM2ODFkZg==",
      "_blank"
    );
  };
  // https://twitter.com/3suite_tech
  const lookTwitter = () => {
    window.open("https://twitter.com/3suite_tech", "_blank");
  };
  return (
    <>
      <div className="footer">
        <div className="footer-left">
          <img src={images.LogoImage.src} alt="" className="footer-img" />
          <div className="footer-detail">
            Join us in shaping the next era of the internet, where innovation
            knows no bounds and every click writes a new chapter in the
            evolution of technology.
          </div>
        </div>
        <div className="footer-right">
          <div className="links-f">
            <Link activeClass="active" to="home" spy={true} smooth={true}>
              <div className="s-route">Home</div>
            </Link>

            <Link to="product" spy={true} smooth={true}>
              <div className="s-route">Product</div>
            </Link>
            {/* */}
            <Link to="newsletter" spy={true} smooth={true}>
              <div className="s-route">Newsletter</div>
            </Link>
            <div  onClick={() => router.push("/user-activity")}>
              <li style={{margin:"0px 0"}}>User Activity</li>
            </div>
          </div>
          <div className="footer-sm">
            <IconContext.Provider
              value={{
                size: "1.4em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div className="footer-icon" onClick={lookupLikedIn}>
                <FaLinkedinIn />
              </div>
            </IconContext.Provider>
            <IconContext.Provider
              value={{
                size: "1.4em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div className="footer-icon" onClick={lookupInsta}>
                <BsInstagram />
              </div>
            </IconContext.Provider>
            <IconContext.Provider
              value={{
                size: "1.4em",
                color: "#fff",
                className: "global-class-name",
              }}
            >
              <div className="footer-icon" onClick={lookTwitter}>
                <BsTwitter />
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <div className="b-top" />
      <div
        className="footer-detail"
        style={{ fontSize: 12, padding: "10px 0 20px", margin:"auto",textAlign: "center" }}
      >
        All Rights Reserved 2023 @ 3Suite
      </div>
    </>
  );
};

export default Footer;
